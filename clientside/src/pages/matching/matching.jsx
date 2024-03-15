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


    
    useEffect(() => {  // checking if there is any interest first

        const getInterests = async () => {
          try {
            const response = await fetch(`${getUserUrl}userser/interests`, {
              method: 'POST', // or 'PUT' if that's what your backend expects for this operation
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ _id: user._id }), 
            });
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            const data = await response.json();

            if(data.interests.length < 2 || data.interests.length > 5) { // if the criteria is not met
              setInterestCriteria(false);
              setInterestsModal(true); // if no interest the modal opens 
              // rest of the logic like forcing to chose the interests    
            } else {
                setInterestCriteria(true);
            }
          } catch (error) {
            console.log(error.message);
          }
        }
        getInterests();
    }, []);


    useEffect(() => {  
        if(!interestCriteria) {
           // need to set the interest modal open!!!!!!!!!!!!
        }
    }, [interestCriteria]);





    const getCharacters = useEffect(() => { // getting all the users for now 
        const getCharacters = async () => {
          try {
            const response = await fetch(`${getUserUrl}userser/`);
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            const data = await response.json();
            //const reversedData = data.reverse(); // reverse the data to get the last user first
            setCharacters(data);
          } catch (error) {
            console.log(error.message);
          }
        }
        getCharacters(); // gets called when the page is loaded
    }, []);



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
      console.log('removing: ' + nameToDelete)
      setLastDirection(direction)
      //setCurrentIndex(index + 1);
      setCurrentIndex(prevIndex => prevIndex + 1);
   
    }
    //console.log(currentCharacter)
  
    const outOfFrame = (name) => {
      console.log(name + ' left the screen!')
    }


    const toggleMatches = () => {
        setIsMatchesVisible(!isMatchesVisible); // Toggle visibility state
    };
    
    // console.log(currentCharacter)
    // console.log(currentIndex)

    /// LIKES LOGIC  /// LIKES LOGIC  /// LIKES LOGIC  /// LIKES LOGIC  /// LIKES LOGIC  /// LIKES LOGIC  /// LIKES LOGIC  
    const [peopleLikedcurrentuser, setPeopleLikedcurrentuser] = useState([]) // array of people who liked the current user
    const [profileLikedCurrentUser, setProfileLikedCurrentUser] = useState([]) // returned array of whole profiles of people who liked the current user
    const [matches, setMatches] = useState([]) // array of matches
    const [profileMatches, setProfileMatches] = useState([]) // returned array of whole profiles of people who matched with the current user


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

    }, []);

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
      console.log(error.message);
    }
  }
  getMatches();
}, []);



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

console.log(profileMatches)


    
    


    return (
        <>
        <div className='main-matching-container'>
        {/* <div onClick={toggleMatches} style={{cursor: 'pointer'}}>Click Me</div> */}

        <div id='burger-menu-onpage'>
          <BurgerMenu location={"matching"} userid={user._id} />
        </div>
        <InterestModal interestsModal={interestsModal} setInterestsModal={setInterestsModal} userid={user._id} />
        
        
        


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
                         
                         onCardLeftScreen={() => outOfFrame(character.firstname)}>

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


          
            {currentCharacter.firstname && (
              <p>{currentCharacter.firstname}</p>
              )}

          
        </div>
        </>
    )
}



export default Matching;


// {characters.slice().reverse().map((character, index) => // the slice and reverse is to reverse the array and then map it, but it wasnt there 