// microphone.js

// Function to request microphone access
function requestMicrophoneAccess() {
  return new Promise((resolve, reject) => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        resolve(stream);
      })
      .catch(error => {
        console.error('Error:', error);
        reject(error);
      });
  });
}

// Function to start speaking
function startSpeaking(stream) {
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
}

// Function to stop speaking
function stopSpeaking() {
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
  }
}

// Export the functions
module.exports = {
  requestMicrophoneAccess,
  startSpeaking,
  stopSpeaking
};
