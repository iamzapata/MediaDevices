import { i18N } from "@lib/i18N"
import * as AccordionUI from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "@radix-ui/react-icons"
import classNames from "classnames"
import { forwardRef, HTMLAttributes, ReactNode, Ref } from "react"
import styles from "./Accordion.component.module.css"

interface AccordionTriggerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

const AccordionTrigger = forwardRef<HTMLDivElement, AccordionTriggerProps>(
  ({ children, ...props }, forwardedRef: Ref<HTMLDivElement>) => (
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

interface AccordionContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

const AccordionContent = forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ children, ...props }, forwardedRef: Ref<HTMLDivElement>) => (
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
