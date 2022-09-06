
 const loginBtn = document.getElementById('submitBtn');
 const emailInput = document.getElementById('emailId')
 const passwordInput = document.getElementById('passwordId')
 let cookie;
 loginBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    console.log(email,password)
    fetch("http://localhost:3000/login", {
        method: "POST",
        body: JSON.stringify({ email ,password }),
        headers: { "Content-type": "application/json; charset=UTF-8"},
      }).then((res)=> res.json()).then((data)=>{
        console.log(data)
        localStorage.setItem('uid',data.id)
        //location.href='http://localhost:3000/blog'
      })
     
})
//console.log(cookie)