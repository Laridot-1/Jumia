import items from "./data.js"
import Items from "./Items.js"
import Item from "./Item.js"
import CartItems from "./CartItems.js"
import CartItem from "./CartItem.js"

let cartItems = []

class Cart extends HTMLElement {
  constructor () {
    super()
    let shadow = this.attachShadow({mode: "open"})
    shadow.innerHTML = `
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />
      <style>@import url(./main.css);</style>
      <div class="container">
        <div class="display-items">
          <h3>Shop Online</h3>
          <section class="items">
            ${Items(items)}
          </section>
        </div>
        <section class="cart-items">
          <div class="card-heading">
            <h3>Cart Summary</h3>
            <h4 class="total"></h4>
          </div>
          <div class="cart-body">
            ${CartItems(cartItems)}
          </div>
        </section>
      </div>
    `
  }

  connectedCallback(){
    let host = this.shadowRoot
    let tot = host.querySelector(".total")
    let noItems = host.querySelector(".no-item")
    let addBtns = host.querySelectorAll(".add-item")
    let itemsContainer = host.querySelector(".items")
    let cartContainer = host.querySelector(".cart-body")

    const handleAddToCart = (e) => {
      let id = e.target.parentElement.parentElement.parentElement.dataset.id 
      let singleItem = itemsContainer.querySelector(`[data-id="${id}"]`)
      items.forEach(item => {
        if (item.id === id) {
          item.quantity = 1 
          item.isFlipped = true
        }
      })
      let itemInItems = items.find(obj => obj.id === id)
      singleItem.innerHTML = Item(itemInItems)

      cartItems.push(itemInItems)
      handleTotal()
      let temp = document.createElement("template")
      temp.innerHTML = CartItem(cartItems.at(-1))
      cartContainer.append(temp.content.cloneNode(true))
      return id
    }

    const handleIncrease = (e) => {
      let cond = e.currentTarget.parentElement
      let place = cond.dataset.place
      let item = place === "item" ? cond.parentElement.parentElement.parentElement : cond.parentElement 
      let id = item.dataset.id 
      let itemInItems = itemsContainer.querySelector(`[data-id="${id}"]`)
      let cartItem = cartContainer.querySelector(`[data-id="${id}"]`)
      let itemQuantity = itemInItems.querySelector(".quantity")
      let cartItemQuantity = cartItem.querySelector(".quantity")
      let itemDecreaseBtn = itemInItems.querySelector(".decrease")
      let cartDecreaseBtn = cartItem.querySelector(".decrease")

      itemDecreaseBtn.removeAttribute("disabled")
      cartDecreaseBtn.removeAttribute("disabled")

      items.forEach(item => {
        if (item.id === id) {
          item.quantity++
          itemQuantity.innerHTML = item.quantity 
        }
      })
      cartItems.forEach(item => {
        if (item.id === id) {
          item.quantity--
          item.quantity++
          cartItemQuantity.innerHTML = item.quantity
        }
      })
      handleTotal()

    }

    const handleDecrease = (e) => {
      let cond = e.currentTarget.parentElement
      let place = cond.dataset.place
      let item = place === "item" ? cond.parentElement.parentElement.parentElement : cond.parentElement 
      let id = item.dataset.id 
      let itemInItems = itemsContainer.querySelector(`[data-id="${id}"]`)
      let cartItem = cartContainer.querySelector(`[data-id="${id}"]`)
      let itemQuantity = itemInItems.querySelector(".quantity")
      let cartItemQuantity = cartItem.querySelector(".quantity")
      let itemDecreaseBtn = itemInItems.querySelector(".decrease")
      let cartDecreaseBtn = cartItem.querySelector(".decrease")

      items.forEach(item => {
        if (item.id === id) {
          item.quantity--
          if (item.quantity <= 1) {
            item.quantity = 1 
            itemDecreaseBtn.setAttribute("disabled", "")
          }
          itemQuantity.innerHTML = item.quantity
        }
      })
      cartItems.forEach(item => {
        if (item.id === id) {
          item.quantity++
          item.quantity--
          if (item.quantity <= 1) {
            item.quantity = 1 
            cartDecreaseBtn.setAttribute("disabled", "")
          }
          cartItemQuantity.innerHTML = item.quantity
        }
      })
      handleTotal()
    }

    const handleRemove = (e) => {
      let item = e.currentTarget.parentElement
      let id = item.dataset.id 
      let index = cartItems.findIndex(obj => obj.id === id)
      cartItems.splice(index, 1)
      cartContainer.removeChild(item)
      items.forEach(item => {
        if (item.id === id) {
          item.quantity = 1 
          item.isFlipped = false
        }
      })
      if (cartItems.length === 0) {
        noItems.style.display = "block"
      }
      handleTotal()
      let singleItem = items.find(obj => obj.id === id)
      let itemInItems = itemsContainer.querySelector(`[data-id="${id}"]`)
      itemInItems.innerHTML = Item(singleItem)
      let itemBtn = itemInItems.querySelector(".add-item")

      itemBtn.addEventListener("click", handleListener)
    }

    const handleTotal = () => {
      let total = cartItems.reduce((acc, cur) => {
        let price = cur.price
        let discount = cur.discount || 0 
        let actualPrice = Math.floor(price - (price * (discount / 100)))
        acc += cur.quantity * actualPrice
        return acc
      }, 0)
      tot.innerHTML = total ? `$${total}` : ""
    }

    const handleListener = (e) => {
      noItems.style.display = "none" 
      let id = handleAddToCart(e)

      let recentIncreaseBtns = host.querySelectorAll(`[data-id="${id}"] .increase`)
      let recentDecreaseBtns = host.querySelectorAll(`[data-id="${id}"] .decrease`)
      let recentRemoveBtns = cartContainer.querySelectorAll(`[data-id="${id}"] .remove`)

      recentIncreaseBtns.forEach(btn => {
        btn.addEventListener("click", handleIncrease)
      })

      recentDecreaseBtns.forEach(btn => {
        btn.addEventListener("click", handleDecrease)
      })

      recentRemoveBtns.forEach(btn => {
        btn.addEventListener("click", handleRemove)
      })
    }

    addBtns.forEach(addBtn => {
      addBtn.addEventListener("click", handleListener)
    })

  }

}

customElements.define("cart-", Cart)
