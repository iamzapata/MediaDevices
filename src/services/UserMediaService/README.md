# UserMedia Service

This service is a wrapper around different WEB APIs that allow to access user media devices (camera, microphone, etc).

## Web APIs

### Permissions

- navigator.permissions.query()

### MediaDevices

- navigator.mediaDevices.getSupportedConstraints()
- navigator.mediaDevices.enumerateDevices()
- navigator.mediaDevices.getUserMedia()

### MediaStream

- MediaStream.getTracks()
- MediaStreamTrack.stop()

### MediaStreamTrack

- MediaStreamTrack.getCapabilities()
- MediaStreamTrack.getConstraints()
- MediaStreamTrack.getSettings()
- MediaStreamTrack.applyConstraints()
