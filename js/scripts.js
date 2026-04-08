const url1 = "https://fakestoreapi.com/products";
const url2 = "https://dummyjson.com/products";
const url3 = "https://fakestoreapi.samuelsson.sh/products";

document.addEventListener("DOMContentLoaded", getData());

const listOfProducts = new Array();

async function getData() {
  fetch(url2)
    .then((response) => response.json())
    .then((data) => {
      const products = data.products || data;
      products.forEach((element) => listOfProducts.push(element));

      if (document.getElementById("cardrow")) {
        loadHomepage();
      }
      if (document.getElementById("chosen-product")) {
        loadPurchasePage();
      }
      if(document.getElementById("order-text")) {
        loadConfirmationPage();
      }
    });
}

function loadHomepage() {
  let output = "";
  listOfProducts.forEach((element) => {
    output += `
            <div class="col mb-5">
                <div class="card h-100">
                    <!-- Product image-->
                    <img class="card-img-top" style="object-fit: contain" src="${element.image || element.images[0]}" alt="${element.title}" height="300"/>
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

  document.getElementById("cardrow").innerHTML = output;
  console.log(listOfProducts);
}

function getProductID(id) {
  localStorage.setItem("productID", id);
  window.location.assign("purchase-form.html");
}

function loadPurchasePage() {
  const id = parseInt(localStorage.getItem("productID"));
  const product = listOfProducts.find((e) => e.id === id);
  console.log(product);
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
  console.log(id);
}

if (document.getElementById("chosen-product")) {
  document.getElementById("order").addEventListener("click", (e) => {
    e.preventDefault();

    const fName = document.getElementById("name");
    const fNumber = document.getElementById("number");
    const fEmail = document.getElementById("email");
    const fStreet = document.getElementById("street");
    const pNumber = document.getElementById("postNumber");
    const fRegion = document.getElementById("region");

    const divName = document.getElementById("nameError");
    const divNumber = document.getElementById("phoneError");
    const divEmail = document.getElementById("emailError");
    const divStreet = document.getElementById("streetError");
    const divPost = document.getElementById("postError");
    const divRegion = document.getElementById("regionError");

    const phoneNumberExpression = /^[0-9()\-]{1,20}$/;
    const phoneRegex = new RegExp(phoneNumberExpression);

    const postNumberExpression = /^\d{3}\s?\d{2}$/;
    const postRegex = new RegExp(postNumberExpression);

    let isValidated = true;

    if (
      !fName.value ||
      !fNumber.value ||
      !fEmail.value ||
      !fStreet.value ||
      !pNumber.value ||
      !fRegion.value
    ) {
      alert("Var god och fyll i alla fält i formuläret");
    }

    if (fName.value.length < 3 || fName.value.length > 50) {
      inputHasError(fName, divName, "Ogiltigt Namn")
      isValidated = false;
    } else {
      inputIsValid(fName);
    }

    if (!fNumber.value.match(phoneRegex)) {
      inputHasError(fNumber, divNumber, "Telefonnummer får innehålla siffror, bindestreck och parenteser. Max 20 tecken.")
      isValidated = false;
    } else {
      inputIsValid(fNumber);
    }

    if (fEmail.value.indexOf("@") == -1 || fEmail.value.length > 50) {
      inputHasError(fEmail, divEmail, "E-postadressen måste innehålla @ och max 50 tecken")
      isValidated = false;
    } else {
      inputIsValid(fEmail);
    }

    if (fStreet.value.length < 3 || fStreet.value.length > 50) {
      inputHasError(fStreet, divStreet, "Gatuadressen måste innerhålla Minst 2 tecken och Max 50 tecken")
      isValidated = false;
    } else {
      inputIsValid(fStreet);
    }

    if (!pNumber.value.match(postRegex)) {
      inputHasError(pNumber, divPost, "Postnummer måste vara exakt 5 siffror")
      isValidated = false;
    } else {
      inputIsValid(pNumber);
    }

    if (fRegion.value.length < 3 || fRegion.value.length >= 20) {
      inputHasError(fRegion, divRegion, "Orten måste innehålla minnst 2 tecken och Max 20 tecken")
      isValidated = false;
    } else {
      inputIsValid(fRegion);
    }

    if (isValidated) {
        localStorage.setItem("namn", fName.value)
        localStorage.setItem("address", fStreet.value)
        localStorage.setItem("postnummer", pNumber.value)
        localStorage.setItem("ort", fRegion.value)
        localStorage.setItem("nummer", fNumber.value)
        localStorage.setItem("mail", fEmail.value)
        window.location.assign("confirmation.html");
    }
  });
}

function inputIsValid(input){
  input.classList.remove("is-invalid");
  input.classList.add("is-valid");
}

function inputHasError(inputField, errorField, errorMessage){
  inputField.classList.add("is-invalid");
  inputField.classList.remove("mb4");
  errorField.innerHTML = errorMessage;
  setTimeout(() => {errorField.innerHTML = ""; inputField.classList.add("mb-4");}, 3000);
}

function loadConfirmationPage(){
    const namn = localStorage.getItem("namn")
    const address = localStorage.getItem("address")
    const postnummer = localStorage.getItem("postnummer")
    const ort = localStorage.getItem("ort")
    const nummer = localStorage.getItem("nummer")
    const mail = localStorage.getItem("mail")

    document.getElementById("order-text").innerHTML = `
        <h1 class="fw-bolder">Tack för din beställning!</h1>
        <p class="lead fw-normal text-white mb-0">Ordernummer: #${Math.floor(Math.random() * 1000)}</p>
        <p class="text-white">
        Namn: ${namn} <br>
        Address: ${address}, ${postnummer}, ${ort} <br>
        Telefonnummer: ${nummer} <br>
        Email: ${mail} <br>
        </p>`;
    localStorage.clear();
}
