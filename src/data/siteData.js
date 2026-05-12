import { 
  FiMonitor, FiSmartphone, FiLayers, FiCode, 
  FiDatabase, FiCloud, FiLayout, FiCpu 
} from 'react-icons/fi';

export const siteConfig = {
  name: "Codentra Technologies",
  email: "codentratechnologies@gmail.com",
  phone: "+91 9316877335",
  address: "Bangalore, India",
  whatsapp: "https://wa.me/919316877335",
  aboutImage: "/images/about-team.png",
  socials: {
    github: "https://github.com/codentratechnologies",
    linkedin: "https://www.linkedin.com/company/codentratechnologies",
    instagram: "https://www.instagram.com/codentratechnologies/"
  }
};
export const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export const stats = [
  { value: "04", label: "Projects" },
  { value: "12", label: "Tech stack" },
  { value: "05", label: "Clients" },
  { value: "01", label: "Active" },
];

export const techStack = ['Node.js', 'Next.js', 'React.js', 'Android', 'Flutter', 'Python', 'Firebase', 'PostgreSQL', 'MongoDB', 'AWS'];

export const ctaContent = {
  title: "Ready to scale your digital presence?",
  desc: "Join 50+ companies already building with Codentra Technologies.",
  btnText: "Start a Project",
  href: "#contact"
};

export const services = [
  {
    title: "Web Development",
    desc: "Modern, high-performance websites built with React and cutting-edge technologies.",
    icon: "FiMonitor"
  },
  {
    title: "Mobile App Development",
    desc: "Cross-platform mobile applications for iOS and Android using Flutter.",
    icon: "FiSmartphone"
  },
  {
    title: "Full Stack Solutions",
    desc: "End-to-end development covering both frontend aesthetics and backend logic.",
    icon: "FiLayers"
  },
  {
    title: "Python Development",
    desc: "Robust automation scripts, data processing, and AI integrations.",
    icon: "FiCode"
  },
  {
    title: "API Development",
    desc: "Secure and scalable RESTful and GraphQL APIs for seamless integration.",
    icon: "FiDatabase"
  },
  {
    title: "Cloud Solutions",
    desc: "Deployment and management of applications on AWS, Azure, or Firebase.",
    icon: "FiCloud"
  },
  {
    title: "UI/UX Design",
    desc: "User-centric design focus ensuring intuitive and visually stunning interfaces.",
    icon: "FiLayout"
  },
  {
    title: "AI Integrations",
    desc: "Leveraging the power of AI to automate and enhance business processes.",
    icon: "FiCpu"
  }
];

export const projects = [
  {
    id: 1,
    title: "E-Commerce Titan",
    category: "Web App",
    desc: "A high-performance e-commerce platform with real-time inventory management and AI-driven recommendations.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind"],
    image: "/images/project-ecommerce.png",
  },
  {
    id: 2,
    title: "Enterprise Dashboard",
    category: "SaaS",
    desc: "Comprehensive business management system for tracking KPIs, employee performance, and financial analytics.",
    tech: ["React", "Python", "PostgreSQL", "Framer"],
    image: "/images/project-dashboard.png",
  },
  {
    id: 3,
    title: "Nova CRM Mobile",
    category: "Mobile",
    desc: "Sleek and intuitive CRM mobile application for real-time lead tracking and client communication.",
    tech: ["Flutter", "Firebase", "Node.js"],
    image: "/images/project-mobile.png",
  },
];

