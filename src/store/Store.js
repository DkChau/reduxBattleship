import {createStore, applyMiddleware} from 'redux';
import Player from '../factories/PlayerFactory';
import boardReducer from '../reducers/boardReducer';
import logger from 'redux-logger';

export default createStore (
    boardReducer,
    {player:Player()},
    applyMiddleware(logger),
)

