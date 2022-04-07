export function saveBasket(basket){
    localStorage.setItem("basket", JSON.stringify(basket));
};

export function getBasket(){
    let basket = localStorage.getItem("basket");
    if (basket === null){
      return [];
    } else {
      return JSON.parse(basket);
    }
};

export function addBasket(product){
   let basket = getBasket();
   let foundProduct = basket.find(p => p.color === product.color && p.id === product.id);
   
   if (foundProduct !== undefined){
     foundProduct.quantity += product.quantity;
   } else{
      basket.push(product);
   }
   saveBasket(basket);
};

export function removeFromBasket(product){
    let basket = getBasket();
    basket = basket.filter(p => !(p.color === product.color && p.id === product.id));
    saveBasket(basket);
};

export function changeQuantity(product, quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.color === product.color && p.id === product.id);
    if (foundProduct !== undefined){
       foundProduct.quantity = quantity;
      }
    saveBasket(basket);
};