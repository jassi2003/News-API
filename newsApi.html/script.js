const apikey='26c5abba24454953aadf6984d4eb629e'

const blogContainer=document.getElementById("blogContainer");

const searchField= document.getElementById('search');
const searchButton=document.getElementById('btn');

async function fetchRandomNews(){
   //if there is no error try is executed 
try{
const apiUrl=`https://newsapi.org/v2/top-headlines?country=us&pageSize=12&apikey=${apikey}`;
                                                               //page size=12(ie there will be 12 boxes)
//await keyword is used to prevent delays as this website contains lots of data, make sure to use async function with await keyword                                                   //page size=12(ie,there will be 12 boxes),
const response=await fetch(apiUrl);
const data=await response.json();
return data.articles;
}

//the catch will throw an error if it failed to generate random news
catch(error){
    console.error("error fetching it",error);
   //return will return empty mssg
    return [];
}
}  
//to search the news
searchButton.addEventListener("click", async()=>{
    const query= searchField.value.trim()
    if(query !==""){
        try{
            const articles= await fetchNewsQuery(query)
            displayBlogs(articles)
        }
        catch(error){ 
            console.log("error fetching news",error)
        }
        }
    });

async function fetchNewsQuery(query){
    try{
    const apiUrl=`https://newsapi.org/v2/everything?q=${query}tesla&pageSize=12&apikey=${apikey}`;
        const response=await fetch(apiUrl);
        const data=await response.json();
        return data.articles;
        }
        
        //the catch will throw an error if it failed to generate random news
        catch(error){
            console.error("error fetching it",error);
           //return will return empty mssg
            return [];
        }
        }
    

           
function displayBlogs(articles){
    blogContainer.innerHTML="";
    articles.forEach(article=>{
        //creating a div tag
    const blogDiv=document.createElement("div");
    //add class name inside div tag
    blogDiv.classList.add("blogCard");
//creating image
const img=document.createElement("img")
//image url
img.src=article.urlToImage
img.alt=article.title
//creating h2
const title=document.createElement("h1")
const truncatedTitle= article.title.length>30 ? article.title.slice(0,30)+"....":article.title;
title.textContent=truncatedTitle;
//creating paragraph
const description=document.createElement("p")
// description.textContent=article.description
const truncatedDescription=article.description.length>150?article.description.slice(0,150)+"....":article.description;
description.textContent=truncatedDescription;

//now appending the components into main tag
blogDiv.appendChild(img)
blogDiv.appendChild(title)
blogDiv.appendChild(description)
//function to open the card url in new tab
blogDiv.addEventListener("click",()=>{
window.open(article.url,"_blank");
})
blogContainer.appendChild(blogDiv);
    });
}



 
(async()=>{
    try {
        const articles=await fetchRandomNews();
        displayBlogs(articles);
    }
    catch(error){
        console.error("error fetching it",error)
}
}) ();





