import React from 'react';
import {connect} from 'react-redux';
import uniqid from 'uniqid'
import {hitCpu} from '../actions/boardActions'

function CpuBoard (props) {

    const registerHit = (e) => {
        props.hitCpu(e.target.value);
    }
    return(
        <div className={props.gameState===true ? 'userBoardContainer' : 'hidden'}>
            <ul className='userBoard'>
                {props.cpu.gameBoard.map((square,index)=>{
                    return (
                        <button  
                            value={index} 
                            key={uniqid()} 
                            onClick={registerHit} 
                            className={square==='empty' ? 'empty' : square}
                            disabled={square.includes('disabled')}>
                        </button>
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
        hitCpu:(loc)=>{
            dispatch(hitCpu(loc))
        }
    } 
};

export default connect(mapStateToProps,mapDispatchToProps)(CpuBoard);