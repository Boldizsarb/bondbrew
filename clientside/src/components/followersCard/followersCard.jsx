import "./followersCard.css";
import User from "../user/user";
import React, { useEffect, useState } from "react";
import "./followersCard.css";
import FollowersModal from "../followersModal/followersModal";
import { getAllUser } from "../../api/userRequest";
import { useSelector } from "react-redux";
// under my profile, I want to see a list of people I can follow







const FollowersCard = ({ location }) => {

    const [modalOpened, setModalOpened] = useState(false);
    const [persons, setPersons] = useState([]);
    const { user } = useSelector((state) => state.authReducer.authData);
  
    useEffect(() => {
      const fetchPersons = async () => {
        const { data } = await getAllUser();
        setPersons(data);
      };
      fetchPersons();
    }, []);

    function shuffle(array) { // randomizing the people to follow
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    const shuffledPersons = shuffle(persons);
  
    return (
      <div className="FollowersCard">
        <h3>People you may know</h3>
  
        {shuffledPersons.slice(0, 10).map((person, id) => { // random 1o suer
          if (person._id !== user._id) return <User person={person} key={id} />;
        })}
        {!location ? (
          <span onClick={() => setModalOpened(true)}>Show more</span>
        ) : (
          ""
        )}
  
        <FollowersModal
          modalOpened={modalOpened}
          setModalOpened={setModalOpened}
          persons={persons} // passing all the users not just the first 10
        />
      </div>
    );
  };
  
  export default FollowersCard;