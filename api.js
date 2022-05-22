const backend_base_url = 'http://127.0.0.1:5002'
const frontend_base_url = 'http://127.0.0.1:5500'

async function handleSignup() {

    const signupData = {
        email : document.getElementById('floatingInput').value,
        password : document.getElementById('floatingPassword').value
    }
    
    // 서버로 보내기전 이메일, 패스워드 형식 확인
    if (signupData.email == '' || signupData.password == ''){
        alert('이메일과 비밀번호를 모두 입력해주세요.')
    }
    else if (signupData.email.indexOf('@') == -1) {    // indexOf 포함하고있는 문자의 인덱스를 반환한다. 없으면 -1 반환.
        alert('이메일 형식이 아닙니다.')
    }
    // 이메일 형식 맞으면
    else {
        const response = await fetch(`${backend_base_url}/signup`, {  // app.py 서버 주소
        method: 'POST',
        body: JSON.stringify(signupData)
        })
        console.log(response)   

        if (response.status == 200){
            alert('회원가입 완료!')
            window.location.replace(`${frontend_base_url}/signin.html`)  
        }
        else if (response.status == 401){
            alert('이미 가입된 이메일입니다.')
        }
    }
}

async function handleSignin() {

    const signinData = {
        email : document.getElementById('floatingInput').value,
        password : document.getElementById('floatingPassword').value
    }
    
    // 서버로 보내기전 이메일, 패스워드 형식 확인
    if (signinData.email == '' || signinData.password == ''){
        alert('이메일과 비밀번호를 모두 입력해주세요.')
    }
    else if (signinData.email.indexOf('@') == -1) {    // indexOf 포함하고있는 문자의 인덱스를 반환한다. 없으면 -1 반환.
        alert('이메일 형식이 아닙니다.')
    }
    // 이메일 형식 맞으면
    else {
        const response = await fetch(`${backend_base_url}/signin`, {  // app.py 서버 주소
        method: 'POST',
        body: JSON.stringify(signinData)
        })
        console.log(response)   
        

        if (response.status == 200){
            alert('로그인 완료!')
            window.location.replace(`${frontend_base_url}/index.html`)  

            response_json = await response.json()   // 받을때도 json 형식으로 받으면 메세지랑 토큰 받을수있다!!!!!
            // console.log(response_json)

            localStorage.setItem('token',response_json.token)   // 브라우저 로컬저장소에 키,밸류 값으로 저장
        
        }
        else if (response.status == 401){
            alert('가입된 정보가 없습니다. 회원가입 해주세요.')
        }
    }
}


async function getUserinfo() {              // async 비동기. 동시작업가능. + await 대기. response기다림
    // console.log('get user info')
    // console.log(localStorage.getItem('token'))

    const response = await fetch(`${backend_base_url}/getuserinfo`, {
        headers:{
            'Authorization': localStorage.getItem('token')
        }
    }
    )
    response_json = await response.json()
    // console.log(response_json)
    const username = document.getElementById('username')

    username.innerText = response_json.email
    
}

// article_create.js 에서 데이터 받고, api post 요청
async function postArticle(title, content){     // 받는데이터 읹자
    const articleData = {
        title: title,
        content: content,
    }
    
    const response = await fetch(`${backend_base_url}/article`,{
        method: 'POST',
        headers: {'Authorization':localStorage.getItem("token")},
        body: JSON.stringify(articleData)
    })

    response_json = await response.json()
    console.log(response_json)

    // 요청 성공했을때
    if (response.status == 200){
        alert('게시글작성 완료!')
        window.location.replace(`${frontend_base_url}/`)  
    }
    else {
        alert('가입된 정보가 없습니다. 회원가입 해주세요.')
    }
}


// 서버에서 데이터 받기
async function getArticles(){
    const response = await fetch(`${backend_base_url}/article`,{
        method: 'GET'

    })
    response_json = await response.json()
    // console.log(response_json)
    return response_json.articles
}