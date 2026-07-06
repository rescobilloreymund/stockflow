import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/Button";

interface ConfirmationDialogProps {
  title: string;
  description: React.ReactNode;

  confirmText: string;
  cancelText: string;

  onConfirm: () => Promise<void>;
  confirmVariant?: "default" | "destructive";

  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function ConfirmationDialog({
  title,
  description,
  confirmText,
  cancelText = "Cancel",
  confirmVariant = "default",
  onConfirm,

  open,
  onOpenChange,
}: ConfirmationDialogProps) {
  const [loading, setLoading] = useState(false);

  async function handleConfirm() {
    try {
      setLoading(true);

      // Errors are handled by the caller.
      // If onConfirm throws, the dialog remains open.
      await onConfirm();
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="sm:max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            type="button"
            variant="secondary"
            disabled={loading}
            onClick={() => onOpenChange(false)}
          >
            {cancelText}
          </Button>
          <Button
            type="button"
            variant={confirmVariant}
            onClick={handleConfirm}
            disabled={loading}
          >
            {loading ? "Loading..." : confirmText}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
