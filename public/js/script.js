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

let menuToggler = document.getElementById("menu-toggler");
let menu = document.getElementById("menu");

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

let submitLoginForm = async function (e) {
    e.preventDefault();
    let email = document.getElementById("loginInputEmail").value;
    let password = document.getElementById("loginInputPassword").value;
    let loading = document.getElementById("loginLoading");
    let data = {
        email,
        password,
    };
    try {
        loading.style.visibility = "visible";
        let response = await axios.post("/api/user/login", data);
        if (response.data.success) {
            window.location.href = "/dashboard";
        }
    } catch (error) {
        loading.style.visibility = "hidden";
        if (!error.response.data.success) {
            loginEmailError.innerHTML = error.response.data.message;
            loginEmailError.style.visibility = "visible";
        }
    }
};

let submitRegisterForm = async function (e) {
    e.preventDefault();
    let email = document.getElementById("registerInputEmail").value;
    let password = document.getElementById("registerInputPassword").value;
    let confirmPassword = document.getElementById(
        "registerInputConfirmPassword"
    ).value;
    let loading = document.getElementById("registerLoading");
    if (password !== confirmPassword) {
        registerConfirmPasswordError.style.visibility = "visible";
        return;
    }
    let data = {
        email,
        password,
    };
    try {
        loading.style.visibility = "visible";
        let response = await axios.post("/api/user/register", data);
        if (response.data.success) {
            window.location.href = "/wait-for-approval";
        }
    } catch (error) {
        loading.style.visibility = "hidden";
        if (!error.response.data.success) {
            registerEmailError.innerHTML = error.response.data.message;
            registerEmailError.style.visibility = "visible";
        }
    }
};

menuToggler &&
    menuToggler.addEventListener("click", function (e) {
        menu.classList.toggle("active");
    });

const loadOrderDetails = function (e) {
    document.title = "Order Details";
};

let logout = async function (e) {
    e.preventDefault();
    try {
        let response = await axios.get("/api/user/logout");
        if (response.data.success) {
            window.location.href = "/";
        }
    } catch (error) {
        console.log(error);
    }
};
