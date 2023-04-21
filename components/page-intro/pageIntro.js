import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {EffectFade, Navigation, Pagination} from 'swiper';
import { useEffect, useRef, useState } from 'react';
import ProductsCarousel from '../products-featured/carousel/carousel';
import { isMobile } from 'react-device-detect';
import Link from 'next/link';

SwiperCore.use([EffectFade, Navigation, Pagination]);

const PageIntro = ({moveSlide, products, placeHolder, t}) => {
  const swiperRef = useRef(null);
  const [triggerNextProduct, setTriggerNextProduct] = useState();
  const [triggerPrevProduct, setTriggerPrevProduct] = useState();
  const [showDesktopSwiper, setShowDesktopSwiper] = useState(true);

  // useEffect(() => {
  //   if(swiperRef){
  //     const swiper = swiperRef.current.swiper;
  //     swiper.activeIndex === 0 ? swiper.slideNext() : swiper.slidePrev()
  //   }
  // }, [moveSlide]);

  useEffect(() => {
      setShowDesktopSwiper(!isMobile)
  }, [isMobile])

  return (
    <section className="page-intro mb-20">  

      <Swiper modules={[Navigation, Pagination]} pagination={{ clickable: true, enabled:true }} ref={swiperRef} autoplay={true} navigation effect="fade" className="swiper-wrapper">
        <SwiperSlide key={1}>
          <div className="page-intro__slide" style={{ backgroundImage: "url('/images/slide-1.jpg')" }}>
            <div className="container">
              <div className="page-intro__slide__content">
                <h2 className='text-white p-8 sm:p-0'>{t('front_title')}</h2>
                <Link href="/products" className="btn-shop -mt-8 pl-8 md:pl-0"><i className="icon-right"></i>{t('front_title_button')}</Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

      </Swiper>

      <div onClick={() => setTriggerNextProduct(!triggerNextProduct) } className='products-button-next'></div>
      <div onClick={() => setTriggerPrevProduct(!triggerPrevProduct) } className='products-button-prev'></div>
     
     <div className='relative'>
        <div className='shop-data h-56'>
          <div className="container md:-mt-5">
          <ProductsCarousel 
          smallImages={true}
          showButtons={!showDesktopSwiper}
          placeHolder={placeHolder} 
          products={products?.product} 
          triggerNext={triggerNextProduct} 
          triggerPrev={triggerPrevProduct} />
          </div>
        </div>
     </div>
    </section>
  )
};

export default PageIntro