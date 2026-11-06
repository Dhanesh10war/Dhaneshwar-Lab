import { PersonalInfo, ProjectItem, WritingItem } from '../types';

export const PERSONAL_INFO: PersonalInfo = {
  name: "Dhaneshwar",
  title: "Independent Technologist & Product Builder",
  platformName: "Independent Innovation Lab",
  tagline: "Technology. Products. Research. Ventures.",
  secondaryTagline: "Explore. Experiment. Engineer. Evolve.",
  headline: "Building ideas into meaningful work.",
  intro: "I'm Dhaneshwar, an independent technologist and entrepreneurial builder interested in exploring ideas, developing technology and creating meaningful products. My interests span software engineering, artificial intelligence, product development, emerging technologies, research and entrepreneurship. I enjoy understanding problems, exploring technical possibilities and developing practical solutions.",
  bio: [
    "I'm Dhaneshwar, an Information Technology graduate interested in building technology and exploring opportunities at the intersection of software, products and business.",
    "My interests include artificial intelligence, software engineering, product development, data systems, embedded technologies and emerging innovations.",
    "I enjoy exploring how technology can be applied to practical problems, how products are developed and how ideas can evolve into useful solutions.",
    "Beyond technology, I am interested in entrepreneurship, business models, market opportunities and venture building.",
    "The Independent Innovation Lab is my space to explore these interests, document my work and develop ideas into practical outcomes."
  ],
  philosophy: "Explore problems before building solutions. Approach technology with curiosity, develop with purpose and continuously experiment with new possibilities.",
  email: "dhanesh10war@gmail.com",
  socials: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/dhaneshwar-r/",
      handle: "dhaneshwar-r"
    },
    {
      name: "GitHub",
      url: "https://github.com/Dhanesh10war",
      handle: "Dhanesh10war"
    },
    {
      name: "Email",
      url: "mailto:dhanesh10war@gmail.com",
      handle: "dhanesh10war@gmail.com"
    }
  ],
  education: {
    degree: "Bachelor of Technology",
    specialization: "Information Technology",
    institution: "A.V.C. College of Engineering",
    university: "Anna University",
    cgpa: "7.55"
  },
  currentFocus: {
    heading: "What I'm Exploring",
    description: "Exploring new technologies, understanding problems, developing product ideas and studying opportunities to build useful solutions."
  },
  areasOfFocus: [
    {
      id: "technology",
      title: "Technology",
      tagline: "Software, Intelligence & Systems",
      description: "Exploring software engineering, artificial intelligence, intelligent systems, data technologies and emerging technological developments.",
      tags: ["Software Engineering", "Artificial Intelligence", "Data Systems", "Emerging Tech"],
      icon: "Cpu",
      accentColor: "from-blue-600/20 via-cyan-500/10 to-transparent"
    },
    {
      id: "products",
      title: "Products",
      tagline: "Discovery, Design & Execution",
      description: "Exploring product discovery, problem identification, product development, experimentation and commercialization.",
      tags: ["Product Discovery", "Problem Framing", "Experimentation", "Prototyping"],
      icon: "Layers",
      accentColor: "from-emerald-600/20 via-teal-500/10 to-transparent"
    },
    {
      id: "research",
      title: "Research",
      tagline: "Industries, Markets & Concepts",
      description: "Studying technologies, industries, markets, emerging opportunities and new ideas.",
      tags: ["Market Analysis", "Emerging Opportunities", "Industry Studies", "Deep Dives"],
      icon: "Compass",
      accentColor: "from-purple-600/20 via-indigo-500/10 to-transparent"
    },
    {
      id: "ventures",
      title: "Ventures",
      tagline: "Entrepreneurship & Business Models",
      description: "Exploring entrepreneurship, business models, venture building, business strategy and opportunities across industries.",
      tags: ["Venture Building", "Business Strategy", "Business Models", "Opportunity Mapping"],
      icon: "TrendingUp",
      accentColor: "from-amber-600/20 via-orange-500/10 to-transparent"
    },
    {
      id: "ideas",
      title: "Ideas & Communication",
      tagline: "Storytelling & Knowledge Sharing",
      description: "Knowledge sharing, writing, visual storytelling, educational content and communicating complex ideas.",
      tags: ["Knowledge Sharing", "Technical Writing", "Visual Storytelling", "Idea Synthesis"],
      icon: "Lightbulb",
      accentColor: "from-rose-600/20 via-pink-500/10 to-transparent"
    }
  ]
};

// Architecture supports verified future additions. Initial launch: Empty per Content Governance.
export const PROJECTS: ProjectItem[] = [];

// Architecture supports future research and writings. Initial launch: Empty per Content Governance.
export const WRITINGS: WritingItem[] = [];
