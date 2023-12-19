import { useRef } from "react"
import { useTrackRenderInfo } from "../../hooks/useRenderInfo"
import { useSetVideoStream } from "./hooks/useSetVideoStream"
import styles from "./VideoPlayer.module.css"

interface VideoPlayerProps {
  stream: MediaStream
}
export const VideoPlayer = ({ stream }: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useTrackRenderInfo(VideoPlayer.displayName)

  useSetVideoStream(videoRef, stream)

  return (
    <video
      className={styles.VideoPlayer}
      // This is the key to make sure the video element is re-rendered when the stream changes
      key={stream?.id}
      ref={videoRef}
      autoPlay
      playsInline
      muted
    />
  )
}

VideoPlayer.displayName = "VideoPlayer"
