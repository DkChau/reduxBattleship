import React from 'react';
import {connect} from 'react-redux';
import {placeShip} from '../actions/boardActions';
import uniqid from 'uniqid'

function UserBoard (props) {

    let selectedShip=undefined;
    let selectedPart=undefined;

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
            e.target.value
        )
    }
    const onDragOver=(e)=>{
        e.preventDefault();
    }
    const containerDirection=(e)=>{
        props.player.changeDirections();
    }
    return(
        <div>
            <ul className='userBoard' onDrop={onDrop} onDragOver={onDragOver}>
                {props.player.playerBoard.gameBoard.map((square,index)=>{
                    return(
                        <button key={uniqid()} value={index}>
                            {square==='empty' ? 0: square}
                        </button>
                    )
                })}
            </ul>
            <div className='shipContainer'>
                {props.player.shipArray.map(ship=>{
                    return(
                        <div className='ship' id={ship.getName()} draggable={true} key={uniqid()} onDragStart={onDragStart}>
                            {ship.shipDisplay.map(square=>{
                                return (
                                    <div key={uniqid()} id={square} className='shipSquare' onMouseOver={shipPart}>
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
                <button onClick={containerDirection}>Change direction</button>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        player:state.player,
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        placeShip:(length,name,direction,loc)=>{
            dispatch(placeShip(length,name,direction,loc));
        }
    } 
};
export default connect(mapStateToProps,mapDispatchToProps)(UserBoard);