const Description = ({ show, product }) => {
  const style = {
    display: show ? 'flex' : 'none',
  }

  return (
    <section style={style} className="product-single__description justify-center">
      <div className="product-description-block">
        <i className="icon-cart"></i>
        <h4 className='text-black'>Product description</h4>
        <div dangerouslySetInnerHTML={{ __html: product.description }} />
      </div>  
    </section>
  );
};
  
export default Description;
    