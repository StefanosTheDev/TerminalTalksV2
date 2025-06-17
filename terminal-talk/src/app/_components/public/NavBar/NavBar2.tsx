import React from 'react';
import Link from 'next/link';
import { Terminal, User, BookOpen } from 'lucide-react';
import styles from './NavBar.module.css';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={`${styles.header} ${className || ''}`}>
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}>
            <Terminal size={20} color="#000" />
          </div>
          Terminal Talks
        </Link>

        {/* Navigation Links */}
        <ul className={styles.navLinks}>
          <li>
            <Link href="#features">Features</Link>
          </li>
          <li>
            <Link href="#pricing">Pricing</Link>
          </li>
          <li>
            <Link href="#docs">Docs</Link>
          </li>
          <li>
            <Link href="#about">About</Link>
          </li>
        </ul>

        {/* Action Buttons */}
        <div className={styles.navButtons}>
          <Link
            href="/signin"
            className={`${styles.btn} ${styles.btnSecondary}`}
          >
            <User size={16} />
            Sign In
          </Link>
          <Link href="/trial" className={`${styles.btn} ${styles.btnPrimary}`}>
            <BookOpen size={16} />
            Start Free Trial
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
