import Collection from './collection';

interface CollectionInterface {
    id: number;
    name: string;
}
export default function Collections({ collections }) {
    if (collections && collections.length > 0) {
        return (
            <div className="w-full">
                {collections.map((c: CollectionInterface) => (
                    <div key={c.id} className="py-2">
                        <Collection
                            id={c.id}
                            name={c.collectionName}
                            subscription={c.subscriptionName}
                        />
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <p className="py-2 my-8 text-center">
                No collections have been added yet.
            </p>
        );
    }
}
