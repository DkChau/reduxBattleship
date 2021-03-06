import React from 'react';
import {connect} from 'react-redux';
import uniqid from 'uniqid'
import {hitCpu,hitPlayer} from '../actions/boardActions'

function CpuBoard (props) {

    const registerHit = (e) => {
        props.hitCpu(e.target.value);
        setTimeout(()=>{
            props.hitPlayer();
        },1000)
    }
    return(
        <div className={props.gameState===true ? 'userBoardContainer' : 'hidden'}>
            <div>
                <div className='boardTitle'>Enemy waters</div>
                <ul className='userBoard'>
                    {props.cpu.gameBoard.map((square,index)=>{
                        return (
                            <button  
                                value={index} 
                                key={uniqid()} 
                                onClick={registerHit} 
                                className={square==='empty' ? 'empty' : square + ' cpu'}
                                disabled={square.includes('disabled') || props.whoseTurn==='cpu'}>
                            </button>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        cpu:state.cpu,
        gameState:state.gameState,
        whoseTurn:state.whoseTurn
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        hitCpu:(loc)=>{
            dispatch(hitCpu(loc))
        },
        hitPlayer:()=>{
            dispatch(hitPlayer())
        }
    } 
};

export default connect(mapStateToProps,mapDispatchToProps)(CpuBoard);