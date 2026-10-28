import type { ReactNode } from 'react';
import styles from './PhoneFrame.module.css';

/** 390×844 화면을 0.7배로 줄여 폰 테두리 안에 보여 준다 (그림 역할이라 보조기기에서는 숨김) */
export default function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className={styles.bezel} aria-hidden="true">
      <div className={styles.display}>
        <div className={styles.scaler}>{children}</div>
      </div>
    </div>
  );
}
