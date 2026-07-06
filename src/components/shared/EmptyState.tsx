interface EmptyStateProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ReactNode;
}

export default function EmptyState({
  title,
  description,
  action,
  icon,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-12">
      {icon && <div className="text-3xl">{icon}</div>}
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      {description && (
        <p className="max-w-md text-center text-muted-foreground">
          {description}
        </p>
      )}
      {action && <div className="flex items-center">{action}</div>}
    </div>
  );
}
