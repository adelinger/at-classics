import Link from "next/link";

const Subscribe = ({t}) => {
  return (
    <section className="subscribe">
      <div className="container">
        <div style={{backgroundImage: 'url(/images/citroen_ds.jpg)'}} className="subscribe__content">
          <h4 className='text-white'>{t('bottom_picture_title')}</h4>

          <form className="subscribe__form">
            {/* <input type="email" placeholder="Email address" /> */}
            <Link href={'/products'} className="btn btn--rounded btn--yellow hover:bg-yellow-400 text-white">{t('bottom_picture_btn')}</Link> 
          </form>
        </div>
      </div>
    </section>
  )
};


export default Subscribe