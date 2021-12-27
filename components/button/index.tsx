import cn from 'clsx';
import { ReactNode } from 'react';

type ButtonProps = {
  onClick(): void|undefined;
	disabled?: boolean;
	className?: string;
	children?: ReactNode;
};

function Button({
  onClick = console.log,
  className = '',
  children,
  disabled = false,
}: ButtonProps) {
  return (
    <button
      type={"button"}
      onClick={onClick}
      disabled={disabled}
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
