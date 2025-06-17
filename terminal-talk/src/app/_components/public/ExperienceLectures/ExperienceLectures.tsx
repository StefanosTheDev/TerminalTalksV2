'use client';
import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  X,
  Clock,
  User,
  Globe,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import styles from './ExperienceLectures.module.css';

interface Lecture {
  id: number;
  title: string;
  description: string;
  tech: string;
  techClass: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  instructor: string;
  language: string;
  category: string;
}

interface ExperienceLecturesProps {
  className?: string;
}

const ExperienceLectures: React.FC<ExperienceLecturesProps> = ({
  className,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentLecture, setCurrentLecture] = useState<Lecture | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const lectures: Lecture[] = [
    {
      id: 0,
      title: 'React Hooks Fundamentals',
      description:
        'Learn useState, useEffect, and custom hooks with practical examples',
      tech: 'React JS',
      techClass: 'react',
      difficulty: 'Beginner',
      duration: '15:32',
      instructor: 'Sarah Chen',
      language: 'English',
      category: 'frontend',
    },
    {
      id: 1,
      title: 'Building REST APIs',
      description:
        'Express.js, middleware, authentication, and database integration',
      tech: 'Node.js',
      techClass: 'nodejs',
      difficulty: 'Intermediate',
      duration: '23:45',
      instructor: 'Marcus Johnson',
      language: 'English',
      category: 'backend',
    },
    {
      id: 2,
      title: 'Machine Learning with TensorFlow',
      description:
        'Neural networks, training models, and deployment strategies',
      tech: 'Python',
      techClass: 'python',
      difficulty: 'Advanced',
      duration: '31:12',
      instructor: 'Dr. Emily Watson',
      language: 'English',
      category: 'ai',
    },
    {
      id: 3,
      title: 'Cross-Platform Mobile Development',
      description: 'Widgets, state management, and native platform integration',
      tech: 'Flutter',
      techClass: 'flutter',
      difficulty: 'Intermediate',
      duration: '19:28',
      instructor: 'Alex Rivera',
      language: 'Spanish',
      category: 'mobile',
    },
    {
      id: 4,
      title: 'Containerization & Orchestration',
      description: 'Docker containers, Kubernetes deployment, and scaling',
      tech: 'Docker',
      techClass: 'docker',
      difficulty: 'Intermediate',
      duration: '27:15',
      instructor: 'James Park',
      language: 'Korean',
      category: 'devops',
    },
    {
      id: 5,
      title: 'Vue 3 Composition API',
      description: 'Reactive programming, composables, and modern Vue patterns',
      tech: 'Vue.js',
      techClass: 'vue',
      difficulty: 'Beginner',
      duration: '18:07',
      instructor: 'Marie Dubois',
      language: 'French',
      category: 'frontend',
    },
  ];

  const categories = [
    { id: 'all', label: 'All Lectures' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'backend', label: 'Backend' },
    { id: 'mobile', label: 'Mobile' },
    { id: 'ai', label: 'AI/ML' },
    { id: 'devops', label: 'DevOps' },
  ];

  const filteredLectures =
    activeCategory === 'all'
      ? lectures
      : lectures.filter((lecture) => lecture.category === activeCategory);

  const nextSlide = () => {
    const maxSlide = Math.max(0, filteredLectures.length - 3);
    setCurrentSlide((prev) => Math.min(prev + 1, maxSlide));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  const filterCategory = (category: string) => {
    setActiveCategory(category);
    setCurrentSlide(0);
  };

  const playLecture = (lecture: Lecture) => {
    setCurrentLecture(lecture);
    setIsPlaying(true);
  };

  const toggleMainPlay = () => {
    setIsPlaying(!isPlaying);
  };

  const closePlayer = () => {
    setCurrentLecture(null);
    setIsPlaying(false);
  };

  const getTechIcon = (techClass: string) => {
    const iconMap: { [key: string]: string } = {
      react:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg',
      nodejs:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
      python:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
      flutter:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg',
      docker:
        'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg',
      vue: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
    };
    return iconMap[techClass] || '';
  };

  return (
    <section className={`${styles.experienceSection} ${className || ''}`}>
      {/* Background Effects */}
      <div className={styles.sectionBackground}>
        <div className={styles.gridPattern}></div>
      </div>

      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2>Experience AI Technical Lectures</h2>
          <p>
            Explore our library of AI-generated technical lectures across
            different topics and difficulty levels
          </p>
        </div>

        {/* Category Filter */}
        <div className={styles.categoryFilter}>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryBtn} ${
                activeCategory === category.id ? styles.active : ''
              }`}
              onClick={() => filterCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Lecture Carousel */}
        <div className={styles.lectureCarousel}>
          <button
            className={`${styles.carouselBtn} ${styles.prevBtn}`}
            onClick={prevSlide}
          >
            <ChevronLeft size={24} />
          </button>

          <div className={styles.carouselContainer}>
            <div
              className={styles.carouselTrack}
              style={{ transform: `translateX(-${currentSlide * 340}px)` }}
            >
              {filteredLectures.map((lecture) => (
                <div
                  key={lecture.id}
                  className={`${styles.lectureCard} ${
                    currentLecture?.id === lecture.id ? styles.active : ''
                  }`}
                  onClick={() => playLecture(lecture)}
                >
                  {/* Card Header */}
                  <div className={styles.lectureHeader}>
                    <div
                      className={`${styles.techBadge} ${
                        styles[lecture.techClass]
                      }`}
                    >
                      <img
                        src={getTechIcon(lecture.techClass)}
                        alt={lecture.tech}
                      />
                      {lecture.tech}
                    </div>
                    <div
                      className={`${styles.difficulty} ${
                        styles[lecture.difficulty.toLowerCase()]
                      }`}
                    >
                      {lecture.difficulty}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className={styles.lectureContent}>
                    <h3>{lecture.title}</h3>
                    <p>{lecture.description}</p>
                    <div className={styles.lectureMeta}>
                      <span>
                        <Clock size={12} /> {lecture.duration}
                      </span>
                      <span>
                        <User size={12} /> {lecture.instructor}
                      </span>
                      <span>
                        <Globe size={12} /> {lecture.language}
                      </span>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className={styles.lectureActions}>
                    <button className={styles.playBtnCard}>
                      <Play size={16} />
                    </button>
                    <div className={styles.waveformMini}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className={`${styles.carouselBtn} ${styles.nextBtn}`}
            onClick={nextSlide}
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Current Player */}
        {currentLecture && (
          <div className={styles.currentPlayer}>
            <div className={styles.playerHeader}>
              <div
                className={`${styles.currentTechBadge} ${
                  styles[currentLecture.techClass]
                }`}
              >
                <img
                  src={getTechIcon(currentLecture.techClass)}
                  alt={currentLecture.tech}
                />
                {currentLecture.tech}
              </div>
              <button className={styles.closePlayer} onClick={closePlayer}>
                <X size={20} />
              </button>
            </div>

            <div className={styles.playerContent}>
              <h3>{currentLecture.title}</h3>
              <p>{currentLecture.description}</p>
            </div>

            <div className={styles.playerControls}>
              <button className={styles.playBtnMain} onClick={toggleMainPlay}>
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <div className={styles.playerInfo}>
                <div className={styles.currentMeta}>
                  {currentLecture.duration} • {currentLecture.instructor} •{' '}
                  {currentLecture.language}
                </div>
                <div className={styles.progressBar}>
                  <div
                    className={`${styles.progressFill} ${
                      isPlaying ? styles.playing : ''
                    }`}
                  ></div>
                </div>
              </div>
            </div>

            <div
              className={`${styles.waveformMain} ${
                isPlaying ? styles.playing : ''
              }`}
            ></div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceLectures;
