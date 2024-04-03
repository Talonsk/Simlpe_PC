let computerImage = document.querySelectorAll('#computer_image');
let computerDescription = document.querySelectorAll('#description');
let computerPrise = document.querySelectorAll('.prise');
let numberAssemblies = document.querySelectorAll('#quantity');
let listOfProduct = document.querySelector('.product_list');

let emptySpaces = document.querySelector('.empty');
let cartCard = document.querySelector('.cart_card');
let formButtom = document.querySelector('.oformlenie')

var Arr = JSON.parse(localStorage.getItem("assembling"));
cartCard.style.display = 'none';
formButtom.style.display = 'none';

function createPage(){
    emptySpaces.style.display = 'none';
    cartCard.style.display = 'flex';
    formButtom.style.display = 'block';

    listOfProduct.innerHTML += 
    `<div class="product">
        <div class="computer">
            <img src="../images/catalog/3.svg" alt="sborka3" id="computer_image">
            <p class="sborkaname" id="description">Сборка №3</p>
        </div>
        <div class="buttons-and-prices">
            <div class="butt">
                <button class="minus" disabled="disabled"></button>
                <p class="quantity" id="quantity">1</p>
                <button class="plus"></button>
                <div class="ubrat">
                    <button class="ubratknopka"></button>
                </div>
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
let deleteButtom = document.querySelectorAll('.ubratknopka')
let cartCounter = document.querySelector('.cart-counter');

var counter_text = cartCounter.querySelector('p').innerText = parseInt(localStorage.getItem("counter"));
if (counter_text == 0){
    cartCounter.style.display = 'none';
}else{
    cartCounter.style.display = 'flex';
}
var interval = 0;
var is_min = computer_quantity <= 1;
var is_max = computer_quantity >= 99;

for (i=0; i<Arr.length; i++){
    plusButton[i].addEventListener('mousedown', longPress.bind(null, 5, i));
    minusButton[i].addEventListener('mousedown', longPress.bind(null, -5, i));

    plusButton[i].addEventListener('mouseup', (e = (interval)) => {clearInterval(interval)});
    minusButton[i].addEventListener('mouseup', (e = (interval)) => {clearInterval(interval)}); 

    plusButton[i].addEventListener('mouseout', (e = (interval)) => {clearInterval(interval)});
    minusButton[i].addEventListener('mouseout', (e = (interval)) => {clearInterval(interval)});

    plusButton[i].addEventListener('click', changeSum.bind(null, 1, i));
    minusButton[i].addEventListener('click', changeSum.bind(null, -1, i));

    deleteButtom[i].addEventListener('click', deletePage.bind(null, i))

    is_min = computer_quantity <= 1;
    is_max = computer_quantity >= 99;
    plusButton[i].disabled = is_max;
    minusButton[i].disabled = is_min;
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

    is_min = computer_quantity <= 1;
    is_max = computer_quantity >= 99;
    plusButton[x].disabled = is_max;
    minusButton[x].disabled = is_min;
}

function longPress(step, x){
    var time = 1000;
    var quantity_size = [1, 99];
    var wait = (step, x) => {
        var is_under_size = computer_quantity + step > 1;
        var is_over_size = computer_quantity + step < 99;
        if (is_under_size && is_over_size){
            changeSum(step, x);
        }else{
            changeSum(quantity_size[0+is_under_size] - computer_quantity, x);
        }
    }    
    interval = setInterval(wait.bind(null, step, x), time);
}

function deletePage(x){
    arr_assembling = JSON.parse(localStorage.getItem("assembling"));
    listOfProduct = document.querySelector('.product_list');
     
    var changed_index = 0
    if (listOfProduct.children.length > x+1){changed_index = x+1} else  changed_index = listOfProduct.children.length-1;

    product_id = listOfProduct.children[changed_index].children[0].children[0].currentSrc.slice(-5, -4)
    for (i=0; i<arr_assembling.length; i++){
        if (arr_assembling[i].id == product_id){  
            step = arr_assembling[i].assembling
            cart = parseInt(localStorage.getItem("counter")) - step;
            localStorage.setItem("counter", cart);
            cartCounter.querySelector('p').innerText = cart;  
            if (cart == 0){
                cartCounter.style.display = 'none';
            }

            arr_assembling.splice(i, 1)
            localStorage.setItem("assembling", JSON.stringify(arr_assembling));
        }
    }
    if (arr_assembling.length == 0){
        emptySpaces = document.querySelector('.empty');
        emptySpaces.style.display = 'block';
        cartCard.style.display = 'none';
        formButtom.style.display = 'none';    
    }
    listOfProduct.removeChild(listOfProduct.children[changed_index])
}