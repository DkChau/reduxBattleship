const Board = () => {
    let gameBoard = new Array(100).fill('empty');

    function placeShips(length,name,direction,loc,selectedPart=0){
        loc=parseInt(loc);
        if(isValid(length,direction,loc))
        {
            if(direction==='Horizontal'){
                for(let i=loc; i<length+loc; i++){
                    console.log('running')
                    gameBoard[i]=name;
                }
                return {pass:true, gameBoard}
            }
            else{
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
    function isValid(length,direction,loc){
        loc=parseInt(loc);
        if(direction === 'Horizontal'){
            if(loc+length>=gameBoard.length){return false}
            for(let i=loc; i<loc+length; i++){
                if(!(gameBoard[i]==='empty')){return false}
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