import BookCard from '@/components/shared/BookCard'
import { Collection } from '@/components/shared/Collection'

const Home = () => {
  return (
    <main className="">
      <Collection 
        collection_type='Recently Uploaded'
      />
      <Collection 
        collection_type='Books on Sale'
      />
      <Collection 
        collection_type='Free Books'
      />
    </main>
  )
}

export default Home