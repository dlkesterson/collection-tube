import Nav from '@/components/nav'
import Container from '@/components/container'
import ChannelForm from '@/components/channel-form'

export default function NewChannelPage() {
  return (
    <>
      <Nav title="New" />
      <Container className="w-full lg:w-2/4">
        <ChannelForm />
      </Container>
    </>
  )
}
