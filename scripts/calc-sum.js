let computerImage = document.querySelectorAll('#computer_image');
let computerDescription = document.querySelectorAll('#description');
let computerPrise = document.querySelectorAll('.prise');
let numberAssemblies = document.querySelectorAll('#quantity')
let listOfProduct = document.querySelector('.product_list');

function createPage(){
    listOfProduct.innerHTML += 
    `<div class="product">
        <div class="computer">
            <img src="../images/catalog/3.svg" alt="sborka3" id="computer_image">
            <p id="description">Сборка №3</p>
        </div>
        <div class="buttons-and-prices">
            <div class="butt">
                <button class="minus" disabled="disabled">-</button>
                <p id="quantity">1</p>
                <button class="plus">+</button>
            </div>
            <p class="prise">75 000 ₽</p>
        </div>      
    </div>`
    computerImage = document.querySelectorAll('#computer_image');
    computerDescription = document.querySelectorAll('#description');
    computerPrise = document.querySelectorAll('.prise');
    numberAssemblies = document.querySelectorAll('#quantity');
}

var Arr = JSON.parse(localStorage.getItem("assembling"));

// var computer_quantity = 1;

for (i=0; i<Arr.length; i++){
    createPage()
    // console.log("Карточка создана", i)
    var computer_prise = 
    Arr[i]
        .prise
        .slice(0, -2)
        .replace(" ", "");
    var computer_quantity = Arr[i].assembling;
    computerImage[i].src = Arr[i].image;
    computerDescription[i].innerHTML = Arr[i].description;
    computerPrise[i].innerHTML = (computer_prise * computer_quantity).toLocaleString() + '₽';  
    numberAssemblies[i].innerHTML = computer_quantity;
}

let plusButton = document.querySelectorAll('.plus');
let minusButton = document.querySelectorAll('.minus');
let cartCounter = document.querySelector('.cart-counter');

var counter_text = cartCounter.querySelector('p').innerText = parseInt(localStorage.getItem("counter"));
if (counter_text != 0){
    cartCounter.style.display = 'flex';
}

for (i=0; i<Arr.length; i++){
    plusButton[i].addEventListener('click', changeSum.bind(null, 1, i));
    minusButton[i].addEventListener('click', changeSum.bind(null, -1, i));
    if (Arr[i].assembling != 1){
        minusButton[i].disabled = false;
    }
}

function changeSum(step, x){
    // Было написано ночью, потом исправить
    cart = cartCounter.querySelector('p').innerText ;
    cartCounter.querySelector('p').innerText = parseInt(cart) + step;
    console.log(parseInt(cart) + step)
    localStorage.setItem("counter", parseInt(cart) + step);
    // Впольт до этого
    computer_quantity = Arr[x].assembling + step;
    numberAssemblies[x].innerText = computer_quantity;
    computerPrise[x].innerText = (computer_prise * computer_quantity).toLocaleString() + '₽';
    Arr[x].assembling = computer_quantity;
    localStorage.setItem("assembling", JSON.stringify(Arr))
    if (computer_quantity != 1){
        minusButton[x].disabled = false;
    }else{
        minusButton[x].disabled = true;
    }
}