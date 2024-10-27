import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Camera, Users, Lock, Award } from "lucide-react";

const FeatureItem = ({ icon: Icon, title, description }: any) => (
  <div className="flex items-start space-x-4">
    <div className="p-2 rounded-lg bg-primary/10">
      <Icon className="w-5 h-5 text-primary" />
    </div>
    <div>
      <h3 className="font-medium mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  </div>
);

const AboutUs = () => {
  const features = [
    {
      icon: Camera,
      title: "Instant Sharing",
      description:
        "Share your moments instantly with our streamlined uploading process",
    },
    {
      icon: Users,
      title: "Community Focus",
      description:
        "Join a vibrant community of photography enthusiasts and creators",
    },
    {
      icon: Lock,
      title: "Secure Storage",
      description:
        "Your memories are safely stored with enterprise-grade security",
    },
    {
      icon: Award,
      title: "Quality First",
      description:
        "Maintain the highest quality of your photos with our advanced processing",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-accent/10">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Truview
            </h1>
            <p className="text-xl text-muted-foreground">
              Capture and share your moments authentically
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {features.map((feature, index) => (
                <FeatureItem key={index} {...feature} />
              ))}
            </div>
          </div>

          <div className="flex flex-col space-y-6">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Our Story
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-muted-foreground">
                <p>
                  At Truview, we believe in the power of authentic moments. Our
                  journey began with a simple idea: create a platform where
                  people can share their real experiences without filters or
                  pretense.
                </p>
                <p>
                  We've built a community-focused platform that prioritizes
                  genuine connections and real moments over carefully curated
                  perfection. Every feature we develop is designed to enhance
                  the way you capture and share your stories.
                </p>
                <p>
                  Looking ahead, we're committed to evolving with our users'
                  needs while maintaining our core values of authenticity,
                  security, and community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
