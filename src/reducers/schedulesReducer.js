
export default function(state = { schedules: {}}, action) {              
    switch(action.type) {       
      case 'GET_SCHEDULES' : 
        return {...state, schedules: action.data }          
      default :
        return state;
    }
}
