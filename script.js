document.addEventListener("DOMContentLoaded", function () {
    const inputElement = document.getElementById("blogTopic");
    const buttonElement = document.getElementById("generateButton");
    const outputElement = document.getElementById("output");

    buttonElement.addEventListener("click", function () {
        const userInput = inputElement.value.trim();

        if (!userInput) {
            outputElement.innerText = "Please enter a blog topic.";
            return;
        }

        outputElement.innerText = "Generating blog... Please wait.";

        fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer YOUR_API_KEY`,  // Replace with your actual API key
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo", // Ensure the model is correct
                messages: [{ role: "user", content: `Write a blog about ${userInput}` }]
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`API Error: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("API Response:", data); // Debugging log

            // Handle API errors properly
            if (!data.choices || data.choices.length === 0) {
                console.error("Unexpected API response:", data);
                outputElement.innerText = "Error: No valid response from API.";
                return;
            }

            outputElement.innerText = data.choices[0].message.content;
        })
        .catch(error => {
            console.error("Fetch Error:", error);
            outputElement.innerText = "Something went wrong. Please try again later.";
        });
    });
});
