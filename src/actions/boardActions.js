export function placeShip(length,name,direction,loc){
    return {
        type:'PLACE_SHIP',
        payload:{
            length,name,direction,loc
        }
    }
}