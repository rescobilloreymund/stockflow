import { Button } from "@/components/ui/Button";
import { Moon } from "lucide-react";

export default function ThemeToggle() {
  return (
    <Button type="button" variant="ghost" size="icon">
      <Moon />
    </Button>
  );
}
