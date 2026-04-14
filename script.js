function login() {
  const username = document.getElementById("username").value;
  const role = document.getElementById("role").value;

  if (username === "") {
    alert("Enter username");
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("role", role);

  window.location.href = "dashboard.html";
}
