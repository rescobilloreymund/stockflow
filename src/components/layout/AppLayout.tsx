import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
