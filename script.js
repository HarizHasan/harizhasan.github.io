document.getElementById("sendBtn").addEventListener("click", async () => {
    const userPrompt = document.getElementById("userPrompt").value;

    if (!userPrompt.trim()) {
        alert("Please enter a prompt!");
        return;
    }

    // Clear the textarea
    document.getElementById("userPrompt").value = "";

    try {
        const response = await fetch("http://34.87.59.92:3000/gemini", { // Replace with your proxy server's actual IP or domain
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                prompt: userPrompt, // Send the user's prompt
            }),
        });

        const data = await response.json();

        if (response.ok) {
            displayResponse(data.response); // Display the API's response
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
