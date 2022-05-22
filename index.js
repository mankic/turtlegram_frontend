async function loadArticles(){
    articles = await getArticles()
    // console.log(articles)

    // index.html 에서 게시글 리스트 데이터가 들어갈 <ol>의 id
    const article_list = document.getElementById("articles")

    // 리스트에 적용할수있는 .forEach 함수
    articles.forEach(article => {
        // console.log(article)
        const newArticle = document.createElement("li");

        newArticle.setAttribute('id', article._id)
        newArticle.innerText = article.title 
        article_list.appendChild(newArticle)
    });
}




loadArticles();
getUserinfo();