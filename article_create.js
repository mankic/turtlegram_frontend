function handleArticleCreate(){
    console.log("create article")
    const title = document.getElementById("article_title").value
    const content = document.getElementById("article_content").value

    // html에서 입력받은 데이터를 api.js의 postArticle 함수로 넣어준다.
    postArticle(title, content)    
}