/**
 * TEAM CONTENT CHECKLIST
 * Replace the placeholder values below with your real team information.
 * For each member:
 * 1. Change name, role, bio, location, email, skills, and project highlights.
 * 2. Replace `/public/team/member-0X.webp` with a square WebP portrait using the
 *    same filename. The UI automatically crops it into a circle.
 * 3. Keep each slug unique because it becomes the portfolio URL:
 *    `/team/member-01`, `/team/member-02`, and so on.
 */
export const teamMembers = [
  {
    slug: "member-01",
    name: "Team Member 01",
    initials: "TM",
    role: "Creative Director",
    image: "/team/member-01.webp",
    location: "Butwal, Nepal",
    email: "member01@yarsabyte.com",
    intro: "Shapes the visual direction, brand systems, and creative standard behind every Yarsa Byte project.",
    bio: "Add this member's background, experience, interests, and approach to creative leadership here.",
    skills: ["Creative direction", "Brand strategy", "UI design", "Art direction"],
    projects: [
      { title: "Featured identity project", type: "Brand direction", year: "2026" },
      { title: "Featured website project", type: "Digital experience", year: "2026" },
    ],
  },
  {
    slug: "member-02",
    name: "Team Member 02",
    initials: "TM",
    role: "Frontend Developer",
    image: "/team/member-02.webp",
    location: "Butwal, Nepal",
    email: "member02@yarsabyte.com",
    intro: "Turns design systems into responsive, accessible, and polished web experiences.",
    bio: "Add this member's development background, favorite technologies, and problem-solving approach here.",
    skills: ["Next.js", "React", "TypeScript", "Motion"],
    projects: [
      { title: "Featured web platform", type: "Frontend development", year: "2026" },
      { title: "Interactive portfolio", type: "Creative development", year: "2026" },
    ],
  },
  {
    slug: "member-03",
    name: "Team Member 03",
    initials: "TM",
    role: "Backend Developer",
    image: "/team/member-03.webp",
    location: "Butwal, Nepal",
    email: "member03@yarsabyte.com",
    intro: "Builds reliable systems, integrations, and technical foundations that keep products moving.",
    bio: "Add this member's backend experience, technical specialties, and preferred ways of working here.",
    skills: ["APIs", "Databases", "Architecture", "Deployment"],
    projects: [
      { title: "Business operations system", type: "Backend engineering", year: "2026" },
      { title: "Content platform", type: "API and data", year: "2026" },
    ],
  },
  {
    slug: "member-04",
    name: "Team Member 04",
    initials: "TM",
    role: "Graphic Designer",
    image: "/team/member-04.webp",
    location: "Butwal, Nepal",
    email: "member04@yarsabyte.com",
    intro: "Creates clear, memorable visuals for brands, campaigns, social media, and launch moments.",
    bio: "Add this member's design story, influences, specialties, and the kind of visual work they enjoy here.",
    skills: ["Graphic design", "Campaigns", "Typography", "Social media"],
    projects: [
      { title: "Campaign visual system", type: "Graphic design", year: "2026" },
      { title: "Launch content kit", type: "Social creative", year: "2026" },
    ],
  },
  {
    slug: "member-05",
    name: "Team Member 05",
    initials: "TM",
    role: "Motion & Video Editor",
    image: "/team/member-05.webp",
    location: "Butwal, Nepal",
    email: "member05@yarsabyte.com",
    intro: "Gives ideas rhythm through reels, motion graphics, edits, pacing, and sound-led storytelling.",
    bio: "Add this member's editing experience, preferred formats, creative influences, and specialties here.",
    skills: ["Video editing", "Motion graphics", "Reels", "Sound design"],
    projects: [
      { title: "Brand launch reel", type: "Motion and editing", year: "2026" },
      { title: "Product campaign film", type: "Video production", year: "2026" },
    ],
  },
  {
    slug: "member-06",
    name: "Team Member 06",
    initials: "TM",
    role: "Strategy & Client Success",
    image: "/team/member-06.webp",
    location: "Butwal, Nepal",
    email: "member06@yarsabyte.com",
    intro: "Connects client goals to practical plans, clear communication, and smooth project delivery.",
    bio: "Add this member's client experience, strategic strengths, and approach to collaboration here.",
    skills: ["Strategy", "Project planning", "Client success", "Content"],
    projects: [
      { title: "Digital launch strategy", type: "Planning and delivery", year: "2026" },
      { title: "Brand growth roadmap", type: "Digital strategy", year: "2026" },
    ],
  },
] as const;

export type TeamMember = (typeof teamMembers)[number];
