import React from 'react';
import Link from 'next/link';
import { Check } from 'lucide-react';
import styles from './Pricing.module.css';

interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  features: string[];
  buttonText: string;
  buttonLink: string;
  featured?: boolean;
}

interface PricingProps {
  className?: string;
  onGetStarted?: (planId: string) => void;
  onStartTrial?: (planId: string) => void;
  onContactSales?: () => void;
}

const Pricing: React.FC<PricingProps> = ({
  className,
  onGetStarted,
  onStartTrial,
  onContactSales,
}) => {
  const plans: PricingPlan[] = [
    {
      id: 'starter',
      name: 'Starter',
      price: '$0',
      period: 'per month',
      features: [
        '5 lectures per month',
        'Basic voice profiles',
        'Standard quality audio',
        'Community support',
        'Basic API access',
      ],
      buttonText: 'Get Started',
      buttonLink: '/signup',
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '$29',
      period: 'per month',
      features: [
        '100 lectures per month',
        'Premium voice profiles',
        'High-quality audio',
        'Priority support',
        'Advanced API features',
        'Custom voice training',
      ],
      buttonText: 'Start Trial',
      buttonLink: '/trial',
      featured: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      features: [
        'Unlimited lectures',
        'Custom voice profiles',
        'Studio-quality audio',
        '24/7 dedicated support',
        'Full API access',
        'White-label options',
        'Team collaboration',
      ],
      buttonText: 'Contact Sales',
      buttonLink: '/contact',
    },
  ];

  const handleButtonClick = (plan: PricingPlan) => {
    if (plan.id === 'starter' && onGetStarted) {
      onGetStarted(plan.id);
    } else if (plan.id === 'professional' && onStartTrial) {
      onStartTrial(plan.id);
    } else if (plan.id === 'enterprise' && onContactSales) {
      onContactSales();
    }
  };

  return (
    <section className={`${styles.pricingSection} ${className || ''}`}>
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
          <h2>Choose Your Learning Plan</h2>
          <p>Start free and scale as you grow your technical knowledge</p>
        </div>

        {/* Pricing Grid */}
        <div className={styles.pricingGrid}>
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`${styles.pricingCard} ${
                plan.featured ? styles.featured : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.featured && (
                <div className={styles.popularBadge}>Most Popular</div>
              )}

              <div className={styles.cardContent}>
                <h3>{plan.name}</h3>
                <div className={styles.price}>{plan.price}</div>
                <div className={styles.period}>{plan.period}</div>

                <ul className={styles.features}>
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>
                      <Check size={16} className={styles.checkIcon} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Button with handlers or Link fallback */}
                {onGetStarted || onStartTrial || onContactSales ? (
                  <button
                    className={`${styles.btn} ${
                      plan.featured ? styles.btnPrimary : styles.btnSecondary
                    }`}
                    onClick={() => handleButtonClick(plan)}
                  >
                    {plan.buttonText}
                  </button>
                ) : (
                  <Link
                    href={plan.buttonLink}
                    className={`${styles.btn} ${
                      plan.featured ? styles.btnPrimary : styles.btnSecondary
                    }`}
                  >
                    {plan.buttonText}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
