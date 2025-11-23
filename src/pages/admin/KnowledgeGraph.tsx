import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Network } from 'lucide-react';

export default function KnowledgeGraph() {
  return (
    <Layout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Graph</h1>
          <p className="text-muted-foreground">Visual map of connections</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Network Visualization
            </CardTitle>
            <CardDescription>
              Interactive graph showing relationships between users, projects, and docs
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-secondary/20 rounded-lg p-12 flex flex-col items-center justify-center min-h-[400px] border-2 border-dashed border-border">
              <Network className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center">
                Interactive knowledge graph visualization
              </p>
              <p className="text-sm text-muted-foreground text-center mt-2">
                Users ↔ Projects ↔ Docs ↔ Code
              </p>
              <div className="flex gap-2 mt-4">
                <Badge variant="secondary">4 Users</Badge>
                <Badge variant="secondary">3 Projects</Badge>
                <Badge variant="secondary">4 Docs</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
