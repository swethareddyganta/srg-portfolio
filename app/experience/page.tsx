import Link from "next/link"
import { ArrowLeft, ExternalLink, Calendar, MapPin, Award } from "lucide-react"

export default function Experience() {
  return (
    <main className="min-h-screen bg-black text-white pt-24">
      {/* Header */}
      <section className="section pt-12">
        <div className="container-xl">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-12">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="max-w-4xl">
            <div className="inline-block text-sm font-medium text-purple-400 mb-4 px-3 py-1 bg-purple-400/10 rounded-full">
              Experience
            </div>
            <h1 className="headline">
              <span className="gradient-text">Professional Journey</span>
            </h1>
            <p className="subheadline">My experience in AI research and development</p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section pt-0">
        <div className="container-xl">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-800 transform md:translate-x-[-0.5px]"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              <TimelineItem
                position="right"
                title="Software Engineer I"
                company="Arrant Tech"
                companyLink="#"
                location="Coppell, TX"
                period="Apr 2025 - Present"
                description={`• Built cleanroom HVAC platform using Next.js & TypeScript with automated EUGMP/WHO/TGA compliance calculations to reduce manual engineering work by 30%
• Built an AI agent app in Python using NLP and ML with microservices to parse user prompts and search 10K+ social profiles, boosting identity match accuracy by 65% across LinkedIn, GitHub, Instagram, and more.
• Architected AI solutions integrating Workday Extend with RAG pipelines retrieving candidate history and job fit data to reduce campaign latency by 40%
• Implemented JWT/OAuth 2.0 authentication systems with rate limiting to reduce SQL injection and XSS vulnerabilities by 30%`}
                achievements={[]}
                skills={[
                  "Next.js",
                  "TypeScript",
                  "Python",
                  "NLP",
                  "ML",
                  "Microservices",
                  "RAG",
                  "Agentic AI",
                  "Workday Extend",
                  "Enterprise Application Development",
                  "System Architecture",
                  "Python",
                  "Flask",
                  "Java",
                  "JavaScript",
                  "PyTorch",
                  "API Integration",
                  "OAuth 2.0",
                  "MongoDB",
                  "Agile Development",
                  "Jira",
                  "Software Development Life Cycle"
                ]}
                image="/images/experience-1.jpeg"
                projectLinks={[
                  { label: "Virtual Clean Rooms", href: "https://clean-room-9rctsh0w1-swethareddygantas-projects.vercel.app/" },
                  { label: "LifeConnect", href: "https://lifeconnect-74hf.vercel.app/" },
                ]}
              />

              <TimelineItem
                position="left"
                title="Artificial Intelligence Prompt Engineer"
                company="Community Dreams Foundation"
                companyLink="#"
                location="Remote"
                period="Feb 2025 - Jul 2025"
                description="Volunteer contributor developing and refining AI prompts for ML-driven simulations, improving model reliability and collaborating on architecture optimization."
                achievements={[
                  "Volunteer contributor developing and refining 100+ AI prompts for ML-driven simulations, improving model reliability by 30%",
                  "Collaborate on architecture optimization discussions to enhance platform scalability and performance"
                ]}
                skills={[
                  "Prompt Engineering",
                  "NLP",
                  "Data Analysis",
                  "ML Pipeline Optimization"
                ]}
                image="/images/experience-2.png"
              />

              <TimelineItem
                position="right"
                title="Artificial Intelligence Research Intern"
                project="Tokenization Challenges in Multilingual GPT"
                company="Kakatiya Institute of Technology and Science"
                companyLink="https://www.kitsw.ac.in/"
                location="Warangal, India"
                period="Feb 2023 – Jun 2023"
                description="Optimized tokenization in multilingual language models, improving efficiency by 60% for non-English languages. Developed language-specific preprocessing pipelines, reducing token usage per prompt from 70-100 to 18-25."
                achievements={[
                  "Developed language-specific preprocessing, cutting prompt length and improving NLP efficiency by 60%",
                  "Reduced token usage per prompt from 70-100 to 18-25 via Telugu script vs. transliterated text analysis",
                  "Enhanced response speed and computational efficiency using transliteration-based preprocessing",
                  "Published insights in ICIIRS-23, addressing multilingual challenges in AI text generation models",
                ]}
                skills={[
                  "Python",
                  "Natural Language Processing (NLP)",
                  "Optimization Algorithms",
                  "TensorFlow",
                  "PyTorch",
                  "Data Preprocessing",
                ]}
                image="/images/kakatiya-university.jpeg"
                paperLink="http://proceeding.conferenceworld.in/ICIIRS-2023/10.pdf"
              />

              <TimelineItem
                position="left"
                title="Machine Learning Research Intern"
                project="Fraud Detection in Automobile Insurance Claims using Machine Learning Algorithms"
                company="Kakatiya Institute of Technology and Science"
                companyLink="https://www.kitsw.ac.in/"
                location="Warangal, India"
                period="Mar 2023 – Jul 2023"
                description="Engineered ML pipeline for fraud detection achieving 78% accuracy and 81% AUC using ensemble methods. Implemented data balancing and feature engineering techniques to optimize model performance on imbalanced datasets."
                achievements={[
                  "Developed ML models (RF, KNN, DT, SVM) for fraud detection, selecting Random Forest (78% accuracy, 81% AUC) as the optimal model",
                  "Conducted extensive evaluation despite data imbalance, demonstrating RF's superior performance over other models",
                  "Published findings in ICIIRS-23, showcasing ML's impact on real-world insurance fraud detection",
                ]}
                skills={[
                  "Machine Learning",
                  "Scikit-learn",
                  "Random Forest",
                  "Data Analysis",
                  "Model Evaluation",
                  "Python",
                ]}
                image="/images/kakatiya-university.jpeg"
                paperLink="http://proceeding.conferenceworld.in/ICIIRS-2023/13.pdf"
              />

              <TimelineItem
                position="right"
                title="Data Science Intern"
                company="3 CORTEX Technologies"
                companyLink="#"
                location="Hyderabad, India"
                period="Jun 2022 – Jul 2022"
                description="Applied innovative AI optimization techniques to solve complex challenges, improving project outcomes by 75%. Created interactive data visualizations to communicate insights and enhance cross-functional collaboration."
                achievements={[
                  "Applied inventive thinking techniques to tackle AI and ML challenges, boosting project outcomes by 75%",
                  "Created robust visualizations tailored to specific challenge statements, improving clarity and fostering teamwork",
                  "Developed optimized code solutions for AI and ML applications, achieving a 60% efficiency increase",
                ]}
                skills={["AI Optimization", "Data Visualization", "Pandas", "Matplotlib", "Seaborn", "NumPy", "Python"]}
                image="/images/experience-3.webp"
              />

              <TimelineItem
                position="left"
                title="Computer Vision Research Intern"
                project="A Quantitative Analysis of Basic vs. Deep Learning-based Image Data Augmentation Techniques"
                company="Kakatiya Institute of Technology and Science"
                companyLink="https://www.kitsw.ac.in/"
                location="Warangal, India"
                period="Jan 2021 – Aug 2021"
                description="Conducted research on deep learning-based image augmentation techniques, achieving 98.57% accuracy on MNIST dataset. Implemented and evaluated various data augmentation strategies to improve model robustness and generalization."
                achievements={[
                  "Conducted a quantitative analysis of basic vs. deep learning-based image data augmentation techniques on the MNIST dataset",
                  "Achieved a highest accuracy of 98.57% and loss value of 0.301 using brightness adjustment",
                  "Evaluated computational burden, storage requirements, and performance to recommend cost-effective augmentation strategies",
                  "Published findings in IEEE ICSES 2021, contributing to enhanced robustness in deep learning pipelines",
                ]}
                skills={[
                  "Computer Vision",
                  "Deep Learning",
                  "TensorFlow",
                  "Image Augmentation",
                  "Model Optimization",
                  "Python",
                ]}
                image="/images/kakatiya-university.jpeg"
                paperLink="https://ieeexplore.ieee.org/abstract/document/9633781"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Technical Expertise section removed per request */}

      {/* Academic Background section removed per request */}

      {/* Certifications */}
      <section className="section bg-black border-t border-gray-800">
        <div className="container-xl">
          <div className="text-center mb-16">
            <div className="inline-block text-sm font-medium text-purple-400 mb-4 px-3 py-1 bg-purple-400/10 rounded-full">
              Certifications
            </div>
            <h2 className="headline">Professional Development</h2>
            <p className="subheadline mx-auto">Continuous learning and skill enhancement</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <CertificationCard
              title="AWS Certified Solutions Architect – Associate"
              issuer="Amazon Web Services"
              date="2025"
              description="Validated ability to design, secure, and deploy scalable systems on AWS."
              skills={["AWS", "Architecture", "VPC", "High Availability"]}
              link="https://drive.google.com/file/d/1qRgiNeaEOtfzyKwCMOlnZ7EbmpoXj8Lz/view"
            />
            <CertificationCard
              title="AWS Machine Learning – Associate"
              issuer="Amazon Web Services"
              date="2025"
              description="Built, trained, and deployed ML solutions using core AWS ML services."
              skills={["AWS", "SageMaker", "Feature Engineering", "Model Deployment"]}
              link="https://drive.google.com/file/d/1qRgiNeaEOtfzyKwCMOlnZ7EbmpoXj8Lz/view"
            />
            <CertificationCard
              title="GenAI Job Simulation"
              issuer="Forage"
              date="2025"
              description="Completed hands-on generative AI tasks: prompt design, evaluation, and deployment."
              skills={["Generative AI", "Prompt Engineering", "Evaluation", "LLMs"]}
              link="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/SKZxezskWgmFjRvj9/gabev3vXhuACr48eb_SKZxezskWgmFjRvj9_crtzjBY4Pjs2TsLMm_1751672999802_completion_certificate.pdf"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section gradient-bg">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="headline">Let's Connect</h2>
            <p className="subheadline mx-auto mb-10">
              Interested in discussing potential opportunities or collaborations?
            </p>
            <Link href="mailto:swethaganta0408@gmail.com" className="button-primary">
              Get in Touch
            </Link>
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
              <Link href="/about" className="text-sm text-gray-400 hover:text-white transition-colors">
                About
              </Link>
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
                href="https://linkedin.com/in/swetha-reddy-ganta"
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

function TimelineItem({
  position,
  title,
  project,
  company,
  companyLink,
  location,
  period,
  description,
  achievements,
  skills,
  image,
  paperLink,
  projectLinks,
}) {
  return (
    <div className={`relative flex items-start ${position === "right" ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* Timeline dot */}
      <div className="absolute left-0 md:left-1/2 top-0 w-5 h-5 bg-purple-500 rounded-full transform md:translate-x-[-50%] translate-y-[10px]"></div>

      {/* Content */}
      <div className={`w-full md:w-1/2 ${position === "right" ? "md:pl-16 pl-8" : "md:pr-16 pl-8"}`}>
        <div className="card overflow-hidden">
          <div className="relative h-48 overflow-hidden bg-white">
            <img src={image || "/placeholder.svg"} alt={company} className="w-full h-full object-contain" />
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
              <div>
                <h3 className="text-xl font-medium mb-1">{title}</h3>
                {project && <p className="text-purple-400 text-sm mb-1">{project}</p>}
                <Link
                  href={companyLink}
                  target="_blank"
                  className="text-blue-400 text-sm mb-1 hover:text-blue-300 transition-colors"
                >
                  {company}
                </Link>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center text-sm text-gray-400 mb-1">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{period}</span>
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span>{location}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-6 whitespace-pre-line">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {skills.map((skill, index) => (
                <span key={index} className="text-xs px-2 py-1 bg-gray-800 rounded-md">
                  {skill}
                </span>
              ))}
            </div>
            {projectLinks && projectLinks.length > 0 && (
              <div className="flex flex-wrap gap-3 mb-4">
                {projectLinks.map((p, idx) => (
                  <Link
                    key={idx}
                    href={p.href}
                    target="_blank"
                    rel="noreferrer"
                    className="button-secondary inline-flex items-center"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    {p.label}
                  </Link>
                ))}
              </div>
            )}
            {paperLink && (
              <Link
                href={paperLink}
                className="inline-flex items-center text-sm text-white hover:text-purple-400 transition-colors"
                target="_blank"
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                View Research Paper
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function SkillCard({ category, skills }) {
  return (
    <div className="card p-6 h-full">
      <h3 className="text-xl font-medium mb-6">{category}</h3>
      <div className="space-y-4">
        {skills.map((skill, index) => (
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

function EducationCard({ institution, degree, specialization, period, location, description, courses, image, link }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-1">
        <div className="card overflow-hidden">
          <img src={image || "/placeholder.svg"} alt={institution} className="w-full h-48 object-cover" />
        </div>
      </div>
      <div className="lg:col-span-2">
        <div className="card p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
            <div>
              <Link href={link} target="_blank" className="hover:text-purple-400 transition-colors">
                <h3 className="text-xl font-medium mb-1">{institution}</h3>
              </Link>
              <p className="text-purple-400 text-sm mb-1">{degree}</p>
              <p className="text-blue-400 text-sm">{specialization}</p>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center text-sm text-gray-400 mb-1">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{period}</span>
              </div>
              <div className="flex items-center text-sm text-gray-400">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{location}</span>
              </div>
            </div>
          </div>
          <p className="text-gray-300 text-sm mb-6">{description}</p>
          <h4 className="text-lg font-medium mb-3">Key Courses</h4>
          <div className="flex flex-wrap gap-2">
            {courses.map((course, index) => (
              <span key={index} className="text-xs px-2 py-1 bg-gray-800 rounded-md">
                {course}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function CertificationCard({ title, issuer, date, description, skills, link }) {
  return (
    <div className="card p-6 h-full flex flex-col">
      <div className="mb-auto">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center text-sm text-gray-400">
            <Award className="h-4 w-4 mr-2" />
            <span>{date}</span>
          </div>
        </div>
        <h3 className="text-xl font-medium mb-1">{title}</h3>
        <p className="text-purple-400 text-sm mb-4">{issuer}</p>
        <p className="text-gray-300 text-sm mb-6">{description}</p>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span key={index} className="text-xs px-2 py-1 bg-gray-800 rounded-md">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <Link
        href={link}
        className="inline-flex items-center text-sm text-white hover:text-purple-400 transition-colors mt-4"
        target="_blank"
      >
        <ExternalLink className="mr-2 h-4 w-4" />
        View Certificate
      </Link>
    </div>
  )
}

