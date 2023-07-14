// document.querySelector(".main__title").style.color = "green";

// let arr = ['white','green', 'red', 'blue', 'lightgreen', 'wheat', 'black'];
// let arrIterator = 1;

document.querySelector("#new-menu__btn").onclick = () => {
    // if (arrIterator >= arr.length) {
    //     arrIterator = 0;
    // }
    // document.querySelector('.main__text').style.color = arr[arrIterator];
    // arrIterator++;
    document.querySelector("#choose").scrollIntoView({behavior: "smooth"});
}

let links = document.querySelectorAll("[data-link]");

for (let el of links) {
    el.onclick = () => {
        let scroll = el.getAttribute("data-link")
        document.querySelector(`#${scroll}`).scrollIntoView({behavior: "smooth"});
    }
}

let burgers = document.querySelectorAll(".burger");

for (let el of burgers) {
    el.onclick = () => {
        document.querySelector("#order").scrollIntoView({behavior: "smooth"});
    }
}

let inputOrder = document.querySelector("#order__input-order");
let inputName = document.querySelector("#order__input-name");
let inputTel = document.querySelector("#order__input-tel");

document.querySelector("#order-action").onclick = () => {
    let hasError = false;

    [inputOrder, inputName, inputTel].forEach(item => {
        if (item.value === '') {
            item.parentElement.style.border = "1px solid red";
            item.parentElement.style.background = "transparent";
            hasError = true;
        } else {
            item.parentElement.style.border = "";
            item.parentElement.style.background = "";
        }
    });

    // лучше переделать это в попап, а то кринг
    if (!hasError) {
        [inputOrder, inputName, inputTel].forEach(item => {
            item.value = '';
        });
        alert("Спасибо за заказ! Мы скоро свяжемся с вами!");
    }
}

let prices = document.querySelectorAll(".burger__price");

document.querySelector("#change-currency").onclick = (e) => {
    let currentCurrency = e.target.innerText;
    let newCurrency = "$";
    let coefficient = 1;

    if (currentCurrency === "$") {
        newCurrency = "₽";
        coefficient = 90.03;
    } else if (currentCurrency === "₽") {
        newCurrency = "BYN";
        coefficient = 2.51;
    }

    e.target.innerText = newCurrency;

    for (let el of prices) {
        let newPrice = +(el.getAttribute("data-base-price"))*coefficient.toFixed(1);
        el.innerText = `${newPrice} ${newCurrency}`;
    }
}