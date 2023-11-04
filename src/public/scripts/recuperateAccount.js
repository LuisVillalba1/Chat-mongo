const form_recuperate = document.getElementById("form_password");
const password = document.getElementById("password");
const repeatPassword = document.getElementById("repeat_password")

form_recuperate.addEventListener("submit",(e)=>{
    e.preventDefault()

    const datos = {
        password : password.value,
        repeatPassword : repeatPassword.value
    }


    const currentUrl = window.location.href;

    enviarDatos(currentUrl,datos)
})



const enviarDatos = (currentUrl,datos)=>{
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
        showData(data)
      })
      .catch(error => {
        console.error('Error sending the request:', error);
      });
}


const showData = (data)=>{
    const response_server = document.querySelector(".response_server");
    const response_server_container = document.getElementById("response_server_container");

    response_server_container.style.display = "block";
    if(data.type == "Error"){
        response_server.innerHTML = data.message;
        response_server.style.color = "rgb(200,0,10)"
    }
    else{
        response_server.innerHTML = data.message;
        response_server.style.color = "rgb(28, 169, 13)"
    }
    password.value = "";
    repeatPassword.value = "";
}