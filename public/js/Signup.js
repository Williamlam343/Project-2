const signUpFormHandler = document.querySelector("#singUpFormHandler")

const signUpHandler = async (event) => {
    event.preventDefault();
    const username = document.querySelector("#username-input").value.trim();
    const email = document.querySelector("#email-input").value.trim();
    const password = document.querySelector("#pw-input").value.trim();

    if (username && email && password) {
        const res = await fetch('/api/user/signup', {
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

}

formHandler.addEventListener("submit", signUpHandler)