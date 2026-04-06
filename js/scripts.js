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
    });
}

function loadHomepage() {
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
      alert("const god och fyll i formuläret");
    }

    if (fName.value.length < 3 || fName.value.length > 50) {
      fName.classList.add("is-invalid");
      divName.innerHTML = "Ogiltigt Namn";
      isValidated = false;
    } else {
      fName.classList.remove("is-invalid");
      fName.classList.add("is-valid");
      divName.innerHTML = "";
    }

    if (!fNumber.value.match(phoneRegex)) {
      fNumber.classList.add("is-invalid");
      divNumber.innerHTML =
        "Telefonnummer får innehålla siffror, bindestreck och parenteser. Max 20 tecken.";
      isValidated = false;
    } else {
      fNumber.classList.remove("is-invalid");
      fNumber.classList.add("is-valid");
      divNumber.innerHTML = "";
    }

    if (fEmail.value.indexOf("@") == -1 || fNumber.value.length > 50) {
      fEmail.classList.add("is-invalid");
      divEmail.innerHTML = "E-postadressen måste innehålla @ och max 50 tecken";
      isValidated = false;
    } else {
      fEmail.classList.remove("is-invalid");
      fEmail.classList.add("is-valid");
      divEmail.innerHTML = "";
    }

    if (fStreet.value.length < 3 || fStreet.value.length > 50) {
      fStreet.classList.add("is-invalid");
      divStreet.innerHTML =
        "Gatuadressen måste innerhålla Minst 2 tecken och Max 50 tecken";
      isValidated = false;
    } else {
      fStreet.classList.remove("is-invalid");
      fStreet.classList.add("is-valid");
      divStreet.innerHTML = "";
    }

    if (!pNumber.value.match(postRegex)) {
      pNumber.classList.add("is-invalid");
      divPost.innerHTML = "Postnummer måste consta exakt 5 siffror";
      isValidated = false;
    } else {
      pNumber.classList.remove("is-invalid");
      pNumber.classList.add("is-valid");
      divPost.innerHTML = "";
    }

    if (fRegion.value.length < 3 || fRegion.value.length >= 20) {
      fRegion.classList.add("is-invalid");
      divRegion.innerHTML =
        "Orten måste innehålla minnst 2 tecken och Max 20 tecken";
      isValidated = false;
    } else {
      fRegion.classList.remove("is-invalid");
      fRegion.classList.add("is-valid");
      divRegion.innerHTML = "";
    }

    if (isValidated) {
      output = `
           <h1 class="fw-bolder">Tack för din beställning!</h1>
            <p class="lead fw-normal text-white mb-0">Ordernummer: #${Math.floor(Math.random() * 1000)}</p>`;
      document.getElementById("order-text").innerHTML = output;
      document.getElementById("hiddenbox").removeAttribute("hidden");
      document.getElementById("purchaseForm").setAttribute("hidden", true);
    }
  });
}
