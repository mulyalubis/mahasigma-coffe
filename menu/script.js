const listSlider = document.querySelector('.list-slider')
const sliderItems = document.querySelectorAll('.slider-item')
const sliderBtnPrev = document.querySelector('.btn-prev')
const sliderBtnNext = document.querySelector('.btn-next')



let currentSlide = 0
let lastActiveSlideItem = sliderItems[0]

const updateSlide = () => {
    lastActiveSlideItem.classList.remove('active')
    sliderItems[currentSlide].classList.add('active')
    lastActiveSlideItem = sliderItems[currentSlide]
}

const slideNext = () => {
    if(currentSlide >= sliderItems.length - 1) {
        currentSlide = 0
    } else {
        currentSlide++
    }

    updateSlide()
}

sliderBtnNext.addEventListener('click', slideNext)

const slidePrev = () => {
    if(currentSlide <= 0) {
        currentSlide = sliderItems.length - 1
    } else {
        currentSlide--
    }

    updateSlide()
}

sliderBtnPrev.addEventListener('click', slidePrev)


// auto slide

let autoSlideInterval

const autoSlide = () => {
    autoSlideInterval = setInterval(() => {
        slideNext()
    }, 4500)
}


window.addEventListener('load', autoSlide)




// preview menu

const previewMenu = document.querySelector('.product-preview')
const previewCard = previewMenu.querySelectorAll('.preview')

let product = document.querySelectorAll('.items .menu .card-menu')

product.forEach( (card) => {
    card.addEventListener('click', () => {
        previewMenu.style.display = 'flex'
        let name = card.getAttribute('data-name')
        previewCard.forEach( (preview) => {
            let target = preview.getAttribute('data-target')
            if (name == target) {
                preview.classList.add('active')
            }
        })
    })
} )



previewCard.forEach( (close) => {
    close.querySelector('.fa-solid').addEventListener('click', () => {
        close.classList.remove('active')
        previewMenu.style.display = 'none'
    })
})
// akhir preview menu


// filter items

const indicator = document.querySelectorAll('.indicator li')
const main = document.querySelectorAll('.menu .card-menu')

indicator.forEach( (indi) => {
    indi.addEventListener('click', () => {
        indicator.forEach( (i) => {
            i.classList.remove('active')
        })
        indi.classList.add('active')
        const displayItems = indi.getAttribute('data-filter')
        main.forEach( (m) => {
            m.style.display = 'none'
            if (m.getAttribute('data-category') == displayItems) {
                m.style.display = 'block'
            }
        })
        
    })
})

// akhir filter

// add card belanja
const openShopping =  document.querySelector('.open-shopping')
const closeShopping =  document.querySelector('.close-shopping')
const cardShopping =  document.querySelector('.card-shopping')
let count = 1
const maxCount = 30
const btnTambah = document.querySelector('.plus')
const btnKurang = document.querySelector('.mines')
const nilai = document.querySelector('.jumlah p')


openShopping.addEventListener('click', () => {
    cardShopping.classList.add('active')
})

closeShopping.addEventListener('click', () => {
    cardShopping.classList.remove('active')
})


document.addEventListener('DOMContentLoaded', ready)

function ready() {
    let removeCardButtons = document.querySelectorAll('.fa-trash')
    removeCardButtons.forEach(button => {
        button.addEventListener('click', removeCardProduct)
    });

    let jumlahInputs = document.querySelectorAll('.jumlah')
    jumlahInputs.forEach(input => {
        input.addEventListener('change', quantityChanged)
    });

    let addCard = document.querySelectorAll('.btn-product p')
    addCard.forEach( (add) => {
        add.addEventListener('click', addCardClicked)
    })

    let btnBuy = document.querySelectorAll('.btn-buy')
    btnBuy.forEach( (btn) => {
        btn.addEventListener('click', buyButtonClicked)
    })
}

async function buyButtonClicked() {
    const cardProducts = document.querySelectorAll('.card-product');
    let items = [];
    cardProducts.forEach(cardProduct => {
        let title = cardProduct.querySelector('.name-product').innerText;
        let price = parseFloat(cardProduct.querySelector('.price').innerText.replace('Rp', '').replace(',', '').trim());
        let quantity = parseInt(cardProduct.querySelector('.jumlah p').innerText);

        items.push({
            id: title,
            price: price,
            quantity: quantity
        });
    });

    try {
        const response = await fetch('../php/index.php', {
                method: 'POST',
                body: JSON.stringify({ items: items }),
            })
        const token = await response.text()
        window.snap.pay(token)
        // console.log(token)
    } catch (err) {
        console.log(err.message)
    }

    let cardContent = document.querySelector('.list-card-shopping');
    while (cardContent.firstChild) {
        cardContent.removeChild(cardContent.firstChild);
    }
    updateTotal();
    updateTotalQuantity();
}



function removeCardProduct(event) {
    const buttonClicked = event.target
    buttonClicked.parentElement.remove()
    updateTotal()
    updateTotalQuantity()
}

function quantityChanged(event) {
    let input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateTotal()
    updateTotalQuantity()
}

function addCardClicked(event) {
    let button = event.target
    let shopProduct = button.parentElement.parentElement
    let title = shopProduct.querySelector('.name-preview').innerText
    let price = shopProduct.querySelector('.harga-product').innerText
    let imagesProduct = shopProduct.querySelector('img').src
    addProductToCardShopping(title, price, imagesProduct)
    updateTotal()
    updateTotalQuantity()
}

function addProductToCardShopping(title, price, imagesProduct) {
    // Membuat elemen produk secara dinamis
    let cardShow = document.createElement('div')
    cardShow.classList.add('card-product')
    
    let cardShowContainer = document.querySelector('.list-card-shopping')
    
    // Konten HTML untuk produk yang ditambahkan
    let cardAddShopping = `
        <img src="${imagesProduct}" alt="Product Image">
        <div class="detail-product">
            <p class="name-product">${title}</p>
            <p class="price">${price}</p>
            <div class="jumlah">
                <button class="mines">-</button>
                <p class="quantity">1</p>
                <button class="plus">+</button>
            </div>
        </div>
        <i class="fa-solid fa-trash"></i>
    `
    
    // Menambahkan HTML yang sudah dibuat ke dalam kontainer produk
    cardShow.innerHTML = cardAddShopping
    cardShowContainer.append(cardShow)

    // Menambahkan event listener pada elemen baru yang dibuat
    const removeButton = cardShow.querySelector('.fa-trash')
    removeButton.addEventListener('click', removeCardProduct)

    const plusButton = cardShow.querySelector('.plus')
    plusButton.addEventListener('click', updateQuantity)

    const minesButton = cardShow.querySelector('.mines')
    minesButton.addEventListener('click', updateQuantity)
}

function updateQuantity(event) {
    const buttonClicked = event.target
    const quantityElement = buttonClicked.closest('.jumlah').querySelector('p')

    let currentQuantity = parseInt(quantityElement.innerText)
    
    if (buttonClicked.classList.contains('plus')) {
        currentQuantity++
    } else if (buttonClicked.classList.contains('mines') && currentQuantity > 1) {
        currentQuantity--
    }

    quantityElement.innerText = currentQuantity
    updateTotal()
    updateTotalQuantity()
}

function updateTotalQuantity() {
    const cardProducts = document.querySelectorAll('.card-product');
    let totalQuantity = 0;

    cardProducts.forEach(cardProduct => {
        let quantityElement = cardProduct.querySelector('.jumlah .quantity');
        let quantity = parseInt(quantityElement.innerText);
        totalQuantity += quantity;
    });

    // Menampilkan total kuantitas di elemen yang sesuai
    document.querySelector('.quantitys').innerText = totalQuantity
    document.querySelector('.quantitys').style.display = 'block'
}

function updateTotal() {
    const cardProducts = document.querySelectorAll('.card-product')
    let total = 0
    cardProducts.forEach(cardProduct => {
        let priceElement = cardProduct.querySelector('.price')
        let quantityElement = cardProduct.querySelector('.jumlah p')

        let price = parseFloat(priceElement.innerText.replace('Rp', '').replace(',', '').trim())
        let quantity = parseInt(quantityElement.innerText)

        total += price * quantity
    })

    document.querySelector('.total-price').innerText = 'Rp ' + total.toLocaleString('id-ID')
}






