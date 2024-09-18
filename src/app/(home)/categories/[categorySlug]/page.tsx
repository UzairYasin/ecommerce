import Products from '@/app/components/Products';
import { client } from '../../../../../sanity/lib/client';

interface PageProps {
  params: {
    categorySlug: string;
  }
}

const Page = async ({ params }: PageProps) => {

  const categorySlug = params.categorySlug;

  const Category = async () => {
    const query = `*[_type == "category" && slug.current == "${categorySlug}"]{
      name
      }`;
    const category = await client.fetch(query, params ,{next:{revalidate: 806400}} );

    return category[0].name;
  }

  const categoryName = Category();

  return (
    <>
      <div>
        <h1 className='text-5xl text-center font-bold mt-8' >{categoryName}</h1>
      </div>

      <div className="products">

        <Products categorySlug={categorySlug} />

      </div>

    </>
  )
}

export default Page
