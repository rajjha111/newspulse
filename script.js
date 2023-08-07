const API_KEY="51b6832c42e04d46a5e8beaea950da36"
const url="https://newsapi.org/v2/everything?q="

window.addEventListener('load',()=> fetchNews("India"))

async function fetchNews(query){
    const res= await fetch ( `${url}${query}&apikey=${API_KEY}`)
    const data= await res.json();
    bindData(data.articles);
}
function bindData(articles){
    const cardscontainer=document.getElementById('cards-container')
    const newscardTemplate=document.getElementById('template-news-card')

    cardscontainer.innerHTML='';
    articles.forEach(articles => {
        if(!articles.urlToImage) return;
        const cardClone=newscardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,articles)
        cardscontainer.appendChild(cardClone)
        
    });
}

function fillDataInCard(cardClone, articles)
{
    const newsImg=cardClone.querySelector('#news-img')
    const newsSource=cardClone.querySelector('#news-source')
    const newsTitle=cardClone.querySelector('#news-title')
    const newsDesc=cardClone.querySelector('#news-desc')

    newsImg.src=articles.urlToImage;
    newsTitle.innerHTML=articles.title;
    newsDesc.innerHTML=articles.description;

    const date=new Date(articles.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/jakarta"
    })
    newsSource.innerHTML=`${articles.source.name} . ${date}`
    cardClone.firstElementChild.addEventListener("click",()=>{
        window.open(articles.url,"_blank")

    })
}

function reload(){
    window.location.reload();
}




    let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
    const query=searchText.value
    if(!query) return;
    fetchNews(query)
    curSelectedNav?.classList.remove('active')
    curSelectedNav=null
})

