auth.onAuthStateChanged(function (user) {
    if (user) {
        Session.user = user;
        document.getElementById("appDiv").style.display = "block";
        document.getElementById("loginDiv").style.display = "none";
        console.log("logged in !");
        //is signed in

    } else {
        document.getElementById("loginDiv").style.display = "block";
    }

})


var signInButton = document.getElementById('signin');
signInButton.addEventListener("click", (e) => {
    e.preventDefault()
    console.log("clicked")

    var email = document.getElementById("uname")
    var password = document.getElementById("psw")


    auth.signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log("user", user.email)
        })
        .catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage)
        });
})
