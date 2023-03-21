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

let usersList;

const getUserList = async function () {
    try {
        let response = await axios.get("/api/admin/get-users-list");
        if (response.data.success) {
            // return response.data.data;
            usersList = response.data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

const showUsersInTable = function (users) {
    let userListTable = document.getElementById("userListTable");
    userListTable.innerHTML = "";
    if (users.length === 0) {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <td colspan="5" class="text-center">No users found</td>
        `;
        userListTable.appendChild(tr);
        return;
    }
    users.forEach((user, index) => {
        let tr = document.createElement("tr");
        tr.innerHTML = `
            <th scope="row">${index + 1}</th>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.role === "pending" ? "N/A" : "₹5000"}</td>
            <td>
                ${
                    user.role !== "pending"
                        ? `<button class="btn btn-danger" onclick="resetUser(event, '${user.email}')">Reset</button>`
                        : `
                        <button class="btn btn-primary" onclick="verifyAsGold(event, '${user.email}')">
                            Gold
                        </button>
                        <button class="btn btn-success" onclick="verifyAsPlatinum(event, '${user.email}')">
                            Platinum
                        </button>
                    `
                }
            </td>
        `;
        userListTable.appendChild(tr);
    });
};

const showUserList = async function () {
    try {
        let usersLoading = document.getElementById("usersLoading");
        usersLoading.style.visibility = "visible";
        await getUserList();
        showUsersInTable(usersList);
        usersLoading.style.visibility = "hidden";
    } catch (error) {
        console.log(error);
    }
};

const showOnlyPendingUsers = function (e) {
    e.preventDefault();
    let pendingUsers = usersList.filter((user) => user.role === "pending");
    showUsersInTable(pendingUsers);
};

const showOnlyGoldUsers = function (e) {
    e.preventDefault();
    let goldUsers = usersList.filter((user) => user.role === "gold");
    showUsersInTable(goldUsers);
};

const showOnlyPlatinumUsers = function (e) {
    e.preventDefault();
    let platinumUsers = usersList.filter((user) => user.role === "platinum");
    showUsersInTable(platinumUsers);
};

const showAllUsers = function (e) {
    e.preventDefault();
    showUsersInTable(usersList);
};

const searchForUser = function (e) {
    e.preventDefault();
    let searchInput = document.getElementById("search-user-input").value;
    let filteredUsers = usersList.filter((user) =>
        user.email.includes(searchInput)
    );
    showUsersInTable(filteredUsers);
};

const verifyAsGold = async function (e, email) {
    e.preventDefault();
    try {
        let usersLoading = document.getElementById("usersLoading");
        usersLoading.style.visibility = "visible";

        let response = await axios.post("/api/admin/verify-user", {
            email,
            role: "gold",
        });
        if (response.data.success) {
            // window.location.reload();
            await showUserList();
        }
    } catch (error) {
        console.log(error);
    }
};

const verifyAsPlatinum = async function (e, email) {
    e.preventDefault();
    try {
        let usersLoading = document.getElementById("usersLoading");
        usersLoading.style.visibility = "visible";

        let response = await axios.post("/api/admin/verify-user", {
            email,
            role: "platinum",
        });
        if (response.data.success) {
            // window.location.reload();
            await showUserList();
        }
    } catch (error) {
        console.log(error);
    }
};

const resetUser = async function (e, email) {
    e.preventDefault();
    try {
        let usersLoading = document.getElementById("usersLoading");
        usersLoading.style.visibility = "visible";

        let response = await axios.post("/api/admin/reset-user", {
            email,
        });
        if (response.data.success) {
            // window.location.reload();
            await showUserList();
        }
    } catch (error) {
        console.log(error);
    }
};
