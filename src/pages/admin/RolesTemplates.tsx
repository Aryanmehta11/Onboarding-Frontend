import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit } from 'lucide-react';
import { mockRoles, mockTemplates } from '@/data/mockData';

export default function RolesTemplates() {
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
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Role
              </Button>
            </div>
            <div className="grid gap-4">
              {mockRoles.map((role) => (
                <Card key={role.id}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                      <CardTitle className="text-xl">{role.name}</CardTitle>
                      <CardDescription>
                        {role.permissions.length} permissions
                      </CardDescription>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {role.permissions.map((perm, idx) => (
                        <Badge key={idx} variant="secondary">{perm}</Badge>
                      ))}
                    </div>
                  </CardContent>
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
      </div>
    </Layout>
  );
}
