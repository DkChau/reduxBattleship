import React from 'react';
import {useState} from 'react';
import {connect} from 'react-redux';
import {placeShip,resetBoard,gameStart} from '../actions/boardActions';
import uniqid from 'uniqid'

function UserBoard (props) {

    let selectedShip=undefined;
    let selectedPart=undefined;

    const [direction,setDirection]=useState('Horizontal')

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
        setDirection(props.player.getDirections());

    }
    const boardReset=()=>{
        props.resetBoard();
        setDirection('Horizontal');
    }
    const startGame=()=>{
        props.gameStart();

    }
    return(
        <div className='userBoardContainer'>
            <ul className='userBoard' onDrop={onDrop} onDragOver={onDragOver}>
                {props.player.playerBoard.gameBoard.map((square,index)=>{
                    return(
                        <button key={uniqid()} value={index} 
                        className={square==='empty' ? 'empty' : square}>
                        </button>
                    )
                })}
                <button 
                    className='changeDirection' 
                    onClick={props.player.shipArray.length===0 ? startGame : containerDirection}>
                    {props.player.shipArray.length===0 ? 'Start Game' : 'Change Direction'}
                </button>
                <button className='resetBoard' onClick={boardReset}>Reset Board</button>
            </ul>
            <div className={props.gameState===true?'hidden':''}>
                <div className={direction==='Horizontal' ? 'shipContainer Horizontal' : 'shipContainer Vertical'}>
                    {props.player.shipArray.map(ship=>{
                        return(
                            <div className={direction==='Horizontal' ? 'ship Horizontal' : 'ship Vertical'}
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
        gameState:state.gameState
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
        }
    } 
};
export default connect(mapStateToProps,mapDispatchToProps)(UserBoard);