const cart = []

// Adicionar evento de clique aos botões "Adicionar"
const addButtons = document.querySelectorAll(".add-btn")
addButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productElement = button.parentNode
    const productName =
      productElement.querySelector(".product-name").textContent
    const priceText = productElement.querySelector(
      ".product-price span"
    ).textContent
    const price = parseFloat(
      priceText.replace("R$", "").replace(".", "").replace(",", ".")
    )
    const quantity = parseInt(productElement.querySelector(".quantity").value)

    const boxCart = document.querySelector(".box-cart")
    boxCart.style.marginRight = "0"
    addToCart(productName, price, quantity)
  })
})

// Função para adicionar produto ao carrinho
function addToCart(productName, price, quantity) {
  cart.push({ productName, price, quantity })
  updateCartDisplay()
}

// Função para formatar preço em moeda brasileira (BRL)
function formatCurrency(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

// Fechar box Cart
function closeCart() {
  const btnClose = document.querySelector(".close")
  btnClose.addEventListener("click", () => {
    const boxCart = document.querySelector(".box-cart")
    boxCart.style.marginRight = "-200vw"
  })
}
closeCart()

// Atualizar exibição do carrinho
function updateCartDisplay() {
  const cartElement = document.getElementById("cart")
  cartElement.innerHTML = ""

  let total = 0 // Variável para calcular o total

  // Exibindo todos os produtos selecionados
  for (const item of cart) {
    const itemElement = document.createElement("div")
    itemElement.textContent = `${item.productName} - Preço: ${formatCurrency(
      item.price
    )} - Qtd: ${item.quantity}`
    cartElement.appendChild(itemElement)

    // Somando ao total
    total += item.price * item.quantity
  }
  // Adicionar linha para exibir o total
  const totalElement = document.createElement("div")
  totalElement.className = "cart-total" // Adicionando a classe "cart-total"
  totalElement.innerHTML = `<strong>Total:</strong> ${formatCurrency(total)}`
  cartElement.appendChild(totalElement)
}

// Enviar pedido ao WhatsApp
function sendOrder() {
  if (cart.length === 0) {
    alert(
      // Colocar um popup de mensagem (futuramente)
      "Seu carrinho está vazio. Adicione produtos antes de enviar o pedido."
    )
    return
  }

  let message = "*Pedido:*\n\n"
  for (const item of cart) {
    message += `${item.productName}\n*Preço:* R$${item.price}\n*Quantidade:* ${item.quantity}\n\n`
  }

  const encodedMessage = encodeURIComponent(message)
  const numberWhatsApp = encodeURIComponent("+5562998152434")
  const whatsappLink = `https://wa.me/${numberWhatsApp}?text=${encodedMessage}`

  window.open(whatsappLink, "_blank")

  // Limpar carrinho
  cart.length = 0
  updateCartDisplay()
}
