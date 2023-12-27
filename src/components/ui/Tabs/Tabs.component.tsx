import * as UITabs from "@radix-ui/react-tabs";
import styles from "./Tabs.module.css";


interface Tab {
  label: string
  content: () => JSX.Element
}

interface TabsProps {
  tabs: Tab[]
}
export const Tabs = ({ tabs }: TabsProps) => {
  return (
    <UITabs.Root className={styles.TabsRoot} defaultValue={tabs[0].label}>
      <UITabs.List className={styles.TabsList}>
        {tabs.map((tab) => (
          <UITabs.Trigger
            key={tab.label}
            className={styles.TabsTrigger}
            value={tab.label}
          >
            {tab.label}
          </UITabs.Trigger>
        ))}
      </UITabs.List>

      {tabs.map((tab) => (
        <UITabs.Content
          key={tab.label}
          className={styles.TabsContent}
          value={tab.label}
        >
          {tab.content()}
        </UITabs.Content>
      ))}
    </UITabs.Root>
  )
}