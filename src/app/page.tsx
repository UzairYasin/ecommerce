import Products from "@/app/components/Products"
import Hero from "./components/Hero"
import ShowCategories from "./categories/ShowCategories"
import CategoryProducts from "./components/CategoryProducts"
import OurBrands from "./components/OurBrands"

const page = () => {

  return (
    <>

      <Hero />

      <ShowCategories />
      
      {/* Featured Products Section */}
      <div className="heading mt-10 font-bold">
        <h2 className="lg:text-5xl md:text-4xl text-3xl text-dark text-center">Featured Products</h2>
      </div>
      <Products limit={8} />

      {/* Single Category Products */}
      <CategoryProducts category='amoled' categoryName="Amoled" />
      <CategoryProducts category='luxury' categoryName="Luxury" />
      <CategoryProducts category='round-dial' categoryName="Round Dial" />
      <CategoryProducts category='stainless-steel' categoryName="Stainless Steel" />

      <OurBrands/>

    </>
  )
}

export default page
