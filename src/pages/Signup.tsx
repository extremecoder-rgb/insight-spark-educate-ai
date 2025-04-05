
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { useToast } from "@/hooks/use-toast";

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState('teacher');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Account created successfully",
        description: "Welcome to LiveInsight! You can now log in.",
      });
      
      // Redirect to login page after successful signup
      navigate('/login');
    } catch (error) {
      toast({
        title: "Signup error",
        description: "An error occurred. Please try again later.",
        variant: "destructive",
      });
      console.error('Signup error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-12">
        <Card className="w-full max-w-md">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
            <CardDescription>
              Enter your information to get started with LiveInsight
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Password must be at least 8 characters long
                </p>
              </div>
              <div className="space-y-2">
                <Label>Account Type</Label>
                <RadioGroup 
                  value={userType} 
                  onValueChange={setUserType} 
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="teacher" id="teacher" />
                    <Label htmlFor="teacher">Teacher</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="student" id="student" />
                    <Label htmlFor="student">Student</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign up"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col">
            <div className="text-center text-sm">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
