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
          "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-muted/70",
          isActive && "bg-primary/10 text-primary font-semibold",
        )}
      >
        <Icon className={cn("size-4 shrink-0", isActive && "text-primary")} />
        <span>{item.label}</span>
      </Link>
    </li>
  );
}
