
const $ = document
const $progressBar = $.getElementById(`progress-bar`)
const $navSummaryList = $.getElementById(`nav-summary-list`)
const $nextArticleTimer = $.getElementById(`next-article-timer`)

const summaryList = []

const articleDataBade = [
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
    }

]

const currentArticle =  {
    title: "Javascript and the UI", 
    url: "index.html"
}

let nextArticleTimer = 10;
let isNextArticleTimerActive = false;

function nextArticleTimerHandler() {
    if (nextArticleTimer  > 0 ) {
        nextArticleTimer --;
        $nextArticleTimer.innerText = nextArticleTimerHandler;
    } else {
        loadArticle(nextArticleIndex);
    }
}

for (child of $navSummaryList.children) {
    summaryList.push({
        $subtitle: $.querySelector(child.children[0].getAttribute(`href`)), 
        $summaryItem : child

    }); 
}

window.addEventListener(`scroll`, (e) => {
    const progressBarPercentage = ( window.scrollY/ 
        ($.documentElement.scrollHeight - $.documentElement.clientHeight) ) * 100
    $progressBar.style.width = `${progressBarPercentage}%`
    console.log(`.......................`)

    summaryList.forEach((element) => {
    const currentSubtitleTop = element.$subtitle.getBoundingClientRect().top;
    console.log(currentSubtitleTop)

    if(currentSubtitleTop <= 200){
        eraseAllChildrenClasses($navSummaryList);
        element.$summaryItem.className = `marked-summary`;
    }
  
    });
    console.log(`.......................`)  
});

function eraseAllChildrenClasses ($element) {
    for ($child of $element.children) {
        $child.className = ``
    }
}

function loadArticle(index)