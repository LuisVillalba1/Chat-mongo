const socket = io()

const inputMessage = document.querySelector(".write_message_container");

inputMessage.addEventListener("keydown",(e)=>{
    if(e.key == "Enter"){
        socket.emit("message",inputMessage.value);
        inputMessage.value = ""
    }

})

const icon_send_message = document.getElementById("i_send_message");

icon_send_message.addEventListener("click",()=>{
    if(inputMessage.value.length > 0){
        socket.emit("message",inputMessage.value);
        inputMessage.value = ""
    }
})


const msgsContainer = document.querySelector(".messages")
const main_continer = document.querySelector(".chat_content_container_response")
const fragmento = document.createDocumentFragment()

const chat_content_response = document.querySelector(".chat_content_response");

socket.on("chat message",(msg)=>{
    if(msg.user){
        const divMessage = document.createElement("div");
        divMessage.classList.add("message_recived");

        const user = document.createElement("b");
        user.innerHTML = msg.user
        const message = document.createElement("p");
        message.innerHTML = msg.message;
        
        divMessage.appendChild(user);
        divMessage.appendChild(message);

        fragmento.appendChild(divMessage);
        msgsContainer.appendChild(fragmento);

        chat_content_response.scrollTop = chat_content_response.scrollHeight;
    }
    else{
        alert(msg.message);
        window.location.href = "/api/"
    }
})


// Mover el contenedor hacia abajo automáticamente para mostrar el nuevo mensaje
