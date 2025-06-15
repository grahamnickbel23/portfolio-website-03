document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("signup-form");
    const email = document.getElementById("email");
    const pass1 = document.getElementById("password");
    const pass2 = document.getElementById("reenter-password");
    const errorMessage = document.getElementById("error-message");

    form.addEventListener("submit", async function (e) {

        // trhough mismatch of password
        if (pass1.value !== pass2.value) {
            e.preventDefault(); // prevent form submit
            errorMessage.textContent = "Passwords do not match. Please try again.";
            return
        }

        // upload data if no error
        try {
            const data = {
                email: email.value.trim(),
                password: pass1.value,
            }

            const response = await fetch("http://localhost:4000/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })

            if (response.ok) {
                alert("User registered successfully!");
                // You can redirect or clear the form here
                window.location.href = "login.html"; // Optional: redirect to login page
            } else {
                errorMessage.textContent = result.message || "Signup failed.";
            }

        } catch (err) {
            console.error("Signup error:", err);
            errorMessage.textContent = "Something went wrong. Try again.";
        }
    });
});

// let's connect to backend