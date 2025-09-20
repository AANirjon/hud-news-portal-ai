// src/pages/HUDPage.jsx
import React from "react";
import HUDScroller from "../components/HUDScroller";
import Controls from "../components/Controls";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function HUDPage() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-black to-gray-900">
        <HUDScroller />
        <div className="absolute top-6 left-6 z-30">
          <Controls />
        </div>
      </div>
    </QueryClientProvider>
  );
}
