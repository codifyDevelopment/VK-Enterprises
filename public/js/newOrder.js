var productId = document.getElementById("orderId");

productId.value = Math.floor(100000000 + Math.random() * 900000000);

var myButton = document.querySelectorAll(".inputBtn");

myButton.forEach((button) => {
    button.addEventListener("click", () => {
        console.log("clicked");
        button.style.backgroundColor = "green";
    });
});
