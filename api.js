async function handleSignup() {

    const signupData = {
        email : document.getElementById('floatingInput').value,
        password : document.getElementById('floatingPassword').value
    }
    

    if (signupData.email == ''){
        alert('이메일을 입력해주세요.')
    }
    else if (signupData.email.indexOf('@') == -1) {    // indexOf 포함하고있는 문자의 인덱스를 반환한다. 없으면 -1 반환.
        alert('이메일 형식이 아닙니다.')
    }
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
    }
 
}
