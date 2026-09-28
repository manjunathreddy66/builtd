// Curated skills, reserved usernames, and pre-seeded student portfolios

export const RESERVED_USERNAMES = [
  'admin',
  'api',
  'login',
  'signup',
  'dashboard',
  'settings',
  'about',
  'contact',
  'portfolio',
  'assets',
  'static',
  'support',
  'help',
  'explore',
  'terms',
  'privacy',
  'editor',
  'onboarding'
];

export const SUGGESTED_SKILLS = {
  Programming: ['C', 'C++', 'Java', 'Python', 'JavaScript', 'TypeScript', 'Go', 'Rust'],
  Web: ['HTML', 'CSS', 'React', 'Node.js', 'Next.js', 'Express', 'Firebase', 'Tailwind CSS', 'REST APIs', 'PostgreSQL'],
  Design: ['Figma', 'Photoshop', 'Illustrator', 'UI/UX Design', 'Wireframing'],
  Tools: ['Git', 'GitHub', 'VS Code', 'Docker', 'Linux', 'Postman', 'Vercel']
};

export const INITIAL_STUDENT_PORTFOLIOS = {
  manjunath: {
    uid: 'demo-manjunath',
    username: 'manjunath',
    published: true,
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-03-20T14:30:00Z',
    profile: {
      name: 'Manjunath Reddy',
      headline: 'Computer Science Student & Full-Stack Builder',
      bio: 'Engineering student passionate about building scalable web applications, distributed systems, and intuitive user experiences. Active open-source contributor and hackathon enthusiast.',
      location: 'Hyderabad, India',
      profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      email: 'manjunath@example.com'
    },
    education: [
      {
        id: 'edu-1',
        degree: 'B.Tech',
        branch: 'Computer Science and Engineering',
        college: 'XYZ Institute of Technology',
        university: 'JNTU',
        startYear: '2023',
        endYear: '2027',
        cgpa: '9.2 / 10'
      }
    ],
    skills: [
      'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'C++', 
      'Firebase', 'PostgreSQL', 'Git', 'GitHub', 'Docker', 'Figma'
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'DevSync — Realtime Pair Programming Workspace',
        description: 'A collaborative code editor with real-time cursor tracking, syntax highlighting for 12+ languages, and WebRTC audio chat for student study groups.',
        technologies: ['React', 'Node.js', 'WebSockets', 'WebRTC', 'Monaco Editor'],
        githubUrl: 'https://github.com/example/devsync',
        liveUrl: 'https://devsync-demo.vercel.app',
        learned: 'Implemented operational transformation algorithms for conflict-free concurrent editing.',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'proj-2',
        name: 'CampusPulse — Automated Campus Event Discovery',
        description: 'Mobile-responsive event curation and ticket reservation platform serving 4,500+ college students across 15 campus clubs.',
        technologies: ['React', 'Firebase', 'Tailwind CSS', 'Stripe'],
        githubUrl: 'https://github.com/example/campuspulse',
        liveUrl: 'https://campuspulse-demo.vercel.app',
        learned: 'Designed normalized Firestore document relationships with robust index queries.',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'proj-3',
        name: 'Algolympics — Competitive Programming Tracker',
        description: 'Aggregates contest ratings and upcoming events from LeetCode, Codeforces, and CodeChef into an analytics dashboard with milestone streaks.',
        technologies: ['TypeScript', 'Next.js', 'Chart.js', 'GraphQL'],
        githubUrl: 'https://github.com/example/algolympics',
        liveUrl: 'https://algolympics.vercel.app',
        learned: 'Handled rate-limiting and asynchronous caching pipelines across public APIs.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80'
      }
    ],
    experience: [
      {
        id: 'exp-1',
        role: 'Frontend Engineering Intern',
        organization: 'KiteScale Technologies',
        type: 'Internship',
        startDate: 'May 2025',
        endDate: 'Aug 2025',
        description: 'Refactored customer onboarding funnel into modular React components, boosting mobile conversion by 28%. Wrote 40+ unit tests.'
      },
      {
        id: 'exp-2',
        role: 'Technical Lead',
        organization: 'ACM Student Chapter',
        type: 'College Club',
        startDate: 'Aug 2024',
        endDate: 'Present',
        description: 'Organized 3 hackathons with 600+ participants. Conducted weekend workshops on modern web architecture and Git workflows.'
      }
    ],
    achievements: [
      {
        id: 'ach-1',
        title: 'Winner — Smart India Hackathon (College Round)',
        organization: 'Ministry of Education',
        year: '2025',
        description: 'Built an AI-driven localized crop advisory platform for regional agricultural cooperatives.',
        credentialUrl: 'https://example.com/sih-cert'
      },
      {
        id: 'ach-2',
        title: 'Top 1% Global Rating (Knight)',
        organization: 'LeetCode',
        year: '2025',
        description: 'Solved 650+ algorithmic data structure problems and achieved peak contest rating of 2150+.',
        credentialUrl: 'https://leetcode.com'
      }
    ],
    certifications: [
      {
        id: 'cert-1',
        title: 'AWS Certified Cloud Practitioner',
        organization: 'Amazon Web Services',
        year: '2025',
        credentialUrl: 'https://aws.amazon.com/certification'
      }
    ],
    links: {
      github: 'https://github.com/manjunath',
      linkedin: 'https://linkedin.com/in/manjunath',
      leetcode: 'https://leetcode.com/u/manjunath',
      codeforces: 'https://codeforces.com/profile/manjunath',
      whatsapp: '+91 9876543210',
      email: 'manjunath@example.com'
    },
    resumeUrl: 'https://example.com/manjunath-resume.pdf',
    settings: {
      template: 'editorial',
      theme: 'light',
      accent: 'orange',
      font: 'space',
      layout: 'editorial',
      avatarShape: 'square',
      bgPattern: 'dots'
    }
  },

  rahul: {
    uid: 'demo-rahul',
    username: 'rahul',
    published: true,
    createdAt: '2026-02-01T12:00:00Z',
    updatedAt: '2026-03-10T16:00:00Z',
    profile: {
      name: 'Rahul Sharma',
      headline: 'Electronics & Robotics Engineer',
      bio: 'Undergraduate student building autonomous robotics, embedded IoT systems, and high-frequency sensor networks. Passionate about hardware-software co-design.',
      location: 'Bengaluru, India',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      email: 'rahul.sharma@example.com'
    },
    education: [
      {
        id: 'edu-rahul-1',
        degree: 'B.Tech',
        branch: 'Electronics and Communication Engineering',
        college: 'National Institute of Technology',
        university: 'NIT',
        startYear: '2023',
        endYear: '2027',
        cgpa: '8.9 / 10'
      }
    ],
    skills: [
      'C', 'C++', 'Python', 'ROS2', 'Embedded C', 'FreeRTOS', 
      'PCB Design', 'KiCAD', 'Arduino', 'Raspberry Pi', 'Git'
    ],
    projects: [
      {
        id: 'proj-r1',
        name: 'AeroNav — Autonomous Indoor LiDAR Quadcopter',
        description: 'Custom drone capable of 2D/3D Simultaneous Localization and Mapping (SLAM) in GPS-denied tunnels and indoor disaster sites.',
        technologies: ['C++', 'ROS2', 'Python', 'PX4', 'LiDAR', 'STM32'],
        githubUrl: 'https://github.com/example/aeronav',
        liveUrl: 'https://example.com/aeronav-demo',
        learned: 'Tuned PID attitude controllers and implemented extended Kalman filters for sensor fusion.',
        image: 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'proj-r2',
        name: 'SmartGrid Micro-Inverter Telemetry Node',
        description: 'LoRaWAN-connected low-power telemetry device monitoring solar cell efficiency and thermal runaway at 10-second intervals.',
        technologies: ['Embedded C', 'KiCAD', 'ESP32', 'FreeRTOS', 'MQTT'],
        githubUrl: 'https://github.com/example/smartgrid-iot',
        liveUrl: '',
        learned: 'Optimized deep-sleep power states to achieve 14-month continuous battery lifespan.',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
      }
    ],
    experience: [
      {
        id: 'exp-r1',
        role: 'Hardware Firmware Intern',
        organization: 'OmniSens Robotics',
        type: 'Internship',
        startDate: 'Jan 2025',
        endDate: 'Jun 2025',
        description: 'Wrote SPI drivers for ultrasonic arrays and optimized serial communication buffers on ARM Cortex-M4 processors.'
      }
    ],
    achievements: [
      {
        id: 'ach-r1',
        title: '1st Runner-Up — National Robotics Challenge',
        organization: 'IIT Bombay Techfest',
        year: '2024',
        description: 'Designed an autonomous line-maze navigating rover with sub-40 millisecond response loops.',
        credentialUrl: 'https://example.com'
      }
    ],
    certifications: [],
    links: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'rahul.sharma@example.com'
    },
    resumeUrl: '',
    settings: {
      template: 'grid',
      theme: 'light',
      accent: 'blue',
      font: 'space',
      layout: 'centered',
      avatarShape: 'circle'
    }
  },

  ananya: {
    uid: 'demo-ananya',
    username: 'ananya',
    published: true,
    createdAt: '2026-02-10T15:00:00Z',
    updatedAt: '2026-03-18T18:00:00Z',
    profile: {
      name: 'Ananya Deshmukh',
      headline: 'AI & Machine Learning Researcher',
      bio: 'Undergraduate student researching multimodal foundation models, computer vision for medical diagnostics, and efficient edge model quantization.',
      location: 'Pune, India',
      profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      email: 'ananya.d@example.com'
    },
    education: [
      {
        id: 'edu-a1',
        degree: 'B.Tech',
        branch: 'Artificial Intelligence and Data Science',
        college: 'College of Engineering',
        university: 'State University',
        startYear: '2023',
        endYear: '2027',
        cgpa: '9.6 / 10'
      }
    ],
    skills: [
      'Python', 'PyTorch', 'TensorFlow', 'OpenCV', 'Hugging Face', 
      'Scikit-learn', 'NumPy', 'Pandas', 'FastAPI', 'Docker', 'Git'
    ],
    projects: [
      {
        id: 'proj-a1',
        name: 'RetinaVision — Early Diabetic Retinopathy Detection',
        description: 'Vision Transformer (ViT) ensemble trained on 35,000 fundus images, achieving 94.2% diagnostic accuracy across 5 severity grades.',
        technologies: ['Python', 'PyTorch', 'TorchVision', 'FastAPI', 'Docker'],
        githubUrl: 'https://github.com/example/retinavision',
        liveUrl: 'https://example.com/retinavision-demo',
        learned: 'Explored focal loss formulations to address severe medical dataset class imbalances.',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: 'proj-a2',
        name: 'NeuroSummarizer — Domain-Adapted Research Synthesizer',
        description: 'Fine-tuned small language model (Mistral 7B) on arXiv bio-NLP papers to extract methodology, key contributions, and reproducible parameters.',
        technologies: ['Python', 'Hugging Face Transformers', 'LoRA', 'PEFT', 'Gradio'],
        githubUrl: 'https://github.com/example/neurosummarizer',
        liveUrl: 'https://huggingface.co/spaces/example/neurosummarizer',
        learned: 'Implemented parameter-efficient fine-tuning with 4-bit quantization.',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'
      }
    ],
    experience: [
      {
        id: 'exp-a1',
        role: 'Undergraduate Research Assistant',
        organization: 'Vision & Language AI Lab',
        type: 'College Club',
        startDate: 'Aug 2024',
        endDate: 'Present',
        description: 'Co-authored a paper on zero-shot lesion segmentation submitted to CVPR Student Workshop.'
      }
    ],
    achievements: [
      {
        id: 'ach-a1',
        title: 'Google Generation Scholarship Recipient',
        organization: 'Google',
        year: '2025',
        description: 'Awarded for academic excellence and demonstrated leadership in promoting women in technology.',
        credentialUrl: 'https://buildyourfuture.withgoogle.com'
      }
    ],
    certifications: [
      {
        id: 'cert-a1',
        title: 'Deep Learning Specialization',
        organization: 'DeepLearning.AI',
        year: '2024',
        credentialUrl: 'https://coursera.org'
      }
    ],
    links: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      email: 'ananya.d@example.com'
    },
    resumeUrl: '',
    settings: {
      template: 'minimal',
      theme: 'light',
      accent: 'purple',
      font: 'inter',
      layout: 'left',
      avatarShape: 'circle'
    }
  }
};
