import React from 'react';
import {connect} from 'react-redux';

function ShipsRemainingCpu (props) {
    return(
        <div className={props.gameState===true ? 'cpuRemaining' : 'hidden'}>
            <div 
                className={props.cpuShips.Battleship===true ? 'underline' : 'noDecoration'}>Battleship</div>
            <div
                className={props.cpuShips.PatrolBoat===true ? 'underline' : 'noDecoration'}>PatrolBoat</div>
            <div
                className={props.cpuShips.Submarine===true ? 'underline' : 'noDecoration'}>Submarine</div>
            <div
                className={props.cpuShips.Destroyer===true ? 'underline' : 'noDecoration'}>Destroyer</div>
            <div
                className={props.cpuShips.Carrier===true ? 'underline' : 'noDecoration'}>Carrier</div>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        cpuShips:state.cpuShips,
        gameState:state.gameState
    }
}

const mapDispatchToProps=dispatch=>{
    return{
    } 
};

export default connect(mapStateToProps,mapDispatchToProps)(ShipsRemainingCpu);
