import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, FileText } from 'lucide-react';
import { mockDocs } from '@/data/mockData';

export default function DevInternalDocs() {
  const [search, setSearch] = useState('');

  const filteredDocs = mockDocs
    .filter(doc => doc.roleVisibility.includes('dev'))
    .filter(doc =>
      doc.title.toLowerCase().includes(search.toLowerCase()) ||
      doc.category.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <Layout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Internal Docs</h1>
          <p className="text-muted-foreground">Access documentation and resources</p>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search documents..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {filteredDocs.map((doc) => (
            <Card key={doc.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-primary" />
                      {doc.title}
                    </CardTitle>
                    <CardDescription className="mt-2">
                      {doc.category} • {doc.uploadDate}
                    </CardDescription>
                  </div>
                  <Badge variant="secondary">{doc.category}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  View Document
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}
