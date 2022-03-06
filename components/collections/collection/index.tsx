import { useState } from 'react';
import Link from 'next/link';
import { mutate } from 'swr';

import Button from '@/components/button';
import { FiTrash2 } from 'react-icons/fi';

interface CollectionInterface {
    id: number;
    name?: string;
    subscription?: string;
}

interface DeleteButtonInterface {
    deleting: boolean;
}

function DeleteButton({ deleting }: DeleteButtonInterface) {
    if (deleting) return <p>Deleting...</p>;
    return <FiTrash2 className="text-red-300 inline" />;
}

function Collection({ id, name }: CollectionInterface) {
    const [deleting, setDeleting] = useState(false);

    async function deleteCollection() {
        setDeleting(true);
        let res = await fetch(`/api/delete-collection?id=${id}`, {
            method: 'DELETE'
        });
        let json = await res.json();
        if (!res.ok) throw Error(json.message);
        mutate('/api/get-collections');
        setDeleting(false);
    }
    return (
        <div className="bg-white shadow rounded-md p-3">
            <div className="flex items-center">
                <Link href={`/collection/${id}`}>
                    <a className="font-bold py-2">{name}</a>
                </Link>
                <div className="flex ml-4">
                    <Button
                        disabled={deleting}
                        onClick={deleteCollection}
                        className="h-6 py-0 mx-1"
                    >
                        <DeleteButton deleting={deleting} />
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default Collection;
