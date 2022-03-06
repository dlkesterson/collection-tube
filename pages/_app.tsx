import '../styles/globals.css'
import '../styles/index.css';
import { ComponentClass } from 'react';

function App({ Component, pageProps }: { Component?: ComponentClass<any>; pageProps?: []}) {
    if (!Component) return null;
    return (
        <Component {...pageProps} />
    );
}

export default App;
