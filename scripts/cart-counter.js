let cartCounter = document.querySelector('#cart_counter');
let inCartButtom = document.querySelectorAll('#in_cart');
let submitOrder = document.querySelector('#submit_order');
let counter_value = 0;

if (!localStorage.getItem("counter")){
    localStorage.setItem("counter", "0");
}else if(localStorage.getItem("counter") != "0"){
    cartCounter.querySelector('p').innerText = parseInt(localStorage.getItem("counter"));
    cartCounter.style.display = 'flex';
}

for (i=0; i<=5; i++){
    inCartButtom[i].addEventListener('click', showCartCounter.bind(null, i));
};

function showCartCounter(x){
    counter_value = parseInt(localStorage.getItem("counter"));
    localStorage.setItem("counter", counter_value + 1);
    
    cartCounter.querySelector('p').innerText = parseInt(localStorage.getItem("counter"));
    cartCounter.style.display = 'flex';
}

submitOrder.addEventListener('click', function(e){
    localStorage.setItem("counter", "0");
    cartCounter.querySelector('p').innerText = parseInt(localStorage.getItem("counter"));
    cartCounter.style.display = 'none';
})
