import Counter from "./Counter.js"

function CartItem ({discount = 0, img, name, price, quantity = 1, id}) {
  return `
    <article data-id=${id} class="cart-item">
      <picture class="img">
        ${discount ? 
          `<p class="discount">-${discount}%</p>` :
          ""
        }
        <img src=${img ? `${img}` : "./img/default.jpg"} alt=${name.split(" ").join("")} />
      </picture>
      <p class="name">${name}</p>
      <p class="price prices">
        <span class="new-price">
          $${Math.floor(price - (price * (discount/100)))}
        </span>
        ${
          discount ? 
            `<span class="old-price"><s>$${price}</s></span>`:
            ""
        }
      </p>
      <button class="remove">
        <i class="fa-solid fa-trash"></i>
        <span>Remove</span>
      </button>
      ${Counter(quantity, "cart")} 
    </article>
  `
}

export default CartItem
