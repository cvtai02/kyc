interface InfoFieldProps {
  label: string;
  value: string | number;
}

export default function InfoField({ label, value }: InfoFieldProps) {
  return (
    <div className="border-l pl-1">
      <p className="text-sm font-medium text-secondary mb-1">{label}</p>
      <p className="text-base">{value || '-'}</p>
    </div>
  );
}
