import { useState } from 'react';
import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockTasks } from '@/data/mockData';

export default function Tasks() {
  const [tasks, setTasks] = useState(mockTasks);
  const [notesDrafts, setNotesDrafts] = useState<{ [key: string]: string }>({});

  // --- Handlers ---
  const toggleTaskCompletion = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleNoteChange = (id: string, value: string) => {
    setNotesDrafts(prev => ({ ...prev, [id]: value }));
  };

  const saveNotes = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, notes: notesDrafts[id] || task.notes } : task
      )
    );
  };

  // --- Filtering ---
  const preboardingTasks = tasks.filter(t => t.type === 'preboarding');
  const onboardingTasks = tasks.filter(t => t.type === 'onboarding');

  // --- Progress Calculation ---
  const calcProgress = (subset: typeof tasks) =>
    subset.length > 0
      ? (subset.filter(t => t.completed).length / subset.length) * 100
      : 0;

  const preboardingProgress = calcProgress(preboardingTasks);
  const onboardingProgress = calcProgress(onboardingTasks);

  // --- UI Helper ---
  const renderTaskCard = (task: any) => (
    <Card key={task.id} className="transition-all hover:shadow-md">
      <CardHeader>
        <div className="flex items-start gap-3">
          <Checkbox
            checked={task.completed}
            onCheckedChange={() => toggleTaskCompletion(task.id)}
            className="mt-1"
          />
          <div className="flex-1">
            <CardTitle
              className={`${
                task.completed ? 'line-through text-muted-foreground' : ''
              } transition-colors`}
            >
              {task.title}
            </CardTitle>
            {task.notes && (
              <CardDescription className="mt-2">{task.notes}</CardDescription>
            )}
          </div>
        </div>
      </CardHeader>

      {!task.completed && (
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Add notes..."
            value={notesDrafts[task.id] ?? task.notes ?? ''}
            onChange={(e) => handleNoteChange(task.id, e.target.value)}
          />
          <Button size="sm" onClick={() => saveNotes(task.id)}>
            Save Notes
          </Button>
        </CardContent>
      )}
    </Card>
  );

  return (
    <Layout>
      <div className="p-8 space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-muted-foreground">Track your onboarding progress</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="preboarding" className="space-y-6">
          <TabsList>
            <TabsTrigger value="preboarding">
              Preboarding
              <Badge variant="secondary" className="ml-2">
                {Math.round(preboardingProgress)}%
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="onboarding">
              Onboarding
              <Badge variant="secondary" className="ml-2">
                {Math.round(onboardingProgress)}%
              </Badge>
            </TabsTrigger>
          </TabsList>

          {/* --- Preboarding Tab --- */}
          <TabsContent value="preboarding" className="space-y-4">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Overall Progress
                </span>
                <span className="text-sm font-medium">
                  {Math.round(preboardingProgress)}%
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${preboardingProgress}%` }}
                />
              </div>
            </div>

            {preboardingTasks.map(renderTaskCard)}
          </TabsContent>

          {/* --- Onboarding Tab --- */}
          <TabsContent value="onboarding" className="space-y-4">
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">
                  Overall Progress
                </span>
                <span className="text-sm font-medium">
                  {Math.round(onboardingProgress)}%
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-500"
                  style={{ width: `${onboardingProgress}%` }}
                />
              </div>
            </div>

            {onboardingTasks.map(renderTaskCard)}
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}
