export const addProduct = ({ thumb, variant_id, name, price, count, color, size, id, currency, otherOption, otherOptionName }) => ({
  type: 'ADD_PRODUCT',
  name,
  variant_id,
  thumb,
  price,
  count,
  color,
  size,
  id,
  currency,
  otherOption,
  otherOptionName
})

export const removeProduct = ({ color, size, id }) => ({
  type: 'REMOVE_PRODUCT',
  color,
  size,
  id
})

export const removeAllProducts = () => ({
  type: 'REMOVE_ALL_PRODUCTS',
})

export const setCount = ({ color, size, id, count }) => ({
  type: 'SET_COUNT',
  color,
  size,
  count,
  id
})