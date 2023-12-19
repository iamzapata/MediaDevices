import styles from "./Desktop.layout.module.css"

export interface DesktopLayoutProps {
  children: React.ReactNode
}
export const DesktopLayout = ({ children }: DesktopLayoutProps) => {
  return <div className={styles.DesktopLayout}>{children}</div>
}
