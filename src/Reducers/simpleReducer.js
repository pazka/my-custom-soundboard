export default (state = {}, action) => {
    switch (action.type) {
     case 'SIMPLE_ACTION':
      return res(action)
      
     default:
      return state
    }
   }

   function res(action){
     return {result : action.payload}
   }