import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, boolean, decimal } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /**
   * Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user.
   * This mirrors the Manus account and should be used for authentication lookups.
   */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Chat conversations table - stores chat sessions
 */
export const conversations = mysqlTable("conversations", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  title: varchar("title", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Conversation = typeof conversations.$inferSelect;
export type InsertConversation = typeof conversations.$inferInsert;

/**
 * Chat messages table - stores individual messages
 */
export const messages = mysqlTable("messages", {
  id: int("id").autoincrement().primaryKey(),
  conversationId: int("conversationId").notNull(),
  role: mysqlEnum("role", ["user", "assistant", "system"]).notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

/**
 * Whale alerts table - tracks whale wallet movements
 */
export const whaleAlerts = mysqlTable("whaleAlerts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  walletAddress: varchar("walletAddress", { length: 255 }).notNull(),
  cryptocurrency: varchar("cryptocurrency", { length: 50 }).notNull(),
  transactionType: mysqlEnum("transactionType", ["buy", "sell", "transfer"]).notNull(),
  amount: decimal("amount", { precision: 20, scale: 8 }).notNull(),
  usdValue: decimal("usdValue", { precision: 20, scale: 2 }),
  transactionHash: varchar("transactionHash", { length: 255 }),
  alertSent: boolean("alertSent").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type WhaleAlert = typeof whaleAlerts.$inferSelect;
export type InsertWhaleAlert = typeof whaleAlerts.$inferInsert;

/**
 * Price alerts table - user-configured price alerts
 */
export const priceAlerts = mysqlTable("priceAlerts", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  cryptocurrency: varchar("cryptocurrency", { length: 50 }).notNull(),
  targetPrice: decimal("targetPrice", { precision: 20, scale: 2 }).notNull(),
  condition: mysqlEnum("condition", ["above", "below"]).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  triggered: boolean("triggered").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  triggeredAt: timestamp("triggeredAt"),
});

export type PriceAlert = typeof priceAlerts.$inferSelect;
export type InsertPriceAlert = typeof priceAlerts.$inferInsert;

/**
 * User portfolios table - tracks user crypto holdings
 */
export const portfolios = mysqlTable("portfolios", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  cryptocurrency: varchar("cryptocurrency", { length: 50 }).notNull(),
  amount: decimal("amount", { precision: 20, scale: 8 }).notNull(),
  averageBuyPrice: decimal("averageBuyPrice", { precision: 20, scale: 2 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Portfolio = typeof portfolios.$inferSelect;
export type InsertPortfolio = typeof portfolios.$inferInsert;

