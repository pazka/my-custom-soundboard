export const addSound = (key, input,player) => (dispatch,getState) => {
    dispatch({
        type: 'ADD_SOUND',
        payload: {key : key, input : input}
       })
   }
   
export const playSound = (key) => (dispatch,getState) => {
    dispatch({
        type: 'PLAY_SOUND',
        payload: {key : key}
       })
   }