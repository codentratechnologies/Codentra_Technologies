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

export const techStack = ['Node.js', 'Next.js', 'React.js', 'Android', 'Flutter', 'Python', 'RPA Automation', 'Firebase', 'PostgreSQL', 'MongoDB', 'AWS'];

export const ctaContent = {
  title: "Ready to scale your digital presence?",
  desc: "Partner with Codentra Technologies to build cutting-edge, scalable digital solutions.",
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
    title: "Creative Canvas",
    category: "Website",
    client: "Drashti Gajera",
    desc: "A creative and modern digital platform with interactive UI/UX and smooth user experience.",
    tech: ["React.js", "Node.js"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    title: "Radheshyam Furniture",
    category: "Flutter Mobile App",
    client: "Rohit Asodariya",
    desc: "A furniture calculation and workflow management mobile application for pricing, measurements, and order management.",
    tech: ["Flutter", "Firebase"],
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Aura Finance",
    category: "Finance Platform / Website",
    client: "Aura Finance",
    desc: "A finance and share market management platform with analytics, dashboards, and business financial workflows.",
    tech: ["Python", "Next.js", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Madhav Ecommerce Sales Dashboard",
    category: "Power BI Dashboard",
    client: "Madhav Industries",
    desc: "An ecommerce analytics and sales dashboard for monitoring revenue, orders, profits, customer insights, and performance metrics.",
    tech: ["Power BI", "Excel", "SQL"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    title: "Eventia App",
    category: "Android App + Admin Panel",
    client: "Eventia Solutions",
    desc: "An event management platform with mobile application and admin dashboard for booking, event handling, and customer management.",
    tech: ["Android", "React.js", "Python"],
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    title: "Nexora CRM",
    category: "CRM Platform",
    client: "Nexora Technologies",
    desc: "A customer relationship management system for lead tracking, sales automation, and workflow management.",
    tech: ["React.js", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  }
];

