import {
  handleGetMediaDevicesError,
  handleGetUserMediaError,
  handleStopTracksError,
  handleGetSupportedConstraintsError,
  handleGetDeviceCapabilitiesError,
  handleGetTrackConstraintsError,
  handleGetCurrentTrackSettings,
  handleApplyConstraintsError
} from "./errorHandling"
import {
  requestMediaPermissions,
  MediaPermissionsError
} from "./requestMediaPermissions"

import { AnalyticsTrackerService } from "../AnalyticsTrackerService"
import { EVENT_NAMES } from "../AnalyticsTrackerService/eventNames"
import { SentryService } from "../SentryService"

class GetUserMediaError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "GetUserMediaError"
  }
}

const UserMediaService = {
  /*
   * Device Limitations vs. Browser Capabilities
   *
   * The fact that a browser supports certain constraints doesn't guarantee that these
   * constraints are also supported by the device it's running on, and the reverse is also true.
   */
  getSupportedBrowserConstraints: () => {
    try {
      const supportConstraints =
        navigator.mediaDevices.getSupportedConstraints()

      AnalyticsTrackerService.track(EVENT_NAMES.SUPPORTED_CONSTRAINTS, {
        supportConstraints
      })
    } catch (error) {
      AnalyticsTrackerService.track(EVENT_NAMES.SUPPORTED_CONSTRAINTS_ERROR, {
        error
      })

      if (error instanceof Error) {
        handleGetSupportedConstraintsError(error)
      }
      // Trak in Sentry
    }
  },

  getMediaDevices: async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices()

      AnalyticsTrackerService.track(EVENT_NAMES.MEDIA_DEVICES, { devices })

      return devices
    } catch (error) {
      AnalyticsTrackerService.track(EVENT_NAMES.MEDIA_DEVICES_ERROR, { error })

      if (error instanceof Error) {
        handleGetMediaDevicesError(error)
      }

      // send to Sentry
    }
  },

  getStream: async (constraints: MediaStreamConstraints) => {
    try {
      await requestMediaPermissions(constraints)

      const stream = await navigator.mediaDevices.getUserMedia(constraints)

      AnalyticsTrackerService.track(EVENT_NAMES.USER_MEDIA_STREAM, {
        constraints,
        stream
      })

      return stream
    } catch (error) {
      AnalyticsTrackerService.track(EVENT_NAMES.USER_MEDIA_STREAM_ERROR, {
        constraints,
        error
      })

      SentryService.captureException(error as Error)

      handleGetUserMediaError(error as Error)

      if (error instanceof MediaPermissionsError) {
        AnalyticsTrackerService.track(EVENT_NAMES.MEDIA_PERMISSIONS_ERROR, {})
        throw error
      }

      if (error instanceof Error) {
        AnalyticsTrackerService.track(EVENT_NAMES.GET_USER_MEDIA_ERROR, {})
        throw new GetUserMediaError(error.message)
      }

      throw error
    }
  },

  /**
   * Enumerates the constraints that the device supports.
   * It's somewhat peculiar because you need to access the
   * track first to find outwhat the device is capable of supporting.
   */
  getDeviceCapabilities: async (track: MediaStreamTrack) => {
    try {
      const capabilities = await track.getCapabilities()

      AnalyticsTrackerService.track(EVENT_NAMES.TRACK_CAPABILITIES, {
        track,
        capabilities
      })

      return capabilities
    } catch (error) {
      AnalyticsTrackerService.track(EVENT_NAMES.TRACK_CAPABILITIES_ERROR, {
        track,
        error
      })

      if (error instanceof Error) {
        handleGetDeviceCapabilitiesError(error)
      }

      // send to Sentry or other error tracking service
    }
  },

  /**
   * returns a MediaTrackConstraints object containing the set of
   * constraints most recently established for the track using a prior call to applyConstraints().
   */
  getTrackConstraints: async (track: MediaStreamTrack) => {
    try {
      const trackConstraints = await track.getConstraints()

      AnalyticsTrackerService.track(EVENT_NAMES.TRACK_CONSTRAINTS, {
        track,
        trackConstraints
      })

      return trackConstraints
    } catch (error) {
      AnalyticsTrackerService.track(EVENT_NAMES.TRACK_CONSTRAINTS_ERROR, {
        track,
        error
      })

      if (error instanceof Error) {
        handleGetTrackConstraintsError(error)
      }

      // send to Sentry or other error tracking service
    }
  },

  /**
   * returns a MediaTrackSettings object containing the current
   * values ofeach of the constrainable properties for the current MediaStreamTrack.
   */
  getTrackSettings: async (track: MediaStreamTrack) => {
    try {
      const trackSettings = await track.getSettings()

      AnalyticsTrackerService.track(EVENT_NAMES.TRACK_SETTINGS, {
        track,
        trackSettings
      })

      return trackSettings
    } catch (error) {
      AnalyticsTrackerService.track(EVENT_NAMES.TRACK_SETTINGS_ERROR, {
        track,
        error
      })

      if (error instanceof Error) {
        handleGetCurrentTrackSettings(error)
      }

      // send to Sentry or other error tracking service
    }
  },

  applyConstraints: async (
    track: MediaStreamTrack,
    constraints: MediaTrackConstraints
  ) => {
    try {
      const currentConstraints = await track.getConstraints()

      AnalyticsTrackerService.track(EVENT_NAMES.APPLY_CONSTRAINTS, {
        track,
        currentConstraints,
        constraints
      })

      return await track.applyConstraints({
        ...currentConstraints,
        ...constraints
      })
    } catch (error) {
      AnalyticsTrackerService.track(EVENT_NAMES.APPLY_CONSTRAINTS_ERROR, {
        track,
        constraints,
        error
      })

      if (error instanceof Error) {
        handleApplyConstraintsError(error)
      }
    }
  },

  stopStream: (stream: MediaStream) => {
    try {
      AnalyticsTrackerService.track(EVENT_NAMES.STOP_STREAM, { stream })

      stream.getTracks().forEach((track) => track.stop())
    } catch (error) {
      AnalyticsTrackerService.track(EVENT_NAMES.STOP_STREAM_ERROR, {
        stream,
        error
      })

      if (error instanceof Error) {
        handleStopTracksError(error)
      }
    }
  },

  checkPermissions: async () => {
    try {
      const permissionStatus = await navigator.permissions.query({
        name: "camera"
      })

      AnalyticsTrackerService.track(EVENT_NAMES.CAMERA_PERMISSIONS, {
        permissionStatus
      })
    } catch (error) {
      AnalyticsTrackerService.track(EVENT_NAMES.CAMERA_PERMISSIONS_ERROR, {
        error
      })

      if (error instanceof Error) {
        console.log(error)
      }

      // send to Sentry or other error tracking service
    }
  }
}

export { UserMediaService }
