"use client";

import { Component as LegoOnboarding } from "@/components/ui/interactive-tech-stack-builder";

export default function LegoOnboardingDemo() {
  return (
    <div className="w-full h-screen bg-[url('/mario_bg.png')] bg-cover bg-bottom bg-no-repeat overflow-hidden" style={{ imageRendering: 'pixelated' }}>
      <LegoOnboarding 
        onComplete={(stack) => {
          console.log("Tech stack selected:", stack);
          
          const stackNames = stack.map(m => m.name).join(' + ');
          alert(`Onboarding Complete!\nChosen stack: ${stackNames}`);
        }}
        onSkip={() => {
          console.log("User skipped onboarding");
          alert("Onboarding skipped. Taking you to the main dashboard...");
        }}
      />
    </div>
  );
}
