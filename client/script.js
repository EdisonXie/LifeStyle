jQuery("#getFile").change(function () {
    if($('input[type=file]')[0].files[0] != null){
      // document.getElementById("renderImage").innerHTML = '<img src="'+frEvent.target.result+'" />';
      var requestURL = "http://localhost:3000/sendbarcode";
      var fd = new FormData();
      fd.append('image', $('input[type=file]')[0].files[0] /*, optional filename */)

      $.ajax({
        type: "POST",
        url: requestURL,
        data: fd,
        processData: false,
        contentType: false,
        success: function(msg, status, jqHXR){
          var res = msg;
          console.log(res+"_"+JSON.stringify(res))
          if(res["Successful"]){

          }
        },
        dataType: "json"
      });
    }
});

