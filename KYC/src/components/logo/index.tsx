interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

export default function Logo({ size = 'md', text = '', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-20 w-20',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="Logo" 
        className={sizeClasses[size]}
      />
      {text && (
        <h1 className={`font-semibold ml-2 ${size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : 'text-3xl'}`}>
          {text}
        </h1>
      )}
    </div>
  );
}
