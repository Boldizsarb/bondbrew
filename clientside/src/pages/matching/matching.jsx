import React,  {useEffect, useState } from 'react'
import NavIcons from '../../components/rightSide/navicons';
import './matching.css';
import TinderCard from 'react-tinder-card';
import LeftArrow from '../../img/arrow_left.png';
import RightArrow from '../../img/arrow_right.png';




const db = [
    {
      name: 'Richard Hendricks',
      url: './img/richard.jpg'
    },
    {
      name: 'Erlich Bachman',
      url: './img/erlich.jpg'
    },
    {
      name: 'Monica Hall',
      url: './img/monica.jpg'
    },
    {
      name: 'Jared Dunn',
      url: './img/jared.jpg'
    },
    {
      name: 'Dinesh Chugtai',
      url: './img/dinesh.jpg'
    }
  ]


const Matching = () => {    


    const [genderedUsers, setGenderedUsers] = useState(null)
    const [lastDirection, setLastDirection] = useState()
    const [isMatchesVisible, setIsMatchesVisible] = useState(false);

    const characters = db
 
  
    const swiped = (direction, nameToDelete) => {
      console.log('removing: ' + nameToDelete)
      setLastDirection(direction)
    }
  
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

                    {characters.map((character) =>
                        <TinderCard className='swipe' key={character.name}
                         onSwipe={(dir) => swiped(dir, character.name)} 
                         onCardLeftScreen={() => outOfFrame(character.name)}>

                            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                                <h3>{character.name}</h3>
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



            <h1>Matching</h1>
        </div>
        </>
    )
}



export default Matching;