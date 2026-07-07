interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div
      className="
        min-h-full
        px-8
        py-6
        space-y-6
        "
    >
      {children}
    </div>
  );
}
