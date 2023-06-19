const axios = require("axios");
const readline = require("readline");

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Function to prompt the user for destination numbers
function promptNumbers() {
  return new Promise((resolve, reject) => {
    rl.question("Enter destination numbers (comma-separated): ", (input) => {
      const numbers = input.split(",").map((number) => number.trim());
      resolve(numbers);
    });
  });
}

// Function to prompt the user for the notification URL
function promptNotificationUrl() {
  return new Promise((resolve, reject) => {
    rl.question("Enter notification URL: ", (input) => {
      resolve(input.trim());
    });
  });
}

// Main function to send SMS
async function sendSMS() {
  try {
    // Prompt the user for destination numbers
    const destinations = await promptNumbers();

    // Prompt the user for the notification URL
    const notificationUrl = await promptNotificationUrl();

    // Craft the API request payload
    const payload = {
      messages: [
        {
          from: "YourSenderID",
          destinations: destinations.map((number) => ({ to: number })),
          text: "YourMessage",
          notifyUrl: notificationUrl,
        },
      ],
    };

    // Send the API request
    const response = await axios.post(
      "https://api.infobip.com/sms/2/text/multi",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic YOUR_API_KEY",
        },
      }
    );

    console.log("SMS sent successfully");
    console.log(response.data);
  } catch (error) {
    console.error("Error sending SMS:", error.response.data);
  } finally {
    // Close the readline interface
    rl.close();
  }
}

// Run the sendSMS function
sendSMS();
