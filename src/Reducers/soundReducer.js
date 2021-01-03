export default (state = {allSounds:{},playedKeys:[]}, action) => {
  switch (action.type) {
    case 'ADD_SOUND':
      return reduce_addSound({...state},action)
    case 'PLAY_SOUND':
      return reduce_playSound({...state,playedKeys : [...state.playedKeys]},action)
    
    default:
    return state
  }
}
function reduce_addSound (state, action) {
  const newState = {
    ...state,  // shallow copy existing state
    allSounds: {
      ...state.allSounds, // shallow copy existing allSounds
      [action.payload.key]: {
        players: new Array(5).fill('').map(()=>(new Audio())),
        reader: new FileReader(),
      },
    }
  };

  // load audioFile in audio player
  newState.allSounds[action.payload.key].reader.onload = function(e) {
    newState.allSounds[action.payload.key].players.forEach((player, i) => {
      player.setAttribute('src', e.target.result);
      player.load();
      player.id = 'test' + e.target.result + i // <-- use index from forEach loop
    })
  }
  newState.allSounds[action.payload.key]
    .reader
    .readAsDataURL(action.payload.input.files[0]);
  
  return newState;
}

function reduce_playSound (state, action) {
  const newState = {
    ...state,
    playedKey: action.payload.key,
  };

  if(!newState.playedKeys.includes(newState.playedKey))
    newState.playedKeys = [...newState.playedKeys, action.payload.key];

  return newState
}