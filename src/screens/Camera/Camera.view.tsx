import { useIsMobileDevice } from "@hooks/useIsMobileDevice";
import { useTrackScreenView } from "@hooks/useTrackScreenView";
import styles from "./Camera.module.css"
import { DesktopOverlay } from "./components/DesktopOverlay"
import { MobileOverlay } from "./components/MobileOverlay/Mobile.overlay"
import { PauseStream } from "./components/PauseStream"
import { ResumeStream } from "./components/ResumeStream"
import { VideoPlayer } from "./components/VideoPlayer"

interface CameraViewProps {
  stream: MediaStream | null
  isPaused: boolean
  setIsCameraLoading: (isLoading: boolean) => void
  handlePauseStream: () => void
  handleResumeStream: () => void
}
export const CameraView = ({
  stream,
  isPaused,
  setIsCameraLoading,
  handleResumeStream,
  handlePauseStream
}: CameraViewProps) => {
  const { isMobileDevice } = useIsMobileDevice()
  const isDesktop = !isMobileDevice

  useTrackScreenView(CameraView.displayName)

  return (
    <div className={styles.CameraView}>
      {isMobileDevice && (
        <MobileOverlay
          controls={{
            play: <ResumeStream onResumeStream={handleResumeStream} />,
            stop: <PauseStream onPauseStream={handlePauseStream} />
          }}
        >
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