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
    if (registerInputPassword.value !== registerInputConfirmPassword.value) {
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
                    <a href="${notification.type === "user"
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
                ${user.role !== "pending"
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
  const allowedServiceIDs = ["MCPCB", "SS", "DS", "MS", "S2P"];
  allServices.forEach((service, index) => {
    if (allowedServiceIDs.includes(service.id)) {
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
                            >${service.pricePerUnit
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
                            >${service.minimumSquareCm
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
                    <button class="btn btn-primary w-100" onclick="window.location.href='/new-order/${service.id
        }'">
                        Order Now
                    </button>
                </div>
            </div>
        `;
      services.appendChild(col);
    }
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
            <td>${inquiry.inquiryText
          ? inquiry.inquiryText.slice(0, 20) + "..."
          : "N/A"
        }</td>
            <td class="text-center">${inquiry.inquiryStatus === "opened"
          ? "<span class='badge bg-danger'>Opened</span>"
          : inquiry.inquiryStatus === "closed"
            ? "<span class='badge bg-success'>Closed</span>"
            : "<span class='badge bg-warning'>Replied</span>"
        }</td>
            <td class="text-center">
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#inquiry-details-modal" onclick="showInquiryDetails('${inquiry.id
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
                                    ${inquiry.createdBy === reply.replyBy
          ? "You"
          : "Admin"
        }
                                </h6>
                                <small
                                    class="text-secondary"
                                    >
                                    ${new Date(
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
      const reply = document.getElementById("inquiry-details-reply-text").value;
      if (reply) {
        try {
          $("#inquiry-details-modal").modal("hide");
          let loading = document.getElementById("inquiry-loading");
          loading.style.visibility = "visible";
          await axios.post("/api/inquiries/reply", {
            id: inquiry.id,
            reply,
          });
          document.getElementById("inquiry-details-reply-text").value = "";
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
            <td class="text-center">${inquiry.inquiryStatus === "opened"
          ? "<span class='badge bg-danger'>Opened</span>"
          : inquiry.inquiryStatus === "closed"
            ? "<span class='badge bg-success'>Closed</span>"
            : "<span class='badge bg-warning'>Replied</span>"
        }</td>
            <td class="text-center">
                <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#inquiry-details-modal" onclick="showInquiryDetailsAdmin('${inquiry.id
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
                                    ${inquiry.createdBy === reply.replyBy
          ? reply.replyBy
          : "You"
        }
                                </h6>
                                <small
                                    class="text-secondary"
                                    >
                                    ${new Date(
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

      const reply = document.getElementById("inquiry-details-reply-text").value;
      if (reply) {
        try {
          $("#inquiry-details-modal").modal("hide");
          let loading = document.getElementById("inquiry-loading");
          loading.style.visibility = "visible";
          await axios.post("/api/inquiries/reply", {
            id: inquiry.id,
            reply,
          });
          document.getElementById("inquiry-details-reply-text").value = "";
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
      inquiry.inquiryStatus === "opened" || inquiry.inquiryStatus === "replied"
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



//---------------------------profile section----------------------------
var editButton = document.getElementById('profilebutton');
// Add a click event listener to the button
editButton.addEventListener('click', function () {
  // Redirect to adminprofileEdit.html
  console.log("prakhar");
  window.location.href = '/adminprofileEdit';
});

const getAllDetailsCount = async () => {
  var usersCount = document.querySelector("#all-users")
  var uCount = await axios.get("/api/user/user-count")
  usersCount.textContent = uCount.data.data;
}

const getAllQueryCount = async () => {
  var queryCount = document.querySelector("#all-queries")
  var uCount = await axios.get("/api/inquiries/get-inquiries")
  console.log(uCount.data.inquiries.length);
  queryCount.textContent = uCount.data.inquiries.length;
}