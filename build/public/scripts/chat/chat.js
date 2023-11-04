
const iconContainer = document.querySelector(".icon_search");
const inputContainer = document.querySelector(".input_container");

const headChat = document.querySelector(".search_chat_container");

const searchBack = document.getElementById("i_search_back")

iconContainer.addEventListener("click",(e)=>{
    for(let i of headChat.children){
        i.style.display = "none"
    }
    inputContainer.style.display = "block"
    inputContainer.style.animation = "MostrarInput linear 0.5s 1 forwards running"
    inputContainer.lastElementChild.style.display = "block";
    searchBack.classList.add("fa-solid");
    searchBack.classList.add("fa-arrow-left-long")
    inputContainer.firstElementChild.style.display = "block"
})


searchBack.addEventListener("click",(e)=>{
    for(let i of headChat.children){
        i.style.display = "flex"
    }
    console.log(inputContainer.lastElementChild)
    inputContainer.style.animation = "OcultarInput linear 0.5s 1 forwards running"
})


