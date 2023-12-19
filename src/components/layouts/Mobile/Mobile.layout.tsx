import styles from "./Mobile.layout.module.css"

interface MobileLayoutProps {
  children: React.ReactNode
}
export const MobileLayout = ({ children }: MobileLayoutProps) => {
  return <div className={styles.MobileLayout}>{children}</div>
}
