import ProductItem from '../../product-item/productItem';

// import Swiper core and required components
import { Swiper, SwiperSlide } from 'swiper/react';
import { imageNotAvailable } from '../../../utils/imageNotAvailable';
import { useEffect, useRef } from 'react';
import { Skeleton } from '@mui/material';
import SwiperCore, { Autoplay } from 'swiper';

let slidesPerView = 1.3;
let centeredSlides = true;
let spaceBetween = 30;
if (process.browser) {
  if (window.innerWidth > 768) {
    slidesPerView = 3;
    spaceBetween = 35;
    centeredSlides = false;
  }
  if (window.innerWidth > 1024) {
    slidesPerView = 4;
    spaceBetween = 65;
    centeredSlides = false;
  }
}


const ProductsCarousel = ({ products, placeHolder, showButtons, triggerNext, triggerPrev, smallImages }) => {
  const swiperRef = useRef(null);

  //SwiperCore.use([Autoplay]);

  useEffect( () => {
    if(swiperRef.current){
      swiperRef.current.swiper.slideNext();
    }
    
  },[triggerNext])

  useEffect( () => {
    if(swiperRef.current){
      swiperRef.current.swiper.slidePrev();
    }
  },[triggerPrev])


  if (!products) return (
    <div className="products-carousel">
      <div class="container mx-auto space-y-2 lg:space-y-0 lg:gap-2 lg:grid grid-cols-1 lg:grid-cols-4">
        {[...Array(4)].map((x, i) =>
          <div class="w-full rounded md:hover:opacity-50 md:cursor-pointer">
            <div className="product-item">
              <Skeleton variant="rectangular" width={260} height={285} />
            </div>
          </div>
        )}
      </div>
      <button className="btn-shop -ml-10"><i className="icon-left bg-amber-300"></i></button>
      <button className="btn-shop float-right"><i className="icon-right bg-amber-300"></i></button>
    </div>
  );

  return (
    <div className="products-carousel">
      <Swiper
        //autoplay={{ delay: 2000 }}
        ref={swiperRef}
        spaceBetween={spaceBetween}
        loop={true}
        centeredSlides={centeredSlides}
        watchOverflow={true}
        slidesPerView={slidesPerView}
        className="swiper-wrapper">
        {products.map(item => (
          <SwiperSlide key={item.id}>
            <ProductItem
              discount={item.discount}
              price={item.price}
              currentPrice={item.lowestPrice}
              key={item.id}
              id={item.id}
              productImage={item.featuredImageSrc ? item.featuredImageSrc : imageNotAvailable}
              name={item.title}
              placeHolder={placeHolder}
              currency={item.currency}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      {showButtons &&
      <div className='arrow-color'>
        <button onClick={() => { swiperRef.current.swiper.slidePrev() }} className="btn-shop float-left"><i className="icon-left"></i></button>
        <button onClick={() => { swiperRef.current.swiper.slideNext() }} className="btn-shop float-right"><i className="icon-right"></i></button>
      </div>
      }
      
    </div>
  )
}

export default ProductsCarousel