document.addEventListener("DOMContentLoaded", function () {
    const pass1 = document.getElementById("password");
    const pass2 = document.getElementById("reenter-password");
    const errorMessage = document.getElementById("error-message");
    const form = document.getElementById("signup-form");

    form.addEventListener("submit", function (e) {
        if (pass1.value !== pass2.value) {
            e.preventDefault(); // prevent form submit
            errorMessage.textContent = "Passwords do not match. Please try again.";
        } else {
            errorMessage.textContent = ""; // clear error if matched
        }
    });
});
