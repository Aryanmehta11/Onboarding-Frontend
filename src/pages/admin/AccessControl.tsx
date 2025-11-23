import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

const sections = [
  { id: 'dashboard', label: 'Dashboard', admin: true, dev: true },
  { id: 'users', label: 'Users Management', admin: true, dev: false },
  { id: 'projects', label: 'Projects', admin: true, dev: true },
  { id: 'docs', label: 'Internal Docs', admin: true, dev: true },
  { id: 'templates', label: 'Templates', admin: true, dev: false },
  { id: 'graph', label: 'Knowledge Graph', admin: true, dev: true },
];

export default function AccessControl() {
  return (
    <Layout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Access Control</h1>
          <p className="text-muted-foreground">Configure role-based permissions</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Role Permissions</CardTitle>
            <CardDescription>
              Toggle access for different sections by role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="grid grid-cols-3 gap-4 pb-4 border-b border-border font-semibold">
                <div>Section</div>
                <div className="text-center">Admin</div>
                <div className="text-center">Developer</div>
                
              </div>
              {sections.map((section) => (
                <div key={section.id} className="grid grid-cols-3 gap-4 items-center">
                  <Label htmlFor={section.id}>{section.label}</Label>
                  <div className="flex justify-center">
                    <Switch id={`${section.id}-admin`} defaultChecked={section.admin} />
                  </div>
                  <div className="flex justify-center">
                    <Switch id={`${section.id}-dev`} defaultChecked={section.dev} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
