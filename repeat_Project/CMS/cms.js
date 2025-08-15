window.addEventListener("DOMContentLoaded", () => {
  const firebaseConfig = {
    apiKey: "AIzaSyDeL-NApnVFQe3Vgo3GAwlOEANUy9d77SU",
    authDomain: "clinic-management-system-3b0e2.firebaseapp.com",
    databaseURL: "https://clinic-management-system-3b0e2.firebaseio.com",
    projectId: "clinic-management-system-3b0e2",
    storageBucket: "clinic-management-system-3b0e2.appspot.com",
    messagingSenderId: "73082996656",
    appId: "1:73082996656:web:818df1922a08d79539f875"
  };

  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.database();

  const loginBtn = document.getElementById("login-btn");
  const roleSelect = document.getElementById("role");
  const email = document.getElementById("email");
  const password = document.getElementById("password");
  const userInfo = document.getElementById("user-info");

  const receptionistSection = document.getElementById("receptionist-section");
  const doctorSection = document.getElementById("doctor-section");

  auth.createUserWithEmailAndPassword("sakshichilla7@gmail.com", "sakshi1220")
  .then((userCred) => {
    const uid = userCred.user.uid;
    db.ref("users/" + uid).set({ role: "doctor" });
    alert("Doctor account created");
  })
  .catch((e) => alert(e.message));

  console.log("Trying to login with:", "sakshichilla7@gmail.com", "sakshi1220");

  loginBtn.onclick = () => {
    const userEmail = email.value.trim();
    const userPassword = password.value.trim();

    if (!userEmail || !userPassword) {
      alert("Please enter both email and password");
      return;
    }

    auth.signInWithEmailAndPassword(userEmail, userPassword)
      .then((userCred) => {
        const uid = userCred.user.uid;
        db.ref("users/" + uid).once("value").then(snapshot => {
          const role = snapshot.val().role;
          userInfo.textContent = `Logged in as ${userCred.user.email} (${role})`;
          receptionistSection.classList.toggle("hidden", role !== "receptionist");
          doctorSection.classList.toggle("hidden", role !== "doctor");
          if (role === "doctor") loadPatients();
        });
      })
      .catch((e) => {
        alert("Login failed: " + e.message);
      });
  };

  document.getElementById("assign-token-btn").onclick = () => {
    const name = document.getElementById("patient-name").value;
    const age = document.getElementById("patient-age").value;
    const problem = document.getElementById("patient-problem").value;
    const token = Date.now().toString().slice(-5);

    db.ref("patients").push().set({
      name, age, problem, token, prescription: ""
    });

    alert(`Token ${token} assigned`);
  };

  document.getElementById("generate-bill-btn").onclick = () => {
    const amount = document.getElementById("bill-amount").value;
    alert(`Bill of ₹${amount} generated`);
  };

  function loadPatients() {
    const list = document.getElementById("patient-list");
    db.ref("patients").on("value", snapshot => {
      const data = snapshot.val();
      list.innerHTML = "";
      for (let id in data) {
        const p = data[id];
        const div = document.createElement("div");
        div.innerHTML = `
          <strong>${p.name}</strong> (Age: ${p.age})<br>
          Problem: ${p.problem}<br>
          Token: ${p.token}<br>
          <input type="text" placeholder="Prescription" value="${p.prescription}"/>
          <button onclick="savePrescription('${id}', this.previousElementSibling.value)">Save</button>
        `;
        list.appendChild(div);
      }
    });
  }

  window.savePrescription = function(id, text) {
    db.ref("patients/" + id).update({ prescription: text });
    alert("Prescription saved");
  };
});