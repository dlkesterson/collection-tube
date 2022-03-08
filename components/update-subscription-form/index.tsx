import { useState, FormEvent } from 'react';
import Router, { useRouter } from 'next/router';

import Button from '../button';

export default function UpdateSubscriptionForm({
    id
}: {
    id: string | number;
}) {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();

    async function submitHandler(e: FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`/api/get-subscription-latest/${id}`);
            const json = await res.json();
            setSubmitting(false);
            if (!res.ok) throw Error(json.message);
            Router.push(`/subscriptions`);
        } catch (e: any) {
            throw Error(e.message);
        }
    }

    return (
        <form onSubmit={submitHandler}>
            <Button disabled={submitting} type="submit">
                {submitting ? 'Getting Latest Data...' : 'Get Latest Data'}
            </Button>
        </form>
    );
}
