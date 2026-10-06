// Everything about you that isn't a project or certification lives here.
// The AI chat also reads this file, so keep it accurate.
export const profile = {
  siteName: 'Ansari Automates',
  assistantName: 'Ansari AI',
  name: 'Thameem Mul Ansari S.',
  firstName: 'Thameem',
  lastName: 'Mul Ansari S.',
  role: 'AI & Automation Engineer',
  location: 'Chennai, Tamil Nadu, India',
  city: 'Chennai, India',
  email: 'ansariautomates@gmail.com',
  linkedin: 'https://www.linkedin.com/in/thameem-mul-ansari-s',
  github: 'https://github.com/Thameem-Mul-Ansari',
  // WhatsApp: country code + number, digits only. The message pre-fills the chat for visitors.
  whatsapp: {
    number: '916369318648',
    message: 'Hi Thameem, I found your portfolio on Ansari Automates and would like to connect.',
  },
  current: {
    title: 'Junior Software Engineer',
    company: 'Unlimited Innovations',
    companyFull: 'Unlimited Innovations India Pvt. Ltd.',
  },
  metaDescription:
    'Ansari Automates is the portfolio of Thameem Mul Ansari S, an AI & Automation Engineer in Chennai building production AI agents, voice agents, RAG systems and RPA workflows for enterprise clients.',
  heroIntro: 'I build AI agents, voice agents and automations that take repetitive work off people’s desks, for enterprise clients.',
  about: [
    'I’m an AI & Automation Engineer with 2+ years of building production AI agents, voice agents, RAG systems and RPA workflows for enterprise clients.',
    'I own delivery end to end: architecture, Python and FastAPI backends, React and TypeScript dashboards, LangGraph orchestration on Azure OpenAI, and cloud deployment.',
  ],
  // Shown as the results row in the About section
  impact: [
    { value: '~40%', label: 'faster turnaround planning for an oil & gas program' },
    { value: '~70%', label: 'of routine hotel reservation calls handled by voice agents' },
    { value: '90%+', label: 'answer accuracy from the hotel RAG knowledge base' },
    { value: '100%', label: 'of manual call auditing replaced by call analytics' },
  ],
  // Not shown on the page. Ansari AI (the chat) still uses it to answer questions.
  experience: {
    company: 'Unlimited Innovations India Pvt. Ltd.',
    place: 'Chennai, India',
    steps: [
      {
        title: 'Software Engineer Intern',
        period: 'Jan 2025 – Apr 2025',
        points: [
          'Automated payment-gateway reconciliation (PhonePe, Paytm, Pine Labs against Odoo settlements) and ICICI Bank export-bill regularisation for a pan-India retailer with Power Automate Desktop, Excel macros and Cashfree/Shopify APIs.',
        ],
      },
      {
        title: 'Trainee Software Engineer',
        period: 'May 2025 – Oct 2025',
        points: [
          'Built a call analytics platform (Whisper large-v3 + Azure GPT-4) that scores agents and surfaces top complaints, replacing all manual call auditing.',
          'Delivered multi-agent n8n automation for Instagram and Facebook DMs, comments, story replies and Google Reviews across multiple retail branches.',
        ],
      },
      {
        title: 'Junior Software Engineer',
        period: 'Nov 2025 – Present',
        points: [
          'Own end-to-end delivery of AI voice agents, multi-agent platforms and RAG systems for enterprise clients.',
          'Architected a six-agent LangGraph platform for an oil & gas turnaround program, integrated with Microsoft SQL Server and SAP.',
          'Built production voice agents on Twilio and Azure GPT Realtime for a UAE hotel.',
        ],
      },
    ],
  },
  education: {
    degree: 'B.Tech in Information Technology (Honors)',
    school: 'Meenakshi Sundararajan Engineering College, Chennai',
    period: '2021 – 2025',
    grade: 'CGPA 8.48 / 10',
  },
  achievements: [
    'Winner of the SCALE-91 Hackathon at the FinTech Festival and title winner of Innothon ’23. 5× hackathon winner and 25× hackathon finalist.',
  ],
  footerQuote: {
    text: 'The best way to predict the future is to invent it.',
    by: 'Alan Kay',
  },
  askSuggestions: [
    'What voice agents has he built?',
    'Tell me about the six-agent LangGraph platform',
    'Which Microsoft certifications does he hold?',
    'Is he open to new roles?',
  ],
} as const;