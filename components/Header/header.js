import { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Logo from '../../assets/icons/logo/logo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { isMobile } from 'react-device-detect';
import LanguageDropdown from '../Dropdowns/languageDropdown';
import { useTranslation } from 'next-i18next' 

const Header = ({ isErrorPage }) => {
  const { t } = useTranslation('header')

  const router = useRouter();
  const { cartItems } = useSelector(state => state.cart);
  const arrayPaths = ['/'];
  const { searchFilter } = router.query;
  const [inputString, setInputString] = useState(searchFilter ? searchFilter : '');
  const [onTop, setOnTop] = useState((!arrayPaths.includes(router.pathname) || isErrorPage) ? false : true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navRef = useRef(null);
  const searchRef = useRef(null);
  const [mobile, setMobile] = useState();

  const handleResize = () => {
    window.innerWidth < 720 ? setSearchOpen(false) : setSearchOpen(true)
  }

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })

  const closeOnOutsideClick = (e) => {
    if (e.target.id !== 'siteNav' && e.target.id !== 'openMenuBtn' && e.target.id !== 'languageButton') {
      console.log(e.target.it)
      setMenuOpen(false);
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', closeOnOutsideClick);
  },
  );

  useEffect(() => {
    setMobile(isMobile);
  }, [])

  const handleSearchClick = () => {
    if(mobile){
      setSearchOpen(!searchOpen)
    }
    if (inputString.length > 2) {
      router.push('/products?searchFilter=' + inputString)
    }
  }

  let count = 0;
  cartItems.forEach(element => {
    count = element.count + count;
  });


  const headerClass = () => {
    if (window.pageYOffset === 0) {
      setOnTop(true);
    } else {
      setOnTop(false);
    }
  }

  useEffect(() => {
    if (!arrayPaths.includes(router.pathname) || isErrorPage) {
      return;
    }

    headerClass();
    window.onscroll = function () {
      headerClass();
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  }

  // const closeSearch = () => {
  //   setSearchOpen(false);
  // }


  const onSearchSubmit = (event) => {
    event.preventDefault();
    mobile && setSearchOpen(false);
    if (inputString.length > 2) {
      router.push('/products?searchFilter=' + inputString)
    }
  }

  const onInputChange = (e) => {
    setInputString(e.target.value);
    if (mobile) {
      return;
    }

    if (e.target.value.length > 2) {
      if (router.pathname !== '/') {
        router.replace({ query: { searchFilter: e.target.value, cid: router.query.cid } });
      }

    } else if (router.query.searchFilter) {
      {
        delete router.query.searchFilter;
        router.push(router)
      }
    }

  }

  return (
    <header className={`site-header ${!onTop ? 'site-header--fixed' : ''}`}>
      <div className="container">
        <Link href="/">
          <h1 className="site-logo hover:text-gray-400"><Logo />&nbsp; AT-Shop</h1>
        </Link>
        <nav ref={navRef} id='siteNav' className={`site-nav ${menuOpen ? 'site-nav--open' : ''}`}>

          <button onClick={closeMenu} className='md:hidden float-right top-0 text-black w-10 h-10'>
            <i class="fa-solid fa-x"></i>
          </button>

          <Link href="/products/clothing" className={`mt-10 md:!hidden ${router.pathname === '/' && 'underline decoration-orange-300 decoration-2'}`}>
            {t('home')}
          </Link>

          <Link href="/products/clothing" className={`hover:text-gray-300 ${router.query.cid === 'clothing' && 'underline decoration-orange-300 decoration-2'}`}>
          {t('clothing')}
          </Link>
          <Link href="/products/accessories" className={`hover:text-gray-300 ${router.query.cid === 'accessories' && 'underline decoration-orange-300 decoration-2'}`}>
          {t('accessories')}
          </Link>
          <Link href="/products/home-and-living" className={`hover:text-gray-300 ${router.query.cid === 'home-and-living' && 'underline decoration-orange-300 decoration-2'}`}>
          {t('home_and_living')}
          </Link>
          {/* <button className="site-nav__btn"><p>Account</p></button> */}
          {mobile &&

            <LanguageDropdown t={t} isMobile={mobile}></LanguageDropdown>
          }

        </nav>

        <div className="site-header__actions !relative">
          <button onSubmit={onSearchSubmit} ref={searchRef} className={`search-form-wrapper ${searchOpen ? 'search-form--active' : ''}`}>
            <form className={`search-form`}>
              <i className="icon-cancel" onClick={() => setSearchOpen(!searchOpen)}></i>
              <input id='searchHolder' className='border-gray hover:placeholder-gray-700' value={inputString} onChange={onInputChange} type="text" name="search" placeholder={t('type_to_search')} />
              {
                mobile &&
                <div className='top-1/2 float-right pr-14 -mt-2' style={{ position: 'relative' }}>
                  <i onClick={onSearchSubmit} class="fa-solid fa-magnifying-glass"> </i>
                </div>
              }
            </form>
            <i id='searchOpenBtn' onClick={handleSearchClick} className={`${mobile ? 'text-white' : 'text-gray-500'} icon-search hover:text-black`}></i>
          </button>

          <Link href="/cart">
            <button className="btn-cart">
              <i className="icon-cart hover:text-gray-700"></i>
              {cartItems.length > 0 &&
                <span className="btn-cart__count hover:text-gray-700">{count}</span>
              }
            </button>
          </Link>

          {!mobile &&

            <LanguageDropdown t={t} isMobile={mobile}></LanguageDropdown>
          }

          {/* <Link href="/login">
            <button className="site-header__btn-avatar"><i className="icon-avatar"></i></button>
          </Link> */}
          <button
            onClick={() => setMenuOpen(true)}
            className="site-header__btn-menu">
            <i id='openMenuBtn' className="btn-hamburger"><span></span></i>
          </button>
        </div>
      </div>
    </header>
  )
};


export default Header;
