// let searchButton = document.querySelector("#search")

// searchButton.addEventListener("click", ()=>{
//     console.log("button pressed")
//     sendApiRequest()
// })

// async function sendApiRequest(){
//     let APP_ID = "5006334e"
//     let API_KEY = "039d46d8d5d6d44baf7aac8f1ed3cb35"
//     let response = await fetch(``);
//     console.log(response)
// }

jQuery("#getFile").change(function () {
    alert(jQuery(this).val())
    
    var requestURL = "http://localhost:3000/sendbarcode";
    var fd = new FormData();
    fd.append('image', jQuery(this).val() /*, optional filename */)
    $.ajax({
        type: "POST",
        url: requestURL,
        data: fd,
        processData: false,
        contentType: false
        // success: success,
        // dataType: dataType
      });
});
