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
    document.getElementById("userPrompt").value = "";

    // Send prompt to Google Gemini API
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${AUTH}`, // Replace with your API key
            },
            body: JSON.stringify({
                contents: [{ 
                    role: "user", 
                    parts: [{ text: userMessage }] 
                }]
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
