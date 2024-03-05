import React,  {useEffect, useState } from 'react'
import NavIcons from '../../components/rightSide/navicons';
import './matching.css';
import TinderCard from 'react-tinder-card';
import LeftArrow from '../../img/arrow_left.png';
import RightArrow from '../../img/arrow_right.png';





const Matching = () => {    


    const [genderedUsers, setGenderedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [isMatchesVisible, setIsMatchesVisible] = useState(false);
    const [characters, setCharacters] = useState([]) // array of all people
    const getUserUrl = process.env.REACT_APP_AXIOS_BASE_URL;
    const serverPubicFolder = process.env.REACT_APP_PUBLIC_FOLDER;

    const getCharacters = useEffect(() => {
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
    console.log(characters)




    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentCharacter, setCurrentCharacter] = useState({})

    useEffect(() => {     // this is all the indexing and it is fucked right now, need to solve the indexign 
      console.log("Current Index:", currentIndex);
      console.log("Current Character:", currentCharacter);
  }, [currentIndex, currentCharacter]);


  useEffect(() => {
    // Update currentCharacter based on currentIndex
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
    

    


    return (
        <>
        <div className='main-matching-container'>
        {/* <div onClick={toggleMatches} style={{cursor: 'pointer'}}>Click Me</div> */}

            <div>
                {/* <NavIcons /> */}
            </div >

            <div className='swipe-container'>
            <div className='swipe-info'>
                    {lastDirection ? <p>You Swiped {lastDirection}</p> : <p/> }

                    </div>
                <div className='cardContainer'>

                {characters.slice().reverse().map((character, index) =>
                        <TinderCard className='swipe' key={character.firstname}
                          //onSwipe={(dir) => swiped(dir, character.firstname)} 
                          onSwipe={(dir) => swiped(dir, character.firstname, index)}
                         
                         onCardLeftScreen={() => outOfFrame(character.firstname)}>

                              <div style={{ backgroundImage: 'url(' + (character.profilePicture ? 
                                serverPubicFolder + character.profilePicture : serverPubicFolder + "defaultProfile.png") + ')' }} className='card'>
                                <h3 style={{color:"var(--buttonHover)"}}>{character.firstname} {character.lastname}</h3>
                            </div>
                        </TinderCard>
                    )}
                    
                </div>
                <div className={`matches-div ${isMatchesVisible ? 'active' : ''}`}>
                    <h1 id='matchesh1'>Matches</h1>
                    <img src={isMatchesVisible ? LeftArrow : RightArrow} onClick={toggleMatches} className="toggle-arrow" style={{cursor: 'pointer'}} /> 
                    awdasdasdasd
                </div>

            </div>


          
            <p>{currentCharacter.firstname}</p> 
          
        </div>
        </>
    )
}



export default Matching;


// {characters.slice().reverse().map((character, index) => // the slice and reverse is to reverse the array and then map it, but it wasnt there 