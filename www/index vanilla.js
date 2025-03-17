const Serial = window.Capacitor.Plugins.Serial;

// Define Vendor & Product ID
const VENDOR_ID = 0x2dcf;
const PRODUCT_ID = 0x6002;

let fullResponse = ''; // Buffer for collecting incoming data

async function connectToSerial() {
  console.log('Attempting to request permission for BleuIO...');

  try {
    const permissionResponse = await Serial.requestSerialPermissions({
      vendorId: VENDOR_ID,
      productId: PRODUCT_ID,
      driver: 'CDC_ACM_SERIAL_DRIVER',
    });

    if (!permissionResponse.granted) {
      console.error('Permission denied for USB device.');
      document.getElementById('response').textContent = 'Permission denied!';
      return;
    }

    console.log('Permission granted. Opening serial connection...');

    await Serial.openConnection({
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
      parity: 0,
      dtr: true,
      rts: true,
    });

    console.log('Serial connection opened successfully!');
    document.getElementById('response').textContent = 'Connected to BleuIO!';

    // Reset response buffer
    fullResponse = '';

    // Register read callback
    await Serial.registerReadCallback((message, error) => {
      if (message && message.data) {
        console.log('Received Data:', message.data);

        // Append new data to response buffer
        fullResponse += message.data;

        // Display formatted response
        document.getElementById('response').textContent = fullResponse;
      } else if (error) {
        console.error('Read error:', error);
        document.getElementById('response').textContent = 'Read error.';
      }
    });
  } catch (error) {
    console.error('Error connecting to serial:', error);
    document.getElementById('response').textContent = 'Connection error.';
  }
}

// Expose function globally
window.connectToSerial = connectToSerial;
async function sendATCommand() {
  console.log('Sending ATI command...');

  try {
    fullResponse = ''; // Clear response buffer before sending new command
    await Serial.write({ data: 'ATI\r\n' });
    console.log('ATI command sent successfully!');

    console.log('Waiting for response...');
  } catch (error) {
    console.error('Error sending AT command:', error);
    document.getElementById('response').textContent = 'Error sending command.';
  }
}

// Expose function globally
window.sendATCommand = sendATCommand;
