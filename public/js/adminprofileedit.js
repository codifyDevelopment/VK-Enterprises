const adminprofileload = async function (){
    await (async function () {
        document.addEventListener('DOMContentLoaded', function () {
            const profilePhotoInput = document.getElementById('profilePhoto');
            const logoImage = document.querySelector('.card-body img');
            profilePhotoInput.addEventListener('change', function (event) {
                if (event.target.files.length > 0) {
                    const selectedFile = event.target.files[0];
                    const objectURL = URL.createObjectURL(selectedFile);
                    logoImage.src = objectURL;
                }
            });
            });
    })();
}