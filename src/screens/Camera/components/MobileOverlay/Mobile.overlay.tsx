import { ShutterButton } from "@screens/Camera/components/ShutterButton"
import { ReactNode } from "react"
import styles from "./Mobile.overlay.module.css"

interface MobileLayoutProps {
  controls: {
    play: ReactNode
    stop: ReactNode
  }
  children: React.ReactNode
}
export const MobileOverlay = ({ children, controls }: MobileLayoutProps) => {
  return (
    <div className={styles.MobileOverlay}>
      {children}
      <div className={styles.MobileOverlayContent}>
        <div className={styles.MobileOverlayControls}>
          {controls.play}
          {controls.stop}
        </div>

        <ShutterButton
          onClick={() => alert("hi")}
          disabled={false}
          className={styles.MobileOverlayButton}
        />
      </div>
    </div>
  )
}
