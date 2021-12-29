import { useState, FormEvent } from 'react';
import Router from 'next/router';
import Button from '@/components/button';

export default function CollectionForm() {
	const [name, setName] = useState('');
	const [submitting, setSubmitting] = useState(false);

	async function submitHandler(e: FormEvent) {
		setSubmitting(true);
		e.preventDefault();
		try {
			const res = await fetch('/api/create-collection', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name,
				}),
			});
			setSubmitting(false);
			if (!res.ok) throw Error('An error occurred, please try again');
			Router.push('/collections');
		} catch (e: any) {
			throw Error(e.message);
		}
	}

	return (
		<form onSubmit={submitHandler}>
			<div className='my-4'>
				<label htmlFor='name'>
					<h3 className='font-bold'>Name (required)</h3>
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
			<Button disabled={submitting} type='submit'>
				{submitting ? 'Creating ...' : 'Create'}
			</Button>
		</form>
	);
}
