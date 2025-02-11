import axios from 'axios';
import { createUrl } from '../utils';




export async function getTaskById(id) {
    try {
        const url = createUrl(`employee/getTasks/${id}`);
        const token = sessionStorage.getItem("token"); // Corrected method
        
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
        return {
            status: "error",
            message: error?.response?.data?.message || "An error occurred",
        };
    }
}

export async function uploadFile(id, file) {
    try {
      if (!file) {
        return { status: "error", message: "No file provided" };
      }
  
      const url = createUrl(`employee/${id}`);
      const token = sessionStorage.getItem("token");
  
      if (!token) {
        return { status: "error", message: "No token found" };
      }
  
      // Using FormData to send the file
      const formData = new FormData();
      formData.append("file", file); // 'file' is the file input
  
      // Send the formData with proper headers
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Let the browser determine the MIME type
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("File upload error:", error);
      return {
        status: "error",
        message: error.response?.data?.message || "File upload failed",
      };
    }
  }
  
