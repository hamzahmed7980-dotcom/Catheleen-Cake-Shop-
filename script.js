const cakes = [
{
name:"Black Forest Cake",
price:700,
desc:"A rich and delightful chocolate sponge layered with fresh whipped cream and juicy cherries. This classic favorite is covered with chocolate flakes and topped with bright red cherries for an elegant finish. Perfect for birthdays, anniversaries, and celebrations, this cake offers a soft texture with balanced sweetness and chocolate flavor in every bite. Prepared fresh with premium ingredients and available by kilogram for your special occasions."
},
{
name:"Butterscotch Cake",
price:650,
desc:"A smooth vanilla sponge layered generously with butterscotch cream and crunchy caramel bits. This cake delivers a sweet, buttery flavor with a light crunch that makes every bite exciting. Beautifully decorated with caramel drizzle and butterscotch chips, it is ideal for family gatherings and joyful celebrations. Made fresh and available by kg, it is loved by both kids and adults."
},
{
name:"Chocolate Truffle Cake",
price:800,
desc:"An indulgent chocolate lover’s dream made with dense chocolate sponge and layered with rich truffle ganache. Coated entirely with silky chocolate glaze, this cake melts in your mouth with every bite. Its intense chocolate flavor and smooth texture make it perfect for grand celebrations and chocolate cravings. Prepared using premium cocoa and served fresh by kg."
},
{
name:"Pineapple Cake",
price:600,
desc:"A light vanilla sponge layered with fresh pineapple cream and juicy pineapple chunks. This refreshing cake is topped with whipped cream and cherries, offering a fruity sweetness that feels delightful. Perfect for summer parties and simple celebrations, it is soft, airy, and full of tropical flavor. Available freshly prepared by kg."
},
{
name:"Red Velvet Cake",
price:900,
desc:"A luxurious red velvet sponge layered with smooth cream cheese frosting. Its vibrant color and mild cocoa flavor combined with creamy layers create a royal dessert experience. Beautifully finished with red crumbs and elegant design, this cake is perfect for special romantic occasions. Served fresh and available by kg."
},
{
name:"KitKat Chocolate Cake",
price:950,
desc:"A fun and delicious chocolate cake wrapped with KitKat bars and topped with colorful gems. Inside, soft chocolate sponge meets creamy chocolate layers creating a delightful surprise. Popular among kids and perfect for birthdays, this cake looks exciting and tastes amazing. Prepared fresh by kg for your celebrations."
},
{
name:"Mango Delight Cake",
price:750,
desc:"A seasonal favorite made with vanilla sponge, mango cream, and real mango pulp. This cake offers a refreshing tropical flavor with natural sweetness and creamy texture. Topped with mango slices and smooth cream, it is perfect for mango lovers. Available fresh by kg during mango season."
},
{
name:"Strawberry Cake",
price:700,
desc:"Soft vanilla sponge layered with fresh strawberry cream and strawberry crush. This cake brings a fruity aroma and pleasant sweetness that feels light and delightful. Decorated with whipped cream and cherries, it is perfect for birthdays and cheerful gatherings. Served fresh by kg."
},
{
name:"Vanilla Almond Cake",
price:650,
desc:"A classic vanilla sponge enriched with almond flakes and smooth vanilla cream. The nutty crunch of almonds combined with soft layers creates a rich taste experience. Ideal for traditional celebrations and tea-time desserts, this cake is simple yet delicious. Available freshly prepared by kg."
},
{
name:"Oreo Cream Cake",
price:850,
desc:"A delightful cookies and cream cake made with chocolate sponge, Oreo crumble, and fresh cream layers. Topped with Oreo biscuits and chocolate drizzle, this cake is a favorite among youngsters. Its crunchy and creamy combination makes it irresistible for parties. Prepared fresh and served by kg."
}
];

let cart = {};
let total = 0;

const container = document.getElementById("products");
container.className="products";

cakes.forEach((cake,i)=>{
    container.innerHTML += `
    <div class="cake">
        <img src="cake${i+1}.jpg" style="width:100%;height:180px;object-fit:cover;border-radius:8px;">
        <h3>${cake.name}</h3>
        <p>${cake.desc}</p>
        <b>₹${cake.price} per kg</b>
        <div class="qty">
            <button onclick="decrease(${i})">-</button>
            <span id="q${i}">0</span>
            <button onclick="increase(${i})">+</button>
        </div>
    </div>`;
        <p>${cake.desc}</p>
        <b>₹${cake.price} per kg</b>
        <div class="qty">
            <button onclick="decrease(${i})">-</button>
            <span id="q${i}">0</span>
            <button onclick="increase(${i})">+</button>
        </div>
    </div>`;
});

function increase(i){
    if(!cart[i]) cart[i]=0;
    cart[i]++;
    total += cakes[i].price;
    document.getElementById("q"+i).innerText=cart[i];
    document.getElementById("total").innerText=total;
}

function decrease(i){
    if(cart[i]>0){
        cart[i]--;
        total -= cakes[i].price;
        document.getElementById("q"+i).innerText=cart[i];
        document.getElementById("total").innerText=total;
    }
}

function placeOrder(){
    let name=document.getElementById("name").value;
    let address=document.getElementById("address").value;
    let delivery=document.getElementById("delivery").value;
    let alt=document.getElementById("altmobile").value;
    let pay=document.querySelector('input[name="pay"]:checked');

    if(!name||!address||!delivery||!alt||!pay){
        alert("Fill all details");
        return;
    }

    let msg=`Cake Order:%0AName: ${name}%0AAddress: ${address}%0ADelivery: ${delivery}%0AAlt Mobile: ${alt}%0A`;
    for(let i in cart){
        if(cart[i]>0){
            msg+=`${cakes[i].name} x ${cart[i]} kg%0A`;
        }
    }
    msg+=`Total: ₹${total}%0APayment: ${pay.value}`;

    if(pay.value==="UPI"){
        msg+=`%0APlease send UPI QR code.`;
    }

    window.open(`https://wa.me/918100370603?text=${msg}`);
}
