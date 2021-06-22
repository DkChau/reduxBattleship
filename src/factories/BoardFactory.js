import Ship from './ShipFactory'
const Board = () => {
    let gameBoard = new Array(100).fill('empty');
    let availableSquares = [...Array(100).keys()];
    let shipArray=[
        Ship(5,'Carrier'),
        Ship(4,'Battleship'),
        Ship(3,'Destroyer'),
        Ship(3,'Submarine'),
        Ship(2,'PatrolBoat')
    ];

    function placeShips(length,name,direction,loc,selectedPart){
        loc=parseInt(loc);
        if(isValid(length,direction,loc,selectedPart))
        {
            if(direction==='Horizontal'){
                loc=loc-parseInt(selectedPart);
                for(let i=loc; i<length+loc; i++){
                    gameBoard[i]=name;
                }
                return {pass:true, gameBoard}
            }
            else{
                loc=loc-parseInt(selectedPart*10);
                for(let z=loc; z<length*10+loc; z+=10){
                    gameBoard[z]=name;
                }
                return {pass:true, gameBoard};
            }
        }
        else{
            return {pass:false, gameBoard};
        }

    }
    function isValid(length,direction,loc,selectedPart){
        loc=parseInt(loc);
        let lastCol=false;
        let firstCol=false;
        if(direction === 'Horizontal'){
            loc=loc-parseInt(selectedPart);
            if(loc<0){return false;}
            if(loc+length-1>=gameBoard.length){return false}
            for(let i=loc; i<loc+length; i++){
                if(!(gameBoard[i]==='empty')){return false}

                if(i%10===9){lastCol=true};
                if(i%10===0){firstCol=true};

                if(lastCol && firstCol){return false};
            }
        }
        else if(direction === 'Vertical'){
            loc=loc-parseInt(selectedPart)*10;
            console.log(loc);
            if(loc<0){return false;}

            if(loc+(length-1)*10>=gameBoard.length){ return false; }

            else{
                for(let z=loc; z<length*10+loc; z+=10){
                    if(!(gameBoard[z]==='empty')){return false;}
                }
            } 
        }
        return true; 
    }
    function generateHit(){
        let randomLoc=Math.floor(Math.random()*availableSquares.length);
        let loc=availableSquares[randomLoc];
        availableSquares.splice(randomLoc,1);

        let shipName=''

        if(!(gameBoard[loc]==='empty')){
            shipName=gameBoard[loc];
            console.log(shipName)
            for(let i=0; i<shipArray.length; i++){
                if(shipArray[i].getName()===shipName){
                    console.log('found Ship!')
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

    return {gameBoard,generateHit,placeShips}
}

export default Board;