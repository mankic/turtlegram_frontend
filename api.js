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
        const response = await fetch('http://127.0.0.1:5002/signup', {  // app.py 서버 주소
        method: 'POST',
        body: JSON.stringify(signupData)
        })
        console.log(response)   

        if (response.status == 200){
            alert('회원가입 완료!')
            window.location.replace('http://127.0.0.1:5500/index.html')  
        }
        else if (response.status == 300){
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
        const response = await fetch('http://127.0.0.1:5002/signin', {  // app.py 서버 주소
        method: 'POST',
        body: JSON.stringify(signinData)
        })
        console.log(response)   

        if (response.status == 200){
            alert('로그인 완료!')
            window.location.replace('http://127.0.0.1:5500/index.html')  
        }
        else if (response.status == 300){
            alert('가입된 정보가 없습니다. 회원가입 해주세요.')
        }
    }
}