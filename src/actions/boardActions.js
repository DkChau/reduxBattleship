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

export function hitCpu(loc){
    return {
        type:'CPU_HIT',
        payload:{
            loc,
        }
    }
}

export function hitPlayer(){
    return {
        type:'PLAYER_HIT',
        payload:{

        }
    }
}

export function gameOver(){
    return{
        type:'GAME_OVER',
        payload:{

        }
    }
}