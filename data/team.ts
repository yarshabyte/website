/**
 * TEAM CONTENT CHECKLIST
 * Replace the placeholder values below with your real team information.
 * For each member:
 * 1. Change name, role, bio, location, email, skills, and project highlights.
 * 2. Replace `/public/team/member-0X.svg` with a square portrait using the
 *    same filename. The UI automatically crops it into a circle.
 * 3. Keep each slug unique because it becomes the portfolio URL:
 *    `/team/member-01`, `/team/member-02`, and so on.
 */
export type TeamMember = {
  slug: string;
  name: string;
  initials: string;
  role: string;
  image: string;
  location: string;
  email: string;
  intro: string;
  bio: string;
  skills: string[];
  projects: Array<{
    title: string;
    type: string;
    year: string;
  }>;
};

export const teamMembers: TeamMember[] = [
  {
    slug: "aashish-chapagain",
    name: "Aashish Chapagain",
    initials: "AC",
    role: "CEO",
    image: "/team/member1.webp",
    location: "Butwal, Nepal",
    email: "aashish@yarshabyte.com",
    intro: "Guides YarshaByte's overarching vision, executive strategy, and technological innovation to empower businesses with high-impact digital solutions.",
    bio: "As Chief Executive Officer, Aashish steers YarshaByte's mission, corporate strategy, and technological innovation roadmap. Combining executive leadership with profound technical mastery in full-stack architecture and artificial intelligence, he aligns organizational goals with client transformation - building high-performing teams, fostering long-term strategic partnerships, and establishing YarshaByte as a premier creative tech agency.",
    skills: [
      "Executive Leadership",
      "Strategic Vision",
      "Enterprise Architecture",
      "AI/ML Innovation",
      "Business Development",
      "Corporate Strategy",
    ],
    projects: [
      {
        title: "Avenue Butwal Platform",
        type: "Full-Stack & Strategic Architecture",
        year: "2026",
      },
      {
        title: "Enterprise AI & System Blueprint",
        type: "AI Integration & System Design",
        year: "2026",
      },
    ],
  },
  {
    slug: "anmol-chhetri",
    name: "Anmol Chhetri",
    initials: "AC",
    role: "CMO",
    image: "/team/member2.webp",
    location: "Butwal, Nepal",
    email: "anmol@yarshabyte.com",
    intro: "Leads marketing vision, brand positioning, and high-conversion digital campaigns that accelerate market growth for brands.",
    bio: "As Chief Marketing Officer, Anmol spearheads YarshaByte's growth strategies, brand narratives, and multi-channel marketing operations. With a deep focus on performance marketing, customer acquisition, and market intelligence, he crafts data-driven campaigns and conversion funnels that elevate client brands, maximize market reach, and deliver compounding return on investment.",
    skills: [
      "Brand Strategy",
      "Digital Marketing",
      "Growth & Performance Marketing",
      "Conversion Optimization",
      "Market Research",
      "Campaign Leadership",
    ],
    projects: [
      {
        title: "Avenue Butwal Growth Campaign",
        type: "Digital Acquisition & Positioning",
        year: "2026",
      },
      {
        title: "GreenStar Brand Expansion",
        type: "Brand Identity & Market Outreach",
        year: "2026",
      },
    ],
  },
  {
    slug: "anupam-baral",
    name: "Anupam Baral",
    initials: "AB",
    role: "CPO",
    image: "/team/member3.webp",
    location: "Butwal, Nepal",
    email: "anupam@yarshabyte.com",
    intro: "Directs product vision, creative media, and user-centric digital experiences across web, mobile, and interactive ecosystems.",
    bio: "As Chief Product Officer, Anupam leads the design, user experience, and lifecycle strategy for digital products at YarshaByte. Working at the intersection of media production, mobile app ecosystems, and intuitive interface design, he ensures that every digital experience is visually captivating, effortless to navigate, and aligned with meaningful user needs and business metrics.",
    skills: [
      "Product Strategy",
      "UX/UI Design Architecture",
      "Mobile App Development",
      "Product Lifecycle Management",
      "Creative Direction",
      "Video & Media Production",
    ],
    projects: [
      {
        title: "Cross-Platform Mobile Ecosystem",
        type: "Mobile Product Strategy & UX",
        year: "2026",
      },
      {
        title: "Arvind Pandey Brand Showcase",
        type: "Interactive Experience & Media",
        year: "2026",
      },
    ],
  },
  {
    slug: "amrit-bhhatarai",
    name: "Amrit Bhhatarai",
    initials: "AB",
    role: "Lead Backend & Systems Architect",
    image: "/team/member4.webp",
    location: "Butwal, Nepal",
    email: "amrit@yarshabyte.com",
    intro: "Architects scalable cloud infrastructure, secure backend systems, and high-throughput data pipelines powering robust digital products.",
    bio: "As Lead Backend & Systems Architect, Amrit oversees core server architecture, database engineering, and API ecosystems at YarshaByte. Dedicated to clean code paradigms, low-latency computing, and rock-solid system reliability, he designs the resilient server backbones and data architectures that support seamless, high-traffic digital applications.",
    skills: [
      "Backend Architecture",
      "Distributed Systems",
      "Database Engineering",
      "Cloud Infrastructure",
      "API Design & Security",
      "Performance Tuning",
    ],
    projects: [
      {
        title: "High-Throughput API Engine",
        type: "Core Backend Infrastructure",
        year: "2026",
      },
      {
        title: "Consultancy Inquiries Pipeline",
        type: "Secure Data Architecture",
        year: "2026",
      },
    ],
  },
  {
    slug: "beeplap-gharti-magar",
    name: "Beeplap Gharti Magar",
    initials: "BG",
    role: "CTO",
    image: "/team/member5.webp",
    location: "Butwal, Nepal",
    email: "beeplap@yarshabyte.com",
    intro: "Heads engineering excellence, technology strategy, and immersive full-stack systems across all digital platforms.",
    bio: "As Chief Technology Officer, Beeplap leads YarshaByte's engineering culture, frontend craftsmanship, and full-stack software architecture. Specializing in high-performance web applications, interactive 3D/WebGL experiences, and end-to-end quality assurance, he establishes technical standards that push boundaries in speed, responsiveness, and aesthetic execution.",
    skills: [
      "Technical Leadership",
      "Full Stack Engineering",
      "Frontend Craft & WebGL",
      "System Architecture",
      "Quality Assurance",
      "Performance Engineering",
    ],
    projects: [
      {
        title: "YarshaByte Web Experience",
        type: "Interactive 3D & WebGL Engineering",
        year: "2026",
      },
      {
        title: "GreenStar Automation Platform",
        type: "Full-Stack Web Architecture",
        year: "2026",
      },
    ],
  },
  {
    slug: "dinesh-lamichhane",
    name: "Dinesh Lamichhane",
    initials: "DL",
    role: "COO",
    image: "/team/member6.webp",
    location: "Butwal, Nepal",
    email: "dinesh@yarshabyte.com",
    intro: "Directs operational strategy, cross-functional execution, and organizational growth to ensure seamless delivery and operational excellence across all client projects.",
    bio: "As Chief Operating Officer, Dinesh oversees daily agency operations, project delivery pipelines, and resource allocation at YarshaByte. He bridges strategic vision and technical execution, optimizing operational workflows, client partnerships, and delivery standards to drive measurable business impact and sustainable organizational growth.",
    skills: [
      "Operations Strategy",
      "Project Delivery Management",
      "Process Optimization",
      "Client Success",
      "Resource Planning",
      "Cross-functional Leadership",
    ],
    projects: [
      {
        title: "GreenStar Operations & Deployment",
        type: "Turnkey Project Delivery",
        year: "2026",
      },
      {
        title: "Agency Delivery Pipeline",
        type: "Operational Infrastructure",
        year: "2026",
      },
    ],
  },
];
