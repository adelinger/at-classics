import ProductsCarousel from './carousel/carousel';

const ProductsFeatured = ({data, placeHolder, showButtons, title}) => {

  return (
    <section className="section section-products-featured">
      <div className="container">
        <header className="section-products-featured__header">
          <h3 className='text-black'>{title}</h3>
          {/* <Link href="/products/new-arrivals" className='btn-yellow-rounded-outline'>
            Show All
            </Link> */}

        </header>

        <ProductsCarousel placeHolder={placeHolder} products={data?.product} showButtons={showButtons}/>
      </div>
    </section>
  )
};

export default ProductsFeatured