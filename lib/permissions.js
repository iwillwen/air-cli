const permissions = {
  // Storage
  'storage:file': 'File Storage',
  'storage:async': 'Async Database',
  // Media
  'media:camera': 'Camera',
  'media:photos': 'CameraRoll',
  'media:microphone': 'Microphone',
  'media:sound': 'Play sound',
  // Net
  'net:http': 'HTTP Request',
  'net:tcp': 'TCP Connection',
  'net:udp': 'UDP Connection',
  'net:websocket': 'WebSocket Connection',
  'net:bluetooth': 'Bluetooth Devices',
  'net:nfc': 'NFC Devices',
  // Privacy
  'privacy:location': 'Device Location',
  'privacy:contacts': 'Contacts',
  // System
  'system:background_fetch': 'Background Fetch',
  'system:notifications': 'Notifications',
  'system:call': 'Phone call',
  'system:motions_sensor': 'Motions Sensor',
  'system:vibration': 'Vibration',
  'system:fingerprint': 'Fingerprint',
}

const permissionsKeys = Object.keys(permissions)

module.exports = {
  permissions,
  permissionsKeys
}