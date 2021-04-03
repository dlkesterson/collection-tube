import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';

import Button from '../button';

export default function EditChannelForm({ data }) {
	const [name, setName] = useState(data.name || '');
	const [channel_url, setChannelUrl] = useState(data.channel_url || '');
	const [description, setDescription] = useState(data.description || '');
	const [submitting, setSubmitting] = useState(false);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (typeof name === 'string') {
			setName(name);
		}
		if (typeof description === 'string') {
			setDescription(description);
		}
		if (typeof channel_url === 'string') {
			setChannelUrl(channel_url);
		}
	}, [name, description, channel_url]);

	async function submitHandler(e) {
		e.preventDefault();
		setSubmitting(true);
		try {
			const res = await fetch('/api/edit-channel', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id,
					name: name,
					description: description,
					channel_url: channel_url,
				}),
			});
			const json = await res.json();
			setSubmitting(false);
			if (!res.ok) throw Error(json.message);
			Router.push('/');
		} catch (e) {
			throw Error(e.message);
		}
	}

	return (
		<form onSubmit={submitHandler}>
			<Head>
				<title>{`Edit ${name}`}</title>
			</Head>
			<div className='my-4'>
				<label htmlFor='title'>
					<h3 className='font-bold'>Name</h3>
				</label>
				<input
					id='name'
					className='shadow border rounded w-full'
					type='text'
					name='name'
					value={data.name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className='my-4'>
				<label htmlFor='channel_url'>
					<h3 className='font-bold'>Channel URL</h3>
				</label>
				<input
					id='channel_url'
					className='shadow border rounded w-full'
					type='text'
					name='channel_url'
					value={data.channel_url}
					onChange={(e) => setChannelUrl(e.target.value)}
				/>
			</div>
			<div className='my-4'>
				<label htmlFor='description'>
					<h3 className='font-bold'>Description</h3>
				</label>
				<textarea
					className='shadow border resize-none focus:shadow-outline w-full h-48'
					id='description'
					name='description'
					value={data.description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<Button disabled={submitting} type='submit'>
				{submitting ? 'Saving ...' : 'Save'}
			</Button>
		</form>
	);
}
