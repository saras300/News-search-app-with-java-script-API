const apiKey='8af0f185ba03455e8e70dc75551b2525'
const blogContainer= document.getElementById
("blog-container");
const searchField= document.getElementById
('search-input')
const searchButton = document.getElementById
('search-button')

async function fetchRandomNews(){
    try{
        const apiUrl =`https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${apiKey}`
       const response=  await fetch(apiUrl);
       const data = await response.json();
      return data.articles;

    } catch(error){
        console.error("Error Fetching random new", error);
        return[];

    }
}
async function fetchNewsQuery(query) {
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=20&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch (error) {
        console.error("Error fetching news by query", error);
        return [];
    }
}

function displayBlogs(articles){
    blogContainer.innerHTML="";
    articles.forEach((articles)=>{
        const blogCard = document.createElement
        ("div")
        blogCard.classList.add("blog-card")
        const img =document.createElement("img");
        img.src = articles.urlToImage;
        img.alt = articles.title;
        const title =document.createElement("h2");
        const truncatedTitle=articles.title.length
        >30
        ? articles.title.slice(0,30) +"...."
        :articles.title;
        title.textContent =truncatedTitle;

        const description =document.createElement("p");
        const truncatedDes=articles.description && articles.description.length
        >120
        ? articles.description.slice(0,120) +"...."
        :articles.description;
        description.textContent=truncatedDes;
        description;


        blogCard.appendChild(img);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click",()=>{
            window.open(articles.url, "_blank");
        });
        blogContainer.appendChild(blogCard);

    });
}
document.addEventListener("DOMContentLoaded", () => {
    searchButton.addEventListener("click", async () => {
        const query = searchField.value.trim();
        if (query !== "") {
            try {
                const articles = await fetchNewsQuery(query);
                displayBlogs(articles);
            } catch (error) {
                console.log("Error fetching news by query", error);
            }
        }
    });
(async ()=>{
    try{
        const articles=await fetchRandomNews();
       displayBlogs(articles);
    }catch(error){
        console.error("Error Fetching random new", error)

    }
})();
});