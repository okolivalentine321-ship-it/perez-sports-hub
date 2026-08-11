const products=[
 {id:1,name:"Liverpool All White",category:"Jerseys",price:null,emoji:"👕",image:"liverpool-all-white.png"},
 {id:2,name:"Manchester City White",category:"Jerseys",price:null,emoji:"👕",image:"manchester-city-white.jpg"},
 {id:3,name:"Nigeria Green Set",category:"Jerseys",price:null,emoji:"👕",image:"nigeria-green-set.jpg"},
 {id:4,name:"Real Madrid Dragon",category:"Jerseys",price:null,emoji:"👕",image:"real-madrid-dragon.jpg"},
 {id:5,name:"Kobe #24 Jersey",category:"Jerseys",price:null,emoji:"👕",image:"kobe-24-jersey.jpg"},
 {id:6,name:"Argentina White",category:"Jerseys",price:null,emoji:"👕",image:"argentina-white.jpg"},
 {id:7,name:"PSG White",category:"Jerseys",price:null,emoji:"👕",image:"psg-white.jpg"},
 {id:8,name:"Arsenal Gold",category:"Jerseys",price:null,emoji:"👕",image:"arsenal-gold.jpg"},
 {id:9,name:"Juventus Stripes",category:"Jerseys",price:null,emoji:"👕",image:"juventus-stripes.jpg"},
 {id:10,name:"Manchester United Blue",category:"Jerseys",price:null,emoji:"👕",image:"manchester-united-blue.jpg"},
 {id:11,name:"Manchester United White",category:"Jerseys",price:null,emoji:"👕",image:"manchester-united-white.jpg"},
 {id:12,name:"Barcelona Purple",category:"Jerseys",price:null,emoji:"👕",image:"barcelona-purple.jpg"},
 {id:13,name:"Barcelona Cyan",category:"Jerseys",price:null,emoji:"👕",image:"barcelona-cyan.jpg"},
 {id:14,name:"Nigeria Black & Yellow",category:"Jerseys",price:null,emoji:"👕",image:"nigeria-black-yellow.jpg"},
 {id:15,name:"Real Madrid Green",category:"Jerseys",price:null,emoji:"👕",image:"real-madrid-green.jpg"}
];
let cart=JSON.parse(localStorage.getItem("perezsports-cart")||"[]");

function naira(n){return n==null?"Price not set":"₦"+n.toLocaleString("en-NG")}
function renderProducts(list=products){
 document.getElementById("product-count").textContent=list.length+" products";
 document.getElementById("products").innerHTML=list.map(p=>`
 <article class="product">
  <div class="product-img">${p.image ? `<img src="${p.image}" alt="${p.name}">` : p.emoji}</div>
  <div class="product-info"><p class="muted">${p.category}</p><h3>${p.name}</h3><div class="price">${naira(p.price)}</div>
  <button class="add" ${p.price==null?"disabled":""} onclick="addToCart(${p.id})">${p.price==null?"Price coming soon":"Add to cart"}</button></div>
 </article>`).join("");
}
function filterProducts(cat){renderProducts(cat==="All"?products:products.filter(p=>p.category===cat));document.getElementById("shop").scrollIntoView()}
function addToCart(id){if(products.find(x=>x.id===id)?.price==null)return;let item=cart.find(x=>x.id===id);if(item)item.qty++;else cart.push({id,qty:1});save();openCart()}
function removeFromCart(id){cart=cart.filter(x=>x.id!==id);save()}
function save(){localStorage.setItem("perezsports-cart",JSON.stringify(cart));renderCart()}
function renderCart(){
 document.getElementById("cart-count").textContent=cart.reduce((a,x)=>a+x.qty,0);
 const box=document.getElementById("cart-items");
 if(!cart.length){box.innerHTML="<p class='muted'>Your cart is empty.</p>";document.getElementById("cart-total").textContent="₦0";return}
 let total=0;
 box.innerHTML=cart.map(x=>{const p=products.find(y=>y.id===x.id);total+=p.price*x.qty;return `<div class="cart-row"><div class="mini">${p.image?`<img src="${p.image}" alt="${p.name}">`:p.emoji}</div><div><strong>${p.name}</strong><span>${x.qty} × ${naira(p.price)}</span><br><button class="remove" onclick="removeFromCart(${p.id})">Remove</button></div></div>`}).join("");
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
