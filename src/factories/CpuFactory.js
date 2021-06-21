import Ship from '../factories/ShipFactory';

const cpu=()=>{
    let gameBoard=new Array(100).fill('empty');
    let shipArray=[
        Ship(5,'Carrier'),
        Ship(4,'Battleship'),
        Ship(3,'Destroyer'),
        Ship(3,'Submarine'),
        Ship(2,'PatrolBoat')
    ];
    let sunkShips=[];

    function generateShips(){
        shipArray.forEach(ship=>{
            let loc=Math.floor(Math.random()*gameBoard.length);
            placeShips(ship,loc)
        })
        return gameBoard;
    }

    function placeShips(ship, loc){
        if(Math.floor(Math.random()*2)===1){ship.changeDirection();}
        
        if(isValid(ship.getDirection(),ship.length,loc))
        {
            if(ship.getDirection()==='Horizontal'){
                for(let i=loc; i<ship.length+loc; i++){
                    gameBoard[i]=ship.name;
                }
            }
            else{
                for(let z=loc; z<ship.length*10+loc; z+=10){
                    gameBoard[z]=ship.name;
                }
            }
        }
        else
        {
            placeShips(ship,Math.floor(Math.random()*gameBoard.length));
        }
    }
    function isValid(direction,length,loc){
        let lastCol=false;
        let firstCol=false;
        if(direction === 'Horizontal'){
            if(loc+length>=gameBoard.length){return false}
            for(let i=loc; i<loc+length; i++){
                if(!(gameBoard[i]==='empty')){return false}
                if(i%10===9){lastCol=true};
                if(i%10===0){firstCol=true};

                if(lastCol && firstCol){return false};
            }
        }
        else if(direction === 'Vertical'){
            if(loc+length*10>=gameBoard.length){ return false; }
            else{
                for(let z=loc; z<length*10+loc; z+=10){
                    if(!(gameBoard[z]==='empty')){return false;}
                }
            } 
        }
        return true;  
    }

    function hitRegister(loc){
        let shipName='';
        if(!(gameBoard[loc]==='empty')){
            shipName=gameBoard[loc];
            for(let i=0; i<shipArray.length; i++){
                if(shipArray[i].getName()===shipName){
                    shipArray[i].hit();
                    if(shipArray[i].isSunk()){
                        console.log('sunk' , shipName)
                        gameBoard[loc]=gameBoard[loc]+' disabled';
                        return{
                            gameBoard:gameBoard,
                            shipName:shipName,
                        }
                    }
                }
    
            }
        }
        gameBoard[loc]=gameBoard[loc]+' disabled';
        return {gameBoard:gameBoard};
    }

    // function getCurrentHealth(){
    //     let health=0;
    //     for(let i=0; i<shipArray.length; i++){
    //         health+=shipArray[i].getHealth();
    //     }
    //     return health;

    // }

    return {shipArray, gameBoard, generateShips, hitRegister};
}

export default cpu;