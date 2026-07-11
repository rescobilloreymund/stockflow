"use client";
import { navigationSections } from "@/config/navigation";
import SidebarSection from "./SidebarSection";

export default function Sidebar() {
  return (
    <aside className="flex w-72 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold tracking-tight">StockFlow</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="p-4">
          {navigationSections.map((section) => (
            <SidebarSection key={section.id} section={section} />
          ))}
        </nav>
      </div>
    </aside>
  );
}
