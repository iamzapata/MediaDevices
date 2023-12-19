import { VideoPlayer } from "./components/VideoPlayer"
import { useTrackScreenView } from "../../hooks/useTrackScreenView"
import { DesktopOverlay } from "./overlays/Desktop"
import { MobileOverlay } from "./overlays/Mobile/Mobile.overlay"
import { useIsMobileDevice } from "../../hooks/useIsMobileDevice"
import styles from "./Camera.module.css"

interface CameraViewProps {
  stream: MediaStream | null
  setIsCameraLoading: (isLoading: boolean) => void
}
export const CameraView = ({ stream, setIsCameraLoading }: CameraViewProps) => {
  const { isMobileDevice } = useIsMobileDevice()
  const isDesktop = !isMobileDevice

  useTrackScreenView(CameraView.displayName)

  return (
    <div className={styles.CameraView}>
      {isMobileDevice && (
        <MobileOverlay>
          <VideoPlayer
            stream={stream}
            setIsCameraLoading={setIsCameraLoading}
          />
        </MobileOverlay>
      )}

      {isDesktop && (
        <DesktopOverlay>
          <VideoPlayer
            stream={stream}
            setIsCameraLoading={setIsCameraLoading}
          />
        </DesktopOverlay>
      )}
    </div>
  )
}

CameraView.displayName = "CameraView"
