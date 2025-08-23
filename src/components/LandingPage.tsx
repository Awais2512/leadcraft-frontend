import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { 
  Zap, 
  Brain, 
  TrendingUp, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Clock,
  DollarSign,
  Award
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
  onSignIn: () => void;
}

export function LandingPage({ onGetStarted, onSignIn }: LandingPageProps) {
  const features = [
    {
      icon: <Brain className="h-6 w-6" />,
      title: "AI-Powered Writing",
      description: "Generate compelling proposals with advanced AI that understands your industry and client needs.",
      image: "https://images.unsplash.com/photo-1720036236694-d0a231c52563?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaSUyMGF1dG9tYXRpb24lMjB3b3JrZmxvd3xlbnwxfHx8fDE3NTU2MzI4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Lightning Fast",
      description: "Create professional proposals in minutes, not hours. Save 80% of your proposal writing time.",
      image: "https://images.unsplash.com/photo-1634245482527-60ac666a8c9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwcm9wb3NhbCUyMHdyaXRpbmd8ZW58MXx8fHwxNzU1NjMyODIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Higher Win Rates",
      description: "Improve your proposal success rate with data-driven insights and proven templates.",
      image: "https://images.unsplash.com/photo-1730382624709-81e52dd294d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHN1Y2Nlc3MlMjBncm93dGh8ZW58MXx8fHwxNzU1NTU1MTg4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    }
  ];

  const stats = [
    { value: "15,000+", label: "Freelancers" },
    { value: "87%", label: "Success Rate" },
    { value: "2.5M+", label: "Proposals Created" },
    { value: "4.9/5", label: "User Rating" }
  ];

  const benefits = [
    "AI-powered proposal generation",
    "Industry-specific templates",
    "Real-time collaboration",
    "Client relationship management",
    "Analytics and insights",
    "Custom branding options"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <Badge variant="secondary" className="text-primary bg-primary/10 border-primary/20">
                  <Zap className="w-3 h-3 mr-1" />
                  AI-Powered Proposals
                </Badge>
                <h1 className="text-4xl lg:text-6xl tracking-tight">
                  Win More Projects with{' '}
                  <span className="text-primary">Smarter Proposals</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Create compelling, professional proposals in minutes using AI. Join thousands of freelancers who've transformed their business with LeadCraft.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={onGetStarted}
                  size="lg" 
                  className="leadcraft-gradient text-lg px-8 py-6 h-auto"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onSignIn}
                  size="lg"
                  className="text-lg px-8 py-6 h-auto"
                >
                  Watch Demo
                </Button>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">4.9/5 from 2,000+ users</span>
                </div>
              </div>
            </div>

            <div className="relative animate-slide-up">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1634245482527-60ac666a8c9f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBwcm9wb3NhbCUyMHdyaXRpbmd8ZW58MXx8fHwxNzU1NjMyODIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Professional writing workspace"
                className="w-full h-auto rounded-2xl leadcraft-shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-lg leadcraft-shadow-lg border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Proposal Approved!</p>
                    <p className="text-xs text-muted-foreground">$15,000 project secured</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="text-3xl lg:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl">
              Everything you need to{' '}
              <span className="text-primary">win more projects</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful AI tools designed specifically for freelancers and agencies to create winning proposals faster.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 leadcraft-shadow">
                <CardContent className="p-8 space-y-6">
                  <div className="relative">
                    <ImageWithFallback
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <div className="absolute top-4 left-4 bg-primary p-3 rounded-lg">
                      <div className="text-primary-foreground">{feature.icon}</div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-secondary/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl lg:text-4xl">
                  Why freelancers choose{' '}
                  <span className="text-primary">LeadCraft</span>
                </h2>
                <p className="text-lg text-muted-foreground">
                  Join the thousands of freelancers who've transformed their proposal process and dramatically increased their win rates.
                </p>
              </div>

              <div className="grid gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button onClick={onGetStarted} size="lg" className="leadcraft-gradient">
                  Start Your Free Trial
                </Button>
                <Button variant="outline" size="lg">
                  Schedule Demo
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <Card className="p-6 space-y-4 leadcraft-shadow">
                <Clock className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold">Save 80% Time</h4>
                  <p className="text-sm text-muted-foreground">
                    Create proposals in minutes, not hours
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 space-y-4 leadcraft-shadow mt-8">
                <DollarSign className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold">Higher Revenue</h4>
                  <p className="text-sm text-muted-foreground">
                    Increase project value by 35% on average
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 space-y-4 leadcraft-shadow -mt-4">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold">More Clients</h4>
                  <p className="text-sm text-muted-foreground">
                    Win 3x more projects with better proposals
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 space-y-4 leadcraft-shadow mt-4">
                <Award className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-semibold">Professional Quality</h4>
                  <p className="text-sm text-muted-foreground">
                    Enterprise-grade proposals every time
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <Card className="leadcraft-gradient text-center p-12 lg:p-16 border-0">
            <div className="space-y-6 text-white">
              <h2 className="text-3xl lg:text-5xl font-bold">
                Ready to transform your proposals?
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Join 15,000+ freelancers who've already boosted their success rates with LeadCraft's AI-powered proposal assistant.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button 
                  onClick={onGetStarted}
                  size="lg" 
                  variant="secondary"
                  className="text-lg px-8 py-6 h-auto bg-white text-primary hover:bg-gray-100"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg px-8 py-6 h-auto border-white text-white hover:bg-white/10"
                >
                  Schedule Demo
                </Button>
              </div>
              <p className="text-sm opacity-75">
                No credit card required • 14-day free trial • Cancel anytime
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}