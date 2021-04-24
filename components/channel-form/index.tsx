import { useState } from 'react';
import Router from 'next/router';
import Button from '@/components/button';

export default function ChannelForm() {
	const [channel_url, setChannelUrl] = useState('');
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
					channel_url,
				}),
			});
			setSubmitting(false);
			if (!res.ok) throw Error('An error occurred, please try again');
			Router.push('/channels');
		} catch (e) {
			throw Error(e.message);
		}
	}

	return (
		<form onSubmit={submitHandler}>
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
			<Button disabled={submitting} type='submit'>
				{submitting ? 'Creating ...' : 'Create'}
			</Button>
		</form>
	);
}
