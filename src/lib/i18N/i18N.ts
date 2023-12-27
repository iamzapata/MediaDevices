export const i18N = (key: string) => {
  switch (key) {
    case "camera_error_how_to_proceed":
      return "Camera error, how to proceed?"
    case "camera_error_hint_system_permission_denied":
      return "The camera/microphone permission was denied by the system. Please check your system settings or browser specific settings."
    case "camera_error_hint_user_permission_denied":
      return "The camera/microphone permission was denied by the user. Please reset permissions in your browser settings."
    case "camera_error_hint_video_source_cannot_be_started":
      return "The camera/microphone permission cannot be started. Please check no other application is using the camera/microphone."
    case "camera_error_hint_video_source_not_found":
      return "The camera/microphone permission cannot be started. Please check no other application is using the camera/microphone."
    default:
      return key
  }
}
