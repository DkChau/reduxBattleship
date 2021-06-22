import {createStore, applyMiddleware} from 'redux';
import Player from '../factories/PlayerFactory';
import boardReducer from '../reducers/boardReducer';
import logger from 'redux-logger';
import cpu from '../factories/CpuFactory'

export default createStore (
    boardReducer,
    {
        player:Player(),
        gameState:false,
        cpu:cpu(),
        cpuShips:{
            Carrier:false,
            Battleship:false,
            Destroyer:false,
            Submarine:false,
            PatrolBoat:false,
        },
        playerShips:{
            Carrier:false,
            Battleship:false,
            Destroyer:false,
            Submarine:false,
            PatrolBoat:false,
        },
        whoseTurn:'player',
        statusDisplay:''
    },
    // applyMiddleware(logger),
)

