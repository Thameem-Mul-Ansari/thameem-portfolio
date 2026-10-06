// Tech stack shown with logos. `icons` are tried in order from the Iconify sets
// "logos" (full colour) and "simple-icons" (single colour, tinted with `color`).
// If none exist, a lettered tile in `color` is shown instead, so a wrong name never breaks the build.
// Browse names at https://icon-sets.iconify.design/
export type Tech = { name: string; icons?: string[]; color: string };
export type StackGroup = { title: string; items: Tech[] };

export const stack: StackGroup[] = [
  {
    title: 'AI & agents',
    items: [
      { name: 'LangGraph', icons: ['simple-icons:langgraph', 'simple-icons:langchain'], color: '#1C3C3C' },
      { name: 'LangChain', icons: ['simple-icons:langchain', 'logos:langchain'], color: '#1C3C3C' },
      { name: 'Azure OpenAI', icons: ['logos:microsoft-azure', 'simple-icons:microsoftazure'], color: '#0078D4' },
      { name: 'OpenAI', icons: ['logos:openai-icon', 'simple-icons:openai'], color: '#10A37F' },
      { name: 'MCP', icons: ['simple-icons:modelcontextprotocol', 'logos:mcp'], color: '#16181D' },
      { name: 'Azure AI Foundry', icons: ['logos:microsoft-azure'], color: '#0078D4' },
    ],
  },
  {
    title: 'Voice & conversational AI',
    items: [
      { name: 'GPT Realtime', icons: ['logos:openai-icon', 'simple-icons:openai'], color: '#10A37F' },
      { name: 'Twilio', icons: ['logos:twilio-icon', 'simple-icons:twilio'], color: '#F22F46' },
      { name: 'Whisper', icons: ['logos:openai-icon', 'simple-icons:openai'], color: '#10A37F' },
      { name: 'Kaleyra', color: '#E4002B' },
      { name: 'Azure Avatar', icons: ['logos:microsoft-azure'], color: '#0078D4' },
    ],
  },
  {
    title: 'Automation & RPA',
    items: [
      { name: 'n8n', icons: ['logos:n8n', 'simple-icons:n8n'], color: '#EA4B71' },
      { name: 'Power Automate', icons: ['logos:microsoft-power-automate', 'simple-icons:powerautomate'], color: '#0066FF' },
      { name: 'Copilot Studio', icons: ['logos:microsoft-copilot', 'simple-icons:microsoft-copilot'], color: '#0F6CBD' },
      { name: 'Power Apps', icons: ['logos:microsoft-power-apps', 'simple-icons:powerapps'], color: '#742774' },
    ],
  },
  {
    title: 'Development',
    items: [
      { name: 'Python', icons: ['logos:python'], color: '#3776AB' },
      { name: 'TypeScript', icons: ['logos:typescript-icon'], color: '#3178C6' },
      { name: 'React', icons: ['logos:react'], color: '#149ECA' },
      { name: 'FastAPI', icons: ['logos:fastapi-icon', 'simple-icons:fastapi'], color: '#009688' },
      { name: 'Flask', icons: ['simple-icons:flask', 'logos:flask'], color: '#16181D' },
      { name: 'Django', icons: ['logos:django-icon', 'simple-icons:django'], color: '#092E20' },
    ],
  },
  {
    title: 'Cloud',
    items: [
      { name: 'Azure', icons: ['logos:microsoft-azure', 'simple-icons:microsoftazure'], color: '#0078D4' },
      { name: 'AWS', icons: ['logos:aws', 'simple-icons:amazonwebservices'], color: '#FF9900' },
      { name: 'Google Cloud', icons: ['logos:google-cloud', 'simple-icons:googlecloud'], color: '#4285F4' },
      { name: 'Firebase', icons: ['logos:firebase', 'simple-icons:firebase'], color: '#FFCA28' },
    ],
  },
  {
    title: 'Data & integrations',
    items: [
      { name: 'SQL Server', icons: ['logos:microsoft-sql-server', 'simple-icons:microsoftsqlserver'], color: '#CC2927' },
      { name: 'PostgreSQL', icons: ['logos:postgresql', 'simple-icons:postgresql'], color: '#4169E1' },
      { name: 'Supabase', icons: ['logos:supabase-icon', 'simple-icons:supabase'], color: '#3FCF8E' },
      { name: 'Neo4j', icons: ['logos:neo4j', 'simple-icons:neo4j'], color: '#4581C3' },
      { name: 'Power BI', icons: ['logos:microsoft-power-bi', 'simple-icons:powerbi'], color: '#F2C811' },
      { name: 'Microsoft Fabric', icons: ['logos:microsoft-fabric', 'simple-icons:microsoftfabric'], color: '#117865' },
      { name: 'Meta Graph API', icons: ['logos:meta-icon', 'simple-icons:meta'], color: '#0467DF' },
      { name: 'Shopify', icons: ['logos:shopify', 'simple-icons:shopify'], color: '#7AB55C' },
      { name: 'SAP', icons: ['logos:sap', 'simple-icons:sap'], color: '#0FAAFF' },
      { name: 'Odoo', icons: ['logos:odoo', 'simple-icons:odoo'], color: '#714B67' },
      { name: 'Cashfree', color: '#6933D3' },
    ],
  },
  {
    title: 'CI/CD & DevOps',
    items: [
      { name: 'Git', icons: ['logos:git-icon', 'simple-icons:git'], color: '#F05032' },
      { name: 'GitHub', icons: ['logos:github-icon', 'simple-icons:github'], color: '#181717' },
      { name: 'GitHub Actions', icons: ['logos:github-actions', 'simple-icons:githubactions'], color: '#2088FF' },
      { name: 'Docker', icons: ['logos:docker-icon', 'simple-icons:docker'], color: '#2496ED' },
      { name: 'Azure DevOps', icons: ['logos:azure-devops', 'simple-icons:azuredevops'], color: '#0078D7' },
      { name: 'Firebase Hosting', icons: ['logos:firebase', 'simple-icons:firebase'], color: '#FFCA28' },
    ],
  },
];
