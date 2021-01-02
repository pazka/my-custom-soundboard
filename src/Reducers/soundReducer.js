export default (state = {allSounds:{}}, action) => {
  switch (action.type) {
    case 'ADD_SOUND':
      return reduce_addSound(state,action)
    case 'PLAY_SOUND':
      return {
        ...state,
        playedKey : action.payload.key
      }
    
    default:
    return state
  }
}
  
function reduce_addSound (state,action){
  let i = 0
  state.allSounds[action.payload.key] = { players : new Array(5).fill('').map(()=>(new Audio())) , reader : new FileReader()}

  //load audioFile in audio player
    state.allSounds[action.payload.key].reader.onload = function(e) {
      state.allSounds[action.payload.key].players.forEach(player =>{
        player.setAttribute('src', e.target.result);
        player.load();
        player.id = 'test'+e.target.result+ i++ 
      })
  }
  state.allSounds[action.payload.key].reader.readAsDataURL(action.payload.input.files[0]);
  
  return state
}