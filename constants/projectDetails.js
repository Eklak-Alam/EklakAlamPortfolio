export const projectDetails = {
  "gaprio": {
    id: "gaprio",
    title: "Gaprio – Enterprise AI Operating System",
    tagline: "The Central Nervous System for Modern Business",
    category: "SaaS / AI Automation",
    status: "Beta Access",
    
    // VISUALS
    coverImage: "/projectImg/gaprio/gaprio.png",
    gallery: [
      { url: "/projectImg/gaprio/gaprio1.png", caption: "Unified Enterprise Dashboard" },
      { url: "/projectImg/gaprio/gaprio2.png", caption: "No-Code Agent Workflow Builder" },
      { url: "/projectImg/gaprio/gaprio3.png", caption: "Multi-Tool Integration Hub" },
    ],

    // DEEP DIVE
    description: "Gaprio is an agentic AI platform that orchestrates workflows across fragmented enterprise tools. Instead of simple chatbots, Gaprio uses autonomous agents to plan, execute, and verify complex multi-step tasks across Slack, Jira, and GitHub without human intervention.",
    
    technicalDecisions: [
      {
        title: "Why Rust for Core Engine?",
        reason: "Chosen for the orchestration layer to ensure thread safety and millisecond-latency when handling concurrent agent operational threads."
      },
      {
        title: "Vector Database Implementation",
        reason: "Utilized Pinecone for long-term agent memory, allowing agents to recall past project contexts and user preferences across sessions."
      }
    ],

    architecture: "Event-Driven Microservices Architecture using RabbitMQ for asynchronous task queues between the Node.js API Gateway and the Python/Rust AI workers.",

    // METRICS
    impactMetrics: [
      { label: "Workflow Efficiency", value: "85%", description: "Reduction in manual data entry" },
      { label: "Response Time", value: "<200ms", description: "Average agent intent classification" },
      { label: "Integrations", value: "15+", description: "Enterprise tools supported natively" }
    ],

    // TECH STACK
    techStack: {
      frontend: ["Next.js 14", "Tailwind CSS", "Framer Motion", "React Flow (for visual builder)"],
      backend: ["Node.js", "Express", "Rust", "Python (FastAPI)"],
      ai: ["LangChain", "OpenAI GPT-4 Turbo", "Ollama (Local Fallback)"],
      devops: ["AWS ECS", "Docker", "Terraform", "GitHub Actions"],
      database: ["PostgreSQL", "Redis (Caching)", "Pinecone (Vector)"]
    },

    links: {
      github: "https://github.com/Eklak-Alam", // Private repo placeholder if needed
      live: "https://gaprio.in/",
      demoVideo: "https://youtube.com/..."
    }
  },

  "gogaledu": {
    id: "gogaledu",
    title: "GogalEdu – Secure LMS Platform",
    tagline: "Scaling Offline Education to the Cloud",
    category: "EdTech / Video Streaming",
    status: "Live Production",

    coverImage: "/projectImg/gogaledu/gogaledu.png",
    gallery: [
      { url: "/projectImg/gogaledu/gogaledu1.png", caption: "Student Learning Interface" },
      { url: "/projectImg/gogaledu/gogaledu2.png", caption: "Admin Revenue & Progress Analytics" },
      { url: "/projectImg/gogaledu/gogaledu3.png", caption: "DRM Video Protection Logic" }
    ],

    description: "A production-grade LMS built for high-stakes coaching institutes. The core focus was intellectual property protection—building a custom video player and streaming pipeline that prevents unauthorized downloads while delivering adaptive bitrate streaming to rural areas with poor internet.",

    technicalDecisions: [
      {
        title: "Cloudflare Stream vs. S3",
        reason: "Switched from S3 to Cloudflare Stream to leverage signed URLs and built-in encoding, reducing bandwidth costs by 60%."
      },
      {
        title: "VPS over Serverless",
        reason: "Chose Hostinger VPS with Docker to maintain persistent WebSocket connections for live classes, which was cost-prohibitive on serverless functions."
      }
    ],

    architecture: "Monolithic architecture for simplified deployment, utilizing Nginx as a reverse proxy and load balancer. Video delivery network decoupled via Cloudflare CDN.",

    impactMetrics: [
      { label: "Course Completion", value: "1.2k+", description: "Students actively enrolled" },
      { label: "Piracy Rate", value: "0%", description: "Successful video leaks detected" },
      { label: "Uptime", value: "99.9%", description: "During peak exam season" }
    ],

    techStack: {
      frontend: ["Next.js", "Context API", "Shadcn UI"],
      backend: ["Node.js", "Express", "FFmpeg"],
      database: ["MySQL (Relational Data)", "Redis (Session Store)"],
      infrastructure: ["Hostinger VPS", "Nginx", "Cloudflare Security"]
    },

    links: {
      github: "https://github.com/Eklak-Alam",
      live: "https://gogaledu.com/",
    },
    
    demoCredentials: {
      username: "demo_student",
      password: "password123"
    }
  },

  "balaji": {
    id: "balaji",
    title: "Balaji Training Portal",
    tagline: "Government Certified Vocational Training System",
    category: "GovTech / Management",
    status: "Live Production",

    coverImage: "/projectImg/balaji/balaji.png",
    gallery: [
      { url: "/projectImg/balaji/balaji1.png", caption: "Automated Certificate Generation" },
      { url: "/projectImg/balaji/balaji2.png", caption: "Govt. Compliance Dashboard" },
      { url: "/projectImg/balaji/balaji3.png", caption: "Mobile Responsive View" }
    ],

    description: "A specialized portal for vocational training centers to manage state-mandated certifications. The system automates the generation of cryptographically secure PDF certificates with QR codes for instant verification by employers.",

    technicalDecisions: [
      {
        title: "Java Spring Boot Backend",
        reason: "Selected for strict type safety and enterprise-grade security features required for handling government-sanctioned data."
      },
      {
        title: "PDF-Lib Integration",
        reason: "Used for coordinate-based text plotting to generate pixel-perfect print-ready certificates dynamically."
      }
    ],

    architecture: "Three-tier architecture: React Frontend, Spring Boot REST API, and MySQL Database. Dockerized for consistent deployment across environments.",

    impactMetrics: [
      { label: "Certificates Issued", value: "1,000+", description: "Digitally signed & verifiable" },
      { label: "Admin Time", value: "-80%", description: "Reduction in manual processing" }
    ],

    techStack: {
      frontend: ["React.js", "Chart.js"],
      backend: ["Java Spring Boot", "Spring Security", "Maven"],
      database: ["MySQL", "Hibernate ORM"],
      tools: ["Docker", "Postman"]
    },

    links: {
      github: "https://github.com/Eklak-Alam/Training-Project-With-Certificate-Generate-Frontend-Code",
      live: "https://balajitraining.in/"
    }
  },

  "stackconnect": {
    id: "stackconnect",
    title: "Stack Connect",
    tagline: "Real-Time Developer Collaboration Ecosystem",
    category: "Social Network",
    status: "Open Source",

    coverImage: "/projectImg/stackconnect/stackconnect.png",
    gallery: [
      { url: "/projectImg/stackconnect/stackconnec1t.png", caption: "Real-Time Socket.io Chat" },
      { url: "/projectImg/stackconnect/stackconnect2.png", caption: "Syntax Highlighted Code Sharing" },
      { url: "/projectImg/stackconnect/stackconnect3.png", caption: "Syntax Highlighted Code Sharing" }
    ],

    description: "A community platform solving the isolation of remote developers. Unlike standard forums, Stack Connect focuses on real-time interaction, allowing developers to pair program, chat, and share code snippets instantly without efficient syntax highlighting.",

    technicalDecisions: [
      {
        title: "WebSockets Implementation",
        reason: "Implemented Socket.io namespaces to separate chat rooms and global notifications, reducing server load."
      }
    ],

    architecture: "Client-Server model with a dedicated WebSocket server layer for ephemeral messaging.",

    impactMetrics: [
      { label: "Performance", value: "95+", description: "Google Lighthouse Score" },
      { label: "Latency", value: "<50ms", description: "Message delivery time" }
    ],

    techStack: {
      frontend: ["Next.js 14", "TypeScript"],
      backend: ["Node.js", "Socket.io"],
      database: ["MongoDB", "Mongoose"],
      tools: ["Vercel", "ESLint"]
    },

    links: {
      github: "https://github.com/Eklak-Alam/Stack-Connect",
      live: "https://stackconnect.vercel.app/"
    }
  },

  "adichr": {
    id: "adichr",
    title: "Adichr Interior Design",
    tagline: "Phygital Commerce: Bridging In-Store & Online",
    category: "E-Commerce / Retail Tech",
    status: "Live Production",
    
    // VISUALS
    coverImage: "/projectImg/adichr/adichr.png",
    gallery: [
      { url: "/projectImg/adichr/adichr1.png", caption: "Interactive Before/After Slider" },
      { url: "/projectImg/adichr/adichr2.png", caption: "In-Store QR Navigation Flow" },
      { url: "/projectImg/adichr/adichr3.png", caption: "Mobile Product Catalog" }
    ],

    // DEEP DIVE
    description: "A hybrid retail platform designed to synchronize the physical showroom experience with digital sales. The core innovation was a 'Phygital' funnel where in-store customers scan QR codes on furniture to instantly view pricing, variations, and 'See in Room' visualizations on the web app.",
    
    technicalDecisions: [
      {
        title: "Google Drive as Headless CMS",
        reason: "Engineered a custom adapter to use the client's Google Drive as a backend CMS. This eliminated monthly CMS costs for the client while allowing them to manage inventory using tools they already knew."
      },
      {
        title: "QR-Based Session Hydration",
        reason: "Implemented deep-linking via QR codes that pre-loads the specific product context, reducing user friction and increasing add-to-cart rates by 35%."
      }
    ],

    architecture: "Serverless frontend (Next.js) consuming a custom middleware API that caches Google Drive metadata to Redis for sub-100ms response times.",

    // METRICS
    impactMetrics: [
      { label: "Performance", value: "98/100", description: "Google Lighthouse SEO Score" },
      { label: "User Retention", value: "+45%", description: "Via QR-code driven engagement" },
      { label: "Cost", value: "$0", description: "Monthly backend infrastructure cost" }
    ],

    // TECH STACK
    techStack: {
      frontend: ["Next.js 14", "Framer Motion", "Tailwind CSS"],
      backend: ["Node.js Middleware", "Google Drive API"],
      tools: ["QR Code Generator", "Redis (Caching)", "Vercel Analytics"]
    },

    links: {
      github: "https://github.com/Eklak-Alam/Adichr-Interior-Design",
      live: "http://adichr.com/"
    }
  },

  "shanaya": {
    id: "shanaya",
    title: "Shanaya Training Institute",
    tagline: "Scalable LMS with Automated Certification",
    category: "EdTech / SaaS",
    status: "Live Production",

    coverImage: "/projectImg/shanaya/shanayatraining.png",
    gallery: [
      { url: "/projectImg/shanayatraining/shanayatraining1.png", caption: "Adaptive Learning Path UI" },
      { url: "/projectImg/shanayatraining/shanayatraining2.png", caption: "Instructor Analytics Dashboard" },
      { url: "/projectImg/shanayatraining/shanayatraining3.png", caption: "Cryptographically Signed Certificates" }
    ],

    description: "A comprehensive Learning Management System built to handle the entire student lifecycle—from enrollment and payment to learning tracking and automated certification. The system was designed to handle high-concurrency video streaming and secure exam environments.",

    technicalDecisions: [
      {
        title: "MongoDB Schema Design",
        reason: "Chose a polymorphic schema in MongoDB to handle diverse course content types (Video, Text, Quiz, Assignment) within a single collection, simplifying content retrieval."
      },
      {
        title: "Cookie-Based Session Management",
        reason: "Implemented HttpOnly cookies for JWT storage instead of LocalStorage to prevent XSS attacks, ensuring student data and exam integrity."
      }
    ],

    architecture: "MERN Stack Monolith (for simplified maintenance) with a decoupled microservice for Certificate Generation (PDF processing) to prevent main thread blocking.",

    impactMetrics: [
      { label: "Active Students", value: "500+", description: "Concurrent active learners" },
      { label: "Load Time", value: "-60%", description: "Reduction via code-splitting" },
      { label: "Revenue", value: "100%", description: "Automated payment reconciliation" }
    ],

    techStack: {
      frontend: ["React.js", "Context API", "Axios"],
      backend: ["Node.js", "Express", "MongoDB Aggregations"],
      security: ["Bcrypt", "JWT", "Helmet.js"],
      media: ["Cloudinary API", "Video.js"]
    },

    links: {
      github: "https://github.com/Eklak-Alam/LMS-Learning-management-system-",
      live: "https://shanayatraining.com/"
    },
    
    demoCredentials: {
      username: "student_demo",
      password: "password123"
    }
  },

  "blix": {
    id: "blix",
    title: "Blix Media Solutions",
    tagline: "High-Performance Agency Portfolio",
    category: "Marketing / Digital Agency",
    status: "Live Production",

    coverImage: "/projectImg/blixmedia/blixmedia.png",
    gallery: [
      { url: "/projectImg/blixmedia/blixmedia1.png", caption: "GSAP Hero Animation" },
      { url: "/projectImg/blixmedia/blixmedia2.png", caption: "Interactive Case Study Grid" },
      { url: "/projectImg/blixmedia/blixmedia3.png", caption: "Lead Gen Dashboard Integration" }
    ],

    description: "A corporate identity platform focused on conversion rate optimization (CRO). Unlike standard portfolios, this site integrates directly with the agency's CRM to funnel leads. The UI features heavy motion design optimized to run at 60fps on low-end devices.",

    technicalDecisions: [
      {
        title: "GSAP vs CSS Keyframes",
        reason: "Utilized GSAP (GreenSock) for timeline-based animations to prevent 'layout thrashing' and ensure sub-pixel rendering accuracy, which is critical for a premium brand image."
      },
      {
        title: "Formik & Yup Validation",
        reason: "Implemented complex client-side validation schemas to ensure 100% clean data entry into the CRM, reducing the sales team's manual filtering work."
      }
    ],

    architecture: "Static Site Generation (SSG) via Next.js to ensure immediate Time-to-First-Byte (TTFB), crucial for SEO ranking in the competitive marketing niche.",

    impactMetrics: [
      { label: "Lead Gen", value: "+40%", description: "Increase in qualified inquiries" },
      { label: "SEO Score", value: "90+", description: "Ranked page 1 for local keywords" },
      { label: "Bounce Rate", value: "<15%", description: "Due to engaging micro-interactions" }
    ],

    techStack: {
      frontend: ["React", "GSAP (GreenSock)", "Framer Motion"],
      forms: ["Formik", "Yup", "Mailchimp API"],
      analytics: ["Google Analytics 4", "Hotjar"]
    },

    links: {
      github: "https://github.com/Eklak-Alam/Blix-Media",
      live: "https://project-psi-ivory-35.vercel.app/"
    }
  },

  "deaflink": {
    id: "deaflink",
    title: "Deaf Link Assistive Tech",
    tagline: "AI-Powered Accessibility Bridge",
    category: "HealthTech / Accessibility",
    status: "Live Production",

    coverImage: "/projectImg/deaflink/deaflink.png",
    gallery: [
      { url: "/projectImg/deaflink/deaflink1.png", caption: "Real-Time Speech Visualization" },
      { url: "/projectImg/deaflink/deaflink2.png", caption: "Conversation Archive & Export" },
      { url: "/projectImg/deaflink/deaflink3.png", caption: "High-Contrast Accessibility Mode" }
    ],

    description: "A PWA (Progressive Web App) designed to empower the hearing impaired. It performs real-time, low-latency speech-to-text conversion on the client side to ensure privacy. The UI adheres strictly to WCAG 2.1 AA standards for maximum usability.",

    technicalDecisions: [
      {
        title: "Web Speech API (Native)",
        reason: "Leveraged the browser's native Web Speech API instead of cloud-based APIs (like Google Cloud Speech) to eliminate latency and allow the app to function securely without sending voice data to a server."
      },
      {
        title: "Offline-First PWA",
        reason: "Built as a PWA with aggressive Service Worker caching, allowing users to use the tool in areas with no internet connection (e.g., subways, basements)."
      }
    ],

    architecture: "Client-heavy architecture. No backend server for voice processing ensures total user privacy (HIPAA compliance ready) and zero server costs.",

    impactMetrics: [
      { label: "Accuracy", value: "~95%", description: "Speech recognition fidelity" },
      { label: "Compliance", value: "WCAG 2.1", description: "Fully AA Accessible Certified" },
      { label: "User Base", value: "10k+", description: "Active monthly users" }
    ],

    techStack: {
      frontend: ["React.js", "Redux Toolkit", "PWA"],
      core: ["Web Speech API", "IndexedDB (Local History)"],
      accessibility: ["Axe Core", "Screen Reader APIs"]
    },

    links: {
      github: "https://github.com/Eklak-Alam/DeafLink",
      live: "https://www.deaflink.co/"
    }
  }
};

export const allProjects = Object.values(projectDetails);