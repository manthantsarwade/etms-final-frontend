import axios from 'axios';
import { createUrl } from '../utils';

export async function getRequests() {
    try {
        const url = createUrl("admin/viewRequests");
        const token = sessionStorage.getItem("token");

        if (!token) {
            return { status: "error", message: "No token found" };
        }

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        return { status: "error", message: error?.response?.data?.message || "An error occurred" };
    }
}

export async function rejectRequest(id) {
    try {
        const url = createUrl(`admin/deleteWorker/${id}`);
        const token = sessionStorage.getItem("token");

        if (!token) {
            return { status: "error", message: "No token found" };
        }

        const response = await axios.patch(url, {}, {  
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        return { status: "error", message: error?.response?.data?.message || "An error occurred" };
    }
}

export async function acceptRequest(id) {
    try {
      const url = createUrl(`admin/approveRequests/${id}`);
      const token = sessionStorage.getItem("token");
  
      if (!token) {
        return { status: "error", message: "No token found" };
      }
  
      const response = await axios.patch(
        url,
        {}, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      return response.data;
    } catch (error) {
      return {
        status: "error",
        message: error?.response?.data?.message || "An error occurred",
      };
    }
  }

  export async function deleteWorker(id) {
    try {
        const url = createUrl(`admin/deleteWorker/${id}`);
        const token = sessionStorage.getItem("token");

        if (!token) {
            return { status: "error", message: "No token found" };
        }

        const response = await axios.patch(url, {}, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        return { status: "error", message: error?.response?.data?.message || "An error occurred" };
    }
}


export async function getProjects(){
    try{
        const url = createUrl("admin/getProjects");
        const token = sessionStorage.getItem("token");

        if(!token){
            return {status: "error", message: "No token found"};
        }

        const response = await axios.get(url, {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }catch(error){
        return {status: "error", message: error?.response?.data?.message || "An error occurred"};
    }
}

export async function addProjects(projectData) {
    try {
        const url = createUrl("admin/addProject");
        const token = sessionStorage.getItem("token");

        if (!token) {
            return { status: "error", message: "No token found" };
        }

        const response = await axios.post(url, projectData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    } catch (error) {
        return { status: "error", message: error?.response?.data?.message || "An error occurred" };
    }
}


export async function acceptWorker(){
    try{
        const url = createUrl("admin/viewWorkers");
        const token = sessionStorage.getItem("token");

        if(!token){
            return {status: "error", message: "No token found"};
        }
        const response =await axios .get(url, {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }catch(error){
        return {status: "error", message: error?.response?.data?.message || "An error occurred"};
    }
}


export async function allManager(){
    try{
        const url = createUrl("admin/viewManagers");
        const token = sessionStorage.getItem("token");

        if(!token){
            return {status: "error", message: "No token found"};
        }
        const response =await axios .get(url, {
            headers:{
                Authorization: `Bearer ${token}`,
            },
        });

        return response.data;
    }catch(error){
        return {status: "error", message: error?.response?.data?.message || "An error occurred"};
    }
}