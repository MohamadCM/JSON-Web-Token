const jwt = require('jsonwebtoken');
const secret = "Web programming";
const mockURL = "https://60aabbf866f1d00017773246.mockapi.io/api/v0/token";

function init() {
  if(localStorage.getItem("token")){
	const decoded = jwt.decode(localStorage.getItem("token"));
	document.getElementById("git__container").style.display = "block";
	document.getElementById("user__name").innerHTML = `Username: ${decoded.username}`;
	document.getElementById("user__role").innerHTML = `Role: ${decoded.role}`;
	}
}

/* Send Query to github */
function sendQuery() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
	const payload = {"username": username, "password" : password};
	validateAndSet();
}

/* Validate received JSON and Change HTML elements*/
function validateAndSet(data) {
	fetch(mockURL).then((response) => {
                if (response.ok) { // OK situation
                    response.json().then(async (data) => {
						const info = data[Math.floor(Math.random() * 2)];
						localStorage.setItem("token", info.token); // Add info to localstorage
						const decoded = jwt.decode(info.token);
						document.getElementById("git__container").style.display = "block";
						document.getElementById("user__name").innerHTML = `Username: ${decoded.username}`;
						document.getElementById("user__role").innerHTML = `Role: ${decoded.role}`;
                    })
                }
            }).catch(response => {
                handleError(undefined);
            })
}

function sendPostRes(){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", yourUrl, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.setRequestHeader('Authorization', `Bearer ${localStorage.getItem(token)}`);
	xhr.send(JSON.stringify({
		value: value
	}));
}
window.onload = init;
window.sendQuery = sendQuery