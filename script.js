let cart = {};
let total = 0;

function updateQty(name, price, change){
    let id = "qty-" + name;
    let qtyElement = document.getElementById(id);
    let qty = parseInt(qtyElement.innerText);

    qty += change;
    if(qty < 0) qty = 0;

    qtyElement.innerText = qty;

    cart[name] = {price:price, qty:qty};
    calculateTotal();
}

function calculateTotal(){
    total = 0;
    for(let item in cart){
        total += cart[item].price * cart[item].qty;
    }
    document.getElementById("total").innerText = "Total: ₹" + total;
}

function placeOrder(){
    let name = document.getElementById("name").value;
    let address = document.getElementById("address").value;
    let date = document.getElementById("date").value;
    let alt = document.getElementById("alt").value;
    let payment = document.querySelector('input[name="payment"]:checked').value;

    let msg = `*Catheleen Cake Order*%0A%0A`;
    msg += `Name: ${name}%0AAddress: ${address}%0ADelivery: ${date}%0AAlt No: ${alt}%0A%0AOrder:%0A`;

    for(let item in cart){
        if(cart[item].qty > 0){
            msg += `${item} x ${cart[item].qty}%0A`;
        }
    }

    msg += `%0ATotal: ₹${total}%0APayment: ${payment}`;

    window.open(`https://wa.me/918100370603?text=${msg}`);
}
