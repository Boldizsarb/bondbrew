import { Modal, useMantineTheme } from "@mantine/core";
import React from "react";

function PostModal({ modalOpened, setModalOpened, imageName }) {
  const theme = useMantineTheme();
  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      size="55%"
      opened={modalOpened}
      onClose={() => setModalOpened(false)}
    >
    
        <img src={imageName} style={{ maxWidth: "80%", maxHeight: "80%"}} />
     
    </Modal>
  );
}


export default PostModal;

