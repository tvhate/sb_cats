let popupBg = document.querySelector('.popup__bg');
let popup = document.querySelector('.popup');
let openPopupButtons = document.querySelector('.header__nav-add');
let closePopupButton = document.querySelector('.close-popup');
const container = document.querySelector("main");

openPopupButtons.addEventListener('click', (e) => {
    e.preventDefault();
    popupBg.classList.add('active');
    popup.classList.add('active');
});

closePopupButton.addEventListener('click', () => {
    popupBg.classList.remove('active');
    popup.classList.remove('active');
});

document.addEventListener('click', (e) => {
    if(e.target === popupBg) {
        popupBg.classList.remove('active');
        popup.classList.remove('active');
    }
});

const createCard = function(cat, parent) {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("div");
    img.className = "card-pic";
    if (cat.img_link) {
        img.style.backgroundImage = `url(${cat.img_link})`;
    } else {
        img.style.backgroundImage = "url(img/cat.png)";
        img.style.backgroundSize = "contain";
        img.style.backgroundColor = "transparent";
    }

    const name = document.createElement("h3");
    name.innerText = cat.name;

    card.append(img, name);
    parent.append(card);
}

fetch("https://sb-cats.herokuapp.com/api/2/tvhate/show")
    .then(res => res.json())
    .then(result => {
        if (result.message === "ok") {
            console.log(result.data);
            result.data.forEach(function(el) {
                createCard(el, container);
            })
        }
    })

const addCat = function(cat) {
    fetch("https://sb-cats.herokuapp.com/api/2/tvhate/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(cat)
    })
        .then(res => res.json())
        .then(data => {
            if (data.message === "ok") {
                createCard(cat, container);
                addForm.reset();
                popupBg.classList.remove('active');
                popup.classList.remove('active');
            }
        })
}

const addForm = document.querySelector("#addForm");

addForm.addEventListener("submit", function(e) {
    e.preventDefault();
    let body = {};

    for (let i = 0; i < addForm.elements.length; i++) {
        let el = addForm.elements[i];
        console.log(el)
        if (el.name) {
            body[el.name] = el.name === "favourite" ? el.checked : el.value
        }
    }

    console.log(body);
    addCat(body);
})