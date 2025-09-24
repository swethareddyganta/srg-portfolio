import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import ProjectCard from "@/components/project-card"
import ProjectDetailCard from "@/components/project-detail-card"

export default function Projects() {
  return (
    <main className="min-h-screen bg-black text-white pt-24">
      {/* Header */}
      <section className="section pt-8 pb-6">
        <div className="container-xl">
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
          <div className="max-w-4xl mb-4">
            <div className="inline-block text-sm font-medium text-purple-400 mb-4 px-3 py-1 bg-purple-400/10 rounded-full">
              Projects
            </div>
            <h1 className="headline">
              <span className="gradient-text">My Projects</span>
            </h1>
            <p className="subheadline">
              Exploring the intersection of AI, Machine Learning, and real-world applications
            </p>
          </div>
        </div>
      </section>

      {/* Projects Categories */}
      <section className="section pt-0 mt-[-1rem]">
        <div className="container-xl">
          {/* All Projects */}
          <div>
            <h2 className="text-2xl font-medium mb-8">Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProjectCard
                title="PlanLingo : AI-powered productivity platform"
                subtitle="Duolingo taught you to speak languages. PlanLingo teaches you to speak productivity."
                description="Transforms vague daily intentions into optimized schedules with reminders, rich visualizations, and weekly reports."
                image="/images/Planlingo_app.png"
                tags={["Next.js", "Vite", "FastAPI", "Python", "GroqAPI", "AI"]}
                year="2025"
                githubLink="https://github.com/swethareddyganta/PlanLingo"
                appLink="https://planlingo.swethareddyganta.com"
              />
              <ProjectCard
                title="LLM RedHat Toolkit"
                subtitle="Enterprise-Grade LLM Deployment Platform"
                description="Built an LLM-based interactive platform integrating LangChain with enterprise data sources and custom RAG pipelines. Deployed LLM inference with Streamlit UI and Docker containers for scalable and modular access to fine-tuned models."
                image="/images/project-5.png"
                tags={["Large Language Models", "LangChain", "Streamlit", "Docker", "Model Inference", "RAG"]}
                year="2024"
                githubLink="https://github.com/swethareddyganta/LLM_Redhat_Toolkit"
              />
              <ProjectCard
                title="Intelli-Chat"
                subtitle="AI-Powered Conversational System"
                description="Deployed an AI chatbot on GCP processing 60,000+ documents with hybrid retrieval-augmented generation approach."
                image="/images/project-1.png"
                tags={["NLP", "LLMs", "OpenAI API"]}
                year="2023"
                githubLink="https://github.com/swethareddyganta/intelli-chat"
              />
              <ProjectCard
                title="Multi-Language Translation System"
                subtitle="Neural Machine Translation"
                description="Built production-ready neural translation system supporting 5+ language pairs with 85% BLEU score using sequence-to-sequence architecture."
                image="/images/project-3.png"
                tags={["Seq2Seq", "LSTM", "Attention Mechanism"]}
                year="2022"
                githubLink="https://github.com/swethareddyganta/Language-Translation"
              />
              <ProjectCard
                title="Tokenization Challenges in Multilingual GPT"
                subtitle="NLP Research & Implementation"
                description="Researched and implemented optimized tokenization for multilingual language models, improving efficiency by 60% for non-English languages."
                image="/images/project-2.png"
                tags={["NLP", "Multilingual", "GPT"]}
                year="2023"
                githubLink="https://github.com/swethareddyganta/teluguGPT"
                paperLink="http://proceeding.conferenceworld.in/ICIIRS-2023/10.pdf"
              />
              <ProjectCard
                title="Meme Persuasion Detection"
                subtitle="Multimodal Content Analysis"
                description="Developed multimodal classification system for detecting persuasion techniques in internet memes with 78% accuracy using BERT and ResNet-50."
                image="/images/project-4.png"
                tags={["Multimodal ML", "Computer Vision", "NLP"]}
                year="2023"
                githubLink="https://github.com/swethareddyganta/MemePersuasionDetection"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Research Projects */}
      <section className="section bg-black border-t border-gray-800">
        <div className="container-xl">
          <div className="text-center mb-16">
            <div className="inline-block text-sm font-medium text-purple-400 mb-4 px-3 py-1 bg-purple-400/10 rounded-full">
              Research
            </div>
            <h2 className="headline">Research Projects</h2>
            <p className="subheadline mx-auto">Published academic research in AI and machine learning</p>
          </div>
          <div className="space-y-12">
            <ProjectDetailCard
              title="Tokenization Challenges in Multilingual GPT"
              subtitle="Guide: Prof. Rohini Srihari"
              description="Optimized tokenization in multilingual language models, improving efficiency by 60% for non-English languages. Developed language-specific preprocessing pipelines, reducing token usage per prompt from 70-100 to 18-25. Conducted comparative analysis between native script and transliterated text, demonstrating significant computational advantages. Created a specialized preprocessing framework for Telugu language that can be extended to other Indic languages, enhancing the accessibility of large language models for non-English users."
              image="/images/researchpaper3.png"
              tags={["Python", "NLP", "GPT", "Tokenization", "Multilingual", "Preprocessing"]}
              year="2023"
              githubLink="https://github.com/swethareddyganta/teluguGPT"
              paperLink="http://proceeding.conferenceworld.in/ICIIRS-2023/10.pdf"
            />
            <ProjectDetailCard
              title="Fraud Detection in Automobile Insurance Claims using Machine Learning Algorithms"
              subtitle="Guide: Prof. Nasrin Akhter"
              description="Engineered ML pipeline for fraud detection achieving 78% accuracy and 81% AUC using ensemble methods. Implemented data balancing and feature engineering techniques to optimize model performance on imbalanced datasets. Developed ML models (RF, KNN, DT, SVM) for fraud detection, selecting Random Forest as optimal. Conducted extensive evaluation despite data imbalance, demonstrating RF's superior performance over other models."
              image="/images/researchpaper2.png"
              tags={["Machine Learning", "Random Forest", "Data Analysis", "Model Evaluation", "Python"]}
              year="2023"
              githubLink="#"
              paperLink="http://proceeding.conferenceworld.in/ICIIRS-2023/13.pdf"
            />
            <ProjectDetailCard
              title="A Quantitative Analysis of Basic vs. Deep Learning-based Image Data Augmentation Techniques"
              subtitle="Guide: Prof. Rohini Srihari"
              description="Conducted research on deep learning-based image augmentation techniques, achieving 98.57% accuracy on MNIST dataset. Implemented and evaluated various data augmentation strategies to improve model robustness and generalization. Evaluated computational burden, storage requirements, and performance to recommend cost-effective augmentation strategies. Published findings in IEEE ICSES 2021, contributing to enhanced robustness in deep learning pipelines."
              image="/images/researchpaper1.png"
              tags={["Computer Vision", "Deep Learning", "TensorFlow", "Image Augmentation", "Model Optimization"]}
              year="2021"
              githubLink="#"
              paperLink="https://ieeexplore.ieee.org/abstract/document/9633781"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section gradient-bg">
        <div className="container-xl">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="headline">Interested in Collaboration?</h2>
            <p className="subheadline mx-auto mb-10">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
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
              <Link href="https://drive.google.com/file/d/1qZ_U4K6AH6iNzQaJJyUxeqkA3mZ9mPOR/view?usp=drive_link" className="text-sm text-gray-400 hover:text-white transition-colors" target="_blank">
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

