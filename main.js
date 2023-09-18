// main.js

// Establish a connection to the server
const socket = io();

// Function to create a new room
function createRoom() {
  fetch('/room/create')
    .then(response => response.json())
    .then(data => {
      // Hide the room creation button
      document.getElementById('roomCreation').style.display = 'none';

      // Show the room information
      document.getElementById('roomInfo').style.display = 'block';

      // Display the QR code for the room
      document.getElementById('qrCode').src = data.qrCode;
    })
    .catch(error => console.error('Error:', error));
}

// Function to join a room
function joinRoom(roomId) {
  fetch(`/participant/join/${roomId}`)
    .then(response => {
      if (response.ok) {
        // Redirect the participant to the room page
        window.location.href = `/room/${roomId}`;
      } else {
        alert('Failed to join room');
      }
    })
    .catch(error => console.error('Error:', error));
}

// Function to handle the QR code scanning
function handleQRCodeScan(data) {
  // Extract the room ID from the scanned data
  const roomId = data.split('=')[1];

  // Join the room
  joinRoom(roomId);
}

// Function to start speaking
function startSpeaking() {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      const audioContext = new AudioContext();
      const source = audioContext.createMediaStreamSource(stream);
      const processor = audioContext.createScriptProcessor(1024, 1, 1);

      source.connect(processor);
      processor.connect(audioContext.destination);

      processor.onaudioprocess = function(e) {
        // Send audio data to the server
        socket.emit('audioData', {
          roomId: roomId,
          audioData: e.inputBuffer.getChannelData(0)
        });
      };
    })
    .catch(error => console.error('Error:', error));
}
