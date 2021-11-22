import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiClock, FiDownload, FiSettings, FiYoutube } from 'react-icons/fi';

export default function Nav({
    textColor = 'black',
    className = '',
    inlineStyle = {}
}) {
    const spring = {
        type: "spring",
        damping: 10,
        stiffness: 80
    };
    const homeLinkStyle = `text-xl font-extrabold uppercase opacity-50 cursor-pointer`;
    const navLinkStyle = `flex mx-4 transition duration-500 transform hover:scale-125 cursor-pointer text-xl text-${textColor}`;

    return (
        <nav
            className={`w-full px-3 py-3 z-10${
                className ? ' ' + className : ''
            }`}
            style={inlineStyle ? inlineStyle : {}}
        >
            <div className="flex justify-between items-center">
                <Link href="/">
                    <a className={homeLinkStyle}>
                        offline.tube
                    </a>
                </Link>
                <div className="flex flex-row flex-nowrap">
                    <Link href="/channels">
                        <a className={navLinkStyle}>
                            <FiYoutube className="pointer-events-none" title="Channels" />
                        </a>
                    </Link>
                    <Link href="/videos">
                        <a className={navLinkStyle}>
                            <FiClock className="pointer-events-none" title="Latest Videos" />
                        </a>
                    </Link>
                    <Link href="/downloads">
                        <a className={navLinkStyle}>
                            <FiDownload className="pointer-events-none" title="Downloads" />
                        </a>
                    </Link>
                    <Link href="/settings">
                        <a className={navLinkStyle}>
                            <FiSettings className="pointer-events-none" title="Settings" />
                        </a>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
