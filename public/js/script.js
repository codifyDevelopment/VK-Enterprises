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

var myButton = document.querySelectorAll(".inputBtn");

myButton.forEach((button) => {
  button.addEventListener("click", () => {
    console.log("clicked");
    button.style.backgroundColor = "green";
  });
});
// for pcb size
const pcbSize = document.getElementById("pcbSize");
const knowField = document.getElementById("knowFields")

pcbSize.addEventListener('change',(e)=>{
  if(e.target.value === "know"){
    knowField.style.display = "block";
  }else{
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
  } else if (pcbType === "multi") {
    document.getElementById("multiFields").style.display = "block";
  }
}

//Led PcB functions

function showOldRef(){
  let oldRef = document.getElementById("old-Ref");
  let oldRefYes = document.getElementById("old-RefYes");

  if(oldRef.value === "yes"){
    oldRefYes.style.display = "block";
  } else{
    oldRefYes.style.display = "none";
  }
}

function showSample(){
 let oldRef = document.getElementById("sample-body");
 let oldRefYes = document.getElementById("sample-bodyField");

 if (oldRef.value === "yes") {
   oldRefYes.style.display = "block";
 } else {
   oldRefYes.style.display = "none";
 }
};

function showOtherThick() {
  let oldRef = document.getElementById("singleLayerThickness");
  let oldRefYes = document.getElementById("other-led");

  if (oldRef.value === "other") {
    oldRefYes.style.display = "block";
  } else {
    oldRefYes.style.display = "none";
  }
};

function showLedPlacement(){

  let ledPlacement = document.getElementById("led-placement");
  let addLens = document.getElementById("add-lens");

  if(ledPlacement.value === "lens"){
    addLens.style.display = "block";
  } else {
    addLens.style.display = "none";
  }
};

function showRequireFields(){
   let oldRef = document.getElementById("silk-layer");
  let oldRefYes = document.getElementById("print-require");

  if (oldRef.value === "printRequire") {
    oldRefYes.style.display = "block";
  } else {
    oldRefYes.style.display = "none";
  }
};

function showCompanyLogo(){
  let printRequireOptions = document.getElementById("print-require-options");
  let companyLogo = document.getElementById("company-logo");
  
  if(printRequireOptions.value ==="companyLogo"){
    companyLogo.style.display = "block";
  } else {
    companyLogo.style.display = "none";
  }
};

function showSolderLogo(){
  let solderLayer = document.getElementById("solder-layer");
  let solderCompanyLogo = document.getElementById("solder-company-logo");

  if(solderLayer.value === "companyLogo"){
    solderCompanyLogo.style.display = "block";
  } else {
    solderCompanyLogo.style.display = "none";
  }
};

function showDesignQueries(){
  let designQueries = document.getElementById("design-queries");
  let designYes = document.getElementById("design-yes");

  if(designQueries.value === "yes"){
    designYes.style.display = "block";
  } else {
    designYes.style.display = "none";
  }
};