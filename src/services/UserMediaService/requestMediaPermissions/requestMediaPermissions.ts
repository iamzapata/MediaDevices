// Adapted from https://github.com/helenamerk/mic-check
import Bowser from "bowser"
import { keyMirror } from "../../../lib/keyMirror"
import { AnalyticsTrackerService } from "../../../services/AnalyticsTrackerService"
import { EVENT_NAMES } from "../../../services/AnalyticsTrackerService/eventNames"

export type MediaPermissionsErrorType = keyof typeof MediaPermissionsErrorTypes

export const MediaPermissionsErrorTypes = keyMirror({
  SystemPermissionDenied: null,
  UserPermissionDenied: null,
  VideoSourceCannotBeStarted: null,
  Generic: null
})

export class MediaPermissionsError extends Error {
  type: MediaPermissionsErrorType

  constructor({ type, name, message }: MediaPermissionsError) {
    super(message)
    this.name = name
    this.type = type
  }
}

export const requestMediaPermissions = async (
  constraints?: MediaStreamConstraints
): Promise<boolean> => {
  try {
    AnalyticsTrackerService.track(EVENT_NAMES.REQUEST_MEDIA_PERMISSIONS)

    const stream = await navigator.mediaDevices.getUserMedia(
      constraints ?? { audio: true, video: true }
    )

    stream.getTracks().forEach((t) => {
      t.stop()
    })

    return true
  } catch (err: unknown) {
    if (!(err instanceof Error)) {
      throw err
    }

    const browser = Bowser.getParser(window.navigator.userAgent)
    const browserName = browser.getBrowserName()

    const errName = err.name
    const errMessage = err.message

    let errorType: MediaPermissionsErrorType =
      MediaPermissionsErrorTypes.Generic

    switch (browserName) {
      case "Chrome":
        errorType = handleChrome(errName, errMessage, errorType)
        break
      case "Safari":
        errorType = handleSafari(errName, errorType)
        break
      case "Microsoft Edge":
        errorType = handleEdge(errName, errorType)
        break
      case "Firefox":
        errorType = handleFireFox(errName, errorType)
        break
    }

    throw new MediaPermissionsError({
      type: errorType,
      name: errName,
      message: errMessage
    })
  }
}
function handleFireFox(
  errName: string,
  errorType: string
): MediaPermissionsErrorType {
  if (errName === "NotFoundError") {
    errorType = MediaPermissionsErrorTypes.SystemPermissionDenied
  } else if (errName === "NotReadableError") {
    errorType = MediaPermissionsErrorTypes.SystemPermissionDenied
  } else if (errName === "NotAllowedError") {
    errorType = MediaPermissionsErrorTypes.UserPermissionDenied
  } else if (errName === "AbortError") {
    errorType = MediaPermissionsErrorTypes.VideoSourceCannotBeStarted
  }

  return errorType as MediaPermissionsErrorType
}

function handleEdge(
  errName: string,
  errorType: string
): MediaPermissionsErrorType {
  if (errName === "NotAllowedError") {
    errorType = MediaPermissionsErrorTypes.UserPermissionDenied
  } else if (errName === "NotReadableError") {
    errorType = MediaPermissionsErrorTypes.VideoSourceCannotBeStarted
  }

  return errorType as MediaPermissionsErrorType
}

function handleSafari(
  errName: string,
  errorType: string
): MediaPermissionsErrorType {
  if (errName === "NotAllowedError") {
    errorType = MediaPermissionsErrorTypes.UserPermissionDenied
  }

  return errorType as MediaPermissionsErrorType
}

function handleChrome(
  errName: string,
  errMessage: string,
  errorType: string
): MediaPermissionsErrorType {
  if (errName === "NotAllowedError") {
    if (errMessage === "Permission denied by system") {
      errorType = MediaPermissionsErrorTypes.SystemPermissionDenied
    } else if (errMessage === "Permission denied") {
      errorType = MediaPermissionsErrorTypes.UserPermissionDenied
    }
  } else if (errName === "NotReadableError") {
    errorType = MediaPermissionsErrorTypes.VideoSourceCannotBeStarted
  }
  return errorType as MediaPermissionsErrorType
}
