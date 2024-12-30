// CLIENT_SEND_MASSAGE

    const formSendData = document.querySelector(".chat .inner-form");
    if(formSendData){
        formSendData.addEventListener("submit", (e) => {
            e.preventDefault();
            const content = e.target.elements.content.value;
            // console.log(content);
            if(content) {
                socket.emit("CLIENT_SEND_MASSAGE", content);

                e.target.elements.content.value="";
            }
        })
    }

// CLIENT_SEND_MASSAGE