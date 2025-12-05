import type { FormHTMLAttributes, ReactNode } from "react";

interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
    title?: string;
    titleElement?: ReactNode;
    inputs: ReactNode[];
    submitButton: ReactNode;
    isLoading?: boolean;
}

const Form = ({ titleElement, title, inputs, submitButton, isLoading = false, className = '', ...props }: FormProps) => {
    return (

        <form className={`${className}`} {...props}>
            {titleElement || <h2 className="text-xl font-bold mb-6 text-left text-gray-800">{title}</h2>}
            {inputs}
            {submitButton}
        </form>
    );
};

export default Form;