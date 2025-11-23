export const mockUsers = [
  { id: '1', name: 'Admin User', email: 'admin@agaetis.com', role: 'admin', mentor: '-', project: '-', progress: 100 },
  { id: '2', name: 'John Doe', email: 'john@agaetis.com', role: 'dev', mentor: 'Admin User', project: 'E-commerce Platform', progress: 65 },
  { id: '3', name: 'Jane Smith', email: 'jane@agaetis.com', role: 'dev', mentor: 'Admin User', project: 'Mobile App', progress: 42 },
  { id: '4', name: 'Mike Johnson', email: 'mike@agaetis.com', role: 'dev', mentor: 'Admin User', project: 'Analytics Dashboard', progress: 88 },
];

export const mockProjects = [
  {
    id: '1',
    name: 'CISV',
    repo: 'https://github.com/agaetis/ecommerce',
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    mentor: 'Admin User',
    members: ['John Doe', 'Jane Smith'],
    setupGuide: '# Setup Guide\n\n1. Clone repo\n2. Install dependencies\n3. Setup database',
    codeMap: { modules: ['Auth', 'Products', 'Cart', 'Payments'] },
   
  },
  {
    id: '2',
    name: 'House of WorkTops',
    repo: 'https://github.com/agaetis/mobile',
    techStack: ['React Native', 'Firebase'],
    mentor: 'Admin User',
    members: ['Jane Smith'],
    setupGuide: '# Setup Guide\n\n1. Install Expo\n2. Clone repo\n3. Run expo start',
    codeMap: { modules: ['Navigation', 'Auth', 'Profile', 'Notifications'] }
  },
  {
    id: '3',
    name: 'ET',
    repo: 'https://github.com/agaetis/analytics',
    techStack: ['Vue.js', 'Python', 'MongoDB'],
    mentor: 'Admin User',
    members: ['Mike Johnson'],
    setupGuide: '# Setup Guide\n\n1. Setup Python env\n2. Install dependencies\n3. Configure MongoDB',
    codeMap: { modules: ['Dashboard', 'Reports', 'DataViz', 'Exports'] }
  },
];

export const mockDocs = [
  { id: '1', title: 'Company Handbook', category: 'General', roleVisibility: ['admin', 'dev'], uploadDate: '2024-01-15' },
  { id: '2', title: 'Git Workflow', category: 'Development', roleVisibility: ['dev'], uploadDate: '2024-01-20' },
  { id: '3', title: 'Code Review Guidelines', category: 'Development', roleVisibility: ['dev'], uploadDate: '2024-02-01' },
  { id: '4', title: 'Security Best Practices', category: 'Security', roleVisibility: ['admin', 'dev'], uploadDate: '2024-02-10' },
];

export const mockTemplates = [
  {
    id: '1',
    name: 'Preboarding - Standard',
    type: 'preboarding',
    tasks: [
      { id: 't1', title: 'Complete HR forms', required: true },
      { id: 't2', title: 'Setup workspace', required: true },
      { id: 't3', title: 'Review company handbook', required: true },
    ]
  },
  {
    id: '2',
    name: 'Onboarding - Developer',
    type: 'onboarding',
    tasks: [
      { id: 't4', title: 'Setup development environment', required: true },
      { id: 't5', title: 'Complete codebase questionnaire', required: true },
      { id: 't6', title: 'First code commit', required: true },
      { id: 't7', title: 'Meet with mentor', required: true },
    ]
  },
];

export const mockTasks = [
  { id: 't1', title: 'Complete HR forms', type: 'preboarding', completed: true, notes: 'Done on day 1', proof: null },
  { id: 't2', title: 'Setup workspace', type: 'preboarding', completed: true, notes: '', proof: null },
  { id: 't3', title: 'Review company handbook', type: 'preboarding', completed: true, notes: '', proof: null },
  { id: 't4', title: 'Setup development environment', type: 'onboarding', completed: true, notes: 'MacOS setup completed', proof: null },
  { id: 't5', title: 'Complete codebase questionnaire', type: 'onboarding', completed: false, notes: '', proof: null },
  { id: 't6', title: 'First code commit', type: 'onboarding', completed: false, notes: '', proof: null },
  { id: 't7', title: 'Meet with mentor', type: 'onboarding', completed: true, notes: 'Had intro call', proof: null },
];

export const mockRoles = [
  { id: '1', name: 'admin', permissions: ['all'] },
  { id: '2', name: 'dev', permissions: ['view_docs', 'view_projects', 'complete_tasks'] },
];
