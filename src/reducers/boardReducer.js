import Player from '../factories/PlayerFactory';
import cpu from '../factories/CpuFactory';
const _ = require('lodash')


const boardReducer = (state,action) =>{
    let tempState=_.cloneDeep(state);
    let tempCpu=_.cloneDeep(state.cpu);
    let tempPlayer=_.cloneDeep(state.player);
    switch(action.type){
        case 'PLACE_SHIP':
            let index=-1;
            tempState=_.cloneDeep(state);
            let tempObj=tempState.player.playerBoard.placeShips(
                action.payload.length,
                action.payload.name,
                action.payload.direction,
                action.payload.loc,
                action.payload.selectedPart,
            )
            tempState.player.playerBoard.gameBoard=tempObj.gameBoard;
            
            if(tempObj.pass===true){
                for(let i=0; i<tempState.player.shipArray.length; i++){
                    if(tempState.player.shipArray[i].getName()===action.payload.name){
                        index=i;
                    }
                }
            }
            tempState.player.shipArray.splice(index,1)
            state=tempState;
            break;
        case 'RESET_BOARD':
            state={        
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
                whoseTurn:'player'}
            break;
        case 'START_GAME':
            tempCpu=_.cloneDeep(state.cpu);
            tempCpu.gameBoard=tempCpu.generateShips();
            state={...state,gameState:true,cpu:tempCpu};
            break;
        case 'CPU_HIT':
            let cpuShips=_.cloneDeep(state.cpuShips)
            tempCpu=_.cloneDeep(state.cpu);
            let tempCpuObj=tempCpu.hitRegister(action.payload.loc);
            tempCpu.gameBoard=tempCpuObj.gameBoard

            if('shipName' in tempCpuObj){
                cpuShips[tempCpuObj.shipName]=true;
            }
            state={
                ...state,
                cpu:tempCpu,
                cpuShips:cpuShips,
                whoseTurn:'cpu'
            };

            break;
        case 'PLAYER_HIT':
            let playerShips=_.cloneDeep(state.playerShips)
            tempPlayer=_.cloneDeep(state.player);
            let tempPlayerObj=tempPlayer.playerBoard.generateHit();
            tempPlayer.playerBoard.gameBoard=tempPlayerObj.gameBoard;

            if('shipName' in tempPlayerObj){
                playerShips[tempPlayerObj.shipName]=true;
            }
            state={
                ...state,
                player:tempPlayer,
                playerShips:playerShips,
                whoseTurn:'player'
            }
            break;
        default:
            break;
    }
    return state;
}

export default boardReducer;