import { Modal, useMantineTheme } from "@mantine/core";
import React from "react"; 


function DeleteChat ({chatId,deleteModal, setDeleteModal}) {

    const theme = useMantineTheme();
    const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;

    const handleDelete = async () => {

       try{
        const response = await fetch(`${getUserUrl}chat/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: chatId }), 
        });
        const data = await response.json();
        console.log(data);
        if (response.ok) {
          setDeleteModal(false);
          alert("Chat deleted successfully");
          window.location.reload();
        }
       }catch(error){
        console.log(error);
       }
    }
  

    return(
    <Modal
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        overlayOpacity={0.55}
        overlayBlur={3}
        size="55%"
        opened={deleteModal}
        onClose={() => setDeleteModal(false)}
      >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Are you sure you want to <span style={{color:"red"}}>delete</span> this Chat?</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button  className="button logout-button"  style={{ marginRight: "10px" }}
        onClick={handleDelete}>Yes</button>
        <button className="button logout-button" onClick={() => setDeleteModal(false)}>No</button>

        </div>







        </Modal>
    )
}

export default DeleteChat;