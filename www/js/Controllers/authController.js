auth.onAuthStateChanged(function (user) {
    if (user) {
        Session.user = user;
        document.getElementById("appDiv").style.display = "block";
        document.getElementById("loginDiv").style.display = "none";
        //is signed in

    } else {
        document.getElementById("loginDiv").style.display = "block";
    }

})


var signInButton = document.getElementById('signin');
signInButton.addEventListener("click", (e) => {
    e.preventDefault()

    var email = document.getElementById("uname")
    var password = document.getElementById("psw")

    console.log(email.value);
    auth.signInWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {
            var user = userCredential.user;
            console.log("user", user.email)
        })
        .catch((error) => {
            var errorMessage = error.message;

            cuteAlert({
                type: "warning",
                title: "Connexion impossible",
                message: errorMessage,
                buttonText: "Okay",
                img: "../img/warning.svg",
            });

        });
})

function goToSignup() {
    document.getElementById("loginDiv").style.display = "none";
    document.getElementById("signupDiv").style.display = "block";
}
function disconnect() {
    auth.signOut()
    location.reload();
}
function signup() {
    var email = document.getElementById("suname")
    var password = document.getElementById("spsw")
    console.log(email.value);

    console.log(password.value);
    auth.createUserWithEmailAndPassword(email.value, password.value)
        .then((userCredential) => {

            location.reload();


        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("error code", errorCode)
            console.log("error Message", errorMessage)
        });
}