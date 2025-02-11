document.getElementById('printButton').addEventListener('click', async () => {
    try {
      // Step 1: Request any Bluetooth device
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true,
        optionalServices: [] // Empty array allows access to all services
      });
  
      console.log(`Connected to device: ${device.name}`);
  
      // Step 2: Connect to the device's GATT server
      const server = await device.gatt.connect();
  
      // Step 3: Get all primary services
      const services = await server.getPrimaryServices();
      console.log('Discovered Services:', services);
  
      // Iterate through services and characteristics
      for (const service of services) {
        console.log(`Service UUID: ${service.uuid}`);
        
        const characteristics = await service.getCharacteristics();
        for (const characteristic of characteristics) {
          console.log(`Characteristic UUID: ${characteristic.uuid}, Properties:`, characteristic.properties);
  
          // Check if characteristic is writable
          if (characteristic.properties.write) {
            console.log('Writable characteristic found:', characteristic.uuid);
  
            // Prepare data to send to the printer
            const invoiceText = `
              Invoice #12345
              -------------------------
              Product 1   x2   $20
              Product 2   x1   $10
              -------------------------
              Total:           $50
              Thank you!
            `;
            const encoder = new TextEncoder();
            const data = encoder.encode(invoiceText + '\n\n\n');
  
            // Step 4: Write data to the writable characteristic
            await characteristic.writeValue(data);
            alert('Invoice sent to printer successfully!');
            return; // Exit after sending to the first writable characteristic
          }
        }
      }
  
      alert('No writable characteristics found on this device.');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect or send data to the printer.');
    }
  });
  