import { useState } from 'react';
import Router from 'next/router';
import Button from '@/components/button';

export default function ChannelForm() {
	const [name, setName] = useState('');
	const [channel_url, setChannelUrl] = useState('');
	const [description, setDescription] = useState('');
	const [submitting, setSubmitting] = useState(false);

	async function submitHandler(e) {
		setSubmitting(true);
		e.preventDefault();
		try {
			const res = await fetch('/api/create-channel', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
					description,
					channel_url,
				}),
			});
			setSubmitting(false);
			const json = await res.json();
			if (!res.ok) throw Error(json.message);
			Router.push('/');
		} catch (e) {
			throw Error(e.message);
		}
	}

	return (
		<form onSubmit={submitHandler}>
			<div className='my-4'>
				<label htmlFor='name'>
					<h3 className='font-bold'>Name</h3>
				</label>
				<input
					id='name'
					className='shadow border rounded w-full'
					type='text'
					name='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className='my-4'>
				<label htmlFor='channel_url'>
					<h3 className='font-bold'>Channel URL (required)</h3>
				</label>
				<input
					id='channel_url'
					className='shadow border rounded w-full'
					type='text'
					name='channel_url'
					value={channel_url}
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
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>
			<Button disabled={submitting} type='submit'>
				{submitting ? 'Creating ...' : 'Create'}
			</Button>
		</form>
	);
}
