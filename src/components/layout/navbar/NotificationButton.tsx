import { Button } from "@/components/ui/Button";
import { Bell } from "lucide-react";

export default function NotificationButton() {
  return (
    <Button type="button" variant="ghost" size="icon">
      <Bell />
    </Button>
  );
}
