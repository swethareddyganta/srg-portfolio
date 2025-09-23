import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, Linkedin, Mail, FileText, GraduationCap } from "lucide-react"
import ProjectCard from "@/components/project-card"
import type { TimelineItem } from "@/components/roadmap-timeline"
import InteractiveRoadmap from "@/components/interactive-roadmap"
import EducationCard from "@/components/education-card"

import type { ReactNode } from "react"

type SocialButtonProps = {
  href: string
  icon: ReactNode
  label: string
  download?: boolean | string
  target?: string
}

function SocialButton({ href, icon, label, download, target }: SocialButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 h-11 px-5 md:px-6 rounded-full bg-white/10 hover:bg-white/20 border border-gray-800 text-white/90 hover:text-white transition-colors shadow-sm"
      target={target || (href.startsWith("mailto:") ? undefined : "_blank")}
      download={download}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
}

type SocialOrbProps = {
  href: string
  label: string
  icon: ReactNode
  angleDeg: number
  baseRadiusRem?: number
  hoverRadiusRem?: number
}

function SocialOrb({ href, label, icon, angleDeg, baseRadiusRem = 12 }: SocialOrbProps) {
  return (
    <Link
      href={href}
      target={href.startsWith("http") || href.startsWith("mailto:") ? "_blank" : undefined}
      className={`group absolute z-20 left-1/2 top-1/2`}
      style={{
        // @ts-ignore - CSS custom props
        ['--angle' as any]: `${angleDeg}deg`,
        ['--r' as any]: `${baseRadiusRem}rem`,
        transform: `translate(-50%, -50%) rotate(var(--angle)) translateX(var(--r)) rotate(calc(-1 * var(--angle)))`,
      }}
    >
      <span className="inline-flex items-center gap-0 px-0 h-11 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg transition-all duration-300 ease-out text-white/90 hover:text-white hover:bg-white/20 group-hover:px-4 group-hover:gap-2">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-500/40 to-blue-500/40 shadow-[0_0_20px_rgba(147,51,234,0.35)] border border-white/20">
          {icon}
        </span>
        <span className="w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-all duration-300 ease-out group-hover:w-24">
          {label}
        </span>
      </span>
    </Link>
  )
}

type ResearchInterestProps = { title: string; description: string }
function ResearchInterest({ title, description }: ResearchInterestProps) {
  return (
    <div className="border-b border-gray-800 pb-4 last:border-0 last:pb-0">
      <h4 className="text-lg font-medium mb-2">{title}</h4>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  )
}

type ExperienceLink = { label: string; href: string }
type ExperienceCardProps = {
  title: string
  company: string
  companyLink?: string
  period: string
  description: string
  achievements: string[]
  image?: string
  projectLinks?: ExperienceLink[]
}

function ExperienceCard({ title, company, companyLink, period, description, achievements, image, projectLinks }: ExperienceCardProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1">
        <div className="card overflow-hidden bg-white">
          <img
            src={image || "/placeholder.svg?height=200&width=300"}
            alt={company}
            className="w-full h-24 object-contain"
          />
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="card p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
            <div>
              <h3 className="text-xl font-medium mb-1">{title}</h3>
              <Link
                href={companyLink || "#"}
                target="_blank"
                className="text-purple-400 text-sm mb-1 hover:text-purple-300 transition-colors"
              >
                {company}
              </Link>
            </div>
            <p className="text-gray-400 text-sm whitespace-nowrap">{period}</p>
          </div>
          <p className="text-gray-300 text-sm mb-4 whitespace-pre-line">{description}</p>
          {achievements && achievements.length > 0 && (
            <>
              <h4 className="text-lg font-medium mb-3">Key Achievements</h4>
              <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm">
                {achievements.map((achievement: string, index: number) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </>
          )}
          {projectLinks && projectLinks.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {projectLinks.map((p: ExperienceLink, i: number) => (
                <Link
                  key={i}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer"
                  className="button-secondary inline-flex items-center"
                >
                  <ArrowRight className="mr-2 h-4 w-4" />
                  {p.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

type Skill = { name: string; level: number }
type SkillCardProps = { category: string; skills: Skill[] }
function SkillCard({ category, skills }: SkillCardProps) {
  return (
    <div className="card p-6 h-full">
      <h3 className="text-xl font-medium mb-6">{category}</h3>
      <div className="space-y-4">
        {skills.map((skill: Skill, index: number) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span className="text-sm">{skill.name}</span>
              <span className="text-sm text-gray-400">{skill.level}%</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white neon-scope">
      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center grid-pattern pb-16 md:pb-20">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-[800px] h-[800px] rounded-full bg-purple-600/10 blur-[120px] top-[10%] left-[50%] transform -translate-x-1/2"></div>
          <div className="absolute w-[600px] h-[600px] rounded-full bg-blue-600/10 blur-[100px] top-[40%] left-[30%]"></div>
        </div>
        <div className="container-xl relative z-10 pt-14">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            <div className="self-center">
              <h1 className="headline mb-4">
                <span className="text-4xl md:text-5xl lg:text-6xl">
                  <span className="text-3xl md:text-4xl font-medium mt-2 block"> Hi there!</span>{" "}
                  <span className="gradient-text">I'm Swetha Reddy Ganta.</span>
                </span>
                <br />
                <span className="text-3xl md:text-4xl font-medium mt-1 block">AI Software Engineer, based in the United States</span>
              </h1>
              <p className="subheadline mb-6 md:mb-8 max-w-xl">
                Builder of bots, breaker of limits - I make AI apps that plan your day, chat like a pro, and scale like an enterprise.
              </p>
              
            </div>
            <div className="relative lg:justify-self-center">
              {/* Aura behind */}
              <div className="pointer-events-none absolute -inset-10 bg-gradient-to-br from-purple-500/25 via-fuchsia-500/20 to-blue-500/25 blur-3xl rounded-full"></div>
              {/* Orbit container sized to image */}
              <div className="relative mx-auto w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
                {/* Profile circle */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <Image
                    src="/images/profile.png"
                    alt="Portrait of Swetha Reddy Ganta"
                    fill
                    sizes="(min-width: 1024px) 40vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </div>
                {/* Social orbit (evenly spaced around the circle) with slow rotation */}
                <div className="absolute inset-0 z-10 animate-[spin_40s_linear_infinite] [animation-direction:reverse]">
                  <SocialOrb
                    href="https://www.linkedin.com/in/swetha-reddy-ganta"
                    label="LinkedIn"
                    icon={<Linkedin className="h-5 w-5" />}
                    angleDeg={45}
                  />
                  <SocialOrb
                    href="mailto:swethaganta0408@gmail.com"
                    label="Email"
                    icon={<Mail className="h-5 w-5" />}
                    angleDeg={135}
                  />
                  <SocialOrb
                    href="https://github.com/swethareddyganta"
                    label="GitHub"
                    icon={<Github className="h-5 w-5" />}
                    angleDeg={225}
                  />
                  <SocialOrb
                    href="https://scholar.google.com/citations?user=46_UcSkAAAAJ&hl=en"
                    label="Scholar"
                    icon={<GraduationCap className="h-5 w-5" />}
                    angleDeg={315}
                  />
                </div>
              </div>
              {/* Resume capsule */}
              <div className="mt-8 flex justify-center z-10 relative">
                <Link
                  href="https://drive.google.com/file/d/1L2SDUCpDUFm6nXWXdorR5-Xq1GFMoaaV/view?usp=sharing"
                  target="_blank"
                  className="inline-flex items-center gap-2 h-11 px-6 rounded-full bg-white/10 hover:bg-white/20 border border-gray-800 text-white/90 hover:text-white transition-colors shadow-sm"
                >
                  <FileText className="h-5 w-5" />
                  <span className="text-sm font-medium">Resume</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      

      {/* Interactive Roadmap Section */}
      <InteractiveRoadmap items={([
        {
          id: "edu-btech",
          date: "Aug 2019 – May 2023",
          title: "B.Tech in C.S.",
          subtitle: "Kakatiya Institute of Technology and Science",
          type: "education",
          description: "Undergraduate foundation in algorithms, data structures, and applied machine learning with multiple academic projects.",
          location: "Warangal, India",
          links: [
            { label: "Institute", href: "https://www.kitsw.ac.in/", external: true, type: "github" },
          ],
          tags: ["CS", "Algorithms"],
        },
        {
          id: "intern-cv",
          date: "Jan 2021 – Aug 2021",
          title: "Computer Vision Intern",
          subtitle: "KITSW",
          type: "internship",
          description: "Research on deep learning-based image augmentation techniques, achieving 98.57% accuracy on MNIST dataset.",
          location: "Warangal, India",
          links: [
            { label: "Research Paper", href: "https://ieeexplore.ieee.org/abstract/document/9633781", external: true, type: "paper" },
          ],
          tags: ["Computer Vision", "Deep Learning"],
        },
        {
          id: "intern-datascience",
          date: "May 2022 – July 2022",
          title: "Data Science Intern",
          subtitle: "3 CORTEX Technologies",
          type: "internship",
          description: "Applied innovative AI optimization techniques to solve complex challenges, improving project outcomes by 75%.",
          location: "Hyderabad, India",
          links: [
            { label: "Certificate", href: "https://drive.google.com/file/d/1qqD4HORaCGZl-lVK8cSJR7yiPDujcr9H/view?usp=drive_link", external: true, type: "certificate" },
          ],
          tags: ["AI Optimization", "Data Visualization"],
        },
        {
          id: "intern-ai",
          date: "Feb 2023 – Jun 2023",
          title: "AI Research Intern",
          subtitle: "KITSW",
          type: "internship",
          description: "Optimized tokenization in multilingual LMs, reducing token usage by 75% and improving response speed with transliteration.",
          location: "Warangal, India",
          links: [
            { label: "Research Paper", href: "http://proceeding.conferenceworld.in/ICIIRS-2023/10.pdf", external: true, type: "paper" },
          ],
          tags: ["NLP", "Tokenization"],
        },
        {
          id: "intern-ml",
          date: "Mar 2023 – Jul 2023",
          title: "ML Research Intern",
          subtitle: "KITSW",
          type: "internship",
          description: "Built ML pipeline for fraud detection achieving 78% accuracy and 81% AUC using ensemble methods.",
          location: "Warangal, India",
          links: [
            { label: "Research Paper", href: "http://proceeding.conferenceworld.in/ICIIRS-2023/13.pdf", external: true, type: "paper" },
          ],
          tags: ["ML", "Fraud Detection"],
        },
        {
          id: "edu-ms",
          date: "Aug 2023 – Dec 2024",
          title: "Masters in UB",
          subtitle: "Artificial Intelligence",
          type: "education",
          description: "Advanced studies in AI with focus on machine learning, deep learning, NLP, and computer vision.",
          location: "Buffalo, NY",
          links: [
            { label: "GitHub Portfolio", href: "https://github.com/swethareddyganta", external: true, type: "github" },
            { label: "University", href: "https://www.buffalo.edu/", external: true, type: "github" },
          ],
          tags: ["AI", "ML", "NLP", "CV"],
        },

        {
          id: "volunteer-prompt",
          date: "Feb 2025 – Apr 2025",
          title: "Prompt Engineering",
          subtitle: "Community Dreams Foundation",
          type: "experience",
          description: "Volunteer contributor developing and refining AI prompts for ML-driven simulations, improving model reliability by 30%.",
          location: "Remote",
          links: [
            { label: "Foundation", href: "#", external: false, type: "github" },
          ],
          tags: ["Prompt Engineering", "NLP"],
        },
        {
          id: "exp-arrant",
          date: "Apr 2025 – Present",
          title: "Software Engineer I",
          subtitle: "Arrant Tech",
          type: "experience",
          description: "• Built cleanroom HVAC platform using Next.js & TypeScript with automated EUGMP/WHO/TGA compliance calculations to reduce manual engineering work by 30%.• Built an AI agent app in Python using NLP and ML with microservices to parse user prompts and search 10K+ socialprofiles, boosting identity match accuracy by 65% across LinkedIn, GitHub, Instagram, and more.• Architected AI solutions integrating Workday Extend with RAG pipelines retrieving candidate history and job fit data to reduce campaign latency by 40% • Implemented JWT/OAuth 2.0 authentication systems with rate limiting to reduce SQL injection and XSS vulnerabilities by 30%d AI Application Developer for LifeConnectApp; building autonomous agent systems, Workday Extend integrations, and secure auth.",
          location: "Coppell, TX",
          isCurrent: true,
          links: [
            { label: "Virtual Clean Rooms", href: "https://clean-room-9rctsh0w1-swethareddygantas-projects.vercel.app/", external: true, type: "github" },
            { label: "LifeConnect", href: "https://lifeconnect-74hf.vercel.app/", external: true, type: "github" },
          ],
          tags: ["Agents", "Workday", "OAuth"],
        },
      ]) as any[]}
      />

      {/* About section removed per request */}

      {/* Education Section moved below Projects */}

      

      {/* Experience Section */}
      <section id="experience" className="section bg-black border-t border-gray-800">
        <div className="container-xl">
          <div className="text-center mb-16">
            <div className="inline-block text-sm font-medium text-purple-400 mb-4 px-3 py-1 bg-purple-400/10 rounded-full">
              Experience
            </div>
            <h2 className="headline">Professional Journey</h2>
            <p className="subheadline mx-auto">My experience in AI research and development</p>
          </div>
          <div className="space-y-12">
            <ExperienceCard
              title="Software Engineer I"
              company="Arrant Tech"
              companyLink="#"
              period="Apr 2025 - Present"
              description={
                `Led development of LifeConnect AI agent, designed cleanroom HVAC compliance platforms, and integrated Workday with RAG pipelines to accelerate decision-making. I also enhanced enterprise security by implementing OAuth/JWT systems with rate limiting to safeguard against vulnerabilities.
`}

              image="/images/experience-1.jpeg"
              achievements={[]}
              projectLinks={[
                { label: "Virtual Clean Rooms", href: "https://clean-room-9rctsh0w1-swethareddygantas-projects.vercel.app/" },
                { label: "LifeConnect", href: "https://lifeconnect-74hf.vercel.app/" },
              ]}
            />

            <ExperienceCard
              title="Prompt Engineer"
              company="Community Dreams Foundation"
              companyLink="#"
              period="Feb 2025 - Jul 2025"
              description="Volunteer contributor developing and refining AI prompts for ML-driven simulations, improving model reliability and collaborating on architecture optimization."
              achievements={[]}
              image="/images/experience-2.png"
            />

            <ExperienceCard
              title="Artificial Intelligence Research Intern"
              company="Kakatiya Institute of Technology and Science"
              companyLink="https://www.kitsw.ac.in/"
              period="Feb 2023 – Jun 2023"
              description="Optimized tokenization in multilingual language models, improving efficiency by 60% for non-English languages. Developed language-specific preprocessing pipelines, reducing token usage per prompt from 70-100 to 18-25."
              image="/images/kakatiya-university.jpeg"
              achievements={[]}
            />
            <ExperienceCard
              title="Machine Learning Research Intern"
              company="Kakatiya Institute of Technology and Science"
              companyLink="https://www.kitsw.ac.in/"
              period="Mar 2023 – Jul 2023"
              description="Engineered ML pipeline for fraud detection achieving 78% accuracy and 81% AUC using ensemble methods. Implemented data balancing and feature engineering techniques to optimize model performance on imbalanced datasets."
              achievements={[]}
              image="/images/kakatiya-university.jpeg"
            />
          </div>
          <div className="text-center mt-12">
            <Link href="/experience" className="button-secondary inline-flex items-center">
              View full experience
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Section (moved below Experience) */}
      <section id="projects" className="section bg-black border-t border-gray-800">
        <div className="container-xl">
          <div className="text-center mb-16">
            <div className="inline-block text-sm font-medium text-purple-400 mb-4 px-3 py-1 bg-purple-400/10 rounded-full">
              Projects
            </div>
            <h2 className="headline">Featured Work</h2>
            <p className="subheadline mx-auto">Innovative AI solutions I've developed</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProjectCard
              title="PlanLingo : AI-powered productivity platform"
              subtitle="Duolingo taught you to speak languages. PlanLingo teaches you to speak productivity."
              description="Transforms vague daily intentions into optimized schedules with reminders, rich visualizations, and weekly reports."
              image="/images/Planlingo_app.png"
              tags={["Next.js", "Vite", "FastAPI", "Python", "GroqAPI", "AI"]}
              githubLink="https://github.com/swethareddyganta/PlanLingo"
              appLink="https://planlingo.swethareddyganta.com"
            />
            <ProjectCard
              title="LLM RedHat Toolkit"
              subtitle="Enterprise-Grade LLM Deployment Platform"
              description="Built an LLM-based interactive platform integrating LangChain with enterprise data sources and custom RAG pipelines. Deployed LLM inference with Streamlit UI and Docker containers for scalable and modular access to fine-tuned models."
              image="/images/project-5.png"
              tags={["Large Language Models", "LangChain", "Streamlit", "Docker", "Model Inference", "RAG"]}
              githubLink="https://github.com/swethareddyganta/LLM_Redhat_Toolkit"
            />
            <ProjectCard
              title="Intelli-Chat"
              subtitle="AI-Powered Conversational System"
              description="Architected scalable chatbot system processing 60,000+ documents with hybrid retrieval-augmented generation approach."
              image="/images/project-1.png"
              tags={["NLP", "LLMs", "OpenAI API"]}
              githubLink="https://github.com/swethareddyganta/intelli-chat"
            />
            <ProjectCard
              title="Tokenization Challenges in Multilingual GPT"
              subtitle="NLP Research & Implementation"
              description="Researched and implemented optimized tokenization for multilingual language models, improving efficiency by 60% for non-English languages."
              image="/images/project-2.png"
              tags={["NLP", "Multilingual", "GPT"]}
              githubLink="https://github.com/swethareddyganta/teluguGPT"
              paperLink="http://proceeding.conferenceworld.in/ICIIRS-2023/10.pdf"
            />
            <ProjectCard
              title="Multi-Language Translation System"
              subtitle="Neural Machine Translation"
              description="Built production-ready neural translation system supporting 5+ language pairs with 85% BLEU score using sequence-to-sequence architecture."
              image="/images/project-3.png"
              tags={["Seq2Seq", "LSTM", "Attention Mechanism"]}
              githubLink="https://github.com/swethareddyganta/Language-Translation"
            />
            <ProjectCard
              title="Meme Persuasion Detection"
              subtitle="Multimodal Content Analysis"
              description="Developed multimodal classification system for detecting persuasion techniques in internet memes with 78% accuracy using BERT and ResNet-50."
              image="/images/project-4.png"
              tags={["Multimodal ML", "Computer Vision", "NLP"]}
              githubLink="https://github.com/swethareddyganta/MemePersuasionDetection"
            />
          </div>
          <div className="text-center mt-12">
            <Link href="/projects" className="button-secondary inline-flex items-center">
              View all projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      

      {/* Education Section */}
      <section id="education" className="section bg-black border-t border-gray-800">
        <div className="container-xl">
          <div className="text-center mb-16">
            <div className="inline-block text-sm font-medium text-purple-400 mb-4 px-3 py-1 bg-purple-400/10 rounded-full">
              Education
            </div>
            <h2 className="headline">Academic Background</h2>
            <p className="subheadline mx-auto">Foundation in Artificial Intelligence and computer science</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <EducationCard
              institution="University at Buffalo, State University of New York"
              degree="Master of Science in Engineering Science"
              specialization="Artificial Intelligence"
              period="Aug. 2023 – Dec. 2024"
              location="Buffalo, NY"
              image="/images/university-at-buffalo.jpeg"
              link="https://www.buffalo.edu/"
            />
            <EducationCard
              institution="Kakatiya Institute of Technology and Science, Warangal"
              degree="Bachelor of Technology"
              specialization="Computer Science"
              period="Aug. 2019 – May 2023"
              location="Warangal, India"
              image="/images/kakatiya-university.jpeg"
              link="https://www.kitsw.ac.in/"
            />
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="section bg-black border-t border-gray-800">
        <div className="container-xl">
          <div className="text-center mb-16">
            <div className="inline-block text-sm font-medium text-purple-400 mb-4 px-3 py-1 bg-purple-400/10 rounded-full">
              Skills
            </div>
            <h2 className="headline">Technical Expertise</h2>
            <p className="subheadline mx-auto">Core competencies and technologies</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SkillCard
              category="AI & Machine Learning"
              skills={[
                { name: "TensorFlow", level: 90 },
                { name: "PyTorch", level: 85 },
                { name: "Scikit-learn", level: 95 },
                { name: "NLP", level: 90 },
                { name: "Computer Vision", level: 85 },
                { name: "Reinforcement Learning", level: 80 },
              ]}
            />
            <SkillCard
              category="Programming"
              skills={[
                { name: "Python", level: 95 },
                { name: "C/C++", level: 80 },
                { name: "Java", level: 75 },
                { name: "SQL", level: 85 },
                { name: "MATLAB", level: 70 },
              ]}
            />
            <SkillCard
              category="Data & Analytics"
              skills={[
                { name: "NumPy", level: 95 },
                { name: "Pandas", level: 90 },
                { name: "Matplotlib", level: 85 },
                { name: "Seaborn", level: 80 },
                { name: "Tableau", level: 75 },
                { name: "Statistical Analysis", level: 85 },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-800">
        <div className="container-xl">
          <div className="flex flex-col items-center">
            <div className="mb-6">
              <Link href="/" className="text-lg font-medium text-white">
                SRG
              </Link>
            </div>
            <div className="flex space-x-8 mb-6">
              <Link href="/projects" className="text-sm text-gray-400 hover:text-white transition-colors">
                Projects
              </Link>
              <Link href="/experience" className="text-sm text-gray-400 hover:text-white transition-colors">
                Experience
              </Link>
              <Link href="https://drive.google.com/file/d/1L2SDUCpDUFm6nXWXdorR5-Xq1GFMoaaV/view?usp=sharing" className="text-sm text-gray-400 hover:text-white transition-colors" target="_blank">
                Resume
              </Link>
            </div>
            <div className="flex space-x-6 mb-2">
              <Link href="mailto:swethaganta0408@gmail.com" className="text-gray-400 hover:text-white transition-colors">
                <span className="text-sm">Email</span>
              </Link>
              <Link
                href="https://www.linkedin.com/in/swetha-reddy-ganta"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
              >
                <span className="text-sm">LinkedIn</span>
              </Link>
              <Link
                href="https://github.com/swethareddyganta"
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
              >
                <span className="text-sm">GitHub</span>
              </Link>
            </div>
            <div className="mt-4 text-center text-sm text-gray-500">
              © {new Date().getFullYear()} Swetha Reddy Ganta. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

