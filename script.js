const products=[
 {id:1,name:"Classic Football Jersey",category:"Jerseys",price:35000,emoji:"👕"},
 {id:2,name:"Premium Match Jersey",category:"Jerseys",price:45000,emoji:"⚽"},
 {id:3,name:"Training Set",category:"Training",price:30000,emoji:"🏃"},
 {id:4,name:"Football Cap",category:"Accessories",price:12000,emoji:"🧢"},
 {id:5,name:"Performance Jersey",category:"Jerseys",price:40000,emoji:"👕"},
 {id:6,name:"Training Shorts",category:"Training",price:18000,emoji:"🩳"},
 {id:7,name:"Football Socks",category:"Accessories",price:8000,emoji:"🧦"},
 {id:8,name:"Fan Scarf",category:"Accessories",price:10000,emoji:"🧣"}
];
let cart=JSON.parse(localStorage.getItem("perezsports-cart")||"[]");

function naira(n){return "₦"+n.toLocaleString("en-NG")}
function renderProducts(list=products){
 document.getElementById("product-count").textContent=list.length+" products";
 document.getElementById("products").innerHTML=list.map(p=>`
 <article class="product">
  <div class="product-img">${p.emoji}</div>
  <div class="product-info"><p class="muted">${p.category}</p><h3>${p.name}</h3><div class="price">${naira(p.price)}</div>
  <button class="add" onclick="addToCart(${p.id})">Add to cart</button></div>
 </article>`).join("");
}
function filterProducts(cat){renderProducts(cat==="All"?products:products.filter(p=>p.category===cat));document.getElementById("shop").scrollIntoView()}
function addToCart(id){let item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});save();openCart()}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);save()}
function save(){localStorage.setItem("perezsports-cart",JSON.stringify(cart));renderCart()}
function renderCart(){
 document.getElementById("cart-count").textContent=cart.reduce((a,x)=>a+x.qty,0);
 const box=document.getElementById("cart-items");
 if(!cart.length){box.innerHTML="<p class='muted'>Your cart is empty.</p>";document.getElementById("cart-total").textContent="₦0";return}
 let total=0;
 box.innerHTML=cart.map(x=>{const p=products.find(y=>y.id===x.id);total+=p.price*x.qty;return `<div class="cart-row"><div class="mini">${p.emoji}</div><div><strong>${p.name}</strong><span>${x.qty} × ${naira(p.price)}</span><br><button class="remove" onclick="removeFromCart(${p.id})">Remove</button></div></div>`}).join("");
 document.getElementById("cart-total").textContent=naira(total);
}
function toggleCart(){document.getElementById("cart").classList.toggle("open");document.getElementById("overlay").classList.toggle("show")}
function openCart(){document.getElementById("cart").classList.add("open");document.getElementById("overlay").classList.add("show")}
function checkout(){
 if(!cart.length)return alert("Your cart is empty.");
 let message="Hello PEREZ SPORTS HUB! I want to order:%0A"+cart.map(x=>{let p=products.find(y=>y.id===x.id);return `- ${p.name} x${x.qty} (${naira(p.price*x.qty)})`}).join("%0A");
 window.open("https://wa.me/2348000000000?text="+message,"_blank");
}
renderProducts();renderCart();
