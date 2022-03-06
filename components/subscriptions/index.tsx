import Subscription from './subscription';

interface SubscriptionInterface {
    id: number;
    name: string;
    colors: string;
    avatar: string;
    subscription_url: string;
    subscription_id: string;
}
export default function Subscriptions({
    subscriptions
}: {
    subscriptions: [SubscriptionInterface];
}) {
    if (subscriptions && subscriptions.length > 0) {
        return (
            <div className="w-full">
                {subscriptions.map((c) => (
                    <div key={c.id} className="py-2">
                        <Subscription
                            subscription_id={c.subscription_id}
                            name={c.name}
                            avatar={c.avatar}
                            colors={c.colors}
                            subscription_url={c.subscription_url}
                        />
                    </div>
                ))}
            </div>
        );
    } else {
        return (
            <p className="py-2 my-8 text-center">
                No subscriptions have been added yet.
            </p>
        );
    }
}
