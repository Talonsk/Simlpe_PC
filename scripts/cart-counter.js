let cartCounter = document.querySelector('.cart-counter');
let inCartButtom = document.querySelectorAll('.in-cart');
let submitOrder = document.querySelector('.submit-order');
let counter_value = 0;
let arr_assembling = [];

function Assembling(image, description, prise, id, assembling){
    this.image = image;
    this.description = description;
    this.prise = prise;
    this.id = id;    
    this.assembling = assembling;
}

if (!localStorage.getItem("assembling")){
    localStorage.setItem("assembling", JSON.stringify(arr_assembling))
}

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

    let new_assembling = new Assembling(
        inCartButtom[x].parentElement.parentElement.children[0].currentSrc,
        inCartButtom[x].parentElement.parentElement.children[1].innerText,
        inCartButtom[x].parentElement.children[0].innerText,
        inCartButtom[x].parentElement.parentElement.children[0].currentSrc.slice(-5, -4),
        1,
    );

    arr_assembling = JSON.parse(localStorage.getItem("assembling"));
    new_as_string = JSON.stringify(new_assembling);

    // var contains = arr_assembling.some(function(ele){      
    //     return JSON.stringify(ele) === new_as_string;
    // });
   
    // if (!contains){
    //     arr_assembling.push(new_assembling);
    //     localStorage.setItem("assembling", JSON.stringify(arr_assembling));
    // }

    // Тоже писал под вечер, но вроде работает, прада иногда уходит в бесконечный цикл
    for (i=0; i<=arr_assembling.length; i++){
        if  (arr_assembling.length == 0){
            arr_assembling.push(new_assembling);
            localStorage.setItem("assembling", JSON.stringify(arr_assembling));  
            return      
        }else if (arr_assembling[i].id != new_assembling.id){
            arr_assembling.push(new_assembling);
            localStorage.setItem("assembling", JSON.stringify(arr_assembling));
            return
        }else{
            arr_assembling[i].assembling += 1;
            localStorage.setItem("assembling", JSON.stringify(arr_assembling));
            return
        }
    }

}
submitOrder.addEventListener('click', function(e){
    localStorage.setItem("counter", "0");
    localStorage.setItem("assembling", JSON.stringify([]))
    cartCounter.querySelector('p').innerText = parseInt(localStorage.getItem("counter"));
    cartCounter.style.display = 'none';
})
