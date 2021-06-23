import React from 'react';
import {useState} from 'react';
import {connect} from 'react-redux';
import {placeShip,resetBoard,gameStart,changeDirection} from '../actions/boardActions';
import uniqid from 'uniqid'

function UserBoard (props) {

    let selectedShip=undefined;
    let selectedPart=undefined;

    //Change direction add to state

    const shipPart=(e)=>{
        selectedPart=e.target.id.slice(-1);
    }
    const onDragStart =(e)=>{
        for(let i=0; i<props.player.shipArray.length; i++){
            if(props.player.shipArray[i].getName()===e.target.id){
                selectedShip=props.player.shipArray[i];
            }
        }
    }
    const onDrop=(e)=>{
        props.placeShip(
            selectedShip.length,
            selectedShip.getName(),
            selectedShip.getDirection(),
            e.target.value,
            selectedPart
        )
    }
    const onDragOver=(e)=>{
        e.preventDefault();
    }
    const containerDirection=(e)=>{
        props.player.changeDirections();
        props.changeDirection();

    }
    const boardReset=()=>{
        props.resetBoard();
    }
    const startGame=()=>{
        props.gameStart();

    }
    return(
        <div className={props.gameState===true ? 'userBoardContainer' : 'userBoardContainer single'}>
            <div>
                <div className='boardTitle'>Player Waters</div>
                <ul className='userBoard' onDrop={onDrop} onDragOver={onDragOver}>
                    {props.player.playerBoard.gameBoard.map((square,index)=>{
                        return(
                            <button key={uniqid()} value={index} 
                            className={square==='empty' ? 'empty' : square}>
                            </button>
                        )
                    })}
                </ul>
                <div className='buttonWrapper'>
                    <button 
                            className={props.gameState===true ?'hidden' :'changeDirection' }
                            onClick={props.player.shipArray.length===0 ? startGame : containerDirection}>
                            {props.player.shipArray.length===0 ? 'Start Game' : 'Change Direction'}
                    </button>
                    <button className={props.gameState===true ?'hidden' :'resetBoard' } onClick={boardReset}>Reset Board</button>
                </div>
            </div>
            <div className={props.gameState===true?'hidden':'allShipsContainer'}>
                <div className={props.shipDirection==='Horizontal' ? 'shipContainer Horizontal' : 'shipContainer Vertical'}>
                    {props.player.shipArray.map(ship=>{
                        return(
                            <div className={props.shipDirection==='Horizontal' ? 'ship Horizontal' : 'ship Vertical'}
                            id={ship.getName()} draggable={true} key={uniqid()} onDragStart={onDragStart}>
                                {ship.shipDisplay.map(square=>{
                                    return (
                                        <div key={uniqid()} id={square} className='shipSquare' onMouseDown={shipPart}>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                    
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        player:state.player,
        gameState:state.gameState,
        shipDirection:state.shipDirection
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        placeShip:(length,name,direction,loc,selectedPart)=>{
            dispatch(placeShip(length,name,direction,loc,selectedPart));
        },
        resetBoard:()=>{
            dispatch(resetBoard())
        },
        gameStart:()=>{
            dispatch(gameStart())
        },
        changeDirection:()=>{
            dispatch(changeDirection())
        }
    } 
};
export default connect(mapStateToProps,mapDispatchToProps)(UserBoard);