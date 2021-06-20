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
            )
            tempState.player.playerBoard.gameBoard=tempObj.gameBoard;
            
            if(tempObj.pass===true){
                for(let i=0; i<tempState.player.shipArray.length; i++){
                    if(tempState.player.shipArray[i].getName()===action.payload.name){
                        index=i;
                    }
                }
                tempState.player.placedShips.concat(tempState.player.shipArray.splice(index,1))
    
            }
            state=tempState;
            break;
        default:
            break;
    }
    return state;
}

export default boardReducer;