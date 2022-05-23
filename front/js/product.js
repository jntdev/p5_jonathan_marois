//import du module basket.js pour eviter la duplication de code
import { addBasket } from "./basket.js";

let urlData = window.location.search;
let params = new URLSearchParams(urlData);
let dataId = params.get('id');

  fetch("http://localhost:3000/api/products/" + dataId)
 .then((res) => res.json())
 .then((info) => {
  if (Object.keys(info).length === 0){
    throw "info ne contient pas de données";
  }
    document.querySelector("title").innerHTML = info.name;
    document.querySelector(".item__img").innerHTML = `<img src='${info.imageUrl}' alt='${info.altTxt}'>`;
    document.querySelector("#title").innerHTML = info.name;
    document.querySelector("#price").innerHTML = info.price;
    document.querySelector("#description").innerHTML = info.description;
    //tableau pour les couleurs
    info.colors.forEach(color => {
      let option = document.createElement("option");
      option.setAttribute("value",color);
      option.innerHTML = color;
      document.querySelector("#colors").append(option);    
    });
}).catch((error) => {
  console.log('Il y a eu un problème avec l\'opération fetch: ' + error);
 });
document.getElementById('addToCart').addEventListener('click', function(){
  if(document.getElementById("colors").value != "" && document.getElementById("quantity").value < 101 && document.getElementById("quantity").value > 0){
    let basket = [];
    let product = {
     id:dataId,
     color:document.getElementById('colors').value,
     quantity:parseInt(document.getElementById('quantity').value, 10),
     unitPrice:document.querySelector("#price").textContent
    };
     
     basket.push(product);
     addBasket(product);
  }else{
    console.error("Vous n'avez pas choisi la couleur, ou la quantitée sélectionnée n'est pas valide");
  }
   
});



