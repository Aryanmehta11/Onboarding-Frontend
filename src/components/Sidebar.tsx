import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  FolderKanban, 
  BookOpen, 
  Network,
  Settings,
  CheckSquare,
  MessageSquare,
  LogOut
} from 'lucide-react';

export function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const adminLinks = [
    { path: '/', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/users', icon: Users, label: 'Users' },
    { path: '/roles-templates', icon: FileText, label: 'Roles & Templates' },
    { path: '/projects', icon: FolderKanban, label: 'Projects' },
    { path: '/docs', icon: BookOpen, label: 'Internal Docs' },
    { path: '/knowledge-graph', icon: Network, label: 'Knowledge Graph' },
    { path: '/access-control', icon: Settings, label: 'Access Control' },
  ];

  const devLinks = [
    { path: '/', icon: LayoutDashboard, label: 'Home' },
    { path: '/tasks', icon: CheckSquare, label: 'Tasks' },
    { path: '/projects', icon: FolderKanban, label: 'Projects' },
    { path: '/knowledge-graph', icon: Network, label: 'Knowledge Graph' },
    { path: '/docs', icon: BookOpen, label: 'Internal Docs' },
    { path: '/mentor', icon: MessageSquare, label: 'Mentor & Feedback' },
  ];

  const links = user?.role === 'admin' ? adminLinks : devLinks;

  return (
    <div className="flex flex-col h-screen w-64 bg-card border-r border-border">
      <div className="p-6 border-b border-border">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Agaetis Aboard
        </h1>
        <p className="text-sm text-muted-foreground mt-1">{user?.name}</p>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = location.pathname === link.path;
          return (
            <Link key={link.path} to={link.path}>
              <Button
                variant={isActive ? 'secondary' : 'ghost'}
                className="w-full justify-start"
              >
                <Icon className="mr-2 h-4 w-4" />
                {link.label}
              </Button>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-border">
        <Button onClick={logout} variant="outline" className="w-full">
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </div>
  );
}
