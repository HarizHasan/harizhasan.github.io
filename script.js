document.getElementById('sendBtn').addEventListener('click', async () => {
    const userInput = document.getElementById('userInput').value.trim();
    if (!userInput) return;

    // Add user message to chat history
    const chatHistory = document.getElementById('chatHistory');
    const userMessage = document.createElement('li');
    userMessage.classList.add('user');
    userMessage.textContent = userInput;
    chatHistory.appendChild(userMessage);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to the bottom

    // Clear input field
    document.getElementById('userInput').value = '';

    try {
        const response = await fetch('http://localhost:3000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: userInput }),
        });

        const data = await response.json();

        // Add bot reply to chat history
        const botMessage = document.createElement('li');
        botMessage.classList.add('bot');
        botMessage.textContent = data.reply || 'No response';
        chatHistory.appendChild(botMessage);
        chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to the bottom
    } catch (error) {
        console.error('Error:', error);
        const errorMessage = document.createElement('li');
        errorMessage.classList.add('bot');
        errorMessage.textContent = 'Error: Unable to get a response.';
        chatHistory.appendChild(errorMessage);
        chatHistory.scrollTop = chatHistory.scrollHeight; // Scroll to the bottom
    }
});
