// LOGIN
function login() {
  const username = document.getElementById("username").value;
  const role = document.getElementById("role").value;

  if (!username) {
    alert("Enter username");
    return;
  }

  localStorage.setItem("user", username);
  localStorage.setItem("role", role);

  window.location.href = "dashboard.html";
}

// LOGOUT (FIXED)
function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("role");
  window.location.href = "index.html";
}

// ON LOAD
window.onload = function () {
  const isDashboard = window.location.pathname.includes("dashboard.html");
  if (!isDashboard) return;  // ← ADD THESE TWO LINES

  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  if (!user) {
    window.location.href = "index.html";
    return;
  }

  if (document.getElementById("userDisplay")) {
    document.getElementById("userDisplay").innerText = user + " (" + role + ")";
  }

  if (role === "teacher") {
    document.getElementById("uploadSection").style.display = "block";
  }

  loadFiles();
};

// UPLOAD FILE (REAL STORAGE)
function uploadFile() {
  const file = document.getElementById("fileInput").files[0];
  const msg = document.getElementById("commitMsg").value;

  if (!file) return alert("Select a file");

  const reader = new FileReader();

  reader.onload = function (e) {
    let files = JSON.parse(localStorage.getItem("files")) || [];

    files.push({
      name: file.name,
      msg: msg,
      version: files.length + 1,
      data: e.target.result
    });

    localStorage.setItem("files", JSON.stringify(files));

    alert("File uploaded!");
    loadFiles();
  };

  reader.readAsDataURL(file);
}

// LOAD FILES + DOWNLOAD
function loadFiles() {
  const fileList = document.getElementById("fileList");
  if (!fileList) return;

  let files = JSON.parse(localStorage.getItem("files")) || [];

  fileList.innerHTML = "";

  files.forEach(f => {
    fileList.innerHTML += `
      <div class="file-card">
        <h3>${f.name}</h3>
        <p>${f.msg}</p>
        <p>Version ${f.version}</p>
        <a href="${f.data}" download="${f.name}">
          <button>Download</button>
        </a>
      </div>
    `;
  });
}
