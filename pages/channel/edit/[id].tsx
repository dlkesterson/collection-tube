import Container from '@/components/container';
import Nav from '@/components/nav';
import EditChannelForm from '@/components/edit-channel-form';
import { getChannel } from '../../api/get-channel';

export default function EditChannelPage({ data }) {
	return (
		<>
			<Nav title='Edit' />
			<Container>
				<EditChannelForm data={data} />
			</Container>
		</>
	);
}
export async function getServerSideProps(context) {
	// Fetch data from external API
	console.log('id: ' + context.params.id);
	const res = await getChannel(context.params.id);
	const data = await res;

	console.log(res);

	// Pass data to the page via props
	return { props: { data } };
}
