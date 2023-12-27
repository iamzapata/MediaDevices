import { useTrackScreenView } from "../../../../hooks/useTrackScreenView"
import { Frown } from "react-feather"
import { Accordion } from "../../../../components/ui/Accordion"
import styles from "./CameraError.module.css"
import { i18N } from "../../../../lib/i18N"
import { MediaPermissionsError } from "../../../../services/UserMediaService/requestMediaPermissions"

const ErrorHints = {
  SystemPermissionDenied: i18N("camera_error_hint_system_permission_denied"),
  UserPermissionDenied: i18N("camera_error_hint_user_permission_denied"),
  VideoSourceCannotBeStarted: i18N(
    "camera_error_hint_video_source_cannot_be_started"
  ),
  Generic: i18N("camera_error_hint_generic")
}

interface CameraErrorProps {
  error: MediaPermissionsError | null
}
export const CameraError = ({ error }: CameraErrorProps) => {
  useTrackScreenView(CameraError.displayName)

  if (!error) {
    return null
  }

  return (
    <div className={styles.CameraError}>
      <Frown size={50} />
      <h2 className={styles.CameraErrorHeader}>Something went wrong</h2>
      <p>{error.message}</p>
      <Accordion
        className={styles.CameraErrorAccordion}
        items={[{ value: "camera_error", content: ErrorHints[error.type] }]}
      />
    </div>
  )
}

CameraError.displayName = "CameraError"
