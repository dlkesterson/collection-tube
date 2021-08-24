// import '../styles/globals.css'
import '../styles/index.css';
// import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import { WebSocketDemo } from '@/components/websocket-demo';

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Component {...pageProps} />
            <WebSocketDemo />
        </>
    );
}

export default MyApp;
