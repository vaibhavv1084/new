const express = require('express');
const router = express.Router();
const { Room } = require('./database');
const qrCodeGenerator = require('./qrCodeGenerator');

// Function to create a new room
router.get('/create', async (req, res) => {
  try {
    // Generate a unique room ID
    const roomId = Math.random().toString(36).substring(2, 15);

    // Generate a QR code for the room
    const qrCode = qrCodeGenerator.generate(roomId);

    // Create a new room
    const room = new Room({
      roomId: roomId,
      qrCode: qrCode
    });

    // Save the room to the database
    await room.save();

    // Send the room ID and QR code to the client
    res.json({
      roomId: roomId,
      qrCode: qrCode
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
