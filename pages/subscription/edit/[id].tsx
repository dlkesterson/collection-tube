import Container from '@/components/container';
import Nav from '@/components/nav';
import EditSubscriptionForm from '@/components/edit-subscription-form';
import { getSubscription } from '@/api/get-subscription';

interface SubscriptionInterface {
	data: {
		id: number;
		name: string;
		colorprimary: string;
		avatar: string;
		subscription_url: string;
	}
}

export default function EditSubscriptionPage({ data }: SubscriptionInterface) {
	return (
		<>
			<Nav />
			<Container>
				<EditSubscriptionForm data={data} />
			</Container>
		</>
	);
}
export async function getServerSideProps(context: any) {
	// Fetch data from external API
	const res = await getSubscription(context.params.id);
	const data = await JSON.parse(JSON.stringify(res));

	// Pass data to the page via props
	return { props: { data } };
}
