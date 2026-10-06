// Everything shown in the Services and Industries sections.
// Edit the text here; the page, the contact form dropdown and Ansari AI all read from this file.

export type Capability = {
  id: string;
  title: string;
  summary: string;
  items: string[];
  tags?: string[];
};

export const capabilities: Capability[] = [
  {
    id: 'ai-enablement',
    title: 'AI Enablement',
    summary: 'Put AI to work across your business: assistants that answer customers, agents that run operations and automations that remove repetitive work.',
    items: [
      'AI chatbots and assistants for your website and WhatsApp',
      'AI agents that monitor, plan and flag problems early',
      'Workflow automation with n8n, Power Automate and Zapier',
      'Document and finance automation: invoices, reconciliation, reports',
      'Social media automation for marketing teams',
    ],
  },
  {
    id: 'data-analytics',
    title: 'Data & Analytics',
    summary: 'Turn scattered data from sales, calls and operations into clear dashboards your team actually uses.',
    items: [
      'Dashboards and reporting in Power BI',
      'Data pipelines and analytics on Microsoft Fabric',
      'Insights from calls, sales and operations data',
      'Automated reports delivered on schedule',
    ],
  },
  {
    id: 'cloud-adoption',
    title: 'Cloud Adoption',
    summary: 'Run your AI and business applications on reliable, secure cloud infrastructure.',
    items: [
      'Deploying AI apps on Azure, AWS and Google Cloud',
      'Moving manual and spreadsheet processes to the cloud',
      'Hosting, monitoring and CI/CD pipelines',
    ],
  },
  {
    id: 'application-development',
    title: 'Application Development',
    summary: 'Websites, web apps, mobile apps and business systems built around how you work.',
    items: [
      'Websites and web apps, with SEO and local search built in',
      'Mobile apps for customers and field teams',
      'Business systems: billing, GST, inventory, sales and CRM',
      'Integrations with ERP, Shopify and payment gateways',
    ],
  },
  {
    id: 'training',
    title: 'Training & Workshops',
    summary: 'Hands-on training for teams and students, from a first program to production AI.',
    items: [
      'Corporate workshops on AI, automation and n8n',
      'Courses for students and career switchers',
      'Pitch and presentation coaching',
    ],
    tags: ['Python', 'C', 'C++', 'Full Stack', 'AI', 'n8n', 'Power BI', 'Excel', 'SQL'],
  },
];

/** One-line extra offer shown under the cards. Set to '' to hide. */
export const alsoAvailable = 'Pitch decks and business presentations for investors, clients and internal reviews.';

/** Short version of the process, shown in the call-to-action on the home page. */
export const processLine = 'Free 20-minute call → working first version → launch and support';

export const process = [
  { title: 'Discover', text: 'A free 20-minute call to understand the problem and where AI or automation fits.' },
  { title: 'Build', text: 'A working first version, fast, shaped by your feedback.' },
  { title: 'Launch', text: 'Go live, with handover and training for your team.' },
  { title: 'Support', text: 'Monitoring, fixes and improvements as your business grows.' },
];

export type Industry = { name: string; text: string };

// Featured industries, shown numbered. Edit the lines to match your work in each one.
export const industries: Industry[] = [
  { name: 'Energy (Oil & Gas)', text: 'Multi-agent planning, risk alerts and approval workflows for turnaround programs.' },
  { name: 'Hospitality', text: 'Reservations, guest support and call analytics.' },
  { name: 'Retail & E-commerce', text: 'Customer engagement, catalog-aware replies and payment reconciliation.' },
  { name: 'Financial Services', text: 'Reconciliation, document processing and reporting.' },
  { name: 'Healthcare', text: 'Patient communication, scheduling and records automation.' },
  { name: 'Manufacturing', text: 'Inventory, production reporting and operations dashboards.' },
  { name: 'Logistics & Transportation', text: 'Shipment tracking, documents and operations workflows.' },
  { name: 'Education', text: 'AI teaching assistants and learning tools.' },
];

/** Optional lighter list of other industries. Leave empty to hide. */
export const moreIndustries: string[] = [];