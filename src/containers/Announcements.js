//A heading that announces turns and ships sunk
//and eventually the player/cpu that won

import React from 'react'
import {connect} from 'react-redux';

function Announcements (props) {
    let turnDisplay=(props.whoseTurn==='player' ? 'Player\'s turn' : 'Cpu\'s Turn');
    return(
        <div className='announcementContainer'>
            <div>{turnDisplay}</div>
            <div>{props.statusDisplay}</div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        whoseTurn:state.whoseTurn,
        statusDisplay:state.statusDisplay,
    }
}

const mapDispatchToProps=dispatch=>{
    return{
    } 
};

export default connect(mapStateToProps,mapDispatchToProps)(Announcements);
