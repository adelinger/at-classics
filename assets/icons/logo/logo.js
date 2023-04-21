import Image from "next/image";

const Logo = () => {
    return (
      <div> 
        <Image 
        src={'/images/logos/logo.png'}
        width={35}
        height={35}
        ></Image>
      </div>
    )
  };
  
  
  export default Logo