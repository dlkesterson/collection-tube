import Link from 'next/link';
import cn from 'clsx';
import { ReactNode } from 'react';

type ButtonLinkProps = {
	href: string;
	className: string;
	children?: ReactNode;
};

function ButtonLink({ href = '/', className = '', children }: ButtonLinkProps) {
	return (
		<Link href={href}>
			<a
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
				)}>
				{children}
			</a>
		</Link>
	);
}

export default ButtonLink;
