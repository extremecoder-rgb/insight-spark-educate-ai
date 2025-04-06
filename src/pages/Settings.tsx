
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useApiKeys } from '@/contexts/api-keys-context';
import { useToast } from '@/hooks/use-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function Settings() {
  const { apiKeys, setApiKey } = useApiKeys();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [grokKey, setGrokKey] = useState(apiKeys.grokApiKey || '');
  const [fluvioKey, setFluvioKey] = useState(apiKeys.fluvioApiKey || '');
  const [resetDialogOpen, setResetDialogOpen] = useState(false);

  const handleSave = () => {
    setApiKey('grokApiKey', grokKey);
    setApiKey('fluvioApiKey', fluvioKey);
    
    toast({
      title: "API Keys Saved",
      description: "Your API keys have been saved locally. They will persist until you clear your browser data.",
    });
  };

  const handleReset = () => {
    localStorage.removeItem('grokApiKey');
    localStorage.removeItem('fluvioApiKey');
    setGrokKey('');
    setFluvioKey('');
    setApiKey('grokApiKey', '');
    setApiKey('fluvioApiKey', '');
    
    toast({
      title: "API Keys Reset",
      description: "Your API keys have been removed from local storage.",
    });
    
    setResetDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">API Settings</h1>
        <Button variant="outline" onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Grok AI Integration</CardTitle>
            <CardDescription>
              Enter your Grok AI API key to enable AI insights and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="grok-api-key" className="text-sm font-medium">
                  Grok API Key
                </label>
                <Input
                  id="grok-api-key"
                  type="password"
                  placeholder="Enter your Grok AI API key"
                  value={grokKey}
                  onChange={(e) => setGrokKey(e.target.value)}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>Note: This key will be stored in your browser's local storage.</p>
                <p>For production use, server-side storage with environment variables is recommended.</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Fluvio Streaming Integration</CardTitle>
            <CardDescription>
              Configure your Fluvio event streaming service for real-time monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="fluvio-api-key" className="text-sm font-medium">
                  Fluvio API Key
                </label>
                <Input
                  id="fluvio-api-key"
                  type="password"
                  placeholder="Enter your Fluvio API key"
                  value={fluvioKey}
                  onChange={(e) => setFluvioKey(e.target.value)}
                />
              </div>
              <div className="text-sm text-muted-foreground">
                <p>This key enables real-time screen monitoring and event streaming.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-end gap-4 mt-6">
        <Button variant="outline" onClick={() => setResetDialogOpen(true)}>
          Reset Keys
        </Button>
        <Button onClick={handleSave}>
          Save Settings
        </Button>
      </div>
      
      <Dialog open={resetDialogOpen} onOpenChange={setResetDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reset API Keys</DialogTitle>
            <DialogDescription>
              This will remove all stored API keys from your browser's local storage.
              Are you sure you want to continue?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setResetDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleReset}>
              Reset Keys
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
