var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var tel = document.getElementById("tel");
var message = document.getElementById("message");

function containsText(element) {
    if (element.value < 1) {
        element.style.backgroundColor = "darkred";
    } else {
        element.style.backgroundColor = "#24252a";
    };
}

fname.addEventListener("input", () => {
    containsText(fname);
});

lname.addEventListener("input", () => {
    containsText(lname);
});

tel.addEventListener("input", () => {
    containsText(tel);
});
message.addEventListener("message", () => {
    containsText(message);
});

var m = document.getElementById("m");
var f = document.getElementById("f");
var other = document.getElementById("other");
let gender;

m.addEventListener("change", () => {
    if (m.checked) {
        f.checked = false;
        other.checked = false;
        gender = 0;
    }
})
f.addEventListener("change", () => {
    if (f.checked) {
        m.checked = false;
        other.checked = false;
        gender = 1;
    }
})
other.addEventListener("change", () => {
    if (other.checked) {
        m.checked = false;
        f.checked = false;
        gender = 2;
    }
})

var dob = document.getElementById("dob");
var email = document.getElementById("email");

email.addEventListener("input", () => {
    containsText(email);
});

var example = document.getElementById("file");
example.addEventListener("change", () => {
    console.log(example.files[0]);
});

async function validate() {
    if (fname.value.length < 1 || lname.value.length < 1 || (!m.checked && !f.checked && !other.checked) || dob.value == "" || email.value.length < 1 || tel.value.length < 1 || message.value.length < 1) {
        alert("Please fill out all the required fields!")
        return;
    };
    let data = {};
    data[tel.value] = {
        fname: fname.value,
        lname: lname.value,
        gender: gender,
        dob: dob.value,
        email: email.value,
        message: message.value
    };
    let response = await fetch('http://localhost:80/', {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    console.log(response.body);
    alert("Your data has been sent!");
}