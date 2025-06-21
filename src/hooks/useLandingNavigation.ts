
import { useState, useEffect } from "react";
import { NavigationConfig } from "@/types/navigation";

export const useLandingNavigation = (): NavigationConfig => {
  const [activeSection, setActiveSection] = useState("home");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'features', 'examples', 'pricing'];
      const scrollPosition = window.scrollY + 100; // Offset for better UX

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return {
    brandText: "Agentiqs.ai",
    brandLink: "/",
    tabs: [
      {
        id: "home",
        label: "Home",
        onClick: () => scrollToSection('home')
      },
      {
        id: "features",
        label: "Features",
        onClick: () => scrollToSection('features')
      },
      {
        id: "examples",
        label: "Examples",
        onClick: () => scrollToSection('examples')
      },
      {
        id: "pricing",
        label: "Pricing",
        onClick: () => scrollToSection('pricing')
      }
    ],
    externalLinks: [
      {
        href: "https://docs.agentiqs.ai",
        label: "Docs",
        external: true
      },
      {
        href: "https://docs.agentiqs.ai/blog",
        label: "Blog",
        external: true
      }
    ],
    activeTab: activeSection,
    onTabChange: setActiveSection
  };
};
