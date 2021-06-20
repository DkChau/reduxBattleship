import React from 'react';
import {connect} from 'react-redux';
import uniqid from 'uniqid'

function CpuBoard (props) {
    return(
        <div className='userBoardContainer'>
            <ul className='userBoard'>
                {props.cpu.gameBoard.map(square=>{
                    return (
                        <div  key={uniqid()} className={square==='empty' ? 'empty' : 'shipSquare'}>
                        </div>
                    )
                })}
            </ul>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cpu:state.cpu,
        gameState:state.gameState
    }
}

const mapDispatchToProps=dispatch=>{
    return{
    } 
};

export default connect(mapStateToProps,mapDispatchToProps)(CpuBoard);