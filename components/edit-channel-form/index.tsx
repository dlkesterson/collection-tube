import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';
import Head from 'next/head';

import Button from '../button';

export default function EditSubscriptionForm({ data }) {
	const [subscription_url, setSubscriptionUrl] = useState(data.subscription_url || '');
	const [submitting, setSubmitting] = useState(false);
	const router = useRouter();
	const { id } = router.query;

	useEffect(() => {
		if (typeof subscription_url === 'string') {
			setSubscriptionUrl(subscription_url);
		}
	}, [subscription_url]);

	async function submitHandler(e) {
		e.preventDefault();
		setSubmitting(true);
		try {
			const res = await fetch('/api/edit-subscription', {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id,
					subscription_url: subscription_url,
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
				<title>{`Edit ${data.name}`}</title>
			</Head>
			<h1 className='text-3xl border-b border-gray-300 py-4 my-6'>
				{`Edit ${data.name}`}
			</h1>
			<div className='my-4'>
				<label htmlFor='subscription_url'>
					<h3 className='font-bold'>Subscription URL</h3>
				</label>
				<input
					id='subscription_url'
					className='shadow border rounded w-full'
					type='text'
					name='subscription_url'
					value={data.subscription_url}
					onChange={(e) => setSubscriptionUrl(e.target.value)}
				/>
			</div>
			<Button disabled={submitting} type='submit'>
				{submitting ? 'Saving ...' : 'Save'}
			</Button>
		</form>
	);
}
