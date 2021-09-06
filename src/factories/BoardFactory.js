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
    let cpuDirection='';
    let cardinals={
        down:10,
        up:-10,
        left:-1,
        right:1,
    }
    let cardinalArray=[];
    let nextLoc=0;
    let remIndex=0;

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
        let shipName=''

        //If the cpu has not yet hit a ship it will continue to randomize locations until it registers a hit
        if(cardinalArray.length===0 && cpuDirection===''){
            let randomLoc=Math.floor(Math.random()*availableSquares.length);
            let loc=availableSquares[randomLoc];
            availableSquares.splice(randomLoc,1);
            if(!(gameBoard[loc]==='empty')){
                for(let key in cardinals){ //INCASE ANYTHING MESSES UP ITS BECAUSE OF THIS MODULUS BECAUSE IT WORKED PERFECT BEFORE IT
                    if(availableSquares.includes(loc+cardinals[key]) && !((loc+cardinals[key])%10===0)){
                        cardinalArray.push({
                            cardDirection:key,
                            position:(loc+cardinals[key]),
                            value:cardinals[key],
                        });
                    }
                }
                shipName=gameBoard[loc];
                for(let i=0; i<shipArray.length; i++){
                    if(shipArray[i].getName()===shipName){
                        shipArray[i].hit();
                        gameBoard[loc]=gameBoard[loc]+' disabled';
                        if(shipArray[i].isSunk()){
                            return{
                                gameBoard:gameBoard,
                                shipName:shipName,
                            }
                        }
                    }
        
                }
            }
            else{
                gameBoard[loc]=gameBoard[loc]+' disabled';
                return {gameBoard:gameBoard};
            }
        }
        //Once a hit on a ship is registered, the cpu will continue to search the surrounding cardinal direction to determine its future direction
        else{
            if(cpuDirection===''){   
                let locInCardinal=Math.floor(Math.random()*cardinalArray.length)
                let cardinalLoc=cardinalArray[locInCardinal].position;

                if(!(gameBoard[cardinalLoc]==='empty')){
                    cpuDirection={ 
                        direction:cardinalArray[locInCardinal].cardDirection,
                        value:cardinals[cardinalArray[locInCardinal].cardDirection],
                        currentLoc:cardinalLoc,
                    };
                    cardinalArray.splice(locInCardinal,1);
                    remIndex=availableSquares.indexOf(cardinalLoc)
                    availableSquares.splice(remIndex,1)
                    shipName=gameBoard[cardinalLoc]
                    

                    for(let i=0; i<shipArray.length; i++){
                        if(shipArray[i].getName()===shipName){
                            shipArray[i].hit();
                            gameBoard[cardinalLoc]=gameBoard[cardinalLoc]+' disabled';
                            if(shipArray[i].isSunk()){
                                cpuDirection='';
                                // cardinalArray=[];
                                return{
                                    gameBoard:gameBoard,
                                    shipName:shipName,
                                }
                            }
                        }
            
                    }
                }
                else{
                    remIndex=(availableSquares.indexOf(cardinalLoc))
                    availableSquares.splice(remIndex,1)
                    cardinalArray.splice(locInCardinal,1);
                    gameBoard[cardinalLoc]=gameBoard[cardinalLoc]+' disabled';
                    return {gameBoard:gameBoard};
                }
            }
            //end of branch no direction
            else{
                nextLoc=cpuDirection.value+cpuDirection.currentLoc;
                if(gameBoard[nextLoc].includes('disabled')){
                    // let newCardArray=[];
                    // for(let i=0; i<cardinalArray.length; i++){
                    //     if(cardinalArray[i].value===(cpuDirection.value*-1)){
                    //         newCardArray.push(cardinalArray[i]);
                    //         break;
                    //     }
                    // }
                    // cardinalArray=newCardArray;

                    let locInCardinal=Math.floor(Math.random()*cardinalArray.length)
                    let cardinalLoc=cardinalArray[locInCardinal].position;
    
                    if(!(gameBoard[cardinalLoc]==='empty')){
                        cpuDirection={ 
                            direction:cardinalArray[locInCardinal].cardDirection,
                            value:cardinals[cardinalArray[locInCardinal].cardDirection],
                            currentLoc:cardinalLoc,
                        };
                        cardinalArray.splice(locInCardinal,1);
                        remIndex=availableSquares.indexOf(cardinalLoc)
                        availableSquares.splice(remIndex,1)
                        shipName=gameBoard[cardinalLoc]
                        
    
                        for(let i=0; i<shipArray.length; i++){
                            if(shipArray[i].getName()===shipName){
                                shipArray[i].hit();
                                gameBoard[cardinalLoc]=gameBoard[cardinalLoc]+' disabled';
                                if(shipArray[i].isSunk()){
                                    cpuDirection='';
                                    // cardinalArray=[];
                                    return{
                                        gameBoard:gameBoard,
                                        shipName:shipName,
                                    }
                                }
                            }
                
                        }
                    }
                    else{
                        remIndex=(availableSquares.indexOf(cardinalLoc))
                        availableSquares.splice(remIndex,1)
                        cardinalArray.splice(locInCardinal,1);
                        gameBoard[cardinalLoc]=gameBoard[cardinalLoc]+' disabled';
                        return {gameBoard:gameBoard};
                    }
                }
                else if(gameBoard[nextLoc]==='empty'){
                    gameBoard[nextLoc]=gameBoard[nextLoc]+' disabled';
                    remIndex=(availableSquares.indexOf(nextLoc))
                    availableSquares.splice(remIndex,1)
                    let newCardArray=[];
                    for(let i=0; i<cardinalArray.length; i++){
                        if(cardinalArray[i].value===(cpuDirection.value*-1)){
                            newCardArray.push(cardinalArray[i]);
                            break;
                        }
                    }
                    cardinalArray=newCardArray;
                    cpuDirection=''
                    return {gameBoard:gameBoard};
                }
                else{
                    cpuDirection.currentLoc=nextLoc;
                    shipName=gameBoard[nextLoc];
                    gameBoard[nextLoc]=gameBoard[nextLoc]+' disabled';
                    remIndex=(availableSquares.indexOf(nextLoc))
                    availableSquares.splice(remIndex,1)
                    for(let i=0; i<shipArray.length; i++){
                        if(shipArray[i].getName()===shipName){
                            shipArray[i].hit();
                            if(shipArray[i].isSunk()){
                                cpuDirection='';
                                // cardinalArray=[];
                                return{
                                    gameBoard:gameBoard,
                                    shipName:shipName,
                                }
                            }
                        }
        
                }

                }
            }
        }
        return {gameBoard:gameBoard};
        


    }

    return {gameBoard,generateHit,placeShips}
}

export default Board;