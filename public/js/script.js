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
        // if (response.data.success) {
        window.location.href = "/dashboard";
        // }
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
    let companyName = document.getElementById("registerInputCompanyName").value;
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
        company: companyName,
    };
    try {
        loading.style.visibility = "visible";
        let response = await axios.post("/api/user/register", data);
        // if (response.data.success) {
        window.location.href = "/wait-for-approval";
        // }
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
        // if (response.data.success) {
        window.location.href = "/";
        // }
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
        // if (response.data.success) {
        notificationCount.innerHTML = response.data.unreadNotificationsCount;
        if (response.data.notifications.length === 0) {
            notifications.innerHTML = `
                    <li class="border-bottom text-center">
                        <a href="#" class="mb-0 dropdown-item text-wrap">
                            No new notifications
                        </a>
                    </li>`;
        } else {
            notifications.innerHTML = "";
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
                            : notification.type === "inquiry"
                            ? "/inquiries"
                            : "/dashboard"
                    }" class="mb-0 dropdown-item text-wrap">
                        ${notification.notificationText}
                    </a>
                `;
                notifications.appendChild(notificationElement);
            });
        }
        // }
    } catch (error) {
        console.log(error);
    }
};

const markNotificationAsRead = async function (e) {
    try {
        let response = await axios.get("/api/notification/mark-as-read");
        // if (response.data.success) {
        await getNotification();
        // }
    } catch (error) {
        console.log(error);
    }
};

// --------------------- ADMIN ---------------------
let usersList;

const getUserList = async function () {
    try {
        let response = await axios.get("/api/admin/get-users-list");
        // if (response.data.success) {
        // return response.data.data;
        usersList = response.data.data;
        // }
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
        // if (response.data.success) {
        // window.location.reload();
        await showUserList();
        // }
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
        // if (response.data.success) {
        // window.location.reload();
        await showUserList();
        // }
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
        // if (response.data.success) {
        // window.location.reload();
        await showUserList();
        // }
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
        // if (response.data.success) {
        // window.location.reload();
        await showUserList();
        // }
    } catch (error) {
        console.log(error);
    }
};

// --------------------- Services ---------------------
const fetchAllServices = async function () {
    try {
        let response = await axios.get("/api/services/get-all-services");
        // if (response.data.success) {
        // console.log(response.data.data);
        return response.data.data;
        // }
    } catch (error) {
        console.log(error);
    }
};

const showServices = async function () {
    await getNotification();
    let services = document.getElementById("user-services");
    services.innerHTML = "";
    const allServices = await fetchAllServices();
    allServices.forEach((service, index) => {
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
                    <button class="btn btn-primary w-100" onclick="window.location.href='/new-order?pcb-type=${
                        service.id
                    }'">
                        Order Now
                    </button>
                </div>
            </div>
        `;
        services.appendChild(col);
    });
};

// --------------------- Inquiries ---------------------
let allInquiries;
const fetchAllInquiries = async function () {
    try {
        let response = await axios.get("/api/inquiries/get-inquiries");
        // if (response.data.success) {
        // return response.data.inquiries;
        allInquiries = response.data.inquiries;
        // }
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
    await fetchAllInquiries();
    if (allInquiries.length === 0) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="6" class="text-center">
                No inquiries found
            </td>
        `;
        inquiries.appendChild(row);
    } else {
        allInquiries.forEach((inquiry) => {
            let row = document.createElement("tr");
            row.innerHTML = `
            <th scope="row">${inquiry.id}</th>
            <td>${new Date(inquiry.createdAt).toLocaleDateString()}</td>
            <td>${inquiry.inquiryAbout}</td>
            <td>${
                inquiry.inquiryText
                    ? inquiry.inquiryText.slice(0, 20) + "..."
                    : "N/A"
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
    }
    loading.style.visibility = "hidden";
};

const showInquiryDetails = async function (id) {
    let inquiryDetailsModalBody = document.getElementById(
        "inquiry-details-modal-body"
    );
    let inquiryDetailsAbout = document.getElementById("inquiry-details-about");
    let inquiryDetailsText = document.getElementById("inquiry-details-text");
    let inquiryDetailsDate = document.getElementById("inquiry-details-date");
    let inquiryDetailsId = document.getElementById("inquiry-details-id");
    let inquiryDetailsReply = document.getElementById("inquiry-details-reply");

    let inquiry = allInquiries.find((inquiry) => inquiry.id === parseInt(id));
    inquiryDetailsAbout.innerHTML = "Inquiry About: " + inquiry.inquiryAbout;
    inquiryDetailsText.innerHTML = inquiry.inquiryText;
    inquiryDetailsDate.innerHTML =
        "Inquiry Date: " + new Date(inquiry.createdAt).toLocaleDateString();
    inquiryDetailsId.innerHTML = "Inquiry ID: " + inquiry.id;
    if (inquiry.reply.length === 0) {
        inquiryDetailsReply.innerHTML = `
            <div class="col">
                <div class="card bg-danger-subtle">
                    <div class="card-body">
                        No reply found
                    </div>
                </div>
            </div>
        `;
    } else {
        inquiryDetailsReply.innerHTML = "";
        inquiry.reply.forEach((reply) => {
            let col = document.createElement("div");
            col.classList.add("col");
            col.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex">
                            <div
                                class="flex-grow-1"
                            >
                                <h6
                                    class="mb-0"
                                >
                                    ${
                                        inquiry.createdBy === reply.replyBy
                                            ? "You"
                                            : "Admin"
                                    }
                                </h6>
                                <small
                                    class="text-secondary"
                                    >
                                    ${
                                        new Date(
                                            reply.replyAt
                                        ).toLocaleDateString() +
                                        " " +
                                        new Date(
                                            reply.replyAt
                                        ).toLocaleTimeString()
                                    }
                                    </small
                                >
                            </div>
                        </div>
                        <p
                            class="text-dark my-3"
                        >
                            ${reply.reply}
                        </p>
                    </div>
                </div>
            `;
            inquiryDetailsReply.appendChild(col);
        });
    }
    const inquiryReplyForm = document.getElementById(
        "inquiry-details-reply-input"
    );
    // console.log(inquiry.inquiryStatus);
    if (inquiry.inquiryStatus === "closed") {
        //! BUG INQUIRY REPLY FORM

        inquiryReplyForm.innerHTML = `
        <div
            class="card bg-danger-subtle"
            id="inquiry-details-reply-not-allowed"
        >
            <div class="card-body">
                This inquiry is closed
            </div>
        </div>`;
    } else {
        //! BUG INQUIRY REPLY FORM
        inquiryReplyForm.innerHTML = `
        <div class="mb-3">
            <label
                for="reply-message"
                class="form-label"
                >Reply Message</label
            >
            <textarea
                class="form-control"
                id="inquiry-details-reply-text"
                rows="3"
                required
            ></textarea>
        </div>
        <button
            class="btn btn-primary float-end"
            id="inquiry-details-reply-btn"
        >
            <i
                class="fa-solid fa-reply text-white me-1"
            ></i>
            Reply
        </button>
        <button
            type="button"
            class="btn btn-danger float-end me-2"
            id="close-inquiry-btn"
        >
            Close Inquiry
        </button>`;
        const replyBtn = document.getElementById("inquiry-details-reply-btn");
        replyBtn.addEventListener("click", async function (e) {
            e.preventDefault();
            const reply = document.getElementById(
                "inquiry-details-reply-text"
            ).value;
            if (reply) {
                try {
                    $("#inquiry-details-modal").modal("hide");
                    let loading = document.getElementById("inquiry-loading");
                    loading.style.visibility = "visible";
                    await axios.post("/api/inquiries/reply", {
                        id: inquiry.id,
                        reply,
                    });
                    document.getElementById(
                        "inquiry-details-reply-text"
                    ).value = "";
                    $("#inquiry-details-modal").modal("hide");
                    await fetchAllInquiries();
                    await showInquiries();
                    // await showInquiryDetails(id);
                    // showNotification("Inquiry replied successfully", "success");
                } catch (error) {
                    console.log(error);
                }
            }
        });
        const closeInquiryBtn = document.getElementById("close-inquiry-btn");
        closeInquiryBtn.addEventListener("click", async function (e) {
            e.preventDefault();
            try {
                $("#inquiry-details-modal").modal("hide");
                let loading = document.getElementById("inquiry-loading");
                loading.style.visibility = "visible";
                await axios.post("/api/inquiries/close-inquiry", {
                    id: inquiry.id,
                    // inquiryStatus: "closed",
                });
                await showInquiries();
                // await showInquiryDetails(id);
                // showNotification("Inquiry closed successfully", "success");
            } catch (error) {
                console.log(error);
            }
        });
    }
};

const createInquiry = async function (e) {
    e.preventDefault();
    const inquiryAbout = document.getElementById("inquiry-about").value;
    const inquiryText = document.getElementById("inquiry-text").value;
    if (inquiryAbout && inquiryText) {
        try {
            $("#create-inquiry-modal").modal("hide");
            let loading = document.getElementById("inquiry-loading");
            loading.style.visibility = "visible";
            await axios.post("/api/inquiries/create-inquiry", {
                inquiryAbout,
                inquiryText,
            });
            $("#create-inquiry-modal").modal("hide");
            await showInquiries();
            document.getElementById("inquiry-about").value = "";
            document.getElementById("inquiry-text").value = "";
            // showNotification("Inquiry created successfully", "success");
        } catch (error) {
            console.log(error);
        }
    }
};

const resetCreateInquiryForm = function () {
    document.getElementById("inquiry-about").value = "";
    document.getElementById("inquiry-text").value = "";
};

const showInquiriesInTable = async function (data) {
    let inquiries = document.getElementById("inquiry-table-body");
    let loading = document.getElementById("inquiry-loading");
    loading.style.visibility = "visible";
    inquiries.innerHTML = "";
    if (data.length === 0) {
        let row = document.createElement("tr");
        row.innerHTML = `
            <td colspan="6" class="text-center">
                No inquiries found
            </td>
        `;
        inquiries.appendChild(row);
    } else {
        data.forEach((inquiry) => {
            let row = document.createElement("tr");
            row.innerHTML = `
            <th scope="row">${inquiry.id}</th>
            <td>${new Date(inquiry.createdAt).toLocaleDateString()}</td>
            <td>${inquiry.inquiryAbout}</td>
            <td>${inquiry.createdBy}</td>
            <td class="text-center">${
                inquiry.inquiryStatus === "opened"
                    ? "<span class='badge bg-danger'>Opened</span>"
                    : inquiry.inquiryStatus === "closed"
                    ? "<span class='badge bg-success'>Closed</span>"
                    : "<span class='badge bg-warning'>Replied</span>"
            }</td>
            <td class="text-center">
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#inquiry-details-modal" onclick="showInquiryDetailsAdmin('${
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
    }
    loading.style.visibility = "hidden";
};

const showInquiriesAdmin = async function () {
    try {
        let loading = document.getElementById("inquiry-loading");
        loading.style.visibility = "visible";
        await getNotification();
        await fetchAllInquiries();
        await showInquiriesInTable(allInquiries);
    } catch (error) {
        console.log(error);
    }
};

const showInquiryDetailsAdmin = async function (id) {
    let inquiryDetailsModalBody = document.getElementById(
        "inquiry-details-modal-body"
    );
    let inquiryDetailsAbout = document.getElementById("inquiry-details-about");
    let inquiryDetailsText = document.getElementById("inquiry-details-text");
    let inquiryDetailsDate = document.getElementById("inquiry-details-date");
    let inquiryDetailsId = document.getElementById("inquiry-details-id");
    let inquiryDetailsUser = document.getElementById("inquiry-details-user");
    let inquiryDetailsReply = document.getElementById("inquiry-details-reply");

    let inquiry = allInquiries.find((inquiry) => inquiry.id === parseInt(id));
    inquiryDetailsAbout.innerHTML = "Inquiry About: " + inquiry.inquiryAbout;
    inquiryDetailsText.innerHTML = inquiry.inquiryText;
    inquiryDetailsDate.innerHTML =
        "Inquiry Date: " + new Date(inquiry.createdAt).toLocaleDateString();
    inquiryDetailsId.innerHTML = "Inquiry ID: " + inquiry.id;
    inquiryDetailsUser.innerHTML = "Inquiry By: " + inquiry.createdBy;
    if (inquiry.reply.length === 0) {
        inquiryDetailsReply.innerHTML = `
            <div class="col">
                <div class="card bg-danger-subtle">
                    <div class="card-body">
                        No reply found
                    </div>
                </div>
            </div>
        `;
    } else {
        inquiryDetailsReply.innerHTML = "";
        inquiry.reply.forEach((reply) => {
            let col = document.createElement("div");
            col.classList.add("col");
            col.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex">
                            <div
                                class="flex-grow-1"
                            >
                                <h6
                                    class="mb-0"
                                >
                                    ${
                                        inquiry.createdBy === reply.replyBy
                                            ? reply.replyBy
                                            : "You"
                                    }
                                </h6>
                                <small
                                    class="text-secondary"
                                    >
                                    ${
                                        new Date(
                                            reply.replyAt
                                        ).toLocaleDateString() +
                                        " " +
                                        new Date(
                                            reply.replyAt
                                        ).toLocaleTimeString()
                                    }
                                    </small
                                >
                            </div>
                        </div>
                        <p
                            class="text-dark my-3"
                        >
                            ${reply.reply}
                        </p>
                    </div>
                </div>
            `;
            inquiryDetailsReply.appendChild(col);
        });
    }
    const inquiryReplyForm = document.getElementById(
        "inquiry-details-reply-input"
    );
    // console.log(inquiry.inquiryStatus);
    if (inquiry.inquiryStatus === "closed") {
        inquiryReplyForm.innerHTML = `
            <div class="card bg-danger-subtle">
                <div class="card-body">
                    This inquiry is closed
                </div>
            </div>
        `;
    } else {
        inquiryReplyForm.innerHTML = `
        <div class="mb-3">
            <label
                for="reply-message"
                class="form-label"
                >Reply Message</label
            >
            <textarea
                class="form-control"
                id="inquiry-details-reply-text"
                rows="3"
                required
            ></textarea>
        </div>
        <button
            class="btn btn-primary float-end"
            id="inquiry-details-reply-btn"
        >
            <i
                class="fa-solid fa-reply text-white me-1"
            ></i>
            Reply
        </button>
        <button
            type="button"
            class="btn btn-danger float-end me-2"
            id="close-inquiry-btn"
        >
            Close Inquiry
        </button>`;
        const replyBtn = document.getElementById("inquiry-details-reply-btn");
        replyBtn.addEventListener("click", async function (e) {
            e.preventDefault();

            const reply = document.getElementById(
                "inquiry-details-reply-text"
            ).value;
            if (reply) {
                try {
                    $("#inquiry-details-modal").modal("hide");
                    let loading = document.getElementById("inquiry-loading");
                    loading.style.visibility = "visible";
                    await axios.post("/api/inquiries/reply", {
                        id: inquiry.id,
                        reply,
                    });
                    document.getElementById(
                        "inquiry-details-reply-text"
                    ).value = "";
                    $("#inquiry-details-modal").modal("hide");
                    await showInquiriesAdmin();
                    // await showInquiryDetails(id);
                    // showNotification("Inquiry replied successfully", "success");
                } catch (error) {
                    console.log(error);
                }
            }
        });
        const closeInquiryBtn = document.getElementById("close-inquiry-btn");
        closeInquiryBtn.addEventListener("click", async function (e) {
            e.preventDefault();
            try {
                $("#inquiry-details-modal").modal("hide");
                let loading = document.getElementById("inquiry-loading");
                loading.style.visibility = "visible";
                await axios.post("/api/inquiries/close-inquiry", {
                    id: inquiry.id,
                    // inquiryStatus: "closed",
                });
                await showInquiries();
                // await showInquiryDetails(id);
                // showNotification("Inquiry closed successfully", "success");
            } catch (error) {
                console.log(error);
            }
        });
    }
};

const searchForInquiry = async function (e) {
    e.preventDefault();
    let searchInput = document.getElementById("search-inquiry-input").value;
    if (searchInput) {
        let filteredInquiries = allInquiries.filter((inquiry) => {
            return inquiry.createdBy.toLowerCase().includes(searchInput);
        });
        await showInquiriesInTable(filteredInquiries);
    } else {
        await showInquiriesInTable(allInquiries);
    }
};

const showOnlyOpenedInquiries = async function (e) {
    e.preventDefault();
    let filteredInquiries = allInquiries.filter(
        (inquiry) =>
            inquiry.inquiryStatus === "opened" ||
            inquiry.inquiryStatus === "replied"
    );
    await showInquiriesInTable(filteredInquiries);
};

const showOnlyClosedInquiries = async function (e) {
    e.preventDefault();
    let filteredInquiries = allInquiries.filter(
        (inquiry) => inquiry.inquiryStatus === "closed"
    );
    console.log(filteredInquiries.length);
    await showInquiriesInTable(filteredInquiries);
};

const showOnlyRepliedInquiries = async function (e) {
    e.preventDefault();
    let filteredInquiries = allInquiries.filter(
        (inquiry) => inquiry.inquiryStatus === "replied"
    );
    await showInquiriesInTable(filteredInquiries);
};

const showAllInquiries = async function (e) {
    e.preventDefault();
    await showInquiriesInTable(allInquiries);
};

// ----------------- NEW ORDER -----------------
const newOrderFormChangeHandler = async function () {
    await getNotification();
    // const mpcbbody = document.getElementById("mpcb-body");
    await (async function () {
        let pcbSize, pcbType;
        let allServices = await fetchAllServices();
        $("#pcb-type-input").html(
            `<option value="" disabled selected>Select an Option</option>`
        );
        allServices.forEach((service) => {
            $("#pcb-type-input").append(
                `<option value="${service.id}">${service.name}</option>`
            );
        });
        $("#pcb-type-input").on("change", function () {});
        $("input[name=pcb-size]").on("change", function () {
            if (this.value === "known")
                $("#pcb-size").after(`
                <div
                    class="col col-md-12"
                    id="pcb-size-known-inputs"
                >
                    <div class="row row-cols-1 row-cols-md-2 g-3">
                        <div class="col">
                            <label
                                class="form-label mb-2"
                                for="pcb-x-dimension-input"
                                >X Dimension
                                <span class="text-danger">*</span>
                            </label>
                            <div class="input-group">
                                <input
                                    type="number"
                                    class="form-control"
                                    placeholder="X Dimension in mm"
                                    name="pcb-x-dimension"
                                    id="pcb-x-dimension-input"
                                    required
                                />
                            </div>
                        </div>
                        <div class="col">
                            <label
                                class="form-label mb-2"
                                for="pcb-y-dimension-input"
                                >Y Dimension
                                <span class="text-danger">*</span>
                            </label>
                            <div class="input-group">
                                <input
                                    type="number"
                                    class="form-control"
                                    placeholder="Y Dimension in mm"
                                    name="pcb-y-dimension"
                                    id="pcb-y-dimension-input"
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>`);
            else $("#pcb-size-known-inputs").remove();
        });
        $("#mcpcb-led-package-input").on("change", function () {
            // console.log(this.val());
            if (this.value === "other led") {
                $("#mcpcb-led-package").after(`
                <div class="col other-led-package">
                    <label
                        class="form-label mb-2"
                        for="mcpcb-led-package-1-input"
                        >LED Package 1
                        <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                        <i
                            class="fas fa-file-upload input-group-text"
                            style="font-size: 1.5rem"
                        ></i>
                        <input
                            type="file"
                            class="form-control"
                            name="mcpcb-led-package-1"
                            id="mcpcb-led-package-1-input"
                            required
                        />
                    </div>
                </div>
                <div class="col other-led-package">
                    <label
                        class="form-label mb-2"
                        for="mcpcb-led-package-2-input"
                        >LED Package 2
                    </label>
                    <div class="input-group">
                        <i
                            class="fas fa-file-upload input-group-text"
                            style="font-size: 1.5rem"
                        ></i>
                        <input
                            type="file"
                            class="form-control"
                            name="mcpcb-led-package-2"
                            id="mcpcb-led-package-2-input"
                        />
                    </div>
                </div>
                `);
            } else $(".other-led-package").remove();
        });
        $("#mcpcb-connections-input").on("change", function () {
            $("#mcpcb-connections-details").remove();
            if (this.value === "SeriesXParallel") {
                return $("#mcpcb-connections").after(`
                    <div className="col" id="mcpcb-connections-details">
                        <label
                            for="mcpcb-SeriesXParallel-input"
                            class="form-label mb-2"
                        >
                            Series X Parallel
                            <span class="text-danger">*</span>
                        </label>
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Enter SeriesXParallel Combination"
                                name="mcpcb-SeriesXParallel"
                                id="mcpcb-SeriesXParallel-input"
                                required
                            />
                        </div>
                    </div>
                `);
            }
            if (this.value === "SeriesXParallelXDrivers") {
                return $("#mcpcb-connections").after(`
                    <div className="col" id="mcpcb-connections-details">
                        <label
                            for="mcpcb-SeriesXParallelXDrivers-input"
                            class="form-label mb-2"
                        >
                            Series X Parallel X NO. Drivers
                            <span class="text-danger">*</span>
                        </label>
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Enter SeriesXParallelXDrivers Combination"
                                name="mcpcb-SeriesXParallelXDrivers"
                                id="mcpcb-SeriesXParallelXDrivers-input"
                                required
                            />
                        </div>
                    </div>
                `);
            }
            if (this.value === "other combination") {
                return $("#mcpcb-connections").after(`
                    <div className="col" id="mcpcb-connections-details">
                        <label
                            for="mcpcb-other-connections-input"
                            class="form-label mb-2"
                        >
                            Any Spacial Connections
                            <span class="text-danger">*</span>
                        </label>
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                placeholder="Enter Other Connections"
                                name="mcpcb-other-connections"
                                id="mcpcb-other-connections-input"
                                required
                            />
                        </div>
                    </div>
                `);
            }
        });
        $("#led-placement-input").on("change", function () {
            if (this.value === "other")
                return $("#led-placement").after(`
                <div class="col other-led-placement">
                    <label
                        class="form-label mb-2"
                        for="mcpcb-led-placement-reference-1-input"
                        >Other Reference File 1
                        <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                        <i
                            class="fas fa-file-upload input-group-text"
                            style="font-size: 1.5rem"
                        ></i>
                        <input
                            type="file"
                            class="form-control"
                            name="mcpcb-led-placement-reference-1"
                            id="mcpcb-led-placement-reference-1-input"
                            required
                        />
                    </div>
                </div>
                <div class="col other-led-placement">
                    <label
                        class="form-label mb-2"
                        for="mcpcb-led-placement-reference-2-input"
                        >LED Package 2
                    </label>
                    <div class="input-group">
                        <i
                            class="fas fa-file-upload input-group-text"
                            style="font-size: 1.5rem"
                        ></i>
                        <input
                            type="file"
                            class="form-control"
                            name="mcpcb-led-placement-reference-2"
                            id="mcpcb-led-placement-reference-2-input"
                        />
                    </div>
                </div>`);
            else $(".other-led-placement").remove();
        });
        $("#mcpcb-silk-layer-print-input").on("change", function () {
            if (this.value === "company-logo")
                return $("#mcpcb-silk-layer-print").after(`
                <div class="col">
                    <label
                        class="form-label mb-2"
                        for="mcpcb-company-logo-input"
                        >Silk/Mask For Logo File
                        <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                        <i
                            class="fas fa-file-upload input-group-text"
                            style="font-size: 1.5rem"
                        ></i>
                        <input
                            type="file"
                            class="form-control"
                            name="mcpcb-company-logo"
                            id="mcpcb-company-logo-input"
                            required
                        />
                    </div>
                </div>
                `);
            else $("#mcpcb-company-logo-input").parent().parent().remove();
        });
        $("#mcpcb-more-related-attachments-input").on("change", function () {
            if (this.value === "yes")
                return $("#mcpcb-more-related-attachments").after(`
                <div class="col mcpcb-more-related-attachments-file">
                    <label
                        class="form-label mb-2"
                        for="mcpcb-more-related-attachments-file-input-1"
                        >More Related Attachments File 1
                        <span class="text-danger">*</span>
                    </label>
                    <div class="input-group">
                        <i
                            class="fas fa-file-upload input-group-text"
                            style="font-size: 1.5rem"
                        ></i>
                        <input
                            type="file"
                            class="form-control"
                            name="mcpcb-more-related-attachments-file-1"
                            id="mcpcb-more-related-attachments-file-input-1"
                            required
                        />
                    </div>
                </div>
                <div class="col mcpcb-more-related-attachments-file">
                    <label
                        class="form-label mb-2"
                        for="mcpcb-more-related-attachments-file-input-2"
                        >More Related Attachments File 2
                    </label>
                    <div class="input-group">
                        <i
                            class="fas fa-file-upload input-group-text"
                            style="font-size: 1.5rem"
                        ></i>
                        <input
                            type="file"
                            class="form-control"
                            name="mcpcb-more-related-attachments-file-2"
                            id="mcpcb-more-related-attachments-file-input-2"
                        />
                    </div>
                </div>
                `);
            else $(".mcpcb-more-related-attachments-file").remove();
        });

        if (new URLSearchParams(window.location.search).get("pcb-type")) {
            pcbType = new URLSearchParams(window.location.search).get(
                "pcb-type"
            );
            $("#pcb-type-input")
                .val(pcbType)
                .trigger("change")
                .attr("disabled", true);
        }

        $("#pcb-size-known").attr("checked", true).trigger("change");
    })();
};



new order//

var myButton = document.querySelectorAll(".inputBtn");

myButton.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("clicked");
    button.style.backgroundColor = "green";
  });
});
// for pcb size
const pcbSize = document.getElementById("pcbSize");
const knowField = document.getElementById("knowFields");

pcbSize.addEventListener("change", (e) => {
  if (e.target.value === "know") {
    knowField.style.display = "block";
  } else {
    knowField.style.display = "none";
  }
});

var selectedOption = document.getElementById("selected-option");

pcbType.addEventListener("change", function () {
  selectedOption.textContent = this.value;
});
// for pcb types
function showFields() {
  var pcbType = document.getElementById("pcbType").value;

  // Hide all the dynamic fields
  var dynamicFields = document.querySelectorAll(".dynamic-fields");
  for (var i = 0; i < dynamicFields.length; i++) {
    dynamicFields[i].style.display = "none";
  }

  // Show the dynamic fields for the selected PCB type
  if (pcbType === "LED") {
    document.getElementById("LEDFields").style.display = "block";
  } else if (pcbType === "single") {
    document.getElementById("singleFields").style.display = "block";
  } else if (pcbType === "double") {
    document.getElementById("doubleFields").style.display = "block";
  } else if (pcbType === "multi") {
    document.getElementById("multiFields").style.display = "block";
  } else if (pcbType === "Schematic To PCB") {
    document.getElementById("schematicFields").style.display = "block";
  } else if (pcbType === "Stencile") {
    document.getElementById("stencileFields").style.display = "block";
  } else if (pcbType === "Cam/Panelization") {
    document.getElementById("camFields").style.display = "block";
  } else if (pcbType === "Bill Of Material") {
    document.getElementById("billFields").style.display = "block";
  }
}

//Led PcB functions

function showOldRef() {
  let oldRef = document.getElementById("old-Ref");
  let oldRefYes = document.getElementById("old-RefYes");

  if (oldRef.value === "yes") {
    oldRefYes.style.display = "block";
  } else {
    oldRefYes.style.display = "none";
  }
}

function showSample() {
  let oldRef = document.getElementById("sample-body");
  let oldRefYes = document.getElementById("sample-bodyField");

  if (oldRef.value === "yes") {
    oldRefYes.style.display = "block";
  } else {
    oldRefYes.style.display = "none";
  }
}

function showOtherThick() {
  let oldRef = document.getElementById("singleLayerThickness");
  let oldRefYes = document.getElementById("other-led");

  if (oldRef.value === "other") {
    oldRefYes.style.display = "block";
  } else {
    oldRefYes.style.display = "none";
  }
}

var clickCount = 0;

function addInputFields() {
  if (clickCount < 3) {
    var form = document.getElementById("myForm");
    var count = form.getElementsByTagName("input").length;

    // Add two number input fields with labels for series and parallel
    form.innerHTML +=
      '<label for="input' +
      (count + 1) +
      '">Series:</label><input type="number" id="input' +
      (count + 1) +
      '" name="input' +
      (count + 1) +
      '"><br><label for="input' +
      (count + 2) +
      '">Parallel:</label><input type="number" id="input' +
      (count + 2) +
      '" name="input' +
      (count + 2) +
      '">';

    clickCount++;
  }
}

function showLedPlacement() {
  let ledPlacement = document.getElementById("led-placement");
  let addLens = document.getElementById("add-lens");

  if (ledPlacement.value === "lens") {
    addLens.style.display = "block";
  } else {
    addLens.style.display = "none";
  }
}

function showRequireFields() {
  let oldRef = document.getElementById("silk-layer");
  let oldRefYes = document.getElementById("print-require");

  if (oldRef.value === "printRequire") {
    oldRefYes.style.display = "block";
  } else {
    oldRefYes.style.display = "none";
  }
}

function showCompanyLogo() {
  let printRequireOptions = document.getElementById("print-require-options");
  let companyLogo = document.getElementById("company-logo");

  if (printRequireOptions.value === "companyLogo") {
    companyLogo.style.display = "block";
  } else {
    companyLogo.style.display = "none";
  }
}

function showSolderFields() {
  let oldRef = document.getElementById("solder-layer");
  let oldRefYes = document.getElementById("solder-print-require");

  if (oldRef.value === "printRequire") {
    oldRefYes.style.display = "block";
  } else {
    oldRefYes.style.display = "none";
  }
}

function showSolderLogo() {
  let solderLayer = document.getElementById("print-solder-layer");
  let solderCompanyLogo = document.getElementById("solder-company-logo");

  if (solderLayer.value === "companyLogo") {
    solderCompanyLogo.style.display = "block";
  } else {
    solderCompanyLogo.style.display = "none";
  }
}

function showDesignQueries() {
  let designQueries = document.getElementById("design-queries");
  let designYes = document.getElementById("design-yes");

  if (designQueries.value === "yes") {
    designYes.style.display = "block";
  } else {
    designYes.style.display = "none";
  }
}

// Single layer functions

function showOldDim() {
  let oldDim = document.getElementById("old-dim");
  let oldDimYes = document.getElementById("old-DimYes");

  if (oldDim.value === "yes") {
    oldDimYes.style.display = "block";
  } else {
    oldDimYes.style.display = "none";
  }
}

function showSingleSample() {
  let singleBody = document.getElementById("single-sample-body");
  let singleField = document.getElementById("single-bodyField");

  if (singleBody.value === "yes") {
    singleField.style.display = "block";
  } else {
    singleField.style.display = "none";
  }
}

function showPCBDesignType() {
  let PCBdesignType = document.getElementById("PCB-design-type");
  let copyWithUpdate = document.getElementById("copy-with-update");

  if (PCBdesignType.value === "update") {
    copyWithUpdate.style.display = "block";
  } else {
    copyWithUpdate.style.display = "none";
  }
}

function showUpdateCopper() {
  let updateCopper = document.getElementById("update-Copper");
  let copperClient = document.getElementById("copper-client");

  if (updateCopper.value === "client") {
    copperClient.style.display = "block";
  } else {
    copperClient.style.display = "none";
  }
}

function showSingleRequireFields() {
  let singleSilkLayer = document.getElementById("single-silk-layer");
  let requiredFields = document.getElementById("requiredFields");

  if (singleSilkLayer.value === "printRequire") {
    requiredFields.style.display = "block";
  } else {
    requiredFields.style.display = "none";
  }
}

function showBOMRequire() {
  let BOM = document.getElementById("BOM");
  let BOMRequire = document.getElementById("BOM-require");

  if (BOM.value === "printRequire") {
    BOMRequire.style.display = "block";
  } else {
    BOMRequire.style.display = "none";
  }
}

function showPanelization() {
  let Panelization = document.getElementById("Panelization");
  let paneRequire = document.getElementById("Pane-require");

  if (Panelization.value === "printRequire") {
    paneRequire.style.display = "block";
  } else {
    paneRequire.style.display = "none";
  }
}

function showSingleDesignQueries() {
  let designQueries = document.getElementById("single-design-queries");
  let designYes = document.getElementById("single-design-yes");

  if (designQueries.value === "yes") {
    designYes.style.display = "block";
  } else {
    designYes.style.display = "none";
  }
}

// double layer functions

function showDoubleOldDim() {
  let oldDim = document.getElementById("double-old-dim");
  let oldDimYes = document.getElementById("double-DimYes");

  if (oldDim.value === "yes") {
    oldDimYes.style.display = "block";
  } else {
    oldDimYes.style.display = "none";
  }
}

function showDoubleSample() {
  let singleBody = document.getElementById("double-sample-body");
  let singleField = document.getElementById("double-bodyField");

  if (singleBody.value === "yes") {
    singleField.style.display = "block";
  } else {
    singleField.style.display = "none";
  }
}

function showPCBDesignDouble() {
  let PCBdesignType = document.getElementById("PCB-design-double");
  let copyWithUpdate = document.getElementById("double-copy-with-update");

  if (PCBdesignType.value === "update") {
    copyWithUpdate.style.display = "block";
  } else {
    copyWithUpdate.style.display = "none";
  }
}

function showDoubleUpdateCopper() {
  let updateCopper = document.getElementById("double-update-Copper");
  let copperClient = document.getElementById("double-copper-client");

  if (updateCopper.value === "client") {
    copperClient.style.display = "block";
  } else {
    copperClient.style.display = "none";
  }
}

function showDoubleTopFields() {
  let singleSilkLayer = document.getElementById("double-silk-layer");
  let requiredFields = document.getElementById("doublerequiredFields");

  if (singleSilkLayer.value === "printRequire") {
    requiredFields.style.display = "block";
  } else {
    requiredFields.style.display = "none";
  }
}

function showDoubleBottomFields() {
  let singleSilkLayer = document.getElementById("double-bottom-silk-layer");
  let requiredFields = document.getElementById("doubleBottomrequiredFields");

  if (singleSilkLayer.value === "printRequire") {
    requiredFields.style.display = "block";
  } else {
    requiredFields.style.display = "none";
  }
}

function showdoubleBOMRequire() {
  let BOM = document.getElementById("double-BOM");
  let BOMRequire = document.getElementById("double-BOM-require");

  if (BOM.value === "printRequire") {
    BOMRequire.style.display = "block";
  } else {
    BOMRequire.style.display = "none";
  }
}

function showDoublePanelization() {
  let Panelization = document.getElementById("double-Panelization");
  let paneRequire = document.getElementById("double-Pane-require");

  if (Panelization.value === "printRequire") {
    paneRequire.style.display = "block";
  } else {
    paneRequire.style.display = "none";
  }
}

function showDoubleDesignQueries() {
  let designQueries = document.getElementById("double-design-queries");
  let designYes = document.getElementById("double-design-yes");

  if (designQueries.value === "yes") {
    designYes.style.display = "block";
  } else {
    designYes.style.display = "none";
  }
}

// multi layer funMulti

function showMultiOldDim() {
  let oldDim = document.getElementById("Multi-old-dim");
  let oldDimYes = document.getElementById("Multi-DimYes");

  if (oldDim.value === "yes") {
    oldDimYes.style.display = "block";
  } else {
    oldDimYes.style.display = "none";
  }
}

function showMultiSample() {
  let singleBody = document.getElementById("Multi-sample-body");
  let singleField = document.getElementById("Multi-bodyField");

  if (singleBody.value === "yes") {
    singleField.style.display = "block";
  } else {
    singleField.style.display = "none";
  }
}

function showPCBDesignMulti() {
  let PCBdesignType = document.getElementById("PCB-design-Multi");
  let copyWithUpdate = document.getElementById("Multi-copy-with-update");

  if (PCBdesignType.value === "update") {
    copyWithUpdate.style.display = "block";
  } else {
    copyWithUpdate.style.display = "none";
  }
}

function showMultiUpdateCopper() {
  let updateCopper = document.getElementById("Multi-update-Copper");
  let copperClient = document.getElementById("Multi-copper-client");

  if (updateCopper.value === "client") {
    copperClient.style.display = "block";
  } else {
    copperClient.style.display = "none";
  }
}

function showMultiTopFields() {
  let singleSilkLayer = document.getElementById("Multi-silk-layer");
  let requiredFields = document.getElementById("MultirequiredFields");

  if (singleSilkLayer.value === "printRequire") {
    requiredFields.style.display = "block";
  } else {
    requiredFields.style.display = "none";
  }
}

function showMultiBottomFields() {
  let singleSilkLayer = document.getElementById("Multi-bottom-silk-layer");
  let requiredFields = document.getElementById("MultiBottomrequiredFields");

  if (singleSilkLayer.value === "printRequire") {
    requiredFields.style.display = "block";
  } else {
    requiredFields.style.display = "none";
  }
}

function showMultiBOMRequire() {
  let BOM = document.getElementById("Multi-BOM");
  let BOMRequire = document.getElementById("Multi-BOM-require");

  if (BOM.value === "printRequire") {
    BOMRequire.style.display = "block";
  } else {
    BOMRequire.style.display = "none";
  }
}

function showMultiPanelization() {
  let Panelization = document.getElementById("Multi-Panelization");
  let paneRequire = document.getElementById("Multi-Pane-require");

  if (Panelization.value === "printRequire") {
    paneRequire.style.display = "block";
  } else {
    paneRequire.style.display = "none";
  }
}

function showMultiDesignQueries() {
  let designQueries = document.getElementById("Multi-design-queries");
  let designYes = document.getElementById("Multi-design-yes");

  if (designQueries.value === "yes") {
    designYes.style.display = "block";
  } else {
    designYes.style.display = "none";
  }
}

//schematic fields

function showSchematicOldDim() {
  let oldDim = document.getElementById("Schematic-old-dim");
  let oldDimYes = document.getElementById("Schematic-DimYes");

  if (oldDim.value === "yes") {
    oldDimYes.style.display = "block";
  } else {
    oldDimYes.style.display = "none";
  }
}

function showSchematicSample() {
  let singleBody = document.getElementById("Schematic-sample-body");
  let singleField = document.getElementById("Schematic-bodyField");

  if (singleBody.value === "yes") {
    singleField.style.display = "block";
  } else {
    singleField.style.display = "none";
  }
}

function showSchamticTrack() {
  let oldDim = document.getElementById("Schamtic-track");
  let oldDimYes = document.getElementById("Schamtic-TrackYes");

  if (oldDim.value === "yes") {
    oldDimYes.style.display = "block";
  } else {
    oldDimYes.style.display = "none";
  }
}

function showSchamticLayers() {
  let singleBody = document.getElementById("Schamtic-layers");
  let singleField = document.getElementById("Schamtic-LayersYes");

  if (singleBody.value === "yes") {
    singleField.style.display = "block";
  } else {
    singleField.style.display = "none";
  }
}
function showSchamticComment() {
  let singleBody = document.getElementById("Schamtic-comment");
  let singleField = document.getElementById("Schamtic-CommentYes");

  if (singleBody.value === "yes") {
    singleField.style.display = "block";
  } else {
    singleField.style.display = "none";
  }
}

//Stencile

function showStencileText() {
  let singleBody = document.getElementById("stencile-text");
  let singleField = document.getElementById("stencile-text-yes");

  if (singleBody.value === "yes") {
    singleField.style.display = "block";
  } else {
    singleField.style.display = "none";
  }
}

// cam Fields

function showCamText() {
  let singleBody = document.getElementById("cam-text");
  let singleField = document.getElementById("cam-text-yes");

  if (singleBody.value === "yes") {
    singleField.style.display = "block";
  } else {
    singleField.style.display = "none";
  }
}
// bill Fields

function showBillText() {
  let singleBody = document.getElementById("bill-text");
  let singleField = document.getElementById("bill-text-yes");

  if (singleBody.value === "yes") {
    singleField.style.display = "block";
  } else {
    singleField.style.display = "none";
  }
}