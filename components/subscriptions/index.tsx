import Subscription from './subscription';

export default function Subscriptions({ subscriptions }) {
    if (subscriptions && subscriptions.length > 0) {
        return (
            <div className="w-full">
                {subscriptions.map((c) => (
                    <div key={c.id} className="py-2">
                        <Subscription
                            id={c.id}
                            name={c.name}
                            avatar={c.avatar}
                            colorprimary={c.color_primary}
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
