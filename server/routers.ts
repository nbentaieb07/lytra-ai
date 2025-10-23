import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import OpenAI from "openai";
import { getDb } from "./db";
import { conversations, messages } from "../drizzle/schema";
import { eq, desc } from "drizzle-orm";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const appRouter = router({
  system: systemRouter,

  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  chat: router({
    // Send a message and get AI response
    sendMessage: publicProcedure
      .input(
        z.object({
          message: z.string(),
          conversationId: z.number().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        let convId = input.conversationId;

        // Create new conversation if needed
        if (!convId) {
          const [newConv] = await db.insert(conversations).values({
            userId: 1, // For now, using default user
            title: input.message.substring(0, 50),
          });
          convId = newConv.insertId;
        }

        // Save user message
        await db.insert(messages).values({
          conversationId: convId,
          role: "user",
          content: input.message,
        });

        // Get conversation history
        const history = await db
          .select()
          .from(messages)
          .where(eq(messages.conversationId, convId))
          .orderBy(messages.createdAt);

        // Build messages for OpenAI
        const openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[] = [
          {
            role: "system",
            content: `You are Lytra AI, an advanced crypto intelligence agent specialized in cryptocurrency analysis, whale tracking, and market insights. 

Your capabilities include:
- Analyzing whale wallet movements and large transactions
- Interpreting liquidity heatmaps and support/resistance levels
- Providing real-time market analysis based on volume, TVL, and trends
- Explaining the Fear & Greed Index and market sentiment
- Offering portfolio advice and risk management strategies
- Setting up price alerts and whale tracking notifications

Always provide data-driven insights, explain crypto concepts clearly, and help users make informed decisions. Use professional yet accessible language. When discussing specific cryptocurrencies, provide balanced analysis considering both bullish and bearish factors.`,
          },
          ...history.map(msg => ({
            role: msg.role as "user" | "assistant",
            content: msg.content,
          })),
        ];

        // Get AI response
        const completion = await openai.chat.completions.create({
          model: "gpt-4.1-mini",
          messages: openaiMessages,
          temperature: 0.7,
          max_tokens: 1000,
        });

        const aiResponse = completion.choices[0].message.content || "I apologize, but I couldn't generate a response.";

        // Save AI response
        await db.insert(messages).values({
          conversationId: convId,
          role: "assistant",
          content: aiResponse,
        });

        return {
          conversationId: convId,
          response: aiResponse,
        };
      }),

    // Get conversation history
    getConversation: publicProcedure
      .input(z.object({ conversationId: z.number() }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) {
          throw new Error("Database not available");
        }

        const msgs = await db
          .select()
          .from(messages)
          .where(eq(messages.conversationId, input.conversationId))
          .orderBy(messages.createdAt);

        return msgs;
      }),

    // List all conversations
    listConversations: publicProcedure.query(async () => {
      const db = await getDb();
      if (!db) {
        throw new Error("Database not available");
      }

      const convs = await db
        .select()
        .from(conversations)
        .orderBy(desc(conversations.updatedAt))
        .limit(20);

      return convs;
    }),
  }),
});

export type AppRouter = typeof appRouter;

