//import du module basket.js pour eviter la duplication de code
import { getBasket, changeQuantity, removeFromBasket } from "./basket.js";


let basketRows = document.querySelector("#cart__items");
let totalQuantitySpan = document.querySelector("#totalQuantity");
//déclaration de la variable en integer
let totalQuantityProduct = 0;
let totalPriceSpan =document.querySelector("#totalPrice");
//déclaration de la variable en integer
let totalbasketPrice = 0;
let basket= getBasket();
if(basket.length > 0){
    //boucle dans le panier pour récuperer tout les elements
    for(let localKanap of basket){
       totalQuantityProduct += localKanap.quantity;
       totalQuantitySpan.innerHTML = totalQuantityProduct;
    //recupération des infos de chaque produit grace à l'id présent dans le "basket"
    function displayProducts(){
      fetch("http://localhost:3000/api/products/" + localKanap.id)
            .then((res) => res.json())
            .then((ApiKanap) => {
              if (Object.keys(ApiKanap).length === 0){
                  throw "info ne contient pas de données";
              };
          //calcule du prix total du panier
              totalbasketPrice += localKanap.quantity * ApiKanap.price;
              totalPriceSpan.innerHTML = totalbasketPrice;
          //ecriture du html
              basketRows.innerHTML += 
                  `<article class="cart__item" data-id="${localKanap.id}" data-color="${localKanap.color}">
                  <div class="cart__item__img">
                    <img src="${ApiKanap.imageUrl}" alt="${ApiKanap.altTxt}">
                  </div>
                  <div class="cart__item__content">
                    <div class="cart__item__content__description">
                      <h2>${ApiKanap.name}</h2>
                      <p>${localKanap.color}</p>
                      <p>${ApiKanap.price} €</p>
                    </div>
                    <div class="cart__item__content__settings">
                      <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localKanap.quantity}">
                      </div>
                      <div class="cart__item__content__settings__delete">
                        <p class="deleteItem">Supprimer</p>
                      </div>
                    </div>
                  </div>
                </article>`
        ;}) .then(()=>{
          let deleteButtons = document.querySelectorAll('.deleteItem');
          for(let i = 0; i < deleteButtons.length; i++){
            deleteButtons[i].addEventListener("click", function(){
              removeFromBasket(localKanap);
              basketRows.innerHTML="";
              totalQuantitySpan.innerHTML = 0;
              totalPriceSpan.innerHTML= 0;
              getBasket();
              console.log("toto");
              displayProducts(); 
             });
             
          };
           
        }).catch((error) => {
            console.log('Il y a eu un problème avec l\'opération fetch: ' + error);
        });
    }
    displayProducts();
  };
}else{
  basketRows.innerHTML="";
  totalQuantitySpan.innerHTML = "";
  totalPriceSpan.innerHTML= 0;
};

