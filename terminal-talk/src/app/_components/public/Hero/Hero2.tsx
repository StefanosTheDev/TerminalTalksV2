import React from 'react';
import Link from 'next/link';
import { Zap, Play, BookOpen } from 'lucide-react';
import styles from './Hero.module.css';

interface HeroProps {
  className?: string;
  onTryDemo?: () => void;
  onViewDocs?: () => void;
}

const Hero: React.FC<HeroProps> = ({ className, onTryDemo, onViewDocs }) => {
  return (
    <section className={`${styles.hero} ${className || ''}`}>
      {/* Animated Background Effects */}
      <div className={styles.heroBackground}>
        <div className={styles.gridOverlay}></div>
        <div className={styles.glowEffect}></div>
      </div>

      {/* Floating Particles */}
      <div className={styles.particles}>
        <div className={`${styles.particle} ${styles.particle1}`}></div>
        <div className={`${styles.particle} ${styles.particle2}`}></div>
        <div className={`${styles.particle} ${styles.particle3}`}></div>
        <div className={`${styles.particle} ${styles.particle4}`}></div>
        <div className={`${styles.particle} ${styles.particle5}`}></div>
      </div>

      <div className={styles.heroContent}>
        {/* Badge */}
        <div className={styles.heroBadge}>
          <Zap size={16} />
          AI-Powered Learning Revolution
        </div>

        {/* Main Heading */}
        <h1 className={styles.heroTitle}>
          Transform Technical Knowledge Into Engaging Audio Lectures
        </h1>

        {/* Description */}
        <p className={styles.heroDescription}>
          Create personalized, AI-narrated technical lectures on any programming
          topic. From React hooks to machine learning algorithms - learn while
          you code, commute, or relax.
        </p>

        {/* Action Buttons */}
        <div className={styles.heroButtons}>
          {onTryDemo || onViewDocs ? (
            <>
              <button
                className={`${styles.btn} ${styles.btnPrimary}`}
                onClick={onTryDemo}
              >
                <Play size={20} />
                Try Demo
              </button>
              <button
                className={`${styles.btn} ${styles.btnSecondary}`}
                onClick={onViewDocs}
              >
                <BookOpen size={20} />
                View Documentation
              </button>
            </>
          ) : (
            <>
              <Link
                href="/demo"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                <Play size={20} />
                Try Demo
              </Link>
              <Link
                href="/docs"
                className={`${styles.btn} ${styles.btnSecondary}`}
              >
                <BookOpen size={20} />
                View Documentation
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
