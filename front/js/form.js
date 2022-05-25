import {getBasket} from "./basket.js";


function showErrorMsg(errorId, nameField) {
    let errorContainer = document.getElementById(errorId);
    errorContainer.innerHTML = `le champ ${nameField} est invalide`;
  }

let form = document.querySelector(".cart__order__form");

//validator Prénom
form.firstName.addEventListener('change', function(){
    validateFirstName(this, false);
});
const validateFirstName = function(inputFirstName, fieldIsValid){
    let firstNameRegExp = /^[A-zÀ-ú-]{2,18}$/;
    
    let testFirstName = firstNameRegExp.test(inputFirstName.value);
    if(!testFirstName){
        showErrorMsg("firstNameErrorMsg", "Prénom");
    }else{
        document.getElementById("firstNameErrorMsg").innerHTML = "Champ valide !";
        fieldIsValid = true;
    }
    return fieldIsValid;
}

//validator Nom
form.lastName.addEventListener('change', function(){
    validateLastName(this, false);
});
const validateLastName = function(inputLastName, fieldIsValid){
    let lastNameRegExp = /^[A-zÀ-ú-]{2,15}$/;
    
    let testLastName = lastNameRegExp.test(inputLastName.value);
    if(!testLastName){
        showErrorMsg("lastNameErrorMsg", "Nom");
    }else{
        document.getElementById("lastNameErrorMsg").innerHTML = "Champ valide";
        fieldIsValid = true; 
    }
    return fieldIsValid;
}

//validator Ville
form.city.addEventListener('change', function(){
    validateCity(this, false);
    
});
const validateCity = function(inputCity, fieldIsValid){
    let cityRegExp = /^[A-zÀ-ú]{2,50}$/;
    let testCity = cityRegExp.test(inputCity.value);
    if(!testCity){
        showErrorMsg("cityErrorMsg", "Ville");
    }else{
        document.getElementById("cityErrorMsg").innerHTML = "Champ valide!";
        fieldIsValid = true;
    }
    return fieldIsValid;
}

//validator Adresse
form.address.addEventListener('change', function(){
    validateAddress(this, false);
});
const validateAddress = function(inputAdress, fieldIsValid){
    let addressRegExp = /^[A-zÀ-ú0-9, '-]{3,60}$/;
    let testAdress = addressRegExp.test(inputAdress.value);
    if(!testAdress){
        showErrorMsg("addressErrorMsg", "Adresse");
    }else{
        document.getElementById("addressErrorMsg").innerHTML = "Champ valide!";
        fieldIsValid = true;    
    }
    return fieldIsValid;
}
//validator email
form.email.addEventListener('change', function(){ 
    validateEmail(this, false);  
});
const validateEmail = function(inputEmail, fieldIsValid){
    let emailRegExp = new RegExp(
        /[a-zA-Z0-9_+&*-]+(?:\.[a-zA-Z0-9_+&*-]+)*@(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,24}/
    );
    let testEmail = emailRegExp.test(inputEmail.value);
    if(!testEmail){
        showErrorMsg("emailErrorMsg", "email");
    }else{
        fieldIsValid = true;
        document.getElementById("emailErrorMsg").innerHTML = "Champ valide";  
    }
    return fieldIsValid;
}

//on submit !
addEventListener("submit", function (e) {
    e.preventDefault();
    let prenom = form.firstName.value;
    let nom = form.lastName.value;
    let adresse = form.address.value;
    let ville = form.city.value;
    let email = form.email.value;
    if (
        validateFirstName &&
        validateLastName &&
        validateAddress &&
        validateCity &&
        validateEmail
    ) {      
      sendRequestToApi(createBodyRequest(prenom, nom, adresse, ville, email));
    } else {
      console.error("Tous les champs ne sont pas correctement remplis");
    }
});

function createBodyRequest(prenom, nom, adresse, ville, mail) {
  let Basket = getBasket();
  let idProducts = [];
  for (let i = 0; i < Basket.length; i++) {
    idProducts.push(Basket[i].id);
  }
  const bodyContent = {
    contact: {
      firstName: prenom,
      lastName: nom,
      address: adresse,
      city: ville,
      email: mail,
    },
    products: idProducts,
  };
  return bodyContent;
};

function sendRequestToApi(body) {
  fetch("http://localhost:3000/api/products/order", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(body)
  })
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      } else {
        console.error("une erreur est survenue lors de la commande");
      }
    })
    .then((order) => {
      if(order.orderId != ""){
        localStorage.clear();
        window.location.href = `confirmation.html?id=${order.orderId}`;
      }else{
        throw "L'order ID est vide";
      }
    }).catch((error) => {console.error(error)
    });
};