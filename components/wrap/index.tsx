import { motion } from 'framer-motion';
import { ReactNode } from 'react';

const spring = {
    type: "easeIn",
    damping: 10,
    stiffness: 100,
    duration: 0.3
}

function Wrap({ className = '', inlineStyle = {}, children }: { className?: string; inlineStyle?: object; children?: ReactNode; }) {
    return (
        <motion.div
            transition={spring}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`flex flex-grow flex-col flex-nowrap justify-start items-center overflow-auto py-1 px-6${
                className ? ' ' + className : ''
            }`}
            style={inlineStyle ? inlineStyle : {}}
        >
            {children}
        </motion.div>
    );
}

export default Wrap;
