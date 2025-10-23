import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Activity, TrendingUp, Bell, BarChart3, Waves, DollarSign, MessageSquare, X } from 'lucide-react';
import Chat from '@/components/Chat';

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <img 
              src="/lytra-logo.png" 
              alt="Lytra AI" 
              className="h-12 w-auto"
            />
          </div>
          <Button 
            variant="default" 
            className="bg-primary hover:bg-primary/90"
            onClick={() => setShowChat(true)}
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Chat with AI
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-block">
            <div className="px-4 py-2 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium mb-6">
              🚀 Advanced Crypto Intelligence Platform
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Your AI-Powered
            <span className="block text-primary mt-2">Crypto Intelligence Agent</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Track whale movements, analyze market trends, and receive real-time alerts. 
            Lytra brings professional-grade crypto intelligence to your fingertips.
          </p>

          <div className="flex gap-4 justify-center pt-4">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-lg px-8"
              onClick={() => setShowChat(true)}
            >
              Get Started
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to stay ahead in crypto markets
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Activity className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Whale Tracking</h3>
            <p className="text-muted-foreground">
              Monitor large wallet movements and get instant alerts when whales make significant transactions.
            </p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Waves className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Liquidity Heatmaps</h3>
            <p className="text-muted-foreground">
              Visualize liquidation levels and identify key support/resistance zones across exchanges.
            </p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Market Analysis</h3>
            <p className="text-muted-foreground">
              AI-powered analysis of volume, TVL, trends, and market sentiment to guide your decisions.
            </p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <BarChart3 className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fear & Greed Index</h3>
            <p className="text-muted-foreground">
              Track market sentiment in real-time with the crypto Fear & Greed Index and historical data.
            </p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Smart Alerts</h3>
            <p className="text-muted-foreground">
              Receive email notifications for price movements, whale activity, and custom triggers.
            </p>
          </Card>

          <Card className="p-6 bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Price Tracking</h3>
            <p className="text-muted-foreground">
              Real-time price data, historical charts, and multi-exchange comparison for all major coins.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20">
        <Card className="max-w-4xl mx-auto p-12 text-center bg-gradient-to-br from-primary/10 via-card to-card border-primary/20">
          <h2 className="text-4xl font-bold mb-4">
            Ready to Level Up Your Crypto Game?
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Join Lytra and get access to professional-grade crypto intelligence tools.
          </p>
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-lg px-12"
            onClick={() => setShowChat(true)}
          >
            Get Early Access
          </Button>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-20">
        <div className="container text-center">
          <p className="text-muted-foreground">
            © 2025 Lytra AI. Advanced Crypto Intelligence Platform.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Built with cutting-edge AI technology for serious crypto traders.
          </p>
        </div>
      </footer>

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <Card className="w-full max-w-4xl h-[80vh] mx-4 flex flex-col relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10"
              onClick={() => setShowChat(false)}
            >
              <X className="w-4 h-4" />
            </Button>
            <Chat />
          </Card>
        </div>
      )}
    </div>
  );
}

