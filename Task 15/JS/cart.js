//naming an variable and getting element by id
let label = document.getElementById("label");
//naming an variable and getting element by id
let shoppingCart = document.getElementById("shopping-cart");
//naming an variable an giving an value
let optionSelection = 0;
//naming an variable an giving an value
let total = 0;
//naming an variable and storing in local stoage in an empty array
let basket = JSON.parse(localStorage.getItem("data")) || [];
console.log(basket);
//naming an variable and getting item in local storage
let checkCoupon = Boolean(JSON.parse(localStorage.getItem("Coupon")));
//calculation to show number on shop icon
let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();
//generating cart items
let generateCartItems = () => {
  //naming an variable and giving it value
  let totalCartBeforeCoupon = 0;
  //naming an variable and giving it value
  let totalCartAfterCoupon = 0;
  //creating an conditional statement
  if (!checkCoupon) {
    //returning shop items in html
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        //searching for items by id
        let search = shopItemsData.find((y) => y.id === id) || [];
        //adding items after coupons
        totalCartBeforeCoupon += item * search.price;
        localStorage.setItem("totalOfCart", Number(totalCartBeforeCoupon));
        //writing html in html
        return `
      <div class="cart-item">
        <img width="100" src=${search.img} alt="" />
        <div class="details">

          <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart-item-price">R ${search.price}</p>
              </h4>
              <button onclick="removeItem(${id})">REMOVE</button>
          </div>

          <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>

          <h3>R ${item * search.price}</h3>
        </div>
      </div>
      `;
      })
      //removing comma in in html
      .join(""));
  } else if (checkCoupon) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        let { id, item } = x;
        let search = shopItemsData.find((y) => y.id === id) || [];
        totalCartAfterCoupon += item * (search.price * 0.85);
        localStorage.setItem("totalOfCart", Number(totalCartAfterCoupon));
        return `
      <div class="cart-item">
        <img width="100" src=${search.img} alt="" />
        <div class="details">

          <div class="title-price-x">
              <h4 class="title-price">
                <p>${search.name}</p>
                <p class="cart-item-price">R ${search.price * 0.85}</p>
              </h4>
              <button onclick="removeItem(${id})">REMOVE</button>
          </div>

          <div class="buttons">
              <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
              <div id=${id} class="quantity">${item}</div>
              <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>

          <h3>R ${item * (search.price * 0.85)}</h3>
        </div>
      </div>
      `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Cart is Empty</h2>
    <a href="home.html">
      <button class="HomeBtn">Back to home</button>
    </a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item -= 1;
  }
  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};
//updating the cart
let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  TotalAmount();
};
//removig items from cart
let removeItem = (id) => {
  let selectedItem = id;

  basket = basket.filter((x) => x.id !== selectedItem.id);
  generateCartItems();
  TotalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
  window.location.reload();
};
//clearing the cart
let clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.clear();
};
//calculating the total
let TotalAmount = () => {
  //options the value and get element id
  optionSelection = Number(document.getElementById("options").value);
  //setting items to local storage
  localStorage.setItem("deliveryCharges", optionSelection);
  //calculating vat
  let vat = Number(
    Number(localStorage.getItem("totalOfCart")) -
      Number(localStorage.getItem("totalOfCart")) / 1.15
  ).toFixed(2);
  //show the total of vat
  label.innerHTML = `
    <h2>Total Bill Excluding Vat : R ${Number(
      localStorage.getItem("totalOfCart") / 1.15
    ).toFixed(2)}</h2>
    <h2>Total Vat Portion : R ${vat}</h2>
    <h2>Total Delivery Costs : R ${Number(
      localStorage.getItem("deliveryCharges")
    )}</h2>
    <h2>Total Bill : R ${
      //calculating the total bill
      total +
      Number(localStorage.getItem("deliveryCharges")) +
      Number(localStorage.getItem("totalOfCart"))
    }</h2>
    <button class="checkout" onclick='Random()'>Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
    `;
};
//applying the discount
let applyDiscount = () => {
  let getCouponEntered = document.getElementById("coupecode").value;
  let amount = Number(localStorage.getItem("totalOfCart"));
  let total = 0;
  if (getCouponEntered == "ddd") {
    localStorage.setItem("Coupon", true);
    amount = amount * 0.85;
    total += amount + optionSelection;
    localStorage.setItem("totalOfCart", Number(total));
    alert("Well done you recived a 15% discount");
    window.location.reload();
  } else {
    total += amount + optionSelection;
    localStorage.setItem("totalOfCart", Number(total));
  }
};

TotalAmount();

//creating an alert when buy button is complete a random refernce number
let random = Math.random();
function Random() {
  localStorage.clear();
  window.location.reload();
  alert(random);
}
