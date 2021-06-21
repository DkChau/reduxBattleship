import React from 'react';
import {connect} from 'react-redux';

function ShipsRemainingCpu (props) {
    return(
        <div className={props.gameState===true ? '' : 'hidden'}>
            <div 
                className={props.cpuShips.Battleship===true ? 'underline' : ''}>Battleship</div>
            <div
                className={props.cpuShips.PatrolBoat===true ? 'underline' : ''}>PatrolBoat</div>
            <div
                className={props.cpuShips.Submarine===true ? 'underline' : ''}>Submarine</div>
            <div
                className={props.cpuShips.Destroyer===true ? 'underline' : ''}>Destroyer</div>
            <div
                className={props.cpuShips.Carrier===true ? 'underline' : ''}>Carrier</div>
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
