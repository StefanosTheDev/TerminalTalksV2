import React from 'react';
import { Cpu, Mic, Code, Zap, Layers, Globe } from 'lucide-react';
import styles from './PowerfulFeatures.module.css';

interface Feature {
  id: number;
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface PowerfulFeaturesProps {
  className?: string;
}

const PowerfulFeatures: React.FC<PowerfulFeaturesProps> = ({ className }) => {
  const features: Feature[] = [
    {
      id: 1,
      icon: <Cpu size={30} />,
      title: 'AI-Generated Content',
      description:
        'Advanced AI models create comprehensive technical lectures from simple prompts. Cover any programming language, framework, or technology concept with natural, engaging narration.',
    },
    {
      id: 2,
      icon: <Mic size={30} />,
      title: 'Custom Voice Profiles',
      description:
        'Choose from expert developer voices or create custom voice profiles. Adjust tone, pace, and technical depth to match your learning preferences and skill level.',
    },
    {
      id: 3,
      icon: <Code size={30} />,
      title: 'Code Examples Included',
      description:
        'Every lecture includes practical code examples, best practices, and real-world scenarios. Perfect for learning new frameworks or deepening existing knowledge.',
    },
    {
      id: 4,
      icon: <Zap size={30} />,
      title: 'Instant Generation',
      description:
        'Generate lectures in seconds, not hours. Our high-performance API processes your requests instantly, delivering studio-quality audio for immediate learning.',
    },
    {
      id: 5,
      icon: <Layers size={30} />,
      title: 'Adaptive Difficulty',
      description:
        'Lectures automatically adjust complexity based on your specified skill level. From beginner-friendly explanations to advanced architectural discussions.',
    },
    {
      id: 6,
      icon: <Globe size={30} />,
      title: 'Multi-Language Support',
      description:
        'Generate technical lectures in multiple programming languages and human languages. Learn Python in Spanish or JavaScript in Japanese - the choice is yours.',
    },
  ];

  return (
    <section className={`${styles.featuresSection} ${className || ''}`}>
      {/* Background Effects */}
      <div className={styles.sectionBackground}>
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
        {/* Header */}
        <div className={styles.header}>
          <h2>Powerful Features for Technical Learning</h2>
          <p>
            Everything you need to create, customize, and deploy AI-generated
            technical lectures
          </p>
        </div>

        {/* Features Grid */}
        <div className={styles.featuresGrid}>
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={styles.featureCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PowerfulFeatures;
