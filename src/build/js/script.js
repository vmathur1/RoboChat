document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const userInput = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const API_TOKEN = "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"; // Replace with your actual API token


    sendButton.addEventListener("click", async () => {
        const message = userInput.value.trim();
        if (!message) return; // Don't send empty messages

        appendMessage("user", message);
        userInput.value = ""; // Clear the input

        try {
            const response = await fetch("https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${API_TOKEN}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ inputs: message }),
            });

            if (response.ok) {
                const data = await response.json();
                appendMessage("bot", data[0].generated_text);
            } else {
                const errorData = await response.json();
                console.error("Error:", errorData.error);
                appendMessage("bot", "I'm sorry, I couldn't process your request.");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            appendMessage("bot", "Oops! Something went wrong.");
        }
    });

    function appendMessage(sender, message) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message", sender);
        messageElement.textContent = message;
        chatContainer.appendChild(messageElement);

        // Scroll to the bottom of the chat
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
});



