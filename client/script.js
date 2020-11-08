let searchButton = document.querySelector("#search")

searchButton.addEventListener("click", ()=>{
    console.log("button pressed")
    sendApiRequest()
})

async function sendApiRequest(){
    let APP_ID = "5006334e"
    let API_KEY = "039d46d8d5d6d44baf7aac8f1ed3cb35"
    let response = await fetch(``);
    console.log(response)
}
