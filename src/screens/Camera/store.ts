import { StateCreator } from "zustand"

export interface CameraScreenSlice {
  camera: {
    devices: MediaDeviceInfo[]
    stream: MediaStream | null
    requestedConstraints: MediaStreamConstraints | null
    appliedConstraints: MediaStreamConstraints | null
    browserSupportedConstraints: MediaTrackSupportedConstraints | null
    deviceSupportedConstraints: MediaTrackSupportedConstraints | null
  }
  updateStream: (stream: MediaStream) => void
  updateDevices: (devices: MediaDeviceInfo[]) => void
  updateRequestedConstraints: (constraints: MediaStreamConstraints) => void
  updateAppliedConstraints: (constraints: MediaStreamConstraints) => void
  updateBrowserSupportedConstraints: (
    constraints: MediaTrackSupportedConstraints
  ) => void
  updateDeviceSupportedConstraints: (
    constraints: MediaTrackSupportedConstraints
  ) => void
}

export const createCameraScreenSlice: StateCreator<
  CameraScreenSlice,
  [],
  [],
  CameraScreenSlice
> = (set) => ({
  camera: {
    devices: [],
    stream: null,
    requestedConstraints: null,
    appliedConstraints: null,
    browserSupportedConstraints: null,
    deviceSupportedConstraints: null
  },
  updateStream: (stream) =>
    set((state) => ({
      camera: {
        ...state.camera,
        stream
      }
    })),
  updateDevices: (devices) =>
    set((state) => ({
      camera: {
        ...state.camera,
        devices
      }
    })),
  updateRequestedConstraints: (requestedConstraints) =>
    set((state) => ({
      camera: {
        ...state.camera,
        requestedConstraints
      }
    })),
  updateAppliedConstraints: (appliedConstraints) =>
    set((state) => ({
      camera: {
        ...state.camera,
        appliedConstraints
      }
    })),
  updateBrowserSupportedConstraints: (browserSupportedConstraints) =>
    set((state) => ({
      camera: {
        ...state.camera,
        browserSupportedConstraints
      }
    })),
  updateDeviceSupportedConstraints: (deviceSupportedConstraints) =>
    set((state) => ({
      camera: {
        ...state.camera,
        deviceSupportedConstraints
      }
    }))
})
