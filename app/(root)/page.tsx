import Banner from '@/components/shared/Banner'
import BookCard from '@/components/shared/BookCard'
import { Collection } from '@/components/shared/Collection'

const Home = () => {
  return (
    <>
      <Banner />
      <Collection 
        collection_type='Recently Uploaded'
      />
      <Collection 
        collection_type='Books on Sale'
      />
      <Collection 
        collection_type='Free Books'
      />
    </>
  )
}

export default Home