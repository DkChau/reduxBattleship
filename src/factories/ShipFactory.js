
const Ship=(length,name)=>{
    let health=length;
    let shipDisplay=new Array(length).fill(0);
    let direction='Horizontal';

    for(let i=0; i<shipDisplay.length; i++){
        shipDisplay[i]=name + ' ' + i;
    }

    function hit(){
        health-=1;
    }
    function isSunk(){
        return health===0;
    }
    function getHealth(){
        return health;
    }
    function changeDirection(){
        direction = direction==='Horizontal' ? 'Vertical' : 'Horizontal';
    }
    function getDirection(){
        return direction;
    }
    function getName(){
        return name;
    }
    return {hit, shipDisplay, length, getName, getHealth,changeDirection,getDirection, isSunk,name}
}

export default Ship;