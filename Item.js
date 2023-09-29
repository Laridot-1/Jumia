import Counter from "./Counter.js"

function Item ({name, id, discount = 0, img, price, isFlipped = false, quantity = 1}) {
  return `
    <article data-id=${id} class="item">
      ${discount ? 
      `<p class="discount">-${discount}%</p>` :
      ""
      }
      <picture class="item-img">
        <img src=${img ? `${img}` : "./img/default.jpg"} alt=${name.split(" ").join("")} />
      </picture>
      <div class="item-body">
        <p class="item-name">${name}</p>
        <p class="prices">
          <span class="new-price">
            $${Math.floor(price - (price * (discount/100)))}
          </span>
          ${discount ?
            `<span class="old-price"><s>$${price}</s></span>`:
            ""
          }
        </p>
        <div class="parent">
          ${
            !isFlipped
            ? `<button class="add-item">add to cart</button>`
            : `${Counter(quantity, "item")}`
          }
        </div>
      </div>
    </article>
  `
}

export default Item
