document.getElementById("sendBtn").addEventListener("click", async () => {
    const userPrompt = document.getElementById("userPrompt").value;

    if (!userPrompt.trim()) {
        alert("Please enter a prompt!");
        return;
    }

    // Clear the textarea
    document.getElementById("userPrompt").value = "";

    // Send prompt to Google Gemini API
    try {
        const response = await fetch("https://api.google.com/gemini/v1", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer AIzaSyD2NDyMvwcS6hpb0ZJE1lYLMoyvS2yct_4`, // Replace with your API key
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
