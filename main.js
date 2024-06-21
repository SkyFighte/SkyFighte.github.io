// User Authentication
let currentUser = null;

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Perform authentication (e.g., validate credentials with server)
    if (isValidCredentials(username, password)) {
        currentUser = username;
        // Redirect to chat page
        window.location.href = 'ehdp.html';
    } else {
        showError('Invalid username or password.');
    }
}

function isValidCredentials(username, password) {
    const validCredentials = {
        'Debarshi': 'hi',
        'Vihaan': 'bye',
        'Gorank': 'Gorank1!',
        'Adhrit': 'Adhrit1!',
        'Hrishi': 'Hrishi1!',
        'Dhairya': 'Dhairya1!',
        'Pranavi': 'Pranavi1!'
    };
    return validCredentials.hasOwnProperty(username) && validCredentials[username] === password;
}

// Chat Page
const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', function(event) {
    // Send authentication token to server upon connection
    if (currentUser) {
        socket.send(JSON.stringify({ type: 'auth', username: currentUser }));
    }
});

socket.addEventListener('message', function(event) {
    const data = JSON.parse(event.data);
    handleMessage(data);
});

function handleMessage(data) {
    const messages = document.getElementById('messages');
    const message = document.createElement('li');
    message.textContent = data.username + ': ' + data.content;
    messages.appendChild(message);
}

function sendMessage() {
    const input = document.getElementById('message-input');
    const message = input.value;
    if (message.trim() !== '') {
        // Encrypt message before sending (optional)
        const encryptedMessage = encryptMessage(message);
        socket.send(JSON.stringify({ type: 'message', content: encryptedMessage }));
        input.value = '';
    }
}

function encryptMessage(message) {
    // Perform encryption (e.g., using AES encryption algorithm)
    // This is a placeholder function for demonstration
    return message;
}

// Additional features (not implemented):
// - User status indicators (online, offline)
// - Message history retrieval
// - File upload and sharing
// - User interface enhancements (e.g., emojis, message formatting)
