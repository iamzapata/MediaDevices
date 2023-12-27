import { StopIcon } from "@radix-ui/react-icons"
import styles from "./PauseStream.component.module.css"

interface PauseStreamProps {
  onPauseStream: () => void
}
export const PauseStream = ({ onPauseStream }: PauseStreamProps) => {
  return <StopIcon onClick={onPauseStream} className={styles.PauseStream} />
}
