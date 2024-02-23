import { Modal, useMantineTheme } from "@mantine/core";
import React from "react";
import { useSelector, useDispatch } from "react-redux";


function ConfirmDelete({ modalOpened1, setModalOpened1, deletePost, postId}) {
  const theme = useMantineTheme();
  const { user } = useSelector((state) => state.authReducer.authData);

 
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
      opened={modalOpened1}
      onClose={() => setModalOpened1(false)}
    >
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2>Are you sure you want to <span style={{color:"red"}}>delete</span> this post?</h2>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          className="button logout-button"
          style={{ marginRight: "10px" }}
          onClick={() => {
            deletePost(postId);
            setModalOpened1(false);
          }}
        >
          Yes
        </button>
        <button className="button logout-button" onClick={() => setModalOpened1(false)}>No</button>
      </div>
    </Modal>
  );
}


export default ConfirmDelete;