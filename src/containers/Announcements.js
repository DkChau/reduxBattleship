//A heading that announces turns and ships sunk
//and eventually the player/cpu that won

import React from 'react'
import {connect} from 'react-redux';

function Announcements (props) {
    let turnDisplay=''
    if(props.gameState===true){
        turnDisplay=(props.whoseTurn==='player' ? 'Player\'s turn' : 'Cpu\'s Turn');
    }
    else{
        turnDisplay='BATTLESHIP'
    }
    return(
        <div className='announcementContainer'>
            <div className='turnAnnouncement'>{turnDisplay}</div>
            <div className='statusAnnouncement'>{props.statusDisplay}</div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        whoseTurn:state.whoseTurn,
        statusDisplay:state.statusDisplay,
        gameState:state.gameState,
    }
}

const mapDispatchToProps=dispatch=>{
    return{
    } 
};

export default connect(mapStateToProps,mapDispatchToProps)(Announcements);
