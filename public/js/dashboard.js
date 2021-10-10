

function evtDelegation(e) {
    let click = e.target

    if (click.matches(".remove-card")) {
        let id = click.id
        let tab = click.getAttribute("data-tab")


        removeCard(id, tab)
    }
}

async function removeCard(id, tab) {


    let response = await fetch(`/api/movie/${tab}/${id}`, {
        method: "DELETE",
        body: {

        }
    })
    if (response.ok) {
        document.location.reload()
    }
}

// document.querySelector(".modal-content").addEventListener("click", evtDelegation)
document.querySelector(".container-lg").addEventListener("click", evtDelegation)