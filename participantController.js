const express = require('express');
const router = express.Router();
const { Room } = require('./database');
const { Participant } = require('./database');

// Function to join a room
router.get('/join/:roomId', async (req, res) => {
  try {
    // Get the room ID from the request parameters
    const roomId = req.params.roomId;

    // Find the room with the given ID
    const room = await Room.findOne({ roomId: roomId });

    // If the room does not exist, send an error message
    if (!room) {
      return res.status(404).send('Room not found');
    }

    // Create a new participant
    const participant = new Participant({
      roomId: roomId,
      joinedAt: new Date()
    });

    // Save the participant to the database
    await participant.save();

    // Redirect the participant to the room page
    res.redirect('/room/' + roomId);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
