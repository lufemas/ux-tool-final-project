
const $ = document
const $progressBar = $.getElementById(`progress-bar`)

window.addEventListener(`scroll`, (e) => {
    const progressBarPercentage = ( window.scrollY/ 
        ($.documentElement.scrollHeight - $.documentElement.clientHeight) ) * 100
    $progressBar.style.width = `${progressBarPercentage}%`
});