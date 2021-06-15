import Container from '@/components/container';
import Nav from '@/components/nav';
import EditChannelForm from '@/components/edit-channel-form';
import { getChannel } from '../../api/get-channel';

export default function EditChannelPage({ data }) {
	return (
		<>
			<Nav />
			<Container>
				<EditChannelForm data={data} />
			</Container>
		</>
	);
}
export async function getServerSideProps(context) {
	// Fetch data from external API
	const res = await getChannel(context.params.id);
	const data = await JSON.parse(JSON.stringify(res));

	// Pass data to the page via props
	return { props: { data } };
}
