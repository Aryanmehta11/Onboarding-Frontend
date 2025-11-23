import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network, User, FolderKanban, FileText } from 'lucide-react';

export default function DevKnowledgeGraph() {
  return (
    <Layout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Graph</h1>
          <p className="text-muted-foreground">Your personal network view</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Personal Network
            </CardTitle>
            <CardDescription>
              Your connections to mentors, projects, and resources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-secondary/20 rounded-lg p-12 flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-border">
              <Network className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center mb-6">
                Interactive personal knowledge graph
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-2xl">
                <Card className="bg-primary/10 border-primary/20">
                  <CardContent className="p-4 text-center">
                    <User className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">You</p>
                  </CardContent>
                </Card>
                <Card className="bg-accent/10 border-accent/20">
                  <CardContent className="p-4 text-center">
                    <User className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">Mentor</p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary">
                  <CardContent className="p-4 text-center">
                    <FolderKanban className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">Project</p>
                  </CardContent>
                </Card>
                <Card className="bg-secondary">
                  <CardContent className="p-4 text-center">
                    <FileText className="h-6 w-6 mx-auto mb-2" />
                    <p className="text-sm font-medium">Docs</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
