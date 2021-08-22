import { motion } from 'framer-motion'

function Wrap({ className = '', inlineStyle = {}, children }) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            className={`flex flex-grow flex-col justify-start items-center py-2 px-8${
                className ? ' ' + className : ''
            }`}
            style={inlineStyle ? inlineStyle : {}}
        >
            {children}
        </motion.div>
    );
}

export default Wrap;
