export default (state = {allSounds:{},playedKeys:[]}, action) => {
  switch (action.type) {
    case 'ADD_SOUND':
      return reduce_addSound({...state},action)
    case 'PLAY_SOUND':
      return reduce_playSound({...state},action)
    
    default:
    return state
  }
}
  
function reduce_addSound (state,action){

  let i = 0
  state.allSounds[action.payload.key] = { players : new Array(5).fill('').map(()=>(new Audio())) , reader : new FileReader()}

  //load audioFile in audio player
    state.allSounds[action.payload.key].reader.onload = function(e) {
      state.allSounds[action.payload.key].players.forEach((player,i) =>{
        player.setAttribute('src', e.target.result);
        player.load();
        player.id = 'test'+e.target.result+ i 
      })
  }
  state.allSounds[action.payload.key].reader.readAsDataURL(action.payload.input.files[0]);
  
  return state
}

function reduce_playSound(state,action){

  state.playedKey = action.payload.key;

  if(!state.playedKeys.includes(state.playedKey))
    state.playedKeys.push(action.payload.key);

  return state
}