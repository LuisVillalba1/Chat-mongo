const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password")

const form = document.querySelector("form");

const errorP = document.querySelector(".error_p");

form.addEventListener("submit",(e)=>{
    //avoid default behavior
    e.preventDefault();

    // // create account format to send from server
    const account = {
        email : inputEmail.value,
        password : inputPassword.value
    };

    // //get the current url
    const currentUrl = window.location.href;
    sendData(currentUrl,account);
})

//send data to server and checks the values
async function sendData(currentUrl, account) {
    try {
      const response = await fetch(currentUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(account),
      });
      const data = await response.json();

      if(response.status === 303) {
        cleanValuesInputs();
        console.log(data);
        localStorage.setItem("userName",data.user)
        window.location.href = data.location;
      }
      else if(data.type == "Error"){
        errorP.innerHTML = data.message;
        errorP.style.color = "rgb(200,0,10)";
      }
    } catch (e) {
      console.error('Error sending the request:', e);
    }
}

//clean all inputs values
function cleanValuesInputs(){
    const inputs = document.querySelectorAll("input")
    for(let i of inputs){
        i.value = ""
    }
}