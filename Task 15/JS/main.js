//naming an vairble and getting an element by
let shop = document.getElementById("shop");
//setting an vairble to an value
let total = Number(localStorage.getItem("totalOfCart"));
//setting an vairble and storing it in local storage and and getting item
let basket = JSON.parse(localStorage.getItem("data")) || [];
//setting the variable snd displaying the store
let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((x) => {
      let { id, name, price, desc, img } = x;
      let search = basket.find((x) => x.id === id) || [];
      //writing the html in to display and targetinf by id
      return `
    <div id=product-id-${id} class="item">
        <img width="220" src=${img} alt="">
        <div class="details">
          <h3>${name}</h3>
          <p>${desc}</p>
          <div class="price-quantity">
            <h2>R ${price} </h2>
            <div class="buttons">
              <button onclick="decrement(${id})">REMOVE FROM CART</button>
              <div id=${id} class="quantity">
              ${search.item === undefined ? 0 : search.item}
              </div>
              <button onclick="increment(${id});addtoCart(${price})">ADD TO CART</button>
              
            </div>
          </div>
        </div>
      </div>
    `;
    })
    //settin the join so the comma wont be displayed in html
    .join(""));
};
//declaring an variable and inputing an a allert when user clicks on item the total appears
let addtoCart = (price) => {
  total += price;
  localStorage.setItem("totalOfCart", total);
  alert("Total:R" + total);
};

generateShop();
//to add to cart when user clicks buttons
let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  //creating an conditional statement
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  //updating shop items to local storage
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
//removing items fom cart
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(selectedItem.id);
  basket = basket.filter((x) => x.item !== 0);

  localStorage.setItem("data", JSON.stringify(basket));
};
//updating cart
let update = (id) => {
  let search = basket.find((x) => x.id === id);

  document.getElementById(id).innerHTML = search.item;
  calculation();
};
//calculation showing the number on sho icon
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
