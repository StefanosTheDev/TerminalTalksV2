'use client'; // needed for signOut and interactivity

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import styles from '@/app/_styles/dashboard.module.css';
import React, { useState } from 'react';
import LogoutButton from '../util/LogoutButton';
export function SideNav() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <nav
      className={`${styles.sideNav} ${
        isOpen ? styles.sideNavOpen : styles.sideNavClosed
      }`}
    >
      <div className={styles.sideNavHeader}>
        <h2 className={styles.logo}>Terminal Talks</h2>
        {/* Optional toggle button */}
        <button onClick={() => setIsOpen((prev) => !prev)}>☰</button>
      </div>

      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link href="/dashboard/overview" className={styles.navLink}>
            <span className={styles.navIcon}>🏠</span>
            <span className={styles.navText}>Overview</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/dashboard/create" className={styles.navLink}>
            <span className={styles.navIcon}>➕</span>
            <span className={styles.navText}>Create Lecture</span>
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link href="/dashboard/mylectures" className={styles.navLink}>
            <span className={styles.navIcon}>📚</span>
            <span className={styles.navText}>My Lectures</span>
          </Link>
        </li>
      </ul>

      <LogoutButton />
    </nav>
  );
}
