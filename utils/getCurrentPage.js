export const getCurrentPage = (currentPage) => {
  switch (currentPage) {
    case "clothing":
      return "Clothing";
    case "accessories":
      return "Accessories";
    case "home-and-living":
      return "Home & Living";
    case "new-arrivals":
      return "New arrivals";
    default:
      return null;
  }
  }
