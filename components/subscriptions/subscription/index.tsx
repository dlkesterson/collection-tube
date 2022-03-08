import { useState } from 'react';
import Link from 'next/link';
import { mutate } from 'swr';
import getContrast from '@/lib/getContrast';
import Button from '@/components/button';
import UpdateSubscriptionForm from '@/components/update-subscription-form';
import { FiTrash2 } from 'react-icons/fi';

interface SubscriptionInterface {
    id: number;
    name: string;
    colors: string;
    avatar: string;
    subscription_url: string;
    subscription_id: string;
}

function Subscription({
    id,
    subscription_id,
    name,
    colors,
    avatar,
    subscription_url
}: SubscriptionInterface) {
    const [deleting, setDeleting] = useState(false);

    async function deleteSubscription() {
        setDeleting(true);
        let res = await fetch(
            `/api/delete-subscription?id=${subscription_id}`,
            {
                method: 'DELETE'
            }
        );
        let json = await res.json();
        if (!res.ok) throw Error(json.message);
        mutate('/api/get-subscriptions');
        setDeleting(false);
    }
    return name && name.length > 0 ? (
        <div
            className="flex items-center justify-between flex-nowrap flex-row shadow rounded-md p-3 w-full max-w-xs"
            style={colors ? { backgroundColor: colors.split(',')[0] } : undefined}
        >
            {avatar && <img src={avatar} className="rounded-full block mr-2 h-10 w-10" alt={name} />}
            <Link href={`/subscription/${subscription_id}`}>
                <a
                    className={colors ? `font-bold py-2 text-${getContrast(
                        colors.split(',')[0]
                    )}` : `font-bold py-2`}
                >
                    {name}
                </a>
            </Link>

            <div className="flex ml-4">
                <Button
                    disabled={deleting}
                    onClick={deleteSubscription}
                    className="h-6 py-0 mx-1"
                >
                    {deleting ? (
                        'Deleting ...'
                    ) : (
                        <FiTrash2 className="text-red-300 inline" />
                    )}
                </Button>
            </div>
        </div>
    ) : (
        <div className="subscription shadow rounded-md p-3">
            <div className="flex items-center">{id}: {subscription_url}</div>
            <UpdateSubscriptionForm id={id} />
        </div>
    );
}

export default Subscription;
