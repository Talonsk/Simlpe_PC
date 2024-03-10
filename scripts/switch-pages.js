let page1 = document.querySelector('.pc');
let page2 = document.querySelector('.pc2');
let leftButton = document.querySelector('#back');
let rightButton = document.querySelector('#next');
let currentPage = document.querySelector('.current-page')

leftButton.addEventListener('click', function(e){
    page1.style.transform = ("translateX(0%)")
    page2.style.transform = ("translateX(0%)")
    currentPage.innerHTML = '1';
    leftButton.style.backgroundColor = 'rgba(179, 235, 57, 0.4)';
    rightButton.style.backgroundColor = 'rgba(179, 235, 57, 1)';
});
rightButton.addEventListener('click', function(e){
    page1.style.transform = ("translateX(-111%)")
    page2.style.transform = ("translateX(-100%)")
    currentPage.innerHTML = '2';
    leftButton.style.backgroundColor = 'rgba(179, 235, 57, 1)';
    rightButton.style.backgroundColor = 'rgba(179, 235, 57, 0.4)';
});


