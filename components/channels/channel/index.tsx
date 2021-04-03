import { useState } from 'react';
import Link from 'next/link';
import { mutate } from 'swr';

import ButtonLink from '@/components/button-link';
import Button from '@/components/button';

function Channel({ id, name, description }) {
	const [deleting, setDeleting] = useState(false);

	async function deleteChannel() {
		setDeleting(true);
		let res = await fetch(`/api/delete-channel?id=${id}`, {
			method: 'DELETE',
		});
		let json = await res.json();
		if (!res.ok) throw Error(json.message);
		mutate('/api/get-channels');
		setDeleting(false);
	}
	return (
		<div className='channel shadow rounded-md p-3'>
			<div className='flex items-center'>
				<Link href={`/channel/${id}`}>
					<a className='font-bold py-2'>{name}</a>
				</Link>

				<div className='flex ml-4'>
					<ButtonLink
						href={`/channel/edit/${id}`}
						className='h-5 py-0 mx-1'>
						Edit
					</ButtonLink>
					<Button
						disabled={deleting}
						onClick={deleteChannel}
						className='h-5 py-0 mx-1'>
						{deleting ? 'Deleting ...' : 'Delete'}
					</Button>
				</div>
			</div>
			<p>{description}</p>
		</div>
	);
}

export default Channel;
