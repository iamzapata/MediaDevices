import { SyntheticEvent, useRef } from "react"
import { useTrackRenderInfo } from "../../../../hooks/useRenderInfo"
import { useSetVideoStream } from "./hooks/useSetVideoStream"
import {
  onVideoErrorHandler,
  onVideoCanPlayThrough,
  onVideoLoadedMeataData,
  onVideoPlayHandler,
  onVideoRateChange,
  onVideoStalled
} from "./handlers"
import styles from "./VideoPlayer.module.css"

interface VideoPlayerProps {
  stream: MediaStream | null
  setIsCameraLoading: (isLoading: boolean) => void
}
export const VideoPlayer = ({
  stream,
  setIsCameraLoading
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)

  useTrackRenderInfo(VideoPlayer.displayName)

  useSetVideoStream(videoRef, stream)

  const onLoadedMetadataHandler = (
    event: SyntheticEvent<HTMLVideoElement, Event>
  ) => {
    onVideoLoadedMeataData(event)
    setIsCameraLoading(false)
  }

  return (
    <video
      className={styles.VideoPlayer}
      // This is the key to make sure the video element is re-rendered when the stream changes
      key={stream?.id}
      ref={videoRef}
      autoPlay
      playsInline
      muted
      onError={onVideoErrorHandler}
      onLoadedMetadata={onLoadedMetadataHandler}
      onPlay={onVideoPlayHandler}
      onRateChange={onVideoRateChange}
      onStalled={onVideoStalled}
      onCanPlayThrough={onVideoCanPlayThrough}
    />
  )
}

VideoPlayer.displayName = "VideoPlayer"
