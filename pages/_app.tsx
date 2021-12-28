// import '../styles/globals.css'
import '../styles/index.css';
// import { AnimateSharedLayout, AnimatePresence } from 'framer-motion';
import { WebSocketDemo } from '@/components/websocket-demo';
import { ComponentClass } from 'react';

function App({ Component, pageProps }: { Component?: ComponentClass<any>; pageProps?: []}) {
    if (!Component) return null;
    return (
        <>
            <Component {...pageProps} />
            <WebSocketDemo />
        </>
    );
}

export default App;
