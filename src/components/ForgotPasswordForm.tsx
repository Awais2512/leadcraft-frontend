import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader } from './ui/card';
import { Mail, ArrowLeft, CheckCircle } from 'lucide-react';
import { Logo } from './Logo';

interface ForgotPasswordFormProps {
  onBackToSignIn?: () => void;
  onResetSent?: () => void;
}

export function ForgotPasswordForm({ onBackToSignIn, onResetSent }: ForgotPasswordFormProps) {
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = (value: string) => {
    setEmail(value);
    // Clear error when user starts typing
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Simulate API call for password reset
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSuccess(true);
        onResetSent?.();
      } catch (error) {
        console.error('Password reset error:', error);
        setErrors({ email: 'Failed to send reset link. Please try again.' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md leadcraft-shadow-lg animate-scale-in">
          <CardContent className="p-8 text-center space-y-6">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl">Check your email</h1>
              <p className="text-muted-foreground">
                We've sent a password reset link to
              </p>
              <p className="font-medium text-foreground">{email}</p>
            </div>

            <div className="space-y-4 pt-4">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              
              <div className="flex flex-col gap-3">
                <Button
                  onClick={() => {
                    setIsSuccess(false);
                    setEmail('');
                  }}
                  variant="outline"
                  className="w-full"
                >
                  Try Another Email
                </Button>
                
                <Button
                  onClick={onBackToSignIn}
                  className="w-full leadcraft-gradient"
                >
                  Back to Sign In
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="w-full max-w-md leadcraft-shadow-lg animate-fade-in">
        <CardHeader className="space-y-1 text-center pb-6">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <h1 className="text-3xl">Reset your password</h1>
          <p className="text-muted-foreground">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => handleInputChange(e.target.value)}
                  className={`pl-10 ${errors.email ? 'border-destructive' : ''}`}
                  autoFocus
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <Button 
              type="submit" 
              className="w-full leadcraft-gradient"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Sending Reset Link...</span>
                </div>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>

          <div className="text-center pt-4">
            <Button
              variant="link"
              className="p-0 h-auto text-primary flex items-center mx-auto"
              onClick={onBackToSignIn}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Sign In
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}