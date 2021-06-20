const Board = () => {
    let gameBoard = new Array(100).fill('empty');

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
    function registerHit(name,loc){
        if(gameBoard[loc]==='empty' && name==='empty'){
            gameBoard[loc]='empty hit'
        }
        else if(gameBoard[loc]==='empty'){
            gameBoard[loc]=name+' hit'
        }
    }

    return {gameBoard,registerHit,placeShips}
}

export default Board;