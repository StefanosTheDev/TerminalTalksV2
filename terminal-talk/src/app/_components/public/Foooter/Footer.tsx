import React from 'react';
import Link from 'next/link';
import { Terminal } from 'lucide-react';
import styles from './Footer.module.css';

interface FooterProps {
  className?: string;
}

interface FooterSection {
  title: string;
  links: Array<{
    label: string;
    href: string;
    external?: boolean;
  }>;
}

const Footer1: React.FC<FooterProps> = ({ className }) => {
  const footerSections: FooterSection[] = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'API Documentation', href: '/docs' },
        { label: 'Voice Library', href: '/voices' },
      ],
    },
    {
      title: 'Use Cases',
      links: [
        { label: 'Developers', href: '/developers' },
        { label: 'Bootcamps', href: '/bootcamps' },
        { label: 'Tech Companies', href: '/enterprise' },
        { label: 'Self-Learners', href: '/individuals' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '/docs' },
        { label: 'Tutorials', href: '/tutorials' },
        { label: 'Blog', href: '/blog' },
        { label: 'Community', href: '/community' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Careers', href: '/careers' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy', href: '/privacy' },
      ],
    },
  ];

  return (
    <footer className={`${styles.footer} ${className || ''}`}>
      {/* Background Effects */}
      <div className={styles.footerBackground}>
        <div className={styles.gridPattern}></div>
      </div>

      {/* Floating Particles */}
      <div className={styles.particles}>
        <div className={`${styles.particle} ${styles.particle1}`}></div>
        <div className={`${styles.particle} ${styles.particle2}`}></div>
        <div className={`${styles.particle} ${styles.particle3}`}></div>
        <div className={`${styles.particle} ${styles.particle4}`}></div>
        <div className={`${styles.particle} ${styles.particle5}`}></div>
      </div>

      <div className={styles.container}>
        {/* Main Footer Content */}
        <div className={styles.footerContent}>
          {/* Company Info */}
          <div className={styles.companySection}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoIcon}>
                <Terminal size={24} color="#000" />
              </div>
              <span>Terminal Talks</span>
            </Link>
            <p className={styles.companyDescription}>
              Transform technical knowledge into engaging audio lectures with
              AI-powered narration. Learn while you code, commute, or relax.
            </p>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <div
              key={section.title}
              className={styles.footerSection}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h4>{section.title}</h4>
              <ul>
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <div className={styles.bottomContent}>
            <p>&copy; 2024 Terminal Talks. All rights reserved.</p>
            <div className={styles.bottomLinks}>
              <Link href="/terms">Terms of Service</Link>
              <Link href="/privacy">Privacy Policy</Link>
              <Link href="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer1;
