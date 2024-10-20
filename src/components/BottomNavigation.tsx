'use client'
import React, { useState } from 'react';
import { Clock, Heart, MapPin } from 'lucide-react';

const BottomNavigation = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    { label: "Recents", icon: Clock },
    { label: "Favorites", icon: Heart },
    { label: "Nearby", icon: MapPin },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around">
        {tabs.map((tab, index) => (
          <button
            key={tab.label}
            className={`flex flex-col items-center justify-center w-full py-2 ${
              activeTab === index ? 'text-primary' : 'text-gray-500'
            }`}
            onClick={() => setActiveTab(index)}
          >
            <tab.icon className="h-6 w-6 mb-1" />
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;