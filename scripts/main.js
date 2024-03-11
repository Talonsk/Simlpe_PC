let cartCounter = document.querySelector('#cart_counter');
let inCartButtom = document.querySelectorAll('#in_cart');
let counter_value = 0;

for (i=0; i<=5; i++){
    inCartButtom[i].addEventListener('click', showCartCounter.bind(null, i), {once: true});
};

function showCartCounter(x){
    counter_value += 1;
    cartCounter.querySelector('p').innerText = counter_value;
    cartCounter.style.display = 'flex';
    inCartButtom[x].style.backgroundColor = 'rgba(179, 235, 57, 0.4)';
}