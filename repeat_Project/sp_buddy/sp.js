const firebaseConfig = {
  apiKey: "AIzaSyDjGerna0AqzARHFxrnq4M1_116ohL5sOk",
  authDomain: "sports-buddy-35ae6.firebaseapp.com",
  databaseURL: "https://sports-buddy-35ae6.firebaseio.com",
  projectId: "sports-buddy-35ae6",
  storageBucket: "sports-buddy-35ae6.appspot.com",
  messagingSenderId: "283914287646",
  appId: "1:283914287646:web:8f9e2900d46957f44f0c0f"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

const registerBtn = document.getElementById("register-btn");
const loginBtn = document.getElementById("login-btn");
const userInfo = document.getElementById("user-info");
const eventSection = document.getElementById("event-section");
const addEventBtn = document.getElementById("add-event-btn");
const eventsList = document.getElementById("events-list");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const sportNameInput = document.getElementById("sport-name");
const locationInput = document.getElementById("location");
const timeInput = document.getElementById("time");

registerBtn.onclick = () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  auth.createUserWithEmailAndPassword("sakshichilla7@gmail.com", "sakshi1220")
    .then(() => alert("Registered successfully"))
    .catch((e) => alert(e.message));
};

loginBtn.onclick = () => {
  const email = emailInput.value;
  const password = passwordInput.value;
  auth.signInWithEmailAndPassword(email, password)
    .then((userCred) => {
      userInfo.textContent = `Logged in as ${userCred.user.email}`;
      eventSection.classList.remove("hidden");
      loadEvents(userCred.user.uid);
    })
    .catch((e) => alert(e.message));
};

addEventBtn.onclick = () => {
  const name = sportNameInput.value;
  const location = locationInput.value;
  const time = timeInput.value;
  const userId = auth.currentUser.uid;

  if (!name || !location || !time) {
    alert("All fields required");
    return;
  }

  const eventRef = db.ref("events").push();
  eventRef.set({ userId, name, location, time });

  sportNameInput.value = "";
  locationInput.value = "";
  timeInput.value = "";
};

function loadEvents(uid) {
  db.ref("events").on("value", (snapshot) => {
    const data = snapshot.val();
    eventsList.innerHTML = "";
    for (let id in data) {
      const event = data[id];
      if (event.userId === uid) {
        const div = document.createElement("div");
        div.innerHTML = `
          <strong>${event.name}</strong><br>
          Location: ${event.location}<br>
          Time: ${event.time}<br>
          <button onclick="deleteEvent('${id}')">Delete</button>
        `;
        eventsList.appendChild(div);
      }
    }
  });
}

function deleteEvent(id) {
  db.ref("events/" + id).remove();
}