
const $ = document
const $progressBar = $.getElementById(`progress-bar`)
const $navSummaryList = $.getElementById(`nav-summary-list`)
const $nextArticleTimer = $.querySelector(`.next-article-timer`)
// console.log($nextArticleTimer)
const $articleTitle = $.getElementById(`article-title`)
const $nextArticleTitle = $.getElementById(`next-article-title`)
const $cancelButton = $.getElementById(`cancel-button`)
let nextArticle;
let nextArticleIntervalReference; 
let cancelNextArticleTimer = false;

const summaryList = [] // Create an array for the Summary List 

const articleDataBase = [ // Creates a database of articles available
    {
        title: "Article 2", 
        url: "./article-2.html"
    },
    {
        title: "Article 3", 
        url: "./article-3.html"
    },
    {
        title: "Article 4", 
        url: "./article-4.html"
    }, 
    {
    title: "Javascript and the UI", 
    url: "index.html"
    }
]

function  pickAnArticle () { // Generates a randomic ID for the articles within the Array
    const ramdomArticleIndex = Math.floor(Math.random () * 4); //Randomizing the ID
    // console.log(ramdomArticleIndex);
    if (articleDataBase[ramdomArticleIndex].title === $articleTitle.innerText ) { // Comparing the random ID with the current Article
        return pickAnArticle () // If the ID generared is equal to the current Article, generates another random ID
    }else {
        nextArticle = articleDataBase[ramdomArticleIndex] //If the ID is not equal to the Current Article, assign the ID
    }
}

const currentArticle =  {
   
}

let nextArticleTimer = 10; // Assign the value of 10 to the Timer variable
let isNextArticleTimerActive = false; // Assing boolean value false for the next article


function nextArticleTimerHandler() { // Creates the function to handle the Stopwatch
    if (nextArticleTimer  > 0 ) { //Comparing if value is greater than 0 
        nextArticleTimer --; // If so, decrease the value (-1)
        console.log(nextArticleTimer)
        $nextArticleTimer.textContent = nextArticleTimer; // Assign the timer "second" value to the span element on HMTL
        
    } else {
        loadArticle(nextArticle); 
    }
}

for (child of $navSummaryList.children) { // For each child of the element UL  - the children LI
    summaryList.push({ 
        $subtitle: $.querySelector(child.children[0].getAttribute(`href`)), //Get the href property of the element 
        $summaryItem : child // Assign to the variable $summaryItem the child ?

    }); 
}

window.addEventListener(`scroll`, () => { // Event listener Scrolling page 
    const progressBarPercentage = ( window.scrollY/ // Calculates the percentage representation of the scrolled page  
        ($.documentElement.scrollHeight - $.documentElement.clientHeight) ) * 100 
     $progressBar.style.width = `${progressBarPercentage}%` // Assign the value to the width property of the element with id "progress-bar"
   
    summaryList.forEach((element) => { //For each item from the Summary List 
    const currentSubtitleTop = element.$subtitle.getBoundingClientRect().top; //Returns an element size and its position related to the viewport into the variable currentSubtitleTop

    if(currentSubtitleTop <= 200){ // If the variable currentSubtitleTop value is lesser than 200 
        eraseAllChildrenClasses($navSummaryList); // Remove the class marked-summary based on the function 
        element.$summaryItem.className = `marked-summary`;// Assign the marked-summary class to the current Subtitle (Summary Item)
    }
    if (!cancelNextArticleTimer) {
        if (progressBarPercentage >= 98 ) {        
            if (!isNextArticleTimerActive) {
            isNextArticleTimerActive = true;
            nextArticleIntervalReference = window.setInterval(nextArticleTimerHandler, 1000)
            }
        }else{
            stopNextArticleTimer()
            $nextArticleTimer.textContent = nextArticleTimer;
        }
    }
  
    }); 
});

function stopNextArticleTimer () {
    isNextArticleTimerActive = false;
    nextArticleTimer = 10;
    window.clearInterval(nextArticleIntervalReference)
}

$cancelButton.addEventListener(`click`, () => {
    stopNextArticleTimer();
    cancelNextArticleTimer = true;
    $cancelButton.style.opacity = 0;
    $cancelButton.style.visibility = false;
})

function eraseAllChildrenClasses ($element) {
    for ($child of $element.children) {
        $child.className = ``
    }
}

function loadArticle(article) {
    window.open(article.url, "_self")
}

pickAnArticle()
// console.log(nextArticle)
$nextArticleTitle.innerHTML = `<a href="${nextArticle.url}"> ${nextArticle.title} -> </a>`;
