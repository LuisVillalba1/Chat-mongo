const form = document.getElementById("form_password");
const email_data = document.getElementById("email")


form.addEventListener("submit",(e)=>{
    e.preventDefault();


    const currentUrl = window.location.href;
    const data = {
        email : email_data.value
    };
    sendEmail(currentUrl,data)
})


function sendEmail (currentUrl,datos){
    fetch(currentUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        //convert data to json format
        body: JSON.stringify(datos),
      })
      .then(response => response.json())
      .then(data => {
        //show server response to the user
        showResponse(data)
      })
      .catch(error => {
        console.error('Error sending the request:', error);
      });
}


function showResponse(data){
    const responseServerP = document.querySelector(".response_server");
    const responseContainer = document.getElementById("response_server_container")
    responseContainer.style.display = "block"
    if(data.type == "Error"){
        responseServerP.innerHTML = data.message;
        responseServerP.style.color = "rgb(200,0,10)"
    }
    else{
        responseServerP.innerHTML = data.message;
        responseServerP.style.color = "rgb(28, 169, 13)"
    }
    email_data.value = ""
}