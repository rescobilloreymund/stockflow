import { NavigationSection } from "@/config/navigation";
import SidebarItem from "./SidebarItem";

interface SideBarSectionProps {
  section: NavigationSection;
}

export default function SidebarSection({ section }: SideBarSectionProps) {
  return (
    <div className="mb-8">
      {section.title && (
        <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {section.title}
        </p>
      )}

      <ul className="space-y-1">
        {section.items.map((item) => (
          <SidebarItem key={item.href} item={item} />
        ))}
      </ul>
    </div>
  );
}
