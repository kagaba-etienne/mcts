const CFrom = document.getElementById("contact-form");


CFrom.onsubmit = async (event) => {
    event.preventDefault()
    const formData = new FormData(CFrom);

    let response = await fetch("https://mcts-bn.cyclic.app/contact", {
        method: "POST",
        body: formData
    })
    response = await response.json()

    if (response.status == 200) {
        CFrom.reset()
        Toastify({
            text: "Query sent successfully!",
            duration: 3000,
          }).showToast();
    } else {
        Toastify({
            text: "Query was not sent",
            duration: 3000,
          }).showToast();
    }
}