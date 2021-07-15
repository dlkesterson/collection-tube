import Link from 'next/link';

export default function Nav({
    textColor = 'black',
    className = '',
    inlineStyle = {}
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
                        className={`text-xl font-extrabold uppercase tracking-tight opacity-30`}
                    >
                        offline.tube
                    </a>
                </Link>
                <div>
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
                    <Link href="/downloads">
                        <a
                            className={`mx-4 text-sm uppercase tracking-wider text-${textColor}`}
                        >
                            Downloads
                        </a>
                    </Link>
                    <Link href="/settings">
                        <a
                            className={`mx-4 text-sm uppercase tracking-wider text-${textColor}`}
                        >
                            Settings
                        </a>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
