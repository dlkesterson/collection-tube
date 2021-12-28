import cn from 'clsx';
import { ReactNode } from 'react';

type ButtonProps = {
  onClick?(): Promise<void>|void|undefined;
	disabled?: boolean|number;
	className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
	children?: ReactNode;
};

function Button({
  onClick = console.log,
  className = '',
  type = 'button',
  children,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled? true : false}
      className={cn(
        'bg-black',
        'text-white',
        'p-2',
        'rounded',
        'uppercase',
        'text-sm',
        'font-bold',
        {
          [className]: Boolean(className),
        }
      )}
    >
      {children}
    </button>
  )
}

export default Button
