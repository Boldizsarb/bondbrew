import { Modal, useMantineTheme } from "@mantine/core";
import React from "react";
import "./planBox.css";


function ConfirmDeletePlan({ modalOpened, setModalOpened, handleDelete,id}) {
    const theme = useMantineTheme();
    // const { user } = useSelector((state) => state.authReducer.authData);
    
     
    return (
        <Modal id="delete-plan-modal"
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
        <div style={{ display: "flex", justifyContent: "center" }}>
            <h2>Are you sure you want to <span style={{color:"red"}}>delete</span> this plan?</h2>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <button
            className="button logout-button"
            style={{ marginRight: "10px" }}
            onClick={() => {
                handleDelete(id);
                setModalOpened(false);
            }}
            >
            Yes
            </button>
            <button className="button logout-button" onClick={() => setModalOpened(false)}>No</button>
        </div>
        </Modal>
    );
}


export default ConfirmDeletePlan;