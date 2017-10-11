import fetch from 'isomorphic-fetch'

export const SELECT_OPPONENT = 'SELECTED_OPPONENT'
export const REQUEST_OPPONENT = 'REQUEST_OPPONENT'
export const RECEIVE_OPPONENT = 'RECEIVE_OPPONENT'
export const DISPLAY_OPPONENT = 'DISPLAY_OPPONENT'

function receiveOpponent(opponentName, json) {
    return {
      type: RECEIVE_OPPONENT,
      opponentName,
      opponentImage: json.imageUrl,
      receivedAt: Date.now()
    }
}

export function selectOpponent(opponentName) {
    return {
        type: SELECT_OPPONENT,
        opponentName
    }
}

function requestOpponent(opponentName) {
    return {
        type: REQUEST_OPPONENT,
        opponentName
    }
}


function shouldFetchOpponent(state, opponentName) {
    const currentOpponent = state.opponentName
    if(!currentOpponent) {
        return true
    } else {
        return false
    }
}

export function fetchOpponentIfNeeded(opponentName) {
    return (dispatch, getState) => {
        if(shouldFetchOpponent(getState(), opponentName)) {
            return dispatch(fetchOpponent(opponentName))
        }
    }
}

function fetchOpponent(opponentName) {
    return dispatch => {
        dispatch (requestOpponent(opponentName))
        return fetch(`https://robohash.p.mashape.com/index.php?text=${opponentName}`, {
            method: 'post',
            headers: {
                'X-Mashape-Key': 'RQwcdT4a3OmshfKbItKrRz6yrTwhp1CgFIKjsnm5Dho1e00ThX',
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => {
        dispatch(receiveOpponent(opponentName, json));
        });
    }
}