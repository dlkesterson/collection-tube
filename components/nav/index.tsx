import Link from 'next/link';
import Container from '@/components/container';
import ButtonLink from '@/components/button-link';

export default function Nav({
    title = 'Entries',
    textColor = 'black',
    className = '',
    inlineStyle
}) {
    return (
        <nav
            className={`w-full px-4 py-8 z-10${
                className ? ' ' + className : ''
            }`}
            style={inlineStyle ? inlineStyle : {}}
        >
            <div className="flex justify-between items-center">
                <Link href="/">
                    <a
                        className={`text-xl text-${textColor} font-extrabold uppercase tracking-tight`}
                    >
                        offline.tube
                    </a>
                </Link>
                <div>
                    <ButtonLink className="mr-4" href="/channel/new">
                        Add Channel
                    </ButtonLink>
                    <Link href="/channels">
                        <a
                            className={`mx-4 text-sm uppercase tracking-wider text-${textColor}`}
                        >
                            Channels
                        </a>
                    </Link>
                    <Link href="/latest">
                        <a
                            className={`mx-4 text-sm uppercase tracking-wider text-${textColor}`}
                        >
                            Latest
                        </a>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
