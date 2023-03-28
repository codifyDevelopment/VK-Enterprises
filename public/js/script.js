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

const getNotification = async function () {
    let notifications = document.getElementById("notifications");
    let notificationCount = document.getElementById("notification-count");
    notifications.innerHTML = "";
    try {
        let response = await axios.get("/api/notification/get-all");
        if (response.data.success) {
            notificationCount.innerHTML =
                response.data.unreadNotificationsCount;
            if (response.data.unreadNotificationsCount === 0) {
                notifications.innerHTML = `
                    <li class="border-bottom text-center">
                        <a href="#" class="mb-0 dropdown-item text-wrap">
                            No new notifications
                        </a>
                    </li>`;
            }
            response.data.notifications.forEach((notification) => {
                const notificationElement = document.createElement("li");
                notificationElement.classList.add("border-bottom");
                notificationElement.innerHTML = `
                    <a href="${
                        notification.type === "user"
                            ? "/users"
                            : notification.type === "order"
                            ? "/orders"
                            : notification.type === "transaction"
                            ? "/transactions"
                            : "/dashboard"
                    }" class="mb-0 dropdown-item text-wrap">
                        ${notification.notificationText}
                    </a>
                `;
                notifications.appendChild(notificationElement);
            });
        }
    } catch (error) {
        console.log(error);
    }
};

const markNotificationAsRead = async function (e) {
    try {
        let response = await axios.get("/api/notification/mark-as-read");
        if (response.data.success) {
            await getNotification();
        }
    } catch (error) {
        console.log(error);
    }
};

// --------------------- ADMIN ---------------------
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
    await getNotification();
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

function resetAddUserModal(e) {
    e.preventDefault();
    document.getElementById("add-user-email-input").value = "";
    document.getElementById("add-user-role-input-gold").checked = true;
}

const addUser = async function (e) {
    e.preventDefault();
    const email = document.getElementById("add-user-email-input").value;
    const role = document.querySelector(
        'input[name="add-user-role-input"]:checked'
    ).value;
    if (!email) {
        alert("Please enter email");
        return;
    }
    const data = {
        email,
        role,
    };
    try {
        // close modal
        $("#add-user-modal").modal("hide");
        let usersLoading = document.getElementById("usersLoading");
        usersLoading.style.visibility = "visible";
        let response = await axios.post("/api/admin/add-user", data);
        if (response.data.success) {
            // window.location.reload();
            await showUserList();
        }
    } catch (error) {
        if (error.response.data.message === "User already exists") {
            alert("User already exists");
        }
        // console.log(error);
        await showUserList();
        // console.log(error);
    }
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

// --------------------- Services ---------------------
const fetchAllServices = async function () {
    try {
        let response = await axios.get("/api/services/get-all-services");
        if (response.data.success) {
            return response.data.data;
        }
    } catch (error) {
        console.log(error);
    }
};

const showServices = async function () {
    await getNotification();
    let services = document.getElementById("user-services");
    services.innerHTML = "";
    const allServices = await fetchAllServices();
    // sort allServices by id like [MCPCB,SS,DS,MS,S2P,STN,CP,SSUP,DSUP,S2PUP,URG,BOM]
    let newAllServices = [];
    allServices.forEach((service) => {
        if (service.id === "MCPCB") {
            newAllServices[0] = service;
        } else if (service.id === "SS") {
            newAllServices[1] = service;
        } else if (service.id === "DS") {
            newAllServices[2] = service;
        } else if (service.id === "MS") {
            newAllServices[3] = service;
        } else if (service.id === "S2P") {
            newAllServices[4] = service;
        } else if (service.id === "STN") {
            newAllServices[5] = service;
        } else if (service.id === "CP") {
            newAllServices[6] = service;
        } else if (service.id === "SSUP") {
            newAllServices[7] = service;
        } else if (service.id === "DSUP") {
            newAllServices[8] = service;
        } else if (service.id === "S2PUP") {
            newAllServices[9] = service;
        } else if (service.id === "URG") {
            newAllServices[10] = service;
        } else if (service.id === "BOM") {
            newAllServices[11] = service;
        }
    });
    newAllServices.forEach((service, index) => {
        let col = document.createElement("div");
        col.classList.add("col", "d-flex");
        col.innerHTML = `
            <div class="card w-100">
                <div class="card-header">
                    <span class="text-secondary">Product ID:</span>
                    <span class="fw-bold">${service.id}</span>
                </div>
                <div class="card-body d-flex flex-column justify-content-between">
                    <h4 class="card-title text-center">${service.name}</h4>
                    <p class="card-text">
                        ${service.description}
                    </p>
                    <p>
                        <span class="text-secondary"
                            >Price ( ₹ / cm<sup>2</sup> ):</span
                        >
                        <span class="text-success fw-bold"
                            >${
                                service.pricePerUnit
                                    ? service.pricePerUnit
                                    : "N/A"
                            }</span>
                    </p>
                    <p>
                        <span class="text-secondary"
                            >Minimum Price ( ₹ ):</span
                        >
                        <span class="text-success fw-bold"
                            >${service.minimumPrice}</span
                        >
                    </p>
                    <p>
                        <span class="text-secondary"
                            >Minimum Size ( cm<sup>2</sup> ):</span
                        >
                        <span class="text-success fw-bold"
                            >${
                                service.minimumSquareCm
                                    ? service.minimumSquareCm
                                    : "N/A"
                            }</span>
                    </p>
                    <p>
                        <span class="text-secondary"
                            >Designing Time :</span
                        >
                        <span class="text-success fw-bold"
                            >${service.timeToDeliver}</span
                        >
                    </p>
                    <button class="btn btn-primary w-100">
                        Order Now
                    </button>
                </div>
            </div>
        `;
        services.appendChild(col);
    });
};

// --------------------- Inquiries ---------------------
const fetchAllInquiries = async function () {
    try {
        let response = await axios.get("/api/inquiries/get-inquiries");
        if (response.data.success) {
            return response.data.inquiries;
        }
    } catch (error) {
        console.log(error);
    }
};

const showInquiries = async function () {
    await getNotification();
    let inquiries = document.getElementById("inquiry-table-body");
    let loading = document.getElementById("inquiry-loading");
    loading.style.visibility = "visible";
    inquiries.innerHTML = "";
    const allInquiries = await fetchAllInquiries();
    allInquiries.forEach((inquiry) => {
        let row = document.createElement("tr");
        row.innerHTML = `
            <th scope="row">${inquiry.id}</th>
            <td>${new Date(inquiry.createdAt).toLocaleDateString()}</td>
            <td>${inquiry.inquiryAbout}</td>
            <td>${
                inquiry.inquiryText ? inquiry.inquiryText.slice(0, 20) : "N/A"
            }</td>
            <td class="text-center">${
                inquiry.inquiryStatus === "opened"
                    ? "<span class='badge bg-danger'>Opened</span>"
                    : inquiry.inquiryStatus === "closed"
                    ? "<span class='badge bg-success'>Closed</span>"
                    : "<span class='badge bg-warning'>Replied</span>"
            }</td>
            <td class="text-center">
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#inquiry-details-modal" onclick="showInquiryDetails('${
                    inquiry.id
                }')">
                    <i
                        class="fa-solid fa-eye text-white"
                    ></i>
                </button>
            </td>
            `;
        inquiries.appendChild(row);
    });
    loading.style.visibility = "hidden";
};
