const formHandler = document.querySelector("#formHandler")

async function signInUpHandler(e) {
    e.preventDefault();
    const username = document.querySelector("#username-input").value.trim();
    const email = document.querySelector("#email-input").value.trim();
    const password = document.querySelector("#pw-input").value.trim();

    if (username && email && password) {
        const res = await fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            document.location.replace("/")
            console.log("sign up successful")
        } else {
            console.log("sign up failed")
        }
    }

    console.log(username)
    console.log(email)
    console.log(password)

}

formHandler.addEventListener("submit", signInUpHandler)