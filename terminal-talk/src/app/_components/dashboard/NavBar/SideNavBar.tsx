'use client';

import React, { useState } from 'react';
import styles from './SideNav.module.css';

type IconName =
  | 'home'
  | 'plus-circle'
  | 'headphones'
  | 'bookmark'
  | 'download'
  | 'terminal'
  | 'chevron-up';

interface NavItem {
  id: string;
  icon: IconName;
  label: string;
  section: 'main' | 'library';
  badge?: string;
}

const SideNavBar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('dashboard');

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      icon: 'home',
      label: 'Dashboard',
      section: 'main',
    },
    {
      id: 'create',
      icon: 'plus-circle',
      label: 'Create Lecture',
      section: 'main',
    },
    {
      id: 'lectures',
      icon: 'headphones',
      label: 'My Lectures',
      badge: '12',
      section: 'library',
    },
    {
      id: 'favorites',
      icon: 'bookmark',
      label: 'Favorites',
      section: 'library',
    },
    {
      id: 'downloads',
      icon: 'download',
      label: 'Downloads',
      section: 'library',
    },
  ];

  const handleNavClick = (itemId: string): void => {
    setActiveItem(itemId);
    console.log(`Navigating to: ${itemId}`);
  };

  const handleProfileClick = (): void => {
    console.log('Profile menu toggled');
  };

  const renderIcon = (iconName: IconName): string => {
    const iconMap: Record<IconName, string> = {
      home: '🏠',
      'plus-circle': '➕',
      headphones: '🎧',
      bookmark: '🔖',
      download: '⬇️',
      terminal: '💻',
      'chevron-up': '⌃',
    };
    return iconMap[iconName] || '•';
  };

  const mainItems: NavItem[] = navItems.filter(
    (item) => item.section === 'main'
  );
  const libraryItems: NavItem[] = navItems.filter(
    (item) => item.section === 'library'
  );

  return (
    <div className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <h1>
          <div className={styles.logoIcon}>{renderIcon('terminal')}</div>
          <span>Terminal Talks</span>
        </h1>
      </div>

      {/* Navigation */}
      <div className={styles.navContainer}>
        <nav>
          {/* Main Section */}
          <div className={styles.navSection}>
            <div className={styles.navTitle}>Main</div>
            {mainItems.map((item) => (
              <a
                key={item.id}
                href="#"
                className={`${styles.navItem} ${
                  activeItem === item.id ? styles.active : ''
                }`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                <span className={styles.navIcon}>{renderIcon(item.icon)}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className={styles.navBadge}>{item.badge}</span>
                )}
              </a>
            ))}
          </div>

          {/* Library Section */}
          <div className={styles.navSection}>
            <div className={styles.navTitle}>Library</div>
            {libraryItems.map((item) => (
              <a
                key={item.id}
                href="#"
                className={`${styles.navItem} ${
                  activeItem === item.id ? styles.active : ''
                }`}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
              >
                <span className={styles.navIcon}>{renderIcon(item.icon)}</span>
                <span>{item.label}</span>
                {item.badge && (
                  <span className={styles.navBadge}>{item.badge}</span>
                )}
              </a>
            ))}
          </div>
        </nav>
      </div>

      {/* User Profile */}
      <div className={styles.userProfileSidebar} onClick={handleProfileClick}>
        <div className={styles.profileInfo}>
          <div className={styles.profileAvatar}>JD</div>
          <div className={styles.profileDetails}>
            <div className={styles.profileName}>John Doe</div>
            <div className={styles.profilePlan}>Pro Plan</div>
          </div>
          <span className={styles.chevronIcon}>{renderIcon('chevron-up')}</span>
        </div>
      </div>
    </div>
  );
};

export { SideNavBar };
export default SideNavBar;
