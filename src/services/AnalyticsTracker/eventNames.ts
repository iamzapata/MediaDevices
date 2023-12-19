import { keyMirror } from "../../lib/keyMirror"

const GLOBAL_EVENT_NAMES = keyMirror({
  CLIENT_STARTED: null,
  UNHANDLED_PROMISE_REJECTION: null,
  UNHANDLED_ERROR: null,
  EVENT_QUEUE_FLUSHED: null,

  SCREEN_RENDERED: null,
  SCREEN_HIDDEN: null
})

const CAMERA_SCREEN_EVENT_NAMES = keyMirror({
  CAMERA_SCREEN_LOADING: null,
  CAMERA_SCREEN_ERROR: null,
  CAMERA_SCREEN_NO_STREAM: null
})

const USER_MEDIA_EVENT_NAMES = keyMirror({
  SUPPORTED_CONSTRAINTS: null,
  SUPPORTED_CONSTRAINTS_ERROR: null,
  MEDIA_DEVICES: null,
  MEDIA_DEVICES_ERROR: null,
  USER_MEDIA_STREAM: null,
  USER_MEDIA_STREAM_ERROR: null,
  TRACK_CAPABILITIES: null,
  TRACK_CAPABILITIES_ERROR: null,
  TRACK_CONSTRAINTS: null,
  TRACK_CONSTRAINTS_ERROR: null,
  TRACK_SETTINGS: null,
  TRACK_SETTINGS_ERROR: null,
  APPLY_CONSTRAINTS: null,
  APPLY_CONSTRAINTS_ERROR: null,
  STOP_STREAM: null,
  STOP_STREAM_ERROR: null,
  CAMERA_PERMISSIONS: null,
  CAMERA_PERMISSIONS_ERROR: null
})

const RENDER_UTILS_EVENT_NAMES = keyMirror({
  USE_RENDER_INFO: null
})

export const EVENT_NAMES = {
  ...GLOBAL_EVENT_NAMES,
  ...CAMERA_SCREEN_EVENT_NAMES,
  ...USER_MEDIA_EVENT_NAMES,
  ...RENDER_UTILS_EVENT_NAMES
}

export type AnalyticsEventName = keyof typeof EVENT_NAMES
