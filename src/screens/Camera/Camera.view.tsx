import { VideoPlayer } from "../../components/VideoPlayer"
import { useTrackScreenView } from "../../hooks/useTrackScreenView"
import { ScreenNames } from "../types"
import styles from "./Camera.module.css"

interface CameraViewProps {
  stream: MediaStream
}
export const CameraView = ({ stream }: CameraViewProps) => {
  useTrackScreenView(ScreenNames.CAMERA_VIEW)

  return (
    <div className={styles.CameraView}>
      <VideoPlayer stream={stream} />
    </div>
  )
}
