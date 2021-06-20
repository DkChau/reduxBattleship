import Player from '../factories/PlayerFactory';
import cpu from '../factories/CpuFactory';
const _ = require('lodash')


const boardReducer = (state,action) =>{
    switch(action.type){
        case 'PLACE_SHIP':
            let index=-1;
            let tempState=_.cloneDeep(state);
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
                tempState.player.placedShips=tempState.player.placedShips.concat(tempState.player.shipArray.splice(index,1))
    
            }
            state=tempState;
            break;
        case 'RESET_BOARD':
            state={...state,player:Player(),gameState:false,cpu:cpu()}
            break;
        case 'START_GAME':
            let tempCpu=_.cloneDeep(state.cpu);
            tempCpu.gameBoard=tempCpu.generateShips();
            state={...state,gameState:true,cpu:tempCpu};
            break;
        default:
            break;
    }
    return state;
}

export default boardReducer;