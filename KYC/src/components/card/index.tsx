interface CardProps {
  className?: string;
  children: React.ReactNode;
}

export default function Card({ className = '', children }: CardProps) {
  return (
    <div className={`bg-background border w-full text-left flex flex-col rounded-lg p-6 ${className}`}>
      {children}
    </div>
  );
}