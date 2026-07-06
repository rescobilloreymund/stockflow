interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}

export default function FormField({
  label,
  htmlFor,
  error,
  children,
}: FormFieldProps) {
  return (
    <div>
      <label htmlFor={htmlFor}>{label}</label>
      {children}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
