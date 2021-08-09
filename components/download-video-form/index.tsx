import { useState } from 'react';
import Router, { useRouter } from 'next/router';

import Button from '../button';

export default function DownloadVideoForm(downloaded) {
	// // Step 1: start the fetch and obtain a reader
	// let response = await fetch('https://api.github.com/repos/javascript-tutorial/en.javascript.info/commits?per_page=100');

	// const reader = response.body.getReader();

	// // Step 2: get total length
	// const contentLength = +response.headers.get('Content-Length');

	// // Step 3: read the data
	// let receivedLength = 0; // received that many bytes at the moment
	// let chunks = []; // array of received binary chunks (comprises the body)
	// while(true) {
	// const {done, value} = await reader.read();

	// if (done) {
	// 	break;
	// }

	// chunks.push(value);
	// receivedLength += value.length;

	// console.log(`Received ${receivedLength} of ${contentLength}`)
	// }

	// // Step 4: concatenate chunks into single Uint8Array
	// let chunksAll = new Uint8Array(receivedLength); // (4.1)
	// let position = 0;
	// for(let chunk of chunks) {
	// chunksAll.set(chunk, position); // (4.2)
	// position += chunk.length;
	// }

	// // Step 5: decode into a string
	// let result = new TextDecoder("utf-8").decode(chunksAll);

	// // We're done!
	// let commits = JSON.parse(result);
	// alert(commits[0].author.login);


	const [submitting, setSubmitting] = useState(false);
	const [buttonText, setButtonText] = useState(downloaded ? 'Downloaded' : 'Download Video');
	const router = useRouter();
	const { id } = router.query;

	async function submitHandler(e) {
		e.preventDefault();
		setSubmitting(true);
		setButtonText(`Downloading Video (id: ${id})`);
		
		const res = await fetch(`/api/download-video/${id}`);

		setSubmitting(false);
		setButtonText('Downloaded!');
		if (!res.ok) throw Error('no good');
		Router.push(`/video/${id}`);
		
	}

	return (
		<form onSubmit={submitHandler}>
			<Button disabled={submitting||downloaded} type='submit'>
				{buttonText}
			</Button>
		</form>
	);
}
