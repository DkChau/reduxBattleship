import React from 'react';
import {connect} from 'react-redux';

function ShipsRemainingPlayer (props) {
    return(
        <div className={props.gameState===true ? 'playerRemaining' : 'hidden'}>
            <div 
                className={props.playerShips.Battleship===true ? 'underline' : 'noDecoration'}>Battleship</div>
            <div
                className={props.playerShips.PatrolBoat===true ? 'underline' : 'noDecoration'}>PatrolBoat</div>
            <div
                className={props.playerShips.Submarine===true ? 'underline' : 'noDecoration'}>Submarine</div>
            <div
                className={props.playerShips.Destroyer===true ? 'underline' : 'noDecoration'}>Destroyer</div>
            <div
                className={props.playerShips.Carrier===true ? 'underline' : 'noDecoration'}>Carrier</div>
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
