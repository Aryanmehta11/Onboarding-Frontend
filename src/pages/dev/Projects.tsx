import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Code } from 'lucide-react';
import { mockProjects } from '@/data/mockData';
import { FileText } from "lucide-react";
export default function DevProjects() {
  return (
    <Layout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">Your assigned projects</p>
        </div>

        <div className="grid gap-6">
          {mockProjects.slice(0, 1).map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{project.name}</CardTitle>
                    <CardDescription>Mentor: {project.mentor}</CardDescription>
                  </div>
                  <a href={project.repo} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Repo
                    </Button>
                  </a>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-3">Tech Stack</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <Badge key={idx} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3">Setup Guide</h3>
                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <pre className="text-sm whitespace-pre-wrap">{project.setupGuide}</pre>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Code className="h-4 w-4" />
                    Code Map
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {project.codeMap.modules.map((module, idx) => (
                      <Card key={idx} className="bg-secondary/30">
                        <CardContent className="p-4 text-center">
                          <p className="text-sm font-medium">{module}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  
                </div>
                {/* Documents */}
                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4" />  
                    Documents
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {[
                      { name: 'CISV Architecture Overview', link: '/docs/cisv-architecture.pdf' },
                      { name: 'API Endpoints Reference', link: '/docs/api-reference.pdf' },
                      { name: 'Deployment Guidelines', link: '/docs/deployment-guide.pdf' },
                      { name: 'Guardian-Child Linking Flow', link: '/docs/guardian-child-flow.pdf' },
                      { name: 'MailUser Migration Plan', link: '/docs/mailuser-migration.pdf' },
                      { name: 'Azure Function Workflows', link: '/docs/azure-functions.pdf' },
                    ].map((doc, idx) => (
                      <Card key={idx} className="bg-secondary/30 hover:bg-secondary/40 transition">
                        <CardContent className="p-4 flex items-center justify-between">
                          <p className="text-sm font-medium">{doc.name}</p>
                          <a href={doc.link} target="_blank" rel="noopener noreferrer">
                            <Button variant="ghost" size="sm">
                              <ExternalLink className="h-4 w-4" />
                            </Button>
                          </a>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>


                

                

                
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
