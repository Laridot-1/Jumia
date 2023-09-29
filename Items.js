import Item from "./Item.js"

const Items = (items) => {
  return `
    ${
      items.map(item => Item(item)).join("")
    }
  `
}

export default Items
