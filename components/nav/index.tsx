import Link from 'next/link';
import Container from '@/components/container';
import ButtonLink from '@/components/button-link';

export default function Nav({ title = 'Entries' }) {
	return (
		<nav className='w-full'>
			<div className='flex justify-between items-center'>
				<Link href='/'>
					<a className='font-bold text-3xl text-xanadu'>{title}</a>
				</Link>
				<ButtonLink href='/channel/new'>New Channel</ButtonLink>
				<Link href='/about'>
					<a className='font-bold text-3xl'>About</a>
				</Link>
				<Link href='/projects'>
					<a className='font-bold text-3xl'>Projects</a>
				</Link>
				<Link href='/contact'>
					<a className='font-bold text-3xl'>Contact</a>
				</Link>
			</div>
		</nav>
	);
}
