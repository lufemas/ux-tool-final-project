
const $ = document
const $progressBar = $.getElementById(`progress-bar`)
const $navSummaryList = $.getElementById(`nav-summary-list`)
const $nextArticleTimer = $.getElementById(`next-article-timer`)
const $articleTitle = $.getElementById(`article-title`)
const $nextArticleTitle = $.getElementById(`next-article-title`)
const $cancelButton = $.getElementById(`cancel-button`);

let cancelNextArticleTimer = false;
let nextArticle;
let nextArticleIntervalReference

const summaryList = []

const articleDataBase = [
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
        url: "./index.html"
    },
]


let nextArticleTimer = 10
let isNextArticleTimerActive = false

function nextArticleTimerHandler(){
    if ( nextArticleTimer > 0 ){
        nextArticleTimer--;
        $nextArticleTimer.innerText = nextArticleTimer;
    }else{
        loadArticle(nextArticle);
    }
}

function peekAnArticle() {
    const randomArticleIndex = Math.floor(Math.random() * 4)

    if (articleDataBase[randomArticleIndex].title === $articleTitle.innerText) {
        return peekAnArticle()
    }else{
        nextArticle = articleDataBase[randomArticleIndex]
    }
}

function loadArticle(article){
    
    window.open( article.url , "_self")
    
}


function eraseAllChildrenClasses($element){
    for ( $child of $element.children){
        $child.className = ``;
    }
}

function stopNextArticleTimer(){
    window.clearInterval(nextArticleIntervalReference)
    isNextArticleTimerActive = false
    nextArticleTimer = 10
}

window.addEventListener(`scroll`, (e) => {
    const progressBarPercentage = ( window.scrollY/ 
        ($.documentElement.scrollHeight - $.documentElement.clientHeight) ) * 100
    $progressBar.style.width = `${progressBarPercentage}%`

    console.log(`-----------------------`)


    summaryList.forEach( (element) => {
        const currentSubtitleTop = element.$subtitle.getBoundingClientRect().top

        console.log(currentSubtitleTop)

        if( currentSubtitleTop <= 200 ){
            eraseAllChildrenClasses($navSummaryList)
            element.$summaryItem.className = `marked-summary`
        }

    });


    console.log(`-----------------------`)

    if (!cancelNextArticleTimer){
        if ( progressBarPercentage >= 98){
            if (!isNextArticleTimerActive){        
                isNextArticleTimerActive = true;
                nextArticleIntervalReference = window.setInterval(nextArticleTimerHandler, 1000);
            }
        }else{
            stopNextArticleTimer()
            $nextArticleTimer.innerText = nextArticleTimer;
        }
    }

});

$cancelButton.addEventListener(`click`, () => {
    stopNextArticleTimer();
    cancelNextArticleTimer = true 
    $cancelButton.style.opacity = 0
});

for (child of $navSummaryList.children){
    summaryList.push({
        $subtitle: $.querySelector( child.children[0].getAttribute(`href`) ),
        $summaryItem: child,
    });
}

peekAnArticle()

$nextArticleTitle.innerHTML = `<a href='${nextArticle.url}'>${nextArticle.title} -></a>`;
<a href='article-2.html'>Article 2</a>

