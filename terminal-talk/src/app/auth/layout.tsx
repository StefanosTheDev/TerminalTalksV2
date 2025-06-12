// components/AuthLayout.tsx
'use client';
import React, { ReactNode } from 'react';
import styles from './layout.module.css';

interface AuthLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  description,
  children,
}: AuthLayoutProps) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}

      {/* ——— Your Form Fields ——— */}
      <div className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}></label>
        <input
          id="email"
          type="email"
          placeholder="Enter your email address"
          className={styles.inputField}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}></label>
        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className={styles.inputField}
        />
      </div>
      {children}
    </div>
  );
}
