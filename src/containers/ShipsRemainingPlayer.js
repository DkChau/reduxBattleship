import React from 'react';
import {connect} from 'react-redux';

function ShipsRemainingPlayer (props) {
    return(
        <div className={props.gameState===true ? '' : 'hidden'}>
            <div 
                className={props.playerShips.Battleship===true ? 'underline' : ''}>Battleship</div>
            <div
                className={props.playerShips.PatrolBoat===true ? 'underline' : ''}>PatrolBoat</div>
            <div
                className={props.playerShips.Submarine===true ? 'underline' : ''}>Submarine</div>
            <div
                className={props.playerShips.Destroyer===true ? 'underline' : ''}>Destroyer</div>
            <div
                className={props.playerShips.Carrier===true ? 'underline' : ''}>Carrier</div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        playerShips:state.playerShips,
        gameState:state.gameState
    }
}

const mapDispatchToProps=dispatch=>{
    return{
    } 
};

export default connect(mapStateToProps,mapDispatchToProps)(ShipsRemainingPlayer);
