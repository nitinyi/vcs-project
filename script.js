function login() {
  const username = document.getElementById("username").value;
  const role = document.getElementById("role").value;

  localStorage.setItem("user", username);
  localStorage.setItem("role", role);

  window.location.href = "dashboard.html";
}

function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}

window.onload = function () {
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  if (document.getElementById("userDisplay")) {
    document.getElementById("userDisplay").innerText = user + " (" + role + ")";
  }

  if (role === "teacher") {
    document.getElementById("uploadSection").style.display = "block";
  }

  loadFiles();
};

function uploadFile() {
  const file = document.getElementById("fileInput").files[0];
  const msg = document.getElementById("commitMsg").value;

  if (!file) return alert("Select a file");

  let files = JSON.parse(localStorage.getItem("files")) || [];

  files.push({
    name: file.name,
    msg: msg,
    version: files.length + 1
  });

  localStorage.setItem("files", JSON.stringify(files));

  alert("File uploaded!");
  loadFiles();
}

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
        <button>Download</button>
      </div>
    `;
  });
}
