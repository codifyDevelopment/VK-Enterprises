let loginInputPassword = document.getElementById("loginInputPassword");
let loginTogglePassword = document.getElementById("loginTogglePassword");
let registerInputPassword = document.getElementById("registerInputPassword");
let registerTogglePassword = document.getElementById("registerTogglePassword");
let registerInputConfirmPassword = document.getElementById(
    "registerInputConfirmPassword"
);
let registerToggleConfirmPassword = document.getElementById(
    "registerToggleConfirmPassword"
);
let registerConfirmPasswordError = document.getElementById(
    "registerConfirmPasswordError"
);
let loginEmailError = document.getElementById("loginEmailError");
let registerEmailError = document.getElementById("registerEmailError");

loginTogglePassword &&
    loginTogglePassword.addEventListener("click", function (e) {
        // toggle the type attribute
        const type =
            loginInputPassword.getAttribute("type") === "password"
                ? "text"
                : "password";
        loginInputPassword.setAttribute("type", type);

        // toggle the eye icon with eye slash icon
        this.classList.toggle("bi-eye");
    });

registerTogglePassword &&
    registerTogglePassword.addEventListener("click", function (e) {
        // toggle the type attribute
        const type =
            registerInputPassword.getAttribute("type") === "password"
                ? "text"
                : "password";
        registerInputPassword.setAttribute("type", type);
        // toggle the eye icon with eye slash icon
        this.classList.toggle("bi-eye");
    });

registerToggleConfirmPassword &&
    registerToggleConfirmPassword.addEventListener("click", function (e) {
        // toggle the type attribute
        const type =
            registerInputConfirmPassword.getAttribute("type") === "password"
                ? "text"
                : "password";
        registerInputConfirmPassword.setAttribute("type", type);

        // toggle the eye icon with eye slash icon
        this.classList.toggle("bi-eye");
    });

registerInputConfirmPassword &&
    registerInputConfirmPassword.addEventListener("keyup", function (e) {
        if (
            registerInputPassword.value !== registerInputConfirmPassword.value
        ) {
            registerConfirmPasswordError.style.visibility = "visible";
        } else {
            registerConfirmPasswordError.style.visibility = "hidden";
        }
    });

let submitLoginForm = function (e) {
    e.preventDefault();
    let email = document.getElementById("loginInputEmail").value;
    let password = document.getElementById("loginInputPassword").value;
    let data = {
        email,
        password,
    };
    // fetch("/api/user/login", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(data),
    // })
    //     .then((response) => response.json())
    //     .then((data) => {
    //         console.log("Success:", data);
    //     })
    //     .catch((error) => {
    //         console.error("Error:", error);
    //     });
    console.log(data);
};
