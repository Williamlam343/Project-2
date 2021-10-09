function setActive(e) {
    let tab = e.target
    tab.classList.toggle("active")

}


document.querySelector(".nav-tabs").addEventListener("click", setActive)