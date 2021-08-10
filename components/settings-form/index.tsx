import { useState } from 'react';
import Router from 'next/router';
import Button from '@/components/button';

export default function SettingsForm() {
	const [deleteAllRelatedDataWhenDeletingChannel, setDeleteAllRelatedDataWhenDeletingChannel] = useState('');
	const [submitting, setSubmitting] = useState(false);

	async function submitHandler(e) {
		setSubmitting(true);
		e.preventDefault();
		try {
			const res = await fetch('/api/settings', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					deleteAllRelatedDataWhenDeletingChannel,
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
			<div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md">
				<label className="flex items-center space-x-3">
					<input type="checkbox" name="checked-demo" value="1" className="form-tick appearance-none h-6 w-6 border border-gray-300 rounded-md checked:bg-blue-600 checked:border-transparent focus:outline-none"/>
					<span className="text-gray-900 font-medium">When deleting a channel, delete all related videos / thumbnail files</span>
				</label>
			</div>
			<Button disabled={submitting} type='submit'>
				{submitting ? 'Saving ...' : 'Save Changes'}
			</Button>
		</form>
	);
}
