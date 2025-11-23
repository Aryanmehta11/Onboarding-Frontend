import { Layout } from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Mail, MessageSquare, AlertCircle } from 'lucide-react';

export default function MentorFeedback() {
  return (
    <Layout>
      <div className="p-8 space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Mentor & Feedback</h1>
          <p className="text-muted-foreground">Connect with your mentor and share feedback</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Mentor</CardTitle>
              <CardDescription>Your assigned mentor for guidance and support</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    AU
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-lg">Admin User</p>
                  <p className="text-sm text-muted-foreground">Senior Developer</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>admin@agaetis.com</span>
                </div>
              </div>
              <Button className="w-full">
                <MessageSquare className="mr-2 h-4 w-4" />
                Schedule Meeting
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submit Feedback</CardTitle>
              <CardDescription>Share your thoughts or report any blockers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Share your feedback, ask questions, or report any blockers..."
                className="min-h-[120px]"
              />
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Feedback
                </Button>
                <Button variant="outline" className="text-destructive hover:text-destructive">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  Report Blocker
                </Button>
              </div>
              <Button className="w-full">Submit</Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Interactions</CardTitle>
            <CardDescription>Your feedback and meeting history</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
              <p>No interactions yet</p>
              <p className="text-sm mt-1">Start by scheduling a meeting with your mentor</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
