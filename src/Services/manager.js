import axios from 'axios';
import { createUrl } from '../utils';


export async function getAllTask(manId){
    try {
        const url = createUrl(`manager/getAllTask/${manId}`);
        const token = sessionStorage.getItem("token");
        if(!token){
            return {status:"error",error:"No token found"};
        }
        const response = await axios.get(url,{
            headers:{Authorization: `Bearer ${token}`},
        });
        return response.data;
    } catch (error) {
        return {status:"error",message: error?.response?.data?.message || "An error occurred" }
    }
}

export async function createtask(taskData) {
  try {
    const url = createUrl("manager/createTask");
    const token = sessionStorage.getItem("token");

    if (!token) {
      return { status: "error", message: "No token found" };
    }

    console.log("API Request URL:", url); // Debugging
    console.log("Sending Data:", taskData); // Debugging

    const response = await axios.post(url, taskData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("API Response:", response.data); // Debugging
    return response.data;
  } catch (error) {
    console.error("API Error:", error?.response?.data || error);
    return { status: "error", message: error?.response?.data?.message || "An error occurred" };
  }
}


export async function approveRequests(id){
  try {
    const url = createUrl(`manager/approveRequests/${id}`);
    const token = sessionStorage.getItem("token");
    if (!token) {
        return { status: "error", message: "No token found" };
    }
    const response = await axios.patch(url,{},{
        headers:{Authorization: `Bearer ${token}`,}
    })

    return response.data;
    
  } catch (error) {
    return { status: "error", message: error?.response?.data?.message || "An error occurred" };

  }
}


export async function rejectRequest(id){
    try {
        const url = createUrl(`manager/rejectRequests/${id}`);
        const token = sessionStorage.getItem("token");
        if (!token) {
            return { status: "error", message: "No token found" };
        }
        const response = await axios.patch(url,{},{
            headers:{Authorization: `Bearer ${token}`,}
        })
    
    } catch (error) {
        return { status: "error", message: error?.response?.data?.message || "An error occurred" };
    }
}

export async function updateTask(taskData, taskId) {
    try {
      if (!taskId) {
        console.error("Task ID is required");
        return { status: "error", message: "Task ID is missing" };
      }
  
      const token = sessionStorage.getItem("token");
  
      if (!token) {
        console.warn("No token found. User might not be authenticated.");
        return { status: "error", message: "Authentication required" };
      }
  
      const url = createUrl(`manager/updateTask/${taskId}`);
  
      const updatedTaskData = {
        ...taskData,  
        priority: taskData.priority,  
        dueDate: taskData.dueDate,    
      };
  
      const response = await axios.put(url, updatedTaskData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
  
      return { status: "success", data: response.data };
    } catch (error) {
      console.error("Error updating task:", error);
  
      return { 
        status: "error", 
        message: error?.response?.data?.message || error.message || "An unexpected error occurred"
      };
    }
  }
  

 export async function getPendingTask(manId){
    try {
        const url = createUrl(`manager/getAllPendingTask/${manId}`);
        const token = sessionStorage.getItem("token");
        const response = await axios.get(url,{
            headers:{Authorization: `Bearer ${token}`},
        });
      return response.data;
    } catch (error) {
        return { status: "error", message: error?.response?.data?.message || "An error occurred" };

    }

 }
 export async function verifyTask(manId){
  try {
    const url = createUrl(`manager/verify/${manId}`);
    const token = sessionStorage.getItem("token");
    const response = await axios.get(url,{
        headers:{Authorization: `Bearer ${token}`},
    });
  return response.data;
    
  } catch (error) {
    
  }
 }



 export async function viewAllManager(){
    try {
        const url = createUrl(`manager/viewManagers `);
        const token = sessionStorage.getItem("token");
        const response = await axios.get(url,{
            headers:{Authorization: `Bearer ${token}`},
        });
      return response.data;
    } catch (error) {
        return { status: "error", message: error?.response?.data?.message || "An error occurred" };

    }
 }
 
 export async function getAllEmployee(){
    try {
        const url = createUrl(`manager/getAllEmployees`);
        const token = sessionStorage.getItem("token");
        const response = await axios.get(url,{
            headers:{Authorization: `Bearer ${token}`},
        });
      return response.data;
    } catch (error) {
        return { status: "error", message: error?.response?.data?.message || "An error occurred" };

    }
 }

 export async function getAllProjectById(id){
    try {
        const url = createUrl(`manager/getProjectsByManager/${id}`);
        const token = sessionStorage.getItem("token");
        const response = await axios.get(url,{
            headers:{Authorization: `Bearer ${token}`},
        });
      return response.data;
    } catch (error) {
        return { status: "error", message: error?.response?.data?.message || "An error occurred" };

    } 
 }