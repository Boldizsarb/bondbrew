import { Modal, useMantineTheme } from "@mantine/core";
import React from "react";
import User from "../user/user";


function SearchModal({ modalOpened, setModalOpened, people}) {

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
        <div style={{maxHeight: "400px", overflowY: "auto"}}>


        {people && Array.isArray(people) && people.length > 0 ? (
          people.map((person, index) => (
            <User key={index} person={person} />
          ))
        ) : (
          <span>No user with that name, Try another name. </span> // if there is no user returned 
        )}
      </div>

    </Modal>
  );
}

export default SearchModal;

//{people.length > 0  ? (