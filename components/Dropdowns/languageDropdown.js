import React, { useEffect, useState } from "react";
import { createPopper } from "@popperjs/core";
import { useRouter } from "next/router";
import { isMobile } from "react-device-detect";


const LanguagesDropdown = ({t, isMobile}) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const menuRef = React.createRef();
  const [language, setLanguage] = useState()

  useEffect(() => {
    router.locale === 'en'&& setLanguage(t('english'));
    router.locale === 'hr' && setLanguage(t('croatian'));
  }, [t])

  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const closeOnOutsideClick = (e) => {
    if(e.target.id !== 'languageDropdownHolder' && e.target.id !== 'languageButton'){
      closeDropdownPopover();
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', closeOnOutsideClick);
},
);

  const handleLocaleChange = (value) => (event) => {
    if(router.locale === value){
        return;
    }

    router.push(router.route, router.asPath, {
      locale: value,
    });
  };
  return (
    <>
      <a
      id="languageButton"
        className={`lg:hover:text-gray-300 language-dropdown ${isMobile ? 'text-black' : 'text-white'}  px-3 py-4 lg:py-2 flex items-center text-xs font-bold`}
        href="#"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
        }}
      >
         {router.locale === 'en' && ( <> <img class='md:hidden mr-2' src={'/images/flags/' + 'en' + '.svg'}  height="20px" width="20px" title="Language-flag"/>{language}</> )}
         {router.locale === 'hr' && ( <> <img class='md:hidden mr-2' src={'/images/flags/' + 'hr' + '.svg'}  height="20px" width="20px" title="Language-flag"/> {language} </> )}

      </a>
      
      <div
      id="languageDropdownHolder"
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white mt-4 ml-10 text-base z-50 top-full float-left py-2 list-none text-left rounded shadow-lg min-w-48 " + (!isMobile && '!absolute')
        }
       
      >
           {router.locales.map(element=>{
            <span
            className={
              "text-sm pt-2 pb-0 px-4 font-bold block w-full whitespace-nowrap bg-transparent text-blueGray-400"
            }
          >
            {router.locale}
          </span>
       })}
           
         {router.locales.map((element, index) => {  
                return(
                    <button className="{py-2 bg-transparent text-blueGray-700 }" onClick={handleLocaleChange(element)} >
                    <a 
                      className=
                        {`text-sm ${index > 0 && 'mr-7 ml-1'} py-2 mt-1 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700`}
                      
                    >   
                        <img src={'/images/flags/' + element + '.svg'}  height="20px" width="20px" title="Language-flag"/> 
                    </a>
                  </button>);

            
       })}
      </div>
    </>
  );
};

export default LanguagesDropdown;