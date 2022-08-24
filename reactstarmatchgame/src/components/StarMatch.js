import React ,{useState, useEffect} from 'react';
import {colors,utils} from './MathUtil';

const NumberButton = (props)=>(
    <button className="number"
        style={{backgroundColor: colors[props.status]}}
        onClick={()=>props.onClick(props.number, props.status)}>
        {props.number}
    </button>
);

/*use range function from utils to populate star and number button */
const StarsDisplay = (props)=>(
    <>
        {utils.range(1,props.count).map(starId => 
            <div key={starId} className="star"/>
        )}
    </>
);

//reset display game
const PlayAgain = (props)=>(
    <div className="game-done">
        <div className="message"
            style={{color:props.gameStatus==='lost'?'red':'green'}}>
            {props.gameStatus==='lost'?'Game Over':'Hurrah!'}
        </div>
        <button onClick={props.onClickEvent}>Play Again!</button>
    </div>
);

//custom hook
const useGameState = ()=>{
    //star count is made state element since it will change via react component
    const [stars,setStars] = useState(utils.random(1,9));
    const[availableNums, setAvailableNums] = useState(utils.range(1,9));
    const[candidateNums, setCandidateNums] = useState([]);
    const[secondsLeft, setSecondsLeft] = useState(10);

    //set counter interval for time remaining
    useEffect(()=>{
        if(secondsLeft>0 && availableNums.length>0){
            const timerId = setTimeout(()=>{
                setSecondsLeft(secondsLeft-1);
                },1000);
            return ()=>clearTimeout(timerId);//clear timeout effect
        }
    });

    const setGameState = (newCandidateNums)=>{

        //if sum of new candidate num not equal to star, set as candidate num
        if(utils.sum(newCandidateNums)!==stars){
            setCandidateNums(newCandidateNums);
        }
        //if sum matches
        else{
            //filter out number selected
            const newAvailableNums = availableNums.filter(
                n => !newCandidateNums.includes(n)
            );
            //redraw stars from available number
            setStars(utils.randomSumIn(newAvailableNums,9));
            setAvailableNums(newAvailableNums);
            setCandidateNums([]);
        }
    }
    return {stars, availableNums, candidateNums, secondsLeft, setGameState};
};

const Game = (props)=>{
    const {stars, availableNums, candidateNums, secondsLeft, setGameState} = useGameState();

    //check if candidate is wrong or not
    const candidateAreWrong = utils.sum(candidateNums)>stars;

    //check game status
    const gameStatus = availableNums.length===0
        ?'won'
        :secondsLeft===0 ?'lost':'active';


    //function to check number status if it is available and candidate
    const numberStatus = (number) =>{
        if(!availableNums.includes(number)){
            return 'used';
        }
        if(candidateNums.includes(number)){
            return candidateAreWrong? 'wrong':'candidate';
        }
        return 'available';
    };

    //function to decide number status on click
    const onNumberClick = (number, currentStatus)=>{

        //based on current status, decide new status
        if(gameStatus!=='active'|| currentStatus==='used'){
            return;
        }
        
        //append number to candidate number if not used already
        const newCandidateNums = currentStatus==='available'
                ?candidateNums.concat(number)
                :candidateNums.filter(cn=>cn!==number);
        
        setGameState(newCandidateNums);

    }

    return(
     <div className="game">
        <div className="help">
          Pick 1 or more numbers that sum to the number of stars
        </div>
        <div className="body">
          <div className="left">
            {gameStatus!=='active'
                ?(<PlayAgain onClickEvent={props.startNewGame} gameStatus={gameStatus}/>)
                :(<StarsDisplay count={stars}/>)
            }         
          </div>
          <div className="right">
            {utils.range(1,9).map(number => 
                <NumberButton key={number}
                    status={numberStatus(number)}
                    number={number}
                    onClick={onNumberClick}/>
            )}
          </div>
        </div>
        <div className="timer">Time Remaining: {secondsLeft}</div>
      </div>
    );
};

const StarMatch = ()=>{
    const [gameId, setGameId] = useState(1);
    return <Game key={gameId} startNewGame={()=>setGameId(gameId+1)}/>;
};

export default StarMatch;