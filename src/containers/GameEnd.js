import React from 'react';
import {connect} from 'react-redux';
import {gameOver} from '../actions/boardActions'

function GameEnd(props){
    const endGame = () =>{
        props.gameOver();
    }
    return(
        <div className={props.gameEnd===true ? 'gameOver' : 'hidden'}>
            <div>
                GAME OVER
            </div>
            <div>{props.whoWon} HAS WON</div>
            <button onClick={endGame}>PLAY AGAIN</button>
        </div>

    )

}
const mapStateToProps = state => {
    return {
        gameEnd:state.gameEnd,
        whoWon:state.whoWon,
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        gameOver:()=>{
            dispatch(gameOver())
        }
    } 
};

export default connect(mapStateToProps,mapDispatchToProps)(GameEnd);