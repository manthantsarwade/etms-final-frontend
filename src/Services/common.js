import axios from 'axios';
import { createUrl } from '../utils';

export async function regiter(firstName, lastName, email, password, role, dob, department) {
  try {
    const url = createUrl('auth/signup');
    const body  ={
      firstName,
      lastName,
      email,
      password,
      role,
      dob,
      department
    }
  
    const response = await axios.post(url,body);
    return response.data;
  } catch (error) {
    return {status: 'error', message: error.response.data.message};
    
  }
}

export async function Login(email,password){
    try{
        const url = createUrl('auth/login');
        const body = {
            email,password

        }
        const response = await axios.post(url,body);
        return response.data;
    }
    catch(error){
        return {status: 'error', message: error.response.data.message};
    }
}
