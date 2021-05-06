import Link from 'next/link';
import Container from '@/components/container';
import ButtonLink from '@/components/button-link';

export default function Nav({ title = 'Entries' }) {
    return (
        <nav className="w-full px-4 pt-4">
            <div className="flex justify-between items-center">
                <Link href="/">
                    <a className="text-xl text-black_coffee font-extrabold uppercase tracking-tight">
                        offline.tube
                    </a>
                </Link>
                <div>
                    <ButtonLink className="mr-4" href="/channel/new">
                        Add Channel
                    </ButtonLink>
                    <Link href="/channels">
                        <a className="mx-4 text-sm uppercase tracking-wider">
                            Channels
                        </a>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
