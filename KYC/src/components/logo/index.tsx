interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
  className?: string;
}

export default function Logo({ size = 'md', withText = false, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16',
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/logo.png" 
        alt="Logo" 
        className={sizeClasses[size]}
      />
      {withText && (
        <h1 className={`font-semibold text-gray-900 ml-2 ${size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : 'text-3xl'}`}>
          Simple KYC
        </h1>
      )}
    </div>
  );
}
