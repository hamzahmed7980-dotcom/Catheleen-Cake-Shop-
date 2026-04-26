const cakes = [
{ name:"Black Forest Cake", price:700, img:"cake1.jpg"},
{ name:"Butterscotch Cake", price:650, img:"cake2.jpg"},
{ name:"Chocolate Truffle Cake", price:800, img:"cake3.jpg"},
{ name:"Pineapple Cake", price:600, img:"cake4.jpg"},
{ name:"Red Velvet Cake", price:900, img:"cake5.jpg"},
{ name:"KitKat Chocolate Cake", price:950, img:"cake6.jpg"},
{ name:"Mango Delight Cake", price:750, img:"cake7.jpg"},
{ name:"Strawberry Cake", price:700, img:"cake8.jpg"},
{ name:"Vanilla Almond Cake", price:650, img:"cake9.jpg"},
{ name:"Oreo Cream Cake", price:850, img:"cake10.jpg"}
];

let cart = {};
let total = 0;

const container = document.getElementById("products");

cakes.forEach((cake, i) => {
  container.innerHTML += `
    <div class="cake">
      <img src="${cake.img}">
      <h3>${cake.name}</h3>

      <select id="weight${i}">
        <option value="0.5">500g</option>
        <option value="1">1kg</option>
      </select>

      <p>₹${cake.price} per kg</p>

      <div class="qty">
        <button onclick="decrease(${i})">-</button>
        <span id="q${i}">0</span>
        <button onclick="increase(${i})">+</button>
      </div>
    </div>
  `;
});

function increase(i){
  let weight = document.getElementById("weight"+i).value;
  let price = cakes[i].price * weight;

  if(!cart[i]) cart[i]={qty:0, weight:weight};
  cart[i].qty++;
  cart[i].weight = weight;

  total += price;
  document.getElementById("q"+i).innerText = cart[i].qty;
  document.getElementById("total").innerText = total.toFixed(0);
}

function decrease(i){
  if(cart[i] && cart[i].qty > 0){
    let price = cakes[i].price * cart[i].weight;
    cart[i].qty--;
    total -= price;
    document.getElementById("q"+i).innerText = cart[i].qty;
    document.getElementById("total").innerText = total.toFixed(0);
  }
}

function placeOrder(){
  let name = document.getElementById("name").value;
  let address = document.getElementById("address").value;
  let delivery = document.getElementById("delivery").value;
  let alt = document.getElementById("altmobile").value;
  let pay = document.querySelector('input[name="pay"]:checked');

  if(!name || !address || !delivery || !alt || !pay){
    alert("Fill all details");
    return;
  }

  let msg = `Cake Order:%0AName: ${name}%0AAddress: ${address}%0ADelivery: ${delivery}%0AAlt Mobile: ${alt}%0A`;

  for(let i in cart){
    if(cart[i].qty > 0){
      msg += `${cakes[i].name} x ${cart[i].qty} (${cart[i].weight}kg)%0A`;
    }
  }

  msg += `Total: ₹${total.toFixed(0)}%0APayment: ${pay.value}`;

  if(pay.value === "UPI"){
    msg += `%0APlease send UPI QR code.`;
  }

  window.open(`https://wa.me/918100370603?text=${msg}`);
}
