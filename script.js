document.getElementById("sendBtn").addEventListener("click", async () => {
    const userPrompt = document.getElementById("userPrompt").value;
    const API_KEY = "AIzaSyATghtNERA_zD1sXpm43kOOCQ1lyVi1Dzc";
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const AUTH = "ya29.a0ARW5m76AKO1sxepG7MIdfOYvR9RHaKPB8y2nV5z-nzzxNGrMx4L_G45wwsqWb0zuJvFvfv_jMvnmfvxkzULk2vL1pQWa03Ga7O_ei_CXLr_uEo7xb9cAqWhkh2leDX5BCfXR2Fu4WpNXRSz1s1KKhaORsZMKVD7e3PXfzyYmaCgYKAZASARESFQHGX2MiDLXmpAWNvpQyaomsip2C-g0175"

    if (!userPrompt.trim()) {
        alert("Please enter a prompt!");
        return;
    }

    // Clear the textarea
    document.getElementById("sendBtn").addEventListener("click", async () => {
        const userPrompt = document.getElementById("userPrompt").value;
    
        if (!userPrompt.trim()) {
            alert("Please enter a prompt!");
            return;
        }
    
        document.getElementById("userPrompt").value = "";
    
        try {
            const response = await fetch("http://34.87.59.92:3000/gemini", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: userPrompt,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                displayResponse(data.response);
            } else {
                displayResponse("Error: Unable to process your request.");
            }
        } catch (error) {
            displayResponse("Error: Something went wrong.");
            console.error(error);
        }
    });
    
    function displayResponse(message) {
        const history = document.querySelector(".history");
        const newMessage = document.createElement("li");
        newMessage.textContent = message;
        history.appendChild(newMessage);
    }
