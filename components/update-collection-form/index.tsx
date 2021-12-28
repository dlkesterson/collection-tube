import { useState, useEffect, FormEvent } from 'react';
import Router, { useRouter } from 'next/router';

import Button from '../button';

export default function UpdateCollectionForm({ id }: { id: number|string; }) {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    // const { id } = router.query;

    async function submitHandler(e: FormEvent) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`/websockets/collection/${id}`);
            const json = await res.json();
            setSubmitting(false);
            if (!res.ok) throw Error(json.message);
            Router.push(`/collection/${id}`);
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
