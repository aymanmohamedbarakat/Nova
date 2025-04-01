import React from "react";
import styles from "../MainHeader/index.module.css";
import { useSideHeader } from "../../store";

export default function SideHeader() {
  const { closeSideHeader } = useSideHeader();
  return (
    <div className="overlay d-flex d-md-none" id={styles.overlay} onClick={closeSideHeader}>
      <div id={styles.content} onClick={(e) => e.stopPropagation()}></div>
    </div>
  );
}
