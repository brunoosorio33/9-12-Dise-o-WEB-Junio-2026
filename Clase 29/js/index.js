const header = document.querySelector('header')

document.addEventListener('scroll', e => {
    if (window.scrollY > 100) {
        header.classList.add('sticky')
    } else {
        header.classList.remove('sticky')
    }
})

// ---------------------------------------------------- //

const sliderContainer = document.getElementById('slider-content')
const sliderTitle = document.getElementById('slider-title')
const sliderDescription = document.getElementById('slider-description')
const sliderBack = document.getElementById('slider-back')
const sliderNext = document.getElementById('slider-next')

const slider = [
    {title: 'The 1th title' , description: 'lorem ipsum dolor sit amet', image: 'https://images.unsplash.com/photo-1556742526-795a8eac090e?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
    {title: 'The 2nd title' , description: 'lorem ipsum dolor sit amet', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
    {title: 'The 3th title' , description: 'lorem ipsum dolor sit amet', image: 'https://plus.unsplash.com/premium_photo-1674327105074-46dd8319164b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
    {title: 'The 4th title' , description: 'lorem ipsum dolor sit amet', image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=3274&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'}
]

let count = 0


sliderNext.addEventListener('click', e => {

    if (count >= slider.length - 1) {
        count = 0
    } else {
        count++
    }
    count++
    sliderContainer.style = `background-image: url("${slider[count].image}")`
    sliderTitle.innerText = slider[count].titles
    sliderDescription.innerText = slider[count].description
})
sliderBack.addEventListener('click', e => {
    if (count <= 0) {
        count = slider.length - 1 
    } else {
        count--
    }
    sliderContainer.style = `background-image: url("${slider[count].image}")`
    sliderTitle.innerText = slider[count].titles
    sliderDescription.innerText = slider[count].description
})