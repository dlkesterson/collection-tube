import { useState } from 'react';
import Router from 'next/router';
import Button from '@/components/button';

export default function SubscriptionForm() {
	const [subscription_url, setSubscriptionUrl] = useState('');
	const [submitting, setSubmitting] = useState(false);

	async function submitHandler(e: Event) {
		setSubmitting(true);
		e.preventDefault();
		try {
			const res = await fetch('/api/create-subscription', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					subscription_url,
				}),
			});
			setSubmitting(false);
			if (!res.ok) throw Error('An error occurred, please try again');
			Router.push('/subscriptions');
		} catch (e) {
			throw Error(e.message);
		}
	}

	return (
		<form onSubmit={submitHandler}>
			<div className='my-4'>
				<label htmlFor='subscription_url'>
					<h3 className='font-bold'>Subscription URL (required)</h3>
				</label>
				<input
					id='subscription_url'
					className='shadow border rounded w-full'
					type='text'
					name='subscription_url'
					value={subscription_url}
					onChange={(e) => setSubscriptionUrl(e.target.value)}
				/>
			</div>
			<Button disabled={submitting} type='submit'>
				{submitting ? 'Creating ...' : 'Create'}
			</Button>
		</form>
	);
}
