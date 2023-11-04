const form = document.querySelector(".needs-validation");

const nameInput = document.getElementById("first_name");
const lastNameInput = document.getElementById("last_name");
const emailInput = document.getElementById("email");
const countryInput = document.getElementById("country");
const cityInput = document.getElementById("city");
const zipInput = document.getElementById("zip");
const passwordInput = document.getElementById("password");
const passwordRepeatInput = document.getElementById("password_repeat");
const userNameInput = document.getElementById("user_name");

const responseContainer = document.querySelector(".response_container")
const response = document.querySelector(".response_p")

const logo = document.querySelector(".logo");

//if you click on the logo,we redirected from sig-in location
logo.addEventListener("click",()=>{
  window.location.href = "/api/";
})

form.addEventListener("submit",(e)=>{

    //avoid the default behavior
    e.preventDefault();

    //format to send all values from server
    const datos = {
        name : nameInput.value,
        lastName : lastNameInput.value,
        userName : userNameInput.value,
        email : emailInput.value,
        password : passwordInput.value,
        passwordRepeat : passwordRepeatInput.value,
        country : countryInput.value,
        city : cityInput.value
    };
    // get the current location
    const currentUrl = window.location.href;
    sendData(currentUrl,datos);
})

//send all data from server
function sendData(currentUrl,datos){
    fetch(currentUrl.concat("/createAccount"), {
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
        styleResponse(data)
      })
      .catch(error => {
        console.error('Error sending the request:', error);
      });
}

//show server response
function styleResponse(data) {
  const message = data.message;
  responseContainer.style.display = 'flex';

  if (message === true) {
    response.innerHTML = "Your account have been created successfully";
    response.style.color = "rgb(28, 169, 13)";
    cleanValuesInputs();
  } else {
    response.innerHTML = data.message;
    response.style.color = "rgb(200,0,10)"
  }
}

//clean all inputs values
function cleanValuesInputs(){
  for(let i of  document.querySelectorAll("input")){
    i.value = ""
  }
}
