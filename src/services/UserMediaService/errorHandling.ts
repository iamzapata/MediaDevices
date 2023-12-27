import { AnalyticsTrackerService } from "../AnalyticsTrackerService"

export function handleGetMediaDevicesError(error: Error) {
  switch (error.name) {
    case "NotFoundError":
      console.log("No media devices found.")
      break
    case "NotReadableError":
      console.log("Couldn't access your media devices.")
      break
    case "OverconstrainedError":
      console.log("Constraints don't match any installed media device.")
      break
    case "NotAllowedError":
      console.log("Permission to access media devices denied.")
      break
    case "SecurityError":
      console.log("Media devices not allowed to access.")
      break
    default:
      console.log("Unknown Error")
      break
  }
}

export function handleGetUserMediaError(error: Error) {
  const { name, message } = error

  let errorMessage = ""

  switch (error.name) {
    case "NotFoundError":
      errorMessage = `No media devices found. (${message})`
      break
    case "NotReadableError":
      errorMessage = `Couldn't access your media devices. (${message})`
      break
    case "OverconstrainedError":
      errorMessage = `Constraints don't match any avaiable in media device. (${message})`
      break
    case "NotAllowedError":
      errorMessage = `Permission to access media devices denied. (${message})`
      break
    case "SecurityError":
      errorMessage = `Media devices not allowed to access. (${message})`
      break
    default:
      errorMessage = `Unknown Error. (${message})`
      break
  }

  AnalyticsTrackerService.track("GET_USER_MEDIA_ERROR", {
    name,
    errorMessage
  })
}

export function handleStopTracksError(error: Error) {
  switch (error.name) {
    case "InvalidStateError":
      console.log("The stream is active.")
      break
    case "NotAllowedError":
      console.log("Permission to access media devices denied.")
      break
    case "SecurityError":
      console.log("Media devices not allowed to access.")
      break
    default:
      console.log("Unknown Error")
      break
  }
}

export function handleGetSupportedConstraintsError(error: Error) {
  switch (error.name) {
    case "NotSupportedError":
      console.log("The requested media type is not supported.")
      break
    case "NotAllowedError":
      console.log("Permission to access media devices denied.")
      break
    case "SecurityError":
      console.log("Media devices not allowed to access.")
      break
    default:
      console.log("Unknown Error")
      break
  }
}

export function handleGetDeviceCapabilitiesError(error: Error) {
  switch (error.name) {
    case "InvalidStateError":
      console.log("The stream is active.")
      break
    case "NotAllowedError":
      console.log("Permission to access media devices denied.")
      break
    case "SecurityError":
      console.log("Media devices not allowed to access.")
      break
    default:
      console.log("Unknown Error")
      break
  }
}

export function handleGetTrackConstraintsError(error: Error) {
  switch (error.name) {
    case "InvalidStateError":
      console.log("The stream is active.")
      break
    case "NotAllowedError":
      console.log("Permission to access media devices denied.")
      break
    case "SecurityError":
      console.log("Media devices not allowed to access.")
      break
    default:
      console.log("Unknown Error")
      break
  }
}

export function handleGetCurrentTrackSettings(error: Error) {
  switch (error.name) {
    case "InvalidStateError":
      console.log("The stream is active.")
      break
    case "NotAllowedError":
      console.log("Permission to access media devices denied.")
      break
    case "SecurityError":
      console.log("Media devices not allowed to access.")
      break
    default:
      console.log("Unknown Error")
      break
  }
}

export function handleApplyConstraintsError(error: Error) {
  switch (error.name) {
    case "InvalidStateError":
      console.log("The stream is active.")
      break
    case "NotAllowedError":
      console.log("Permission to access media devices denied.")
      break
    case "SecurityError":
      console.log("Media devices not allowed to access.")
      break
    case "OverconstrainedError":
      console.log("Constraints don't match any installed media device.")
      break
    default:
      console.log("Unknown Error")
      break
  }
}
