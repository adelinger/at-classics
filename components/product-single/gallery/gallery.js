import Image from "next/image";
import { useEffect, useState } from "react";
import { blurImageUrl } from "../../../utils/constants/blurImageUrl";
import { imageNotAvailable } from "../../../utils/imageNotAvailable";

const Gallery = ({ images, productName, defaultImage, placeHolder }) => {
   const [featuredImage, setFeaturedImage] = useState(defaultImage);
   const [showBorder, setShowBorder] = useState(true);
   const [isImageChanging, setIsImageChanging] = useState(false );

    const onBlur = (e) => {
    let target = e.target.classList;
    target.add('transform');
    target.add('duration-500');
    target.remove('image-thumb')

    return target;
}

 useEffect(() => {
   setIsImageChanging(true)
   setFeaturedImage(defaultImage ? defaultImage : imageNotAvailable);
  },[defaultImage]);

  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        {images.map( (image, index) => (
          <div className={`${index === 0 && showBorder ? 'border-2 border-gray-200 rounded-sm border-solid' : ''}  ${image.src === featuredImage ? 'border-2 border-gray-200 rounded-sm border-solid' : ''} }`}>
            <div key={image.src} className="product-gallery__thumb w-full rounded md:hover:opacity-50 md:cursor-pointer">
              <Image 
               {...placeHolder}
              width={93} 
              height={93} 
              onLoad={(e)=> { onBlur(e)}}
              loading="lazy"
              className="image-thumb cursor-pointer"
              placeholder='blur'         
              loader={() => image.src} src={image.src}
              onClick={() => {setFeaturedImage(image.src); setShowBorder(false)}}  alt={productName + ' Image'} />
            </div>
          </div>
        ))}
      </div>

      <div className="product-gallery__image ">
        <Image
        {...placeHolder}
         width={476}
         height={476}
         loading="lazy"
         onLoad={(e)=> { onBlur(e); setIsImageChanging(false); }}
         className={`${isImageChanging ? 'image-thumb' : 'transform duration-500'}`}
         placeholder='blur'
         src={featuredImage}
         loader={() => featuredImage} alt={productName + ' Image'} />
      </div>
    </section>
  );
};
  
export default Gallery;
  