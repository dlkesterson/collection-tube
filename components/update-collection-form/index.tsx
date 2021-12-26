import { useState, useEffect } from 'react';
import Router, { useRouter } from 'next/router';

import Button from '../button';

export default function UpdateCollectionForm({ id }) {
    const [submitting, setSubmitting] = useState(false);
    const router = useRouter();
    // const { id } = router.query;

    async function submitHandler(e: Event) {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch(`/websockets/collection/${id}`);
            const json = await res.json();
            setSubmitting(false);
            if (!res.ok) throw Error(json.message);
            Router.push(`/collection/${id}`);
        } catch (e) {
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
