const mongoose = require('mongoose');

// Define the schema for the rooms
const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  qrCode: {
    type: String,
    required: true
  }
});

// Define the schema for the participants
const participantSchema = new mongoose.Schema({
  participantId: {
    type: String,
    required: true,
    unique: true
  },
  roomId: {
    type: String,
    required: true
  }
});

// Create the models
const Room = mongoose.model('Room', roomSchema);
const Participant = mongoose.model('Participant', participantSchema);

// Connect to the database
mongoose.connect('mongodb://localhost:27017/chatApp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

module.exports = {
  Room,
  Participant
};
