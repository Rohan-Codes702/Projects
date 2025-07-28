const apiKey = 'AIzaSyAFdvcrrsN6AK4Yq4J5dLWT_NgIClaR27I';
const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

const chatMessage = document.getElementById('chatMessage');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendButton');

async function generateResponse(prompt) {
  const response = await fetch(`${url}?key=${apiKey}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [{ text: prompt }]
        }
      ]
    })
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

// Clean markdown (optional enhancement)
function cleanMarkdown(text) {
  return text.replace(/\n{3,}/g, '\n\n').trim();
}

// Function to add message to chat box
function addMessage(message, isUser) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(isUser ? 'user-message' : 'bot-message');

  const profileLogo = document.createElement('img');
  profileLogo.classList.add('profile-logo');
  profileLogo.src = isUser ? 'profileLogo.png' : 'ChatBotlogo.png';
  profileLogo.alt = isUser ? 'User' : 'Bot';

  const messageContent = document.createElement('div');
  messageContent.classList.add('message-content');
  messageContent.textContent = message;

  messageElement.appendChild(profileLogo);
  messageElement.appendChild(messageContent);

  chatMessage.appendChild(messageElement);
  chatMessage.scrollTop = chatMessage.scrollHeight;
}

// Main handler when user sends a message
async function handleUserInput() {
  const userMessage = userInput.value.trim();
  if (!userMessage) return;

  addMessage(userMessage, true);
  userInput.value = '';
  sendButton.disabled = true;
  userInput.disabled = true;

  try {
    const botReply = await generateResponse(userMessage);
    addMessage(cleanMarkdown(botReply), false);
  } catch (error) {
    console.error('Error:', error);
    addMessage('❌ Error fetching response from AI. Try again later.', false);
  } finally {
    userInput.disabled = false;
    sendButton.disabled = false;
    userInput.focus();
  }
}

// Event listeners
sendButton.addEventListener('click', handleUserInput);

userInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleUserInput();
  }
});
