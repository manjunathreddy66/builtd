// Auto-suggestion generator for Professional Headline, Short Bio, and Project Descriptions

export const HEADLINE_SUGGESTIONS = [
  'Computer Science Student & Full-Stack Developer',
  'AI & Machine Learning Undergrad Researcher',
  'Frontend Engineer & UI/UX Enthusiast',
  'Electronics & Embedded Systems Builder',
  'Backend & Distributed Systems Aspirant',
  'Data Science Student & Problem Solver'
];

export const BIO_SUGGESTIONS = [
  'Engineering undergraduate passionate about designing scalable web systems, clean architecture, and intuitive user experiences.',
  'Computer science student building real-time applications, exploring modern cloud technologies, and active in competitive programming.',
  'Driven technologist focused on machine learning algorithms, deep neural models, and turning complex data into actionable solutions.',
  'Undergraduate engineer dedicated to embedded systems, robotics hardware-software co-design, and IoT automation.'
];

// Generate intelligent project descriptions based on project name and technologies
export const generateProjectDescriptions = (projectName = '', technologies = '') => {
  const pName = projectName.trim();
  const techStr = typeof technologies === 'string' ? technologies : (technologies || []).join(', ');
  const pLower = pName.toLowerCase();
  const tLower = techStr.toLowerCase();

  const suggestions = [];

  // 1. Realtime / Chat / Collaboration
  if (pLower.includes('chat') || pLower.includes('sync') || pLower.includes('collab') || tLower.includes('socket') || tLower.includes('webrtc')) {
    suggestions.push(
      `A real-time collaborative workspace featuring instant messaging, presence tracking, and low-latency state synchronization built with ${techStr || 'modern web technologies'}.`
    );
  }

  // 2. AI / ML / Vision / NLP / Data
  if (pLower.includes('ai') || pLower.includes('vision') || pLower.includes('model') || pLower.includes('detect') || tLower.includes('python') || tLower.includes('torch') || tLower.includes('tensorflow')) {
    suggestions.push(
      `An intelligent machine learning pipeline with automated data preprocessing, model inference, and evaluation metrics visualization.`
    );
  }

  // 3. E-commerce / Store / Booking / Dashboard
  if (pLower.includes('shop') || pLower.includes('store') || pLower.includes('commerce') || pLower.includes('pay') || pLower.includes('ticket') || pLower.includes('book')) {
    suggestions.push(
      `A responsive web platform featuring dynamic catalog filtering, persistent state management, and seamless checkout integration.`
    );
  }

  // 4. IoT / Hardware / Embedded
  if (pLower.includes('iot') || pLower.includes('drone') || pLower.includes('robot') || tLower.includes('c++') || tLower.includes('arduino') || tLower.includes('esp')) {
    suggestions.push(
      `An embedded hardware telemetry node utilizing low-power sensor interfacing, firmware optimization, and wireless data streaming.`
    );
  }

  // 5. Dynamic Tailored Builder Templates
  if (pName) {
    suggestions.push(
      `A modular ${pName} application built with ${techStr || 'modern technologies'} focused on high performance, responsive design, and intuitive user workflows.`
    );
    suggestions.push(
      `An end-to-end engineering solution delivering clean component architecture, reliable data flow, and seamless user interaction.`
    );
  } else {
    suggestions.push(
      `A full-stack web application engineered with modular architecture, robust API integration, and clean responsive UI design.`
    );
    suggestions.push(
      `An interactive digital tool built to solve everyday student workflows with fast response times and clean design.`
    );
  }

  return suggestions.slice(0, 3);
};
