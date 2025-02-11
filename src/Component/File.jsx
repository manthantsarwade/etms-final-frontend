import React, { useState } from "react";
import axios from "axios";

function FileDisplay({ taskId }) {
  const [fileUrl, setFileUrl] = useState(null);

  const handleView = async () => {
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const response = await axios.get(`http://localhost:8080/manager/verify/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // Ensure response is a binary file
      });

      // Create a Blob with the correct MIME type
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a URL to display the PDF
      const url = URL.createObjectURL(blob);
      setFileUrl(url);

      // Fallback: Open in a new tab for better viewing
     // window.open(url);
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  return (
    <div>
      <button onClick={handleView}>View File</button>
      {fileUrl && (
        <iframe 
          src={fileUrl} 
          style={{ width: "100%", height: "500px", border: "none" }} 
          title="Task Document"
        />
      )}
    </div>
  );
}

export default FileDisplay;
