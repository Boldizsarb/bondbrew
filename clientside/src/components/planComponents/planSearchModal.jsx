import { Modal, useMantineTheme } from "@mantine/core";
import React from "react";
import PlanSearch from "./planSearch";



function PlanSearchModal({ modalOpened2, setModalOpened2, plans,onPlanSelected }) {

    const theme = useMantineTheme();

    const handlePlanSelect = (selectedPlan) => {
        onPlanSelected(selectedPlan); // Pass the selected plan up to the parent component
        setModalOpened2(false); // Optionally close the modal upon selection
    };

    
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
        opened={modalOpened2}
        onClose={() => setModalOpened2(false)}
        >
            <div style={{maxHeight: "400px", overflowY: "auto"}}>

            {plans && Array.isArray(plans) &&plans.length > 0 ? (
            plans.map((plan, index) => (
                <PlanSearch key={index} plan={plan} onPlanSelect={handlePlanSelect} />
                
            ))
            ) : (
            <span>No plan with that title, Try another one. </span> // if there is no user returned 
            )}
        </div>
        
    
        </Modal>
    );
}

export default PlanSearchModal;

