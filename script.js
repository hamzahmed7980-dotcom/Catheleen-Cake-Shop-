const cakes = [
{ name:"Black Forest Cake", price:700, desc:"Rich chocolate sponge layered with whipped cream and cherries, topped with chocolate flakes for a classic celebration favorite loved by all ages.", img:"cake1.jpg"},
{ name:"Butterscotch Cake", price:650, desc:"Vanilla sponge with butterscotch cream and caramel crunch, finished with chips and drizzle for a sweet buttery delight.", img:"cake2.jpg"},
{ name:"Chocolate Truffle Cake", price:800, desc:"Dense chocolate layers with silky truffle ganache coating, perfect for true chocolate lovers and grand occasions.", img:"cake3.jpg"},
{ name:"Pineapple Cake", price:600, desc:"Soft vanilla sponge with pineapple cream and juicy chunks offering a light, fruity and refreshing taste.", img:"cake4.jpg"},
{ name:"Red Velvet Cake", price:900, desc:"Vibrant red sponge layered with smooth cream cheese frosting for a rich and royal dessert experience.", img:"cake5.jpg"},
{ name:"KitKat Chocolate Cake", price:950, desc:"Chocolate cake wrapped in KitKat bars and gems, fun, tasty and perfect for birthdays and kids.", img:"cake6.jpg"},
{ name:"Mango Delight Cake", price:750, desc:"Vanilla sponge blended with real mango pulp and cream, topped with mango slices for tropical flavor.", img:"cake7.jpg"},
{ name:"Strawberry Cake", price:700, desc:"Vanilla layers with strawberry cream and crush, delivering a fruity aroma and delightful sweetness.", img:"cake8.jpg"},
{ name:"Vanilla Almond Cake", price:650, desc:"Classic vanilla sponge enriched with crunchy almond flakes and smooth cream for a nutty taste.", img:"cake9.jpg"},
{ name:"Oreo Cream Cake", price:850, desc:"Chocolate sponge with Oreo crumble and cream layers, topped with cookies and chocolate drizzle.", img:"cake10.jpg"}
];

let cart = {};
let total = 0;

const container = document.getElementById("products");

cakes.forEach((cake, i) => {
  container.innerHTML += `
    <div class="cake">
      <img src="${cake.img}" style="width:100%;height:180px;object-fit:cover;border-radius:8px;">
      <h3>${cake.name}</h3>
      <p>${cake.desc}</p>
      <b>₹${cake.price} per kg</b>
      <div class="qty">
        <button onclick="decrease(${i})">-</button>
        <span id="q${i}">0</span>
        <button onclick="increase(${i})">+</button>
      </div>
    </div>
  `;
});

function increase(i){
  if(!cart[i]) cart[i]=0;
  cart[i]++;
  total += cakes[i].price;
  document.getElementById("q"+i).innerText = cart[i];
  document.getElementById("total").innerText = total;
}

function decrease(i){
  if(cart[i] && cart[i] > 0){
    cart[i]--;
    total -= cakes[i].price;
    document.getElementById("q"+i).innerText = cart[i];
    document.getElementById("total").innerText = total;
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
    if(cart[i] > 0){
      msg += `${cakes[i].name} x ${cart[i]} kg%0A`;
    }
  }

  msg += `Total: ₹${total}%0APayment: ${pay.value}`;

  if(pay.value === "UPI"){
    msg += `%0APlease send UPI QR code.`;
  }

  window.open(`https://wa.me/918100370603?text=${msg}`);
}
