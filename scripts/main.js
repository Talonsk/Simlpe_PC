let cartCounter = document.querySelector('#cart_counter');
let inCartButtom = document.querySelectorAll('#in_cart')
let counter_value = 0

for (i=0; i<=5; i++){
    inCartButtom[i].addEventListener('click', function(e){
        counter_value += 1
        cartCounter.querySelector('p').innerText = counter_value
        cartCounter.style.display = 'flex'
        console.log(counter_value)
    }, {once: true})
};
