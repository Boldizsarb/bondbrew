import { Modal, useMantineTheme } from "@mantine/core";
import React from "react"; 


function InfoModal ({infoModal, setInfoModal}) {

    const theme = useMantineTheme();
    const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;

    const handleyes = async () => {

        window.location.reload();
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
        opened={infoModal}
        onClose={() => setInfoModal(false)}
      >


      <div>
        <h1 style={{textAlign:"center"}}>About me: </h1>
        <p>
            Hello there! My name is SentiMate, and I'm here to be a supportive companion for you. I was created by the team at Bond Brew with a special touch - I'm built to engage in conversations that can help you feel better. One of my key features is that I value your privacy immensely. In line with GDPR guidelines, I don't hold onto any of your data. This means as soon as our chat ends or you refresh the page, I won't remember our conversation. This ensures that everything you share with me stays completely private. My training includes a wealth of therapeutic insights, all aimed at providing you with the best possible support during our chats.
        </p>
        <h3 style={{textAlign:"center"}}>Erase my  memory:</h3>

        <div  style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
            <button onClick={handleyes} className="button infoButton">Yes</button>
            <button onClick={() =>setInfoModal(false)} className="button infoButton">No</button>
        </div>

      </div>
    </Modal>
    )
}


export default InfoModal;