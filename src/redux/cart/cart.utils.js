export const addItemToCart = (cartItems, cartItemToAdd) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToAdd.id);
  // undefined if it doesnt find anything
  // map to return a new array
  if (existingCartItem) {
    return cartItems.map(cartItem => cartItem.id === cartItemToAdd.id
      ? { ...cartItem, quantity: cartItem.quantity + 1 }
      : cartItem
    )
  }
  // quantity 1 needs to be added here because if statement above doesn't run if new item is added
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const existingCartItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);
  // undefined if it doesnt find anything
  // map to return a new array
  if (existingCartItem.quantity === 1) {
    return cartItems.filter(cartItem => cartItem.id !== cartItemToRemove.id)
  }
  // quantity 1 needs to be added here because if statement above doesn't run if new item is added
  return cartItems.map(
    // Reduce the one that matches if not keep it the same
    cartItem => cartItem.id === cartItemToRemove.id ?
    { ...cartItem, quantity: cartItem.quantity - 1 }
    : cartItem
  )
}