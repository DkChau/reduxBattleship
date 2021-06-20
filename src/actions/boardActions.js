export function placeShip(length,name,direction,loc,selectedPart){
    return {
        type:'PLACE_SHIP',
        payload:{
            length,name,direction,loc,selectedPart
        }
    }
}

export function resetBoard(){
    return{
        type:'RESET_BOARD',
        payload:{}
    }
}

export function gameStart(){
    return{
        type:'START_GAME',
        payload:{}
    }
}