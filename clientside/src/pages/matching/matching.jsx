import React,  {useEffect, useState } from 'react'
import NavIcons from '../../components/rightSide/navicons';
import './matching.css';
import TinderCard from 'react-tinder-card';
import LeftArrow from '../../img/arrow_left.png';
import RightArrow from '../../img/arrow_right.png';
import BurgerMenu from '../../components/burgerMenu/burgerMenu';
import { useSelector } from "react-redux";
import InterestModal from '../../components/interestsModal/interestsModal';
import User from '../../components/user/user';






const Matching = () => {    


   // const [genderedUsers, setGenderedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [isMatchesVisible, setIsMatchesVisible] = useState(false);
    const [characters, setCharacters] = useState([]) // array of all people
    const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;
    const serverPubicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const { user } = useSelector((state) => state.authReducer.authData); // user data 
    const [interestCriteria, setInterestCriteria] = useState(false) 
    const [interestsModal, setInterestsModal] = useState(false); // modal for interests

    const [peopleLikedcurrentuser, setPeopleLikedcurrentuser] = useState([]) // array of people who liked the current user
    const [profileLikedCurrentUser, setProfileLikedCurrentUser] = useState([]) // returned array of whole profiles of people who liked the current user
    const [matches, setMatches] = useState([]) // array of matches
    const [profileMatches, setProfileMatches] = useState([]) // returned array of whole profiles of people who matched with the current user
    const [matchrefresh, setMatchrefresh] = useState(0) // refresh the matches
    const [characterRefresh, setCharacterRefresh] = useState(0) // refresh the chararcters when the interests chagne


    

    useEffect(() => { // first check if the user has the right amount of interests 

      const interests = user.interests;
      
      if(interests.length < 2 || interests.length > 5) {
        // if the interests are not met
        setInterestCriteria(false); 
        setInterestsModal(true);
      } else {
        setInterestCriteria(true);
      }

    }, []);





    useEffect(() => {  
        if(!interestCriteria) {
           // need to set the interest modal open!!!!!!!!!!!!
        }
    }, [interestCriteria]);





    const getCharacters = useEffect(() => { // getting all the users for now

      const getAndSortCharacters = async () => {
        try {
            const response = await fetch(`${getUserUrl}userser/`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            let data = await response.json();

            // Function to calculate the number of shared interests
            const calculateSharedInterests = (interests1, interests2) => {
                return interests1.filter(interest => interests2.includes(interest)).length;
            };

            // Temporarily add similarity scores for sorting
            const dataWithScores = data.map(character => ({
              ...character,
              similarityScore: calculateSharedInterests(user.interests, character.interests)
          }));

          // Sort characters based on their similarity scores
          dataWithScores.sort((a, b) => b.similarityScore - a.similarityScore);

          setCharacters(dataWithScores); // Including similarity scores for display
      } catch (error) {
          console.log(error.message);
      }
  };

  getAndSortCharacters();

}, [characterRefresh]); // it refreshes when the interest changes 


// Log the sorted characters (for debugging)
console.log(characters);
  


    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentCharacter, setCurrentCharacter] = useState({})

    useEffect(() => {     // this is all the indexing and it is fucked right now, need to solve the indexign 
      // console.log("Current Index:", currentIndex);
      // console.log("Current Character:", currentCharacter);
  }, [currentIndex, currentCharacter]);


  useEffect(() => {   // Update currentCharacter based on currentIndex for the info under the card 
 
    if (characters.length > 0 && currentIndex >= 0) {
        setCurrentCharacter(characters[currentIndex]);
    }
}, [currentIndex, characters]);

  
    const swiped = (direction, nameToDelete, index) => {
     // console.log('removing: ' + nameToDelete)
      setLastDirection(direction)
      //setCurrentIndex(index + 1); // not used 
      setCurrentIndex(prevIndex => prevIndex + 1); // info underneath the card
   
    }


    const toggleMatches = () => {// Toggle visibility state
        setIsMatchesVisible(!isMatchesVisible); 
    };
    
    // console.log(currentCharacter)
    // console.log(currentIndex)

    /// LIKES LOGIC  /// LIKES LOGIC  /// LIKES LOGIC  /// LIKES LOGIC  /// LIKES LOGIC  /// LIKES LOGIC  /// LIKES LOGIC  
    


    useEffect(() => { // getting likes 

        const getLikes = async () => {
          try {
            const response = await fetch(`${getUserUrl}match/getlikes`, {
              method: 'POST', 
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ usertoid: user._id }), 
            });
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            const data = await response.json(); 
            const userFromIds = data.map(item => item.userfromid);  // only extracting the userid where the like came from 
            //console.log(userFromIds);
            setPeopleLikedcurrentuser(userFromIds);
          } catch (error) {
            console.log(error.message);
          }
        }
        getLikes();

    }, [matchrefresh]);

    //console.log(peopleLikedcurrentuser)
    
    useEffect(() => { // getting the profiles of the pople who liked the current user

      const getProfiles = async () => {

        if (peopleLikedcurrentuser.length === 0) {
          return;
        }
        let profiles = [];

        for(const userId of peopleLikedcurrentuser) {
            //console.log(userId)
        try {
          const response = await fetch(`${getUserUrl}userser/${userId}`, {
            method: 'GET', 
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          const profile = await response.json(); 
          profiles.push(profile); 
        } catch (error) {
          console.log(error.message);
        }
      }
      
      setProfileLikedCurrentUser(profiles); // pushing all profiles in the array
    };
    getProfiles();
  }, [peopleLikedcurrentuser])
/// LIKES LOGIC  /// LIKES LOGIC  /// LIKES LOGIC  /// LIKES LOGIC  /// LIKES LOGIC  /// LIKES LOGIC  /// LIKES LOGIC  /// LIKES LOGIC  

  //console.log(profileLikedCurrentUser)

///// MATCH LOGIC    ///// MATCH LOGIC    ///// MATCH LOGIC    ///// MATCH LOGIC    ///// MATCH LOGIC    
  useEffect(() => { 
    const getMatches = async () => { // getting all the matches 
      try {
        const response = await fetch(`${getUserUrl}match/getmatches`, {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid: user._id }), 
        });
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        const data = await response.json();
      
      // filtering the matches to get the other user's id only 
      const otherUserIds = data.map(item => {
        return item.userfromid === user._id ? item.usertoid : item.userfromid;
      });
      setMatches(otherUserIds); 
    } catch (error) {
      console.log(error.message);               //      Something1
    }
  }
  getMatches();
}, [matchrefresh]);



useEffect(() => { // getting the profiles of the people who matched with the current user

  const getProfiles = async () => {
      
      if (matches.length === 0) {
        return;
      }
      let profiles = [];
  
      for(const userId of matches) {
      try {
        const response = await fetch(`${getUserUrl}userser/${userId}`, {
          method: 'GET', 
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const profile = await response.json(); 
        profiles.push(profile); 
      } catch (error) {
        console.log(error.message);
      }
    }

    setProfileMatches(profiles); // pushing all profiles in the array
  };
  getProfiles();

}, [matches])

///// MATCH LOGIC   ///// MATCH LOGIC   ///// MATCH LOGIC   ///// MATCH LOGIC   ///// MATCH LOGIC   



const outOfFrame = ( direction, character) => { // Swipe logic
      
      
  if(character){

    if(direction === 'right') {
      //console.log(`${character.firstname} was swiped right`)

      const initiatingLike = async () => {
        try {
          const response = await fetch(`${getUserUrl}match/`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userfromid: user._id, usertoid: character._id }), 
          });
          if (!response.ok) {
            throw new Error(response.statusText)
          }
          const data = await response.json();
          console.log(data);
        } catch (error) {
          console.log(error.message);
        }
      }
      initiatingLike();
      setMatchrefresh(prev => prev + 1); // too fast need to slow down 
      

    }
    else if(direction === 'left') {
      console.log(`${character.firstname} was swiped left`)
    }
    else {
      console.log(`${character.firstname} PASSS Either up or down, will have to be pushed to the array as last element`)
    }
  }
  

}


    
    


    return (
        <>
        <div className='main-matching-container'>
        {/* <div onClick={toggleMatches} style={{cursor: 'pointer'}}>Click Me</div> */}

        <div id='burger-menu-onpage'>
          <BurgerMenu location={"matching"} userid={user._id} setCharacterRefresh={setCharacterRefresh} />
        </div>
        <InterestModal interestsModal={interestsModal} setInterestsModal={setInterestsModal} userid={user._id} setCharacterRefresh={setCharacterRefresh}/>
        
      

            <div>
                {/* <NavIcons /> */}
            </div >

            <div className='swipe-container'>
            <div className='swipe-info'>
                    {lastDirection ? <p>You Swiped {lastDirection}</p> : <p/> }

                    </div>
                <div className='cardContainer1'>

                {characters.slice().reverse().map((character, index) =>
                        <TinderCard className='swipe' key={character.firstname}
                          //onSwipe={(dir) => swiped(dir, character.firstname)} 
                          onSwipe={(dir) => swiped(dir, character.firstname, index)}
                         
                         onCardLeftScreen={(dir) => outOfFrame(dir,character)}>

                              <div style={{ backgroundImage: 'url(' + (character.profilePicture ? 
                                serverPubicFolder + character.profilePicture : serverPubicFolder + "defaultProfile.png") + ')' }} className='card1'>
                                <h3 style={{color:"var(--buttonHover)"}}>{character.firstname} {character.lastname}</h3>
                            </div>
                        </TinderCard>
                    )}
                    
                </div>
                <div className={`matches-div ${isMatchesVisible ? 'active' : ''}`}>
                  <img src={isMatchesVisible ? LeftArrow : RightArrow} onClick={toggleMatches} className="toggle-arrow" style={{cursor: 'pointer'}} /> 

                  <div className='matches-container'>
                    <h1 className='matchesh1'>Matches ({profileMatches.length})</h1>
                    {profileMatches.map((person, id) => (
                      <User person={person} key={id} location={"matching"}/>
                      ))}
              
                    
                  </div>
                    
                  <div className='likes-container'>
                    <h1 className='matchesh1'>Likes ({profileLikedCurrentUser.length})</h1>
                    {profileLikedCurrentUser.map((person, id) => (
                      <User person={person} key={id} location={"matching"}/>
                      ))}
                    

                  </div>

                </div>

            </div>


          
            {currentCharacter ? (
                currentCharacter.firstname ? (
                  <p>{currentCharacter.firstname}, {currentCharacter.similarityScore}</p>
                ) : (
                  <p>There is no more card at the moment.</p>
                )
              ) : (
                <p>There are no more users at the moment.</p> // or another placeholder message until `currentCharacter` is defined
              )}

          
        </div>
        </>
    )
}



export default Matching;


// {characters.slice().reverse().map((character, index) => // the slice and reverse is to reverse the array and then map it, but it wasnt there 