import Head from 'next/head';
const ytsr = require('ytsr');
import { useRef } from 'react';

import Nav from '@/components/nav';
import Container from '@/components/container';
import ChannelForm from '@/components/channel-form';

function searchYT() {
    const inputRef = useRef(null);
    let test = {};
    const searchResults = ytsr('github').then((x) => {
        console.log(x);
        test = x;
    });

    return (
        <div>
            <input ref={inputRef} name="search"/>
        </div>
    )
}

export default function NewChannelPage() {
    return (
        <Container>
            <Head>
                <title>Add New Channel</title>
            </Head>
            <Nav />
            <h1 className="text-3xl border-b border-gray-300 py-4 my-6">
                Add New Channel
            </h1>
            <ChannelForm />
            <searchYT/>
        </Container>
    );
}
