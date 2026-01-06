import { useState ,useEffect} from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Users,
  FileText,
  FolderKanban,
  TrendingUp,
  UserPlus,
  FilePlus,
  FileCode
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { mockUsers, mockProjects } from '@/data/mockData';


export default function AdminDashboard() {
  
  const [users, setUsers] = useState<any[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const activeProjects = mockProjects.length;
 


  useEffect(()=>{
    const fetchUsers=async ()=>{
      try{
        const res=await fetch('http://localhost:5009/api/admin/users');
        if(!res.ok){
          throw new Error("Failed to fetch users");
        }
        const data=await res.json();
        console.log('Fetched users:',data);
        setUsers(data);
      }
      catch(error){
        console.error('Error fetching users:',error);
      } finally{
        setLoadingUsers(false);
      }
    }
    fetchUsers();
  },[]);


  // Invite modal state
  const totalUsers = users.length;
  const avgProgress = totalUsers === 0 ? 0 : 0;
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: '',
    email: '',
    role: 'intern',
    mentor: '',
    project: ''
  });


  const handleInviteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Inviting user:', inviteForm);
    setIsInviteModalOpen(false);
    setInviteForm({
      name: '',
      email: '',
      role: 'intern',
      mentor: '',
      project: ''
    });
  };

  return (
    <Layout>
      <div className="p-8 space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Admin</p>
        </div>

        {/* Key Metrics */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Key Metrics</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Joinees</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalUsers}</div>
                <p className="text-xs text-muted-foreground">Active team members</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <FolderKanban className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{activeProjects}</div>
                <p className="text-xs text-muted-foreground">Currently running</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Onboarding Progress</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{avgProgress}%</div>
                <p className="text-xs text-muted-foreground">Across all users</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Actions */}
        <section>
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {/* Invite User */}
            <Card
              className="hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setIsInviteModalOpen(true)}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5 text-primary" />
                  Invite User
                </CardTitle>
                <CardDescription>Add a new team member</CardDescription>
              </CardHeader>
            </Card>

            {/* Create Template */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FilePlus className="h-5 w-5 text-primary" />
                  Create Template
                </CardTitle>
                <CardDescription>Design onboarding workflow</CardDescription>
              </CardHeader>
            </Card>

            {/* Create Project */}
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5 text-primary" />
                  Create Project
                </CardTitle>
                <CardDescription>Setup new project</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>
      </div>

      {/* Invite User Modal */}
      <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite User</DialogTitle>
            <DialogDescription>
              Send an invitation to a new team member. They will receive an email with
              instructions to join.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleInviteSubmit}>
            <div className="space-y-4 py-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={inviteForm.name}
                  onChange={(e) =>
                    setInviteForm({ ...inviteForm, name: e.target.value })
                  }
                  required
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={inviteForm.email}
                  onChange={(e) =>
                    setInviteForm({ ...inviteForm, email: e.target.value })
                  }
                  required
                />
              </div>

              {/* Role */}
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={inviteForm.role}
                  onValueChange={(value) =>
                    setInviteForm({ ...inviteForm, role: value })
                  }
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="developer">Developer</SelectItem>
                    <SelectItem value="mentor">Mentor</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Mentor */}
              <div className="space-y-2">
                <Label htmlFor="mentor">Assign Mentor </Label>
                <Input
                  id="mentor"
                  placeholder="Mentor name"
                  value={inviteForm.mentor}
                  onChange={(e) =>
                    setInviteForm({ ...inviteForm, mentor: e.target.value })
                  }
                />
              </div>

              {/* Project */}
              <div className="space-y-2">
                <Label htmlFor="project">Assign Project</Label>
                <Input
                  id="project"
                  placeholder="Project name"
                  value={inviteForm.project}
                  onChange={(e) =>
                    setInviteForm({ ...inviteForm, project: e.target.value })
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsInviteModalOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                <UserPlus className="mr-2 h-4 w-4" />
                Send Invitation
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
