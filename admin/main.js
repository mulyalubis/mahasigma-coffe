const sidebarNav = document.querySelector('.side-show')
const closeSidebar = document.querySelector('.fa-arrow-left')
const openSidebar = document.querySelector('.fa-bars')
const containerOpen = document.querySelector('.menu-sidebar')
const cardMeja = document.querySelectorAll('.card-meja')
const containerMeja = document.querySelector('.container-meja')
const sideNavs = document.querySelector('.item-nav')


openSidebar.addEventListener('click', () => {
    sidebarNav.classList.add('active')
    containerMeja.classList.add('active')
})

closeSidebar.addEventListener('click', () => {
    sidebarNav.classList.remove('active')
    containerMeja.classList.remove('active')
})

cardMeja.forEach( (content, i) => {
    const newP = document.createElement('p')
    newP.classList.add('angka-meja')
    newP.textContent = i + 1
    content.appendChild(newP)
})





