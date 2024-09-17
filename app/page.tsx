"use client";
import React from "react";
import { CardStackDemo } from "@/components/ui/example";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/Home");
  };

  return (
    <div className="min-h-screen bg-emerald-50 dark:bg-emerald-900 p-4 sm:p-6 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 lg:space-x-8">
          <div className="flex-1 w-full lg:w-1/2 space-y-4">
            <h1 className="text-3xl sm:text-4xl font-bold text-emerald-700 dark:text-emerald-300 bg-white dark:bg-emerald-800/30 p-3 rounded-lg shadow-sm inline-block">
              Smart Attendance Tracker
            </h1>
            <p className="text-xl text-emerald-600 dark:text-emerald-400">
              Revolutionize Your Workforce Management
            </p>
            <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              Empower your organization with our cutting-edge Attendance Tracking System. 
              Seamlessly monitor, analyze, and optimize attendance patterns for enhanced 
              productivity and employee satisfaction.
            </p>
            <div className="flex flex-row space-x-4">
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </div>
          </div>
          
          <div className="flex-1 w-full lg:w-1/2 flex justify-center items-center">
            <div className="w-full max-w-sm">
              <CardStackDemo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}