import Board from './BoardFactory';
import Ship from './ShipFactory';

const Player = () => {
    let playerBoard=Board();
    let shipArray=[
        Ship(5,'Carrier'),
        Ship(4,'Battleship'),
        Ship(3,'Destroyer'),
        Ship(3,'Submarine'),
        Ship(2,'PatrolBoat')
    ];

    function getDirections(){
        return shipArray[0].getDirection();
    }

    function changeDirections(){
        for(let i=0; i<shipArray.length; i++){
            shipArray[i].changeDirection();
        }
    }

    //Maybe need function to turn shipArray into placedShips

    return {getDirections, changeDirections, playerBoard,shipArray};
}

export default Player;