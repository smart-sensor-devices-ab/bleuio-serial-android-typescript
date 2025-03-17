const Serial = (window as any).Capacitor.Plugins.Serial;

// Define Vendor & Product ID for BleuIO
const VENDOR_ID = 0x2dcf;
const PRODUCT_ID = 0x6002;

// Function to connect to BleuIO via OTG Serial
async function connectToSerial(): Promise<void> {
  console.log('Requesting permission for BleuIO...');

  try {
    const permissionResponse = await Serial.requestSerialPermissions({
      vendorId: VENDOR_ID,
      productId: PRODUCT_ID,
      driver: 'CDC_ACM_SERIAL_DRIVER',
    });

    if (!permissionResponse.granted) {
      console.error('Permission denied!');
      document.getElementById('response')!.textContent = 'Permission denied!';
      return;
    }

    console.log('Opening serial connection...');
    await Serial.openConnection({
      baudRate: 115200,
      dataBits: 8,
      stopBits: 1,
      parity: 0,
      dtr: true,
      rts: true,
    });

    console.log('Serial connection opened!');
    document.getElementById('response')!.textContent = 'Connected to BleuIO!';

    let fullResponse = '';

    //  Register read callback
    await Serial.registerReadCallback(
      (message: { data?: string }, error?: any) => {
        if (message && message.data) {
          console.log('Received Data:', message.data);
          fullResponse += message.data + '\n';
          document.getElementById('response')!.textContent = fullResponse;
        } else if (error) {
          console.error('Read error:', error);
          document.getElementById('response')!.textContent = 'Read error.';
        }
      }
    );
  } catch (error) {
    console.error('Connection error:', error);
    document.getElementById('response')!.textContent = 'Connection error.';
  }
}

// Function to send an AT command to BleuIO
async function sendATCommand(): Promise<void> {
  console.log('Sending ATI command...');

  try {
    await Serial.write({ data: 'ATI\r\n' });

    console.log('ATI command sent!');
    console.log('Waiting for response...');
  } catch (error) {
    console.error('Command error:', error);
    document.getElementById('response')!.textContent = 'Error sending command.';
  }
}

(window as any).connectToSerial = connectToSerial;
(window as any).sendATCommand = sendATCommand;
