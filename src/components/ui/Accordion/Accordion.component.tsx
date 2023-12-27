import { forwardRef } from "react"
import * as AccordionUI from "@radix-ui/react-accordion"
import classNames from "classnames"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import styles from "./Accordion.component.module.css"
import { i18N } from "../../../lib/i18N"

const AccordionTrigger = forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <AccordionUI.Header className={styles.AccordionHeader}>
      <AccordionUI.Trigger
        className={styles.AccordionTrigger}
        {...props}
        ref={forwardedRef}
      >
        {children}
        <ChevronDownIcon className={styles.AccordionChevron} aria-hidden />
      </AccordionUI.Trigger>
    </AccordionUI.Header>
  )
)

const AccordionContent = forwardRef(
  ({ children, className, ...props }, forwardedRef) => (
    <AccordionUI.Content
      className={styles.AccordionContent}
      {...props}
      ref={forwardedRef}
    >
      <div className={styles.AccordionContentText}>{children}</div>
    </AccordionUI.Content>
  )
)

type AccordionItem = {
  value: string
  content: React.ReactNode
}

interface AccordionProps {
  className?: string
  items: AccordionItem[]
}
export const Accordion = ({ items, className }: AccordionProps) => (
  <AccordionUI.Root
    className={classNames(styles.AccordionRoot, className)}
    type="single"
    collapsible
  >
    {items.map((item) => (
      <AccordionUI.Item
        key={item.value}
        className={styles.AccordionItem}
        value={item.value}
      >
        <AccordionTrigger>
          {i18N("camera_error_how_to_proceed")}
        </AccordionTrigger>
        <AccordionContent>{item.content}</AccordionContent>
      </AccordionUI.Item>
    ))}
  </AccordionUI.Root>
)
