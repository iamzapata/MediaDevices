import { ShutterButton } from "@components/ui/ShutterButton"
import styles from "./Mobile.overlay.module.css"

interface MobileLayoutProps {
  children: React.ReactNode
}
export const MobileOverlay = ({ children }: MobileLayoutProps) => {
  return (
    <div className={styles.MobileOverlay}>
      {children}
      <div className={styles.MobileOverlayContent}>
        <ShutterButton
          onClick={() => alert("hi")}
          disabled={false}
          className={styles.MobileOverlayButton}
        />
      </div>
    </div>
  )
}
