


var myButton = document.querySelectorAll(".inputBtn");

myButton.forEach(button=>{
    button.addEventListener('click',()=>{
        console.log("clicked");
        button.style.backgroundColor="green";
    });
});




