import { Home, Camera, Users, Shield, Heart } from "lucide-react";
export const navigationItems = [
  {
    name: "Feed",
    href: "/feed",
    icon: Home,
  },
  {
    name: "About Us",
    href: "/about",
    icon: Users,
  },
];

export const features = [
  {
    icon: Camera,
    title: "Share Authentically",
    description: "Share real moments from your life without filters or editing",
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
