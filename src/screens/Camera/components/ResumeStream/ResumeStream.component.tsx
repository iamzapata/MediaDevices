import { PlayIcon } from "@radix-ui/react-icons"
import styles from "./ResumeStream.component.module.css"

interface ResumeStreamProps {
  onResumeStream: () => void
}
export const ResumeStream = ({ onResumeStream }: ResumeStreamProps) => {
  return <PlayIcon onClick={onResumeStream} className={styles.ResumeStream} />
}
