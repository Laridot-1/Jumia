import CartItem from "./CartItem.js"

const CartItems = (arr) => {
  return `
    ${
      arr?.length > 0 ?
        arr.map(obj => {
          return CartItem(obj)
        }).join("") :
        '<h4 class="no-item">No items in cart</h4>'
    }
  `
}

export default CartItems
