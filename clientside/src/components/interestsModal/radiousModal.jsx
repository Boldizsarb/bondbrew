import { Modal, useMantineTheme } from "@mantine/core";
import React from "react";
import "./radiusModal.css";


function SetRadius({radiusModal, setRadiusModal,maxEffectiveDistance, setmaxEffectiveDistance}){

    const theme = useMantineTheme();
    //console.log(maxEffectiveDistance);


    const handleRadiusChange = (event) => {
        setmaxEffectiveDistance(event.target.value);
    }



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
            opened={radiusModal}
            onClose={() => setRadiusModal(false)}
        >
            <h1>Set radius</h1>
            <div>
                <label htmlFor="radius-range">Radius: {maxEffectiveDistance}km</label>
                <input
                    id="radius-range"
                    type="range"
                    min="50"
                    max="500"
                    value={maxEffectiveDistance}
                    onChange={handleRadiusChange}
                    style={{ width: "100%", margin: "10px 0" }}
                    className="slider"
                />
            </div>
            <p>The similarity score will be greately affected by it! It will broaden the users but will also diminish the extent of other aspects infuence.</p>




        </Modal>
    )
}

export default SetRadius;