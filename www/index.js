"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const Serial = window.Capacitor.Plugins.Serial;
// Manually register the Serial plugin
// Define Vendor & Product ID for BleuIO
const VENDOR_ID = 0x2dcf;
const PRODUCT_ID = 0x6002;
// Function to connect to BleuIO via OTG Serial
function connectToSerial() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Requesting permission for BleuIO...');
        try {
            const permissionResponse = yield Serial.requestSerialPermissions({
                vendorId: VENDOR_ID,
                productId: PRODUCT_ID,
                driver: 'CDC_ACM_SERIAL_DRIVER', // No direct Enum import needed
            });
            if (!permissionResponse.granted) {
                console.error('Permission denied!');
                document.getElementById('response').textContent = 'Permission denied!';
                return;
            }
            console.log('Opening serial connection...');
            yield Serial.openConnection({
                baudRate: 115200,
                dataBits: 8,
                stopBits: 1,
                parity: 0,
                dtr: true,
                rts: true,
            });
            console.log('Serial connection opened!');
            document.getElementById('response').textContent = 'Connected to BleuIO!';
            let fullResponse = '';
            // ✅ Register read callback correctly
            yield Serial.registerReadCallback((message, error) => {
                if (message && message.data) {
                    console.log('Received Data:', message.data);
                    fullResponse += message.data + '\n';
                    document.getElementById('response').textContent = fullResponse;
                }
                else if (error) {
                    console.error('Read error:', error);
                    document.getElementById('response').textContent = 'Read error.';
                }
            });
        }
        catch (error) {
            console.error('Connection error:', error);
            document.getElementById('response').textContent = 'Connection error.';
        }
    });
}
// Function to send an AT command to BleuIO
function sendATCommand() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('Sending ATI command...');
        try {
            yield Serial.write({ data: 'ATI\r\n' });
            console.log('ATI command sent!');
            console.log('Waiting for response...');
        }
        catch (error) {
            console.error('Command error:', error);
            document.getElementById('response').textContent = 'Error sending command.';
        }
    });
}
// ✅ Ensure Functions Are Available in the Browser
window.connectToSerial = connectToSerial;
window.sendATCommand = sendATCommand;
