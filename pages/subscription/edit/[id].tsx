import Container from '@/components/container';
import Nav from '@/components/nav';
import EditSubscriptionForm from '@/components/edit-subscription-form';
import { getSubscription } from '@/api/get-subscription';

export default function EditSubscriptionPage({ data }) {
	return (
		<>
			<Nav />
			<Container>
				<EditSubscriptionForm data={data} />
			</Container>
		</>
	);
}
export async function getServerSideProps(context) {
	// Fetch data from external API
	const res = await getSubscription(context.params.id);
	const data = await JSON.parse(JSON.stringify(res));

	// Pass data to the page via props
	return { props: { data } };
}
