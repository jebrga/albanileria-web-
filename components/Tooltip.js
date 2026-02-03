'use client';

import { useState } from 'react';
import styles from './Tooltip.module.css';

export default function Tooltip({ children, content, position = 'top' }) {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <div className={styles.tooltipWrapper}>
            <div
                className={styles.trigger}
                onMouseEnter={() => setIsVisible(true)}
                onMouseLeave={() => setIsVisible(false)}
                onClick={() => setIsVisible(!isVisible)}
            >
                {children}
            </div>
            {isVisible && (
                <div className={`${styles.tooltip} ${styles[position]}`}>
                    {content}
                    <div className={styles.arrow}></div>
                </div>
            )}
        </div>
    );
}
