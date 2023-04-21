import Link from "next/link";

const Breadcrumb = ({currentPage, previousPage}) => {

return(
<section className="breadcrumb">
<div className="container mt-10 md:!mt-0">
  <ul className="breadcrumb-list">
    <li><Link href="/"><i className="icon-home"></i></Link></li>
    <li>
      {previousPage &&
      <Link href={'/products/' + (previousPage === 'Home & Living' ? 'home-and-living' : previousPage.toLowerCase())}>{previousPage}</Link>
      }
      {!previousPage && currentPage}
      </li>
    {previousPage &&
    <li>{currentPage ? currentPage : 'Product'}</li>
    }
  </ul>
</div>
</section>
);

}
  
  



export default Breadcrumb