document.getElementById('printButton').addEventListener('click', async () => {
    try {
      const device = await navigator.bluetooth.requestDevice({
        acceptAllDevices: true
      });
  
      console.log(`Selected device: ${device.name}`);
  
      const server = await device.gatt.connect();
      console.log('Connected to device');
  
      alert(`Successfully connected to ${device.name}`);
    } catch (error) {
      console.error('Bluetooth Error:', error);
      alert(`Connection failed: ${error.message}`);
    }
  });
  