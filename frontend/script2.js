document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const loginEmail = document.getElementById("login-email");
    const loginPassword = document.getElementById("login-password");
    const loginErrorMessage = document.getElementById("login-error-message");

    if (loginForm) {
        loginForm.addEventListener("submit", async function (e) {
            e.preventDefault();

            try {
                const loginData = {
                    email: loginEmail.value.trim(),
                    password: loginPassword.value
                };

                const response = await fetch("http://localhost:4000/auth/login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(loginData)
                });

                if (response.ok) {
                    const result = await response.json();
                    alert("Login successful!");
                    // Optionally store token if backend sends one
                    // localStorage.setItem("token", result.token);
                    window.location.href = "../../index.html";  // Redirect to homepage
                } else {
                    const result = await response.json();
                    if (response.status == 404) {
                        alert(result.message || 'User Not Found')
                    } else if (response.status == 401) {
                        alert(result.message || 'Invalid Credential')
                    }
                }

            } catch (err) {
                console.error("Login error:", err);
                loginErrorMessage.textContent = "Something went wrong. Try again.";
            }
        });
    }
});
