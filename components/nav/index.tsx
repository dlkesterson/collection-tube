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

    return (
        <nav
            className={`w-full px-4 py-8 z-10${
                className ? ' ' + className : ''
            }`}
            style={inlineStyle ? inlineStyle : {}}
        >
            <div className="flex justify-between items-center">
                <Link href="/">
                    <motion.a
                        transition={spring} whileHover={{ scale:1.1 }}
                        className={`text-xl font-extrabold uppercase opacity-30 cursor-pointer`}
                    >
                        offline.tube
                    </motion.a>
                </Link>
                <div className="flex flex-row flex-nowrap">
                    <Link href="/channels">
                        <motion.a
                            transition={spring} whileHover={{ scale:1.2 }}
                            className={`flex mx-4 cursor-pointer text-xl text-${textColor}`}
                        >
                            <FiYoutube title="Channels" />
                        </motion.a>
                    </Link>
                    <Link href="/videos">
                        <motion.a
                            transition={spring} whileHover={{ scale:1.2 }}
                            className={`flex mx-4 cursor-pointer text-xl text-${textColor}`}
                        >
                            <FiClock title="Latest Videos" />
                        </motion.a>
                    </Link>
                    <Link href="/downloads">
                        <motion.a
                            transition={spring} whileHover={{ scale:1.2 }}
                            className={`flex mx-4 cursor-pointer text-xl text-${textColor}`}
                        >
                            <FiDownload title="Downloads" />
                        </motion.a>
                    </Link>
                    <Link href="/settings">
                        <motion.a
                            transition={spring} whileHover={{ scale:1.2 }}
                            className={`flex mx-4 cursor-pointer text-xl text-${textColor}`}
                        >
                            <FiSettings title="Settings" />
                        </motion.a>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
