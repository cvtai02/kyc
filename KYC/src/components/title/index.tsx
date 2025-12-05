interface TitleProps {
    text: string;
    className?: string;
    variant?: 'default' | 'large' | 'hightlight';
}
export default function Title({ text, className = '', variant = 'default' }: TitleProps) {
    
    let variantClass = '';
    if (variant === 'large') {
        variantClass = 'text-2xl';
    } else if (variant === 'hightlight') {
        variantClass = 'text-xl text-hightlight';
    } else {
        variantClass = 'text-xl';
    }

    return (
        <h1 className={`text-left font-bold mb-4 ${variantClass} ${className}`}>
            {text}
        </h1>
    );
}