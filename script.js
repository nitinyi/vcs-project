function login() {
    let username = document.getElementById("username").value;
    let role = document.getElementById("role").value;

    if (username === "") {
        alert("Please enter username");
        return;
    }

    localStorage.setItem("user", username);
    localStorage.setItem("role", role);

    window.location.href = "dashboard.html";
}