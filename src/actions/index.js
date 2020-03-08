import axios from 'axios';
import { $getSchedules } from '../queries';
const root = process.env.CRICKET_API_URL;

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
      if(res){
        return res;
      }         
      return false;
  }
  catch(err) {
    console.log('errrrr',err)
    return false;
  }
};