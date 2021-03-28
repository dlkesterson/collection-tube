import { useRouter } from 'next/router'

import { useChannel } from '@/lib/swr-hooks'
import Container from '@/components/container'
import Nav from '@/components/nav'

export default function EditChannelPage() {
  const router = useRouter()
  const id = router.query.id?.toString()
  const { data } = useChannel(id)

  if (data) {
    return (
      <>
        <Nav title="View" />
        <Container>
          <h1 className="font-bold text-3xl my-2">{data.name}</h1>
          <p>{data.description}</p>
          <p><a href={data.channel_url} target="_blank">{data.channel_url}</a></p>
        </Container>
      </>
    )
  } else {
    return (
      <>
        <Nav title="View" />
        <Container>
          <h1 className="font-bold text-3xl my-2">...</h1>
          <p>...</p>
          <p>...</p>
        </Container>
      </>
    )
  }
}
