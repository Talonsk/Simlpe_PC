let computerImage = document.querySelectorAll('#computer_image');
let computerDescription = document.querySelectorAll('#description');
let computerPrise = document.querySelectorAll('.prise');
let numberAssemblies = document.querySelectorAll('#quantity')
let listOfProduct = document.querySelector('.product_list');

var Arr = JSON.parse(localStorage.getItem("assembling"));

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

for (i=0; i<Arr.length; i++){
    createPage();
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
var interval = 0;

for (i=0; i<Arr.length; i++){
    plusButton[i].addEventListener('mousedown', longPress.bind(null, 5, i));
    minusButton[i].addEventListener('mousedown', longPress.bind(null, -5, i));

    plusButton[i].addEventListener('mouseup', (e = (interval)) => {clearInterval(interval)});
    minusButton[i].addEventListener('mouseup', (e = (interval)) => {clearInterval(interval)}); 

    plusButton[i].addEventListener('mouseout', (e = (interval)) => {clearInterval(interval)});
    minusButton[i].addEventListener('mouseout', (e = (interval)) => {clearInterval(interval)});

    plusButton[i].addEventListener('click', changeSum.bind(null, 1, i));
    minusButton[i].addEventListener('click', changeSum.bind(null, -1, i));
    if (Arr[i].assembling != 1){
        minusButton[i].disabled = false;
    }
}

function changeSum(step, x){
    cart = parseInt(localStorage.getItem("counter")) + step;
    localStorage.setItem("counter", cart);
    cartCounter.querySelector('p').innerText = cart;    

    computer_quantity = Arr[x].assembling + step;
    computer_prise = Arr[x].prise.slice(0, -2).replace(" ", "");
    numberAssemblies[x].innerText = computer_quantity;
    computerPrise[x].innerText = (computer_prise * computer_quantity).toLocaleString() + '₽';
    Arr[x].assembling = computer_quantity;
    localStorage.setItem("assembling", JSON.stringify(Arr));
    if (computer_quantity != 1){
        minusButton[x].disabled = false;
    }else{
        minusButton[x].disabled = true;
    }
}

function longPress(step, x){
    var time = 2000;
    var wait = (step, x) => {if (computer_quantity + step > 0){changeSum(step, x)}else changeSum(1 - computer_quantity, x)};    
    interval = setInterval(wait.bind(null, step, x), time);
}