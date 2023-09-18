const QRCode = require('qrcode');

const generate = async (roomId) => {
  try {
    const url = `http://localhost:3000/participant?roomId=${roomId}`;
    const qrCode = await QRCode.toDataURL(url);
    return qrCode;
  } catch (err) {
    console.error(err);
    return null;
  }
};

module.exports = {
  generate
};
