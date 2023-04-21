export const addressJsonObject = (lineItems, firstName, lastName, email, phoneNumber, country, address, 
    houseNumber, city, postalCode, region, shippingMethod,shippingPrice, sendShippingNotification, totalPrice) => {
    return {
      "line_items": lineItems,
      "totalPrice": totalPrice,
      "shipping_method": shippingMethod,
      "shipping_price": shippingPrice,
      "address_to": {
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "phone": phoneNumber,
        "country": country,
        "region": region,
        "address1": address,
        "address2": houseNumber,
        "city": city,
        "zip": postalCode,
        "send_shipping_notification": sendShippingNotification
      }
    }
  }
  