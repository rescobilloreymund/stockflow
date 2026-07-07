import { NavigationItem } from "@/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
interface SidebarItemProps {
  item: NavigationItem;
}
export default function SidebarItem({ item }: SidebarItemProps) {
  const Icon = item.icon;

  const pathname = usePathname();

  const isActive = pathname === item.href;

  return (
    <li>
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm transition-colors hover:bg-muted",
          isActive && "bg-muted font-medium",
        )}
      >
        <Icon className="size-4 shrink-0" />
        <span>{item.label}</span>
      </Link>
    </li>
  );
}
