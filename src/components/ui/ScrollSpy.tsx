"use client";

import { useEffect, useState, ReactNode } from 'react';

interface ScrollSpyProps {
  sections: string[];
  children: (activeSection: string) => ReactNode;
  offset?: number;
}

export const ScrollSpy: React.FC<ScrollSpyProps> = ({
  sections,
  children,
  offset = 100
}) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0] || '');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { top, bottom } = element.getBoundingClientRect();
          const elementTop = top + window.scrollY;
          const elementBottom = bottom + window.scrollY;

          if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
            setActiveSection(section);
            break; // Stop when found the current section
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sections, offset]);

  return <>{children(activeSection)}</>;
};
