import { useTranslation } from "next-i18next";
import Link from "next/link";
import Logo from "../../assets/icons/logo/logo";

const Footer = () => {
  const {t} = useTranslation('footer');

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top site-footer__bottom">
          <div className="site-footer__description">
            <h6><Logo /> <p className='ml-1 font-normal'>AT-Shop</p> </h6>
            <p className='text-xs'>{t('text_1')}</p>
            <br></br>
            <p>{t('social_media_text')}</p>
            <ul className="site-footer__social-networks">
              <li><Link target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/autotonikomletinci"><i className="icon-facebook hover:text-gray-700"></i></Link></li>
              <li><Link target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/auto-toni"><i className="icon-linkedin hover:text-gray-700"></i></Link></li>
              <li><Link target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/autotoni_cro/"><i className="icon-instagram hover:text-gray-700"></i></Link></li>
              <li><Link target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/@autoservisat4230"><i className="icon-youtube-play hover:text-gray-700"></i></Link></li>
            </ul>
          </div>

          <div className="site-footer__links">
            <ul>
              <li>{t('shopping_online')}</li>
              {/* <li><a href="#">Order Status</a></li> */}
              <li><Link href="/shipping-info" >{t('shipping_and_delivery')}</Link></li>
              <li><Link href="/returns">{t('returns')}</Link></li>
              <li><Link href="/payment-options">{t('payment_options')}</Link></li>     
            </ul>
            <ul>
              <li>{t('information')}</li>
              <li><Link href="/personal-data">{t('personal_data')}</Link></li>
              <li><Link href="/terms-and-conditions">{t('terms_and_conditions')}</Link></li>
              <li><Link href="/about-us">{t('about_us')}</Link></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://autotoni.hr/en/Restorations/Projects">{t('our_restoration_projects')}</a></li>
            </ul>
            <ul>
              <li>{t('contact')}</li>
              <li><a href="#"><i class="fa-solid fa-envelope"></i> shop@at-classics.com</a></li>
              <li><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/autotonikomletinci"><i className="icon-facebook"></i>{t('facebook_message')}</a></li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="site-footer__bottom">
        <div className="container">
          <p> </p><span class="text-sm text-gray-500 flex justify-center dark:text-gray-400">
            Auto Toni ©  {new Date().getFullYear("")}<a href="#" class="hover:underline"></a>&nbsp;{t('all_rights_reserved')}
                    </span>
        </div>
      </div>
    </footer>
  )
};


export default Footer