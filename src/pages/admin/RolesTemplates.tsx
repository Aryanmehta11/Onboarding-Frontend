import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Edit, Shield, X } from 'lucide-react';
import { mockTemplates } from '@/data/mockData';
import { useState, useEffect } from 'react';

interface Role {
  id: number;
  name: string;
  description: string;
  isSystem: boolean;
  createdAt: string;
}

export default function RolesTemplates() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    isSystem: false,
  });

  // Fetch roles on component mount
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const response = await fetch(' http://localhost:5009/api/admin/roles');
      if (!response.ok) throw new Error('Failed to fetch roles');
      const data = await response.json();
      console.log('Fetched roles:', data);
      setRoles(data);
    } catch (err) {
      console.error('Error fetching roles:', err);
    }
  };

  const handleCreateRole = async () => {
    setError('');

    if (!newRole.name.trim()) {
      setError('Role name is required');
      return;
    }

    if (!newRole.description.trim()) {
      setError('Role description is required');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(' http://localhost:5009/api/admin/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newRole.name,
          description: newRole.description,
          isSystem: newRole.isSystem,
        }),
      });

      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData || 'Failed to create role');
      }

      const createdRole = await response.json();

      setRoles([...roles, createdRole]);
      setIsCreateDialogOpen(false);
      setNewRole({ name: '', description: '', isSystem: false });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const resetDialog = () => {
    setIsCreateDialogOpen(false);
    setNewRole({ name: '', description: '', isSystem: false });
    setError('');
  };

  return (
    <Layout>
      <div className="p-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Roles & Templates</h1>
            <p className="text-muted-foreground">Manage roles and onboarding templates</p>
          </div>
        </div>

        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="roles" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => setIsCreateDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Create Role
              </Button>
            </div>
            <div className="grid gap-4">
              {roles.map((role) => (
                <Card key={role.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-xl">{role.name}</CardTitle>
                        {role.isSystem && (
                          <Badge variant="secondary" className="gap-1">
                            <Shield className="h-3 w-3" />
                            System
                          </Badge>
                        )}
                      </div>
                      <CardDescription className="mt-2">
                        {role.description}
                      </CardDescription>
                      <p className="text-xs text-muted-foreground mt-2">
                        Created: {new Date(role.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <div className="flex justify-end">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Template
              </Button>
            </div>
            <div className="grid gap-4">
              {mockTemplates.map((template) => (
                <Card key={template.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                      <CardTitle className="text-xl">{template.name}</CardTitle>
                      <CardDescription>
                        {template.tasks.length} tasks
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {template.tasks.map((task) => (
                        <div key={task.id} className="flex items-center gap-2 text-sm">
                          <div className="h-2 w-2 rounded-full bg-primary" />
                          {task.title}
                          {task.required && <Badge variant="outline" className="ml-2">Required</Badge>}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Role Dialog */}
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
              <DialogDescription>
                Add a new role to your organization. Fill in the details below.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              {error && (
                <div className="flex items-start gap-2 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-md text-sm">
                  <X className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="name">
                  Role Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  value={newRole.name}
                  onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
                  placeholder="e.g., manager, developer"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">
                  Description <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="description"
                  value={newRole.description}
                  onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
                  placeholder="Brief description of the role"
                  rows={3}
                />
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isSystem"
                  checked={newRole.isSystem}
                  onCheckedChange={(checked) =>
                    setNewRole({ ...newRole, isSystem: checked as boolean })
                  }
                />
                <Label
                  htmlFor="isSystem"
                  className="text-sm font-normal cursor-pointer"
                >
                  System Role (cannot be deleted)
                </Label>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={resetDialog} disabled={isLoading}>
                Cancel
              </Button>
              <Button onClick={handleCreateRole} disabled={isLoading}>
                {isLoading ? 'Creating...' : 'Create Role'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}