import {
  FiMonitor, FiSmartphone, FiLayers, FiCode,
  FiDatabase, FiCloud, FiLayout, FiCpu
} from 'react-icons/fi';

export const siteConfig = {
  name: "Codentra Technologies",
  email: "codentratechnologies@gmail.com",
  phone: "+91 9316877335",
  displayPhone: "+91 93XXXXXX35",
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
  { name: 'About Us', href: '#about' },
  { name: 'Work +', href: '#projects' },
  { name: 'Services +', href: '#services' },
];

export const stats = [
  { value: "04+", label: "Projects", desc: "Successfully delivered enterprise-grade applications." },
  { value: "12+", label: "Tech Stack", desc: "Mastery in modern frameworks and scalable cloud tech." },
  { value: "05+", label: "Happy Clients", desc: "Partnering with startups and global businesses." },
  { value: "01+", label: "Years Active", desc: "Pushing the boundaries of digital engineering daily." },
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
    desc: "We engineer modern, high-performance websites tailored to your business goals. Utilizing React and Next.js, we build scalable architectures that deliver lightning-fast load times, exceptional SEO, and seamless user experiences across all devices. Our focus on clean code and robust state management ensures that your web application remains maintainable and performs flawlessly even under heavy traffic.",
    icon: "FiMonitor",
    features: ["Responsive Design", "SEO Optimized", "CMS Integration"],
    tech: ["React", "Next.js", "Node.js"]
  },
  {
    title: "Mobile App Development",
    desc: "Transform your ideas into powerful mobile applications for both iOS and Android. Using Flutter's native-compiled framework, we deliver fluid animations, custom user interfaces, and robust performance while maintaining a single, efficient codebase. We ensure offline capabilities, secure local storage, and tight integration with hardware APIs to create a truly native-feeling experience.",
    icon: "FiSmartphone",
    features: ["Cross-Platform", "Native Performance", "Custom UI"],
    tech: ["Flutter", "Dart", "Firebase"]
  },
  {
    title: "Full Stack Solutions",
    desc: "Our end-to-end development approach covers everything from stunning frontend interfaces to complex backend logic. We architect scalable, secure systems that can handle high traffic volumes and complex business workflows with complete reliability. By bridging the gap between pixel-perfect design and database optimization, we deliver holistic solutions that drive your entire digital ecosystem.",
    icon: "FiLayers",
    features: ["Scalable Architecture", "API Development", "Database Design"],
    tech: ["MERN Stack", "PostgreSQL", "AWS"]
  },
  {
    title: "Python Development",
    desc: "Leverage the power of Python to automate your most time-consuming tasks. We build robust automation scripts, intelligent data processing pipelines, and sophisticated backend systems that drive operational efficiency and uncover deep business insights. From complex web scraping mechanisms to automated reporting, we help you transform raw data into actionable business intelligence.",
    icon: "FiCode",
    features: ["Data Processing", "Web Scraping", "Automation"],
    tech: ["Python", "Django", "Pandas"]
  },
  {
    title: "API Development",
    desc: "Connect your digital ecosystem with secure, highly scalable APIs. Whether you need RESTful architectures or flexible GraphQL endpoints, we design robust integration layers that allow your applications, databases, and third-party services to communicate flawlessly. We implement strict rate limiting, robust authentication, and comprehensive documentation to ensure seamless onboarding.",
    icon: "FiDatabase",
    features: ["RESTful APIs", "GraphQL", "Microservices"],
    tech: ["Express", "FastAPI", "MongoDB"]
  },
  {
    title: "Cloud Solutions",
    desc: "Future-proof your infrastructure with our enterprise-grade cloud solutions. We handle the complete deployment, optimization, and management of your applications on AWS, Azure, or Firebase, ensuring high availability, impenetrable security, and seamless auto-scaling capabilities. Our DevOps practices guarantee zero-downtime deployments and continuous monitoring for ultimate peace of mind.",
    icon: "FiCloud",
    features: ["CI/CD Pipelines", "Serverless", "Cloud Security"],
    tech: ["AWS", "Azure", "Docker"]
  },
  {
    title: "UI/UX Design",
    desc: "We craft visually stunning and highly intuitive interfaces rooted in deep user research. From initial wireframes to high-fidelity prototypes, our design process ensures that every interaction feels natural, engaging, and perfectly aligned with your brand identity. We prioritize accessibility and conversion-driven layouts to maximize user retention and overall business impact.",
    icon: "FiLayout",
    features: ["Wireframing", "Prototyping", "User Research"],
    tech: ["Figma", "Adobe XD", "Sketch"]
  },
  {
    title: "AI Integrations",
    desc: "Unlock the next level of innovation by embedding Artificial Intelligence into your products. We integrate cutting-edge machine learning models and NLP capabilities to automate complex processes, personalize user experiences, and provide powerful predictive analytics. Our bespoke AI solutions help you stay ahead of the curve by turning conversational agents and deep learning into measurable ROI.",
    icon: "FiCpu",
    features: ["Machine Learning", "NLP", "Predictive Analytics"],
    tech: ["OpenAI", "TensorFlow", "PyTorch"]
  }
];

export const projectsData = [
  {
    title: "Creative Canvas",
    desc: "Premium Handcrafted Resin Art & Kasab Embroidery. Shop unique handmade products from India.",
    statValue: "200+",
    statLabel: "Happy Clients",
    statValue2: "100%",
    statLabel2: "Handmade",
    image: "/images/creative_canvas.png",
    link: "https://creativecanvas-26.vercel.app/"
  },
  {
    title: "Aura Finance",
    desc: "An intelligent, AI-powered financial dashboard delivering real-time market data, sentiment analysis, and personalized insights.",
    statValue: "7+",
    statLabel: "Asset Classes",
    statValue2: "Real-Time",
    statLabel2: "AI Sentiment",
    image: "/images/aura_finance.png",
    link: "https://auraafinance.vercel.app/"
  },

  {
    title: "Pramukh Scrap",
    desc: "A comprehensive digital platform for seamless scrap trading, recycling management, and sustainable business operations.",
    statValue: "30+",
    statLabel: "Tons Recycled",
    statValue2: "300+",
    statLabel2: "Happy Customers",
    image: "/images/pramukh.png",
    link: "https://www.pramukhscrap.in/"
  },
  {
    title: "Radhe Shyam Furniture",
    desc: "An elegant e-commerce and showcase platform designed for premium handcrafted furniture and modern interiors.",
    statValue: "20+",
    statLabel: "Customers",
    statValue2: "100%",
    statLabel2: "Secured Data",
    image: "/images/radhe_shyam.png"
  },
  {
    title: "Eventia",
    desc: "A powerful event management and ticketing platform that simplifies planning, booking, and hosting memorable experiences.",
    statValue: "25+",
    statLabel: "Events Hosted",
    statValue2: "100%",
    statLabel2: "Data Security",
    image: "/images/eventia.png"
  }
];

export const testimonialsData = [
  {
    content: "Codentra completely transformed our digital presence. The architecture is incredibly robust.",
    name: "Drashti Gajera",
    role: "CEO",
    company: "Creative Canvas"
  },
  {
    content: "Their expertise in both design and deep tech made scaling our app seamless.",
    name: "Rohit A.",
    role: "Founder",
    company: "Radheshyam Furniture"
  },
  {
    content: "Lightning-fast delivery and a beautiful user experience. Highly recommended partner.",
    name: "Priya S.",
    role: "CTO",
    company: "Aura Finance"
  }
];

export const roadmapData = [
  {
    phase: "PHASE 1",
    title: "Discovery & Strategy",
    items: ["Deep dive into requirements", "Architecture planning", "UX/UI wireframing"]
  },
  {
    phase: "PHASE 2",
    title: "Engineering",
    items: ["Agile development sprints", "Continuous integration", "Performance optimization"]
  },
  {
    phase: "PHASE 3",
    title: "Testing & QA",
    items: ["Automated testing suite", "Security auditing", "User acceptance testing"]
  },
  {
    phase: "PHASE 4",
    title: "Deployment & Scale",
    items: ["Cloud infrastructure setup", "Zero-downtime deployment", "Ongoing maintenance"]
  }
];


