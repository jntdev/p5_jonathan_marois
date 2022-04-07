// affichage de tout les produits sur la page d accueil
let kanaps = [];
const show_kanap = ()=> {
  fetch("http://localhost:3000/api/products")
   .then((res) => res.json())
   .then((kanaps) => {
     console.log(kanaps);
     const items = document.getElementById("items");
     if (items === null){
        throw "items n'existe pas";
     }
     kanaps.forEach(kanap => {
       items.innerHTML +=`<a href="./product.html?id=${kanap._id}">    
                           <article>
                             <img src="${kanap.imageUrl}" alt="${kanap.altTxt}"/>
                             <h3 class="productName">${kanap.name}</h3>
                             <p class="productDescription">${kanap.description}</p>
                           </article>
                         </a>`
     });
   })
   .catch((error) => {
     console.log('Il y a eu un problème avec l\'opération fetch: ' + error);
    });
}
show_kanap();


