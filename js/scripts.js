const url1 = "https://fakestoreapi.com/products";
const url2 = "https://dummyjson.com/products";
const url3 = "https://fakestoreapi.samuelsson.sh/products";

document.addEventListener("DOMContentLoaded",getData());

const listOfProducts = new Array();

async function getData() {
    fetch(url2)
        .then((response) => response.json())
        .then((data) => {
            const products = data.products || data;
            products.forEach((element) => listOfProducts.push(element))

            if(document.getElementById("cardrow")){
                loadHomepage();
            }
            if(document.getElementById("chosen-product")){
                loadPurchasePage();
            }
        });
}

function loadHomepage(){
    let output = "";
    listOfProducts.forEach((element) => {
        output += `
            <div class="col mb-5">
                <div class="card h-100">
                    <!-- Product image-->
                    <img class="card-img-top" src="${element.image || element.images[0]}" alt="${element.title}" height="300"/>
                    <!-- Product details-->
                    <div class="card-body p-4">
                        <div class="text-center">
                            <!-- Product name-->
                            <h5 class="fw-bolder">${element.title}</h5>
                            <!-- Product price-->
                            ${element.price} $
                        </div>
                    </div>
                    <!-- Product actions-->
                    <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center"><button onclick="getProductID(${element.id})" class="btn btn-outline-kademina mt-auto" id="${element.id}">Köp</button></div>
                    </div>
                </div>
            </div>`;
    });

    document.getElementById('cardrow').innerHTML = output;
    console.log(listOfProducts)
}

function getProductID(id){
    localStorage.setItem("productID", id)
    window.location.assign("purchase-form.html")
}

function loadPurchasePage(){
    const id = parseInt(localStorage.getItem("productID"));
    const product = listOfProducts.find((e) => e.id === id)
    console.log(product)
    const output = `
        <img class="card-img-top" style="object-fit: contain" src="${product.image || product.images[0]}" alt="${product.title}" height="400"/>
        <!-- Product details-->
        <div class="card-body p-4">
        <div class="text-center">
            <!-- Product name-->
            <h5 class="fw-bolder">${product.title}</h5>
            <p>${product.description}</p>
            <!-- Product price-->
            ${product.price} $
            </div>
        </div>`;
    document.getElementById("chosen-product").innerHTML = output;
    console.log(id)
}

document.getElementById("order").addEventListener("click", (e) => {
    e.preventDefault();

    if(validation()){
        output = `
           <h1 class="fw-bolder">Tack för din beställning!</h1>
            <p class="lead fw-normal text-white mb-0">Ordernummer: #${Math.floor(Math.random() * 1000)}</p>`;
        document.getElementById("order-text").innerHTML = output;
        document.getElementById("hiddenbox").removeAttribute("hidden");
    }
})

function validation() {
    const fName = document.getElementById('name').value;
    const fNumber = document.getElementById('number').value;
    const fEmail = document.getElementById('email').value;
    const fStreet = document.getElementById('street').value;
    const pNumber = document.getElementById('postNumber').value;
    const fRegion = document.getElementById('region').value;

    var phoneNumberExpression = /^[0-9()\-]{1,20}$/;
    var phoneRegex = new RegExp(phoneNumberExpression);

    var postNumberExpression = /^\d{3}\s?\d{2}$/;
    var postRegex = new RegExp(postNumberExpression);

    if(!fName || !fNumber || !fEmail || !fStreet || !pNumber || !fRegion){
        alert("Var god och fyll i formuläret");
        return false;
    }else if(fName.length <3 || fName.length > 50) {
        alert("Namnet måste vara minst 2 tecken och max 50 tecken");
        return false;
    }else if(!fNumber.match(phoneRegex)){
        alert("Telefonnummer får innehålla siffror, bindestreck och parenteser. Max 20 tecken.");
        return false;
    }else if(fEmail.indexOf("@") == -1 || fNumber.length > 50){
        alert("E-postadressen måste innehålla @ och max 50 tecken");
        return false;
    }else if(fStreet.length <3 || fStreet.length > 50){
        alert("Gatuadressen måste innerhålla Minst 2 tecken och Max 50 tecken");
        return false;
     }else if(!pNumber.match(postRegex)){
        alert("Postnummer måste vara exakt 5 siffror");
        return false;
    }else if(fRegion.length <3 || fRegion.length >= 20) {
        alert("Orten måste innehålla minnst 2 tecken och Max 20 tecken");
        return false;
    }

    document.getElementById('purchaseForm').reset();

    return true;
    // console.log(fName);
    // console.log(fNumber);
    // console.log(fEmail);
    // console.log(fStreet);
    // console.log(pNumber);
    // console.log(fRegion);

}