import React,  {useEffect, useState } from 'react'
import NavIcons from '../../components/rightSide/navicons';
import './matching.css';
import TinderCard from 'react-tinder-card';
import LeftArrow from '../../img/arrow_left.png';
import RightArrow from '../../img/arrow_right.png';
import BurgerMenu from '../../components/burgerMenu/burgerMenu';
import {useDispatch, useSelector } from "react-redux";
import InterestModal from '../../components/interestsModal/interestsModal';
import User from '../../components/user/user';
import { getUserLocation } from '../../middlewares/geoLocation';
import { updateUser } from '../../actions/userAction';
import SetLocation from '../../components/setLocation/setLocationModal';







const Matching = () => {    


   // const [genderedUsers, setGenderedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [isMatchesVisible, setIsMatchesVisible] = useState(false);
    const [characters, setCharacters] = useState([]) // array of all people
    const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;
    const serverPubicFolder = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.authReducer.authData); // user data 
    const [interestCriteria, setInterestCriteria] = useState(false) 
    const [interestsModal, setInterestsModal] = useState(false); // modal for interests

    const [peopleLikedcurrentuser, setPeopleLikedcurrentuser] = useState([]) // array of people who liked the current user
    const [profileLikedCurrentUser, setProfileLikedCurrentUser] = useState([]) // returned array of whole profiles of people who liked the current user
    const [matches, setMatches] = useState([]) // array of matches
    const [profileMatches, setProfileMatches] = useState([]) // returned array of whole profiles of people who matched with the current user
    const [matchrefresh, setMatchrefresh] = useState(0) // refresh the matches
    const [characterRefresh, setCharacterRefresh] = useState(0) // refresh the chararcters when the interests chagne
    const [locationModal, setLocationModal] = useState(false);
    const [passedCharacters, setPassedCharacters] = useState([]); // array of passed characters


    

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

    useEffect(() => { // getting the location of the user

      if(user.lat == null && user.long == null) { 
       setLocationModal(true);
        }
    }, [locationModal]); // will not close the modal until the user allowed location 
    

    ////// distence score: /// distence score: /// distence score: /// distence score: 
   
    const maxEffectiveDistance = 100; // maximum distance 
    const defaultProximityScore = 0;

    const haversineDistance = (lat1, lon1, lat2, lon2) => { // calculating the distance between two points
      const R = 6371; // Earth's radius in km
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c; // Distance in km
      return distance;
  };
                                              //   50.941113093474044, -1.2950628439378966

  

    const getCharacters = useEffect(() => { // getting users and sorting them

      const getAndSortCharacters = async () => {
        try {
            const response = await fetch(`${getUserUrl}userser/`);
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            let data = await response.json();

            //console.log(`Before extracting ${data.length}`); // debugging
            //// before the calulation, some users needs to be filtered out.
            let neededExtracting = [];

            const populatingNeededExtracting = async () => { // getting the ids that needs to be extracted
              const anotherResponse = await fetch(`${getUserUrl}match/extractmatches`, {
                method: 'POST', 
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userid: user._id }), 
              });
                const data = await anotherResponse.json();
                neededExtracting = data;
            }
            await populatingNeededExtracting(); // needed to be a promise otherwise it would be too fast
            //console.log(neededExtracting); // debugging
            neededExtracting.push(user._id); // extracting the user itself
            // now extracting the users from the data
            const filteredData = data.filter(character => !neededExtracting.includes(character._id));
            //console.log(`After extracting ${filteredData.length}`); // debugging

            // intrests score: 
            const dataWithScores = filteredData.map(character => {
              const sharedInterestsCount = user.interests.filter(interest => character.interests.includes(interest)).length;
              const interestsScore = (sharedInterestsCount / Math.max(user.interests.length, 5)) * 70; // adjusting scrore extent


              // calculating proximity score 
              let proximityScore = defaultProximityScore;
              if (user.lat && user.long  && character.lat && character.long) {
                  const distance = haversineDistance(user.lat, user.long, character.lat, character.long);
                  proximityScore = Math.max(0, (1 - distance / maxEffectiveDistance)) * 30; //normalizing it to 50%
                  
              }

              return {
                  ...character,
                  similarityScore: interestsScore + proximityScore,
                  interestsScore: interestsScore,
                  proximityScore: proximityScore,
              };
          });

          // sorting all characters based on similarity score
          dataWithScores.sort((a, b) => b.similarityScore - a.similarityScore);

          setCharacters(dataWithScores);
      } catch (error) {
          console.log(error.message);
      }
  };

  getAndSortCharacters();

}, [characterRefresh]); // it refreshes when the interest changes 


// Log the sorted characters (for debugging)
//console.log(characters);
  


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
          setProfileLikedCurrentUser([]); // reset the array
          setPeopleLikedcurrentuser([]); // reset the array
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

    }, [matches]);

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

}, [matches,matchrefresh])

///// MATCH LOGIC   ///// MATCH LOGIC   ///// MATCH LOGIC   ///// MATCH LOGIC   ///// MATCH LOGIC   



const outOfFrame = ( direction, character) => { // Swipe logic
      
      
  if(character){

    if(direction === 'right') { // right --> like
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
      initiatingLike().then(() => {
        setMatchrefresh(prev => prev + 1); // this way it will refresh when the response is back
      });
    }

    else if(direction === 'left') { // left --> dislike
      //console.log(`${character.firstname} was swiped left`)
      const initiatingDislike = async () => {
        try {
          const response = await fetch(`${getUserUrl}match/dislike`, {
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
      initiatingDislike();
    }

    else { // up or down --> pass
      //console.log(`${character.firstname} PASSS Either up or down, will have to be pushed to the array as last element`)
      setPassedCharacters(prev => [...prev, character]);
      
    }
  }
  
}
//console.log(passedCharacters)


const handlePassedList = () => { // changing the passed characters to the current characters
  setCharacters(prev => [...prev, ...passedCharacters]);
  setPassedCharacters([]);
}






                                       // 65.74252226971046, -176.03167362949762

    return (
        <>
        <div className='main-matching-container'>
        {/* <div onClick={toggleMatches} style={{cursor: 'pointer'}}>Click Me</div> */}

        <div id='burger-menu-onpage'>
          <BurgerMenu location={"matching"} userid={user._id} setCharacterRefresh={setCharacterRefresh} />
        </div>
        <InterestModal interestsModal={interestsModal} setInterestsModal={setInterestsModal} userid={user._id} setCharacterRefresh={setCharacterRefresh}/>
        <SetLocation locationModal={locationModal} setLocationModal={setLocationModal} userid={user._id} />
        
                                        

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
                      <User person={person} key={id} location={"matched"}/>
                      ))}
              
                    
                  </div>
                    
                  <div className='likes-container'>
                    <h1 className='matchesh1'>Likes ({profileLikedCurrentUser.length})</h1>
                    {profileLikedCurrentUser.map((person, id) => (
                      <User person={person} key={id} location={"matching"} />
                      ))}
                    

                  </div>

                </div>

            </div>

          
            {currentCharacter ? (
                currentCharacter.firstname ? (
                  <div className='currentCharacter-info'>
                     <p>Total similarity {currentCharacter.similarityScore.toFixed(2)} % 
                     (Interest: {currentCharacter.interestsScore.toFixed(2)}% , Proximity: {currentCharacter.proximityScore.toFixed(2)}% ) </p>
                     {currentCharacter.livesin && ( 
                     <p>{currentCharacter.firstname} stays at: {currentCharacter.livesin}</p>
                      )}
                  
                     
                  </div>
                 
                  
                  
                ) : (
                  <p>There is no more card at the moment.</p>
                )
              ) : ( // if there no more cards
               <div>
                 <p>There are no more users at the moment.</p> 
                 {passedCharacters.length > 0 && (
                  <div className='passed-list'>
                    <p>Would you like to take a second look on the passed users?</p>
                    <button className="button infoButton" onClick={handlePassedList}>Yes</button>
                  </div>
                 )}
                 
               </div>
                
              )}

          
        </div>
        </>
    )
}



export default Matching;


// {characters.slice().reverse().map((character, index) => // the slice and reverse is to reverse the array and then map it, but it wasnt there 