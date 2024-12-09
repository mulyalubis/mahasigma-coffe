const cardSamping = document.querySelector('.card-samping')
const cardForm = document.querySelector('form')
const input = document.querySelector('input')


input.addEventListener('click', () => {
    cardSamping.classList.add('active')
    cardForm.classList.add('active')
    cardForm.style.border = '2px solid white'
})


// tampilkan password
const inputPass = document.querySelector('.input-password')
const showPass = document.querySelector('label input')

showPass.addEventListener('input', (event) => {
    if(event.target.checked) {
        inputPass.setAttribute('type', 'text')
    } else {
        inputPass.setAttribute('type', 'password')
    }
})
