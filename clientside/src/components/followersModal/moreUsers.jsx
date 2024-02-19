import React from 'react';
import User from '../user/user';


// this is to not be limited just to the first 10 users in the followersCard! 

const AllUsersCard = ({ persons }) => {
    return (
      <div className="UsersCard">
        <h3>All People</h3>
        {persons.map((person, id) => (
          <User person={person} key={id} />
        ))}
      </div>
    );
  };
  
  export default AllUsersCard;