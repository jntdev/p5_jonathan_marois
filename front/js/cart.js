//import du module basket.js pour eviter la duplication de code
import { getBasket, changeQuantity, removeFromBasket, saveBasket } from "./basket.js";
let basketRows = document.querySelector("#cart__items");
let totalQuantitySpan = document.getElementById("totalQuantity");
let totalPriceSpan =document.querySelector("#totalPrice");



//refresh LocalStorage

let basket= getBasket();
let grandTotal = 0;
let totalQuantity = 0;
if(basket.length > 0){
    //boucle dans le panier pour récuperer tout les elements
    for(let localKanap of basket){
        //recupération des infos de chaque produit grace à l'id présent dans le "basket"
        function displayProducts(){
          fetch("http://localhost:3000/api/products/" + localKanap.id)
                .then((res) => res.json())
                .then((ApiKanap) => {
                  if (Object.keys(ApiKanap).length === 0){
                      throw "info ne contient pas de données";
                  };
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
                                    <p class="priceSpan" data-price="${ApiKanap.price}">${ApiKanap.price} €</p>
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
            ;
            return ApiKanap
            }).then((ApiKanap)=>{
                grandTotal += localKanap.quantity * ApiKanap.price;
                totalQuantity += parseInt(localKanap.quantity);
                totalPriceSpan.innerHTML = grandTotal;
                totalQuantitySpan.textContent = totalQuantity;
                console.log(ApiKanap);
                let deleteButtons = document.querySelectorAll('.deleteItem');
                for(let i = 0; i < deleteButtons.length; i++){
                    deleteButtons[i].addEventListener("click", function(e){
                         removeFromBasket(basket[i]);
                         e.currentTarget.closest("article").remove();
                         location.reload();
                    });
                };
                let elements = document.getElementsByClassName("itemQuantity");
                for (let i = 0; i < elements.length; i++) {
                    elements[i].addEventListener('click', function(e){
                        let quantity = e.currentTarget.value;
                        let thisProductId = e.currentTarget.closest("article").dataset.id;
                        let thisProductColor =e.currentTarget.closest("article").dataset.color;
                        let foundProduct = basket.find(p => p.color === thisProductColor && p.id === thisProductId);
                        console.log(foundProduct);
                        foundProduct.quantity = quantity;
                        console.log(basket);
                        saveBasket(basket);
                        location.reload();
                    });
                }
            }).catch((error) => {
                console.error('Il y a eu un problème avec l\'opération fetch: ' + error);
            });  
        };
        displayProducts();
    };
};


