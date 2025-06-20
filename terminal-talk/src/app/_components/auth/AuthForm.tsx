// components/AuthLayout.tsx
'use client';
import React, { ReactNode, useState } from 'react';
import styles from '@/app/_styles/authForm.module.css';
import { Button } from '../util/Button';
import { FcGoogle } from 'react-icons/fc';
import { signIn } from 'next-auth/react';

export default function AuthForm({
  title,
  description,
  children,
  onSubmit,
  footerText,
  footerLinkHref,
  googleBtnText,
  submitBtnText,
}: {
  title: string;
  description: string;
  children?: ReactNode;
  onSubmit: (data: { email: string; password: string }) => void;
  footerText?: string;
  footerLinkHref?: string;
  googleBtnText: string;
  submitBtnText: string;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    onSubmit({ email, password });
  };

  return (
    <>
      <h1 className={styles.title}>{title}</h1>
      {description && <p className={styles.description}>{description}</p>}

      <div className={styles.formGroup}>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.inputField}
        />
      </div>

      <div className={styles.formGroup}>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />
      </div>

      <div className={styles.buttonGroup}>
        {children}
        <button type="button" onClick={handleSubmit} className={styles.submit}>
          {submitBtnText}
        </button>
      </div>

      <Button onClick={() => signIn('google')} className={styles.googleBtn}>
        <FcGoogle size={20} />
        <span>{googleBtnText}</span>
      </Button>

      {footerText && (
        <div className={styles.signUpSection}>
          <span className={styles.signUpText}>{footerText}</span>
          <a href={footerLinkHref} className={styles.signUpLink}>
            {footerLinkHref}
          </a>
        </div>
      )}
    </>
  );
}
