import React from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Camera, Users, Shield, Heart } from "lucide-react";

const FeatureCard = ({ icon: Icon, title, description }: any) => (
  <div className="flex flex-col items-center p-6 rounded-lg bg-card hover:bg-accent/5 transition-colors">
    <div className="rounded-full bg-primary/10 p-3 mb-4">
      <Icon className="w-6 h-6 text-primary" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground text-center">{description}</p>
  </div>
);

const HomeFeed = () => {
  const features = [
    {
      icon: Camera,
      title: "Share Authentically",
      description:
        "Share real moments from your life without filters or editing",
    },
    {
      icon: Users,
      title: "Connect Genuinely",
      description:
        "Build meaningful connections with people who share your interests",
    },
    {
      icon: Shield,
      title: "Stay Secure",
      description: "Your privacy and security are our top priorities",
    },
    {
      icon: Heart,
      title: "Spread Positivity",
      description:
        "Be part of a supportive community that celebrates real moments",
    },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center p-4">
      {/* Hero Section */}
      <div className="text-center max-w-3xl mx-auto py-16">
        <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Welcome to Truview
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
          Join our community to share and discover amazing content from creators
          around the world.
        </p>
        <div className="flex gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/api/auth/login">Get Started</Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <Link href="#learn-more">Learn More</Link>
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div id="learn-more" className="w-full max-w-5xl mx-auto py-12">
        <h2 className="text-2xl font-semibold text-center mb-12">
          Why Choose Truview?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>
      </div>

      {/* Social Proof Section */}
      <div className="w-full bg-accent/5 py-12 mt-12">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-2xl font-semibold mb-6">
            Join Our Growing Community
          </h2>
          <div className="flex justify-center gap-12 flex-wrap">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-primary">10K+</span>
              <span className="text-muted-foreground">Active Users</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-primary">50K+</span>
              <span className="text-muted-foreground">Posts Shared</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-primary">100K+</span>
              <span className="text-muted-foreground">Connections Made</span>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="w-full py-16 text-center">
        <h2 className="text-2xl font-semibold mb-6">Ready to Get Started?</h2>
        <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
          Join Truview today and start sharing your authentic moments with the
          world.
        </p>
        <Button asChild size="lg">
          <Link href="/api/auth/login">Create Your Account</Link>
        </Button>
      </div>
    </div>
  );
};

export default HomeFeed;
