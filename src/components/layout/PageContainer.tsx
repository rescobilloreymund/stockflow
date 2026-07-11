interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div
      className="
        min-h-full
        p-8
        space-y-8
        "
    >
      {children}
    </div>
  );
}
