function Counter (quantity = 1, cont) {
  return `
    <div class="counter" data-place=${cont}>
      <button class="btn decrease" disabled>
        <i class="fa-solid fa-minus"></i>
      </button>
      <p class="quantity">${quantity}</p>
      <button class="btn increase">
        <i class="fa-solid fa-plus"></i>
      </button>
    </div>
  `
}

export default Counter
