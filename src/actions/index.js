import axios from 'axios';
import { $getSchedules } from '../queries';
const root = 'https://api.devcdc.com/cricket';

export const _getSchedules = (data) => async (dispatch) => {  
  dispatch({ type: 'GET_SCHEDULES', data })
}
export const getSchedules = async ({status, type, page}) => {
  try {
      const res = await axios.post(root, {
          query: $getSchedules,
          variables: {
              status,
              type,
              page 
          }
      });               
      if(res && res.data && res.data.data){
        return res.data.data.schedule;
      }         
      return false;
  }
  catch(err) {
    console.log('errrrr',err)
    return false;
  }
};