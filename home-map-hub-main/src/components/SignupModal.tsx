import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Building2, Mail, Lock, User, Home, Briefcase, CheckCircle2 } from 'lucide-react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  role: string;
}

interface Role {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  description: string;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    role: '',
  });

  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    // Handle signup
    console.log('Form submitted:', formData);
    onClose();
  };

  const roles: Role[] = [
    { value: 'tenant', label: 'Tenant', icon: User, description: 'Looking to rent' },
    { value: 'landlord', label: 'Landlord', icon: Home, description: 'Own properties' },
    { value: 'agent', label: 'Agent', icon: Briefcase, description: 'Manage properties' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-gradient-to-br from-black/60 via-black/50 to-black/60 backdrop-blur-md">
      <Card className="w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl shadow-2xl mx-auto my-auto max-h-[95vh] overflow-y-auto border-2 border-primary/10">
        <CardHeader className="text-center pb-2 sm:pb-4 space-y-2">
          <div className="flex justify-center mb-2 sm:mb-3">
            <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
              <Building2 className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            Create Your Account
          </CardTitle>
          <CardDescription className="text-xs sm:text-sm">
            Join thousands finding their perfect home
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <div className="space-y-1">
              <Label htmlFor="name" className="text-xs sm:text-sm font-medium">
                Full Name
              </Label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="name"
                  placeholder="Brian Mwalish"
                  className="pl-10 h-10 sm:h-11 text-sm border-2 focus:border-primary transition-colors"
                  value={formData.name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="email" className="text-xs sm:text-sm font-medium">
                Email Address
              </Label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 h-10 sm:h-11 text-sm border-2 focus:border-primary transition-colors"
                  value={formData.email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="password" className="text-xs sm:text-sm font-medium">
                Password
              </Label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="pl-10 h-10 sm:h-11 text-sm border-2 focus:border-primary transition-colors"
                  value={formData.password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <Label htmlFor="role" className="text-xs sm:text-sm font-medium">
                I am a
              </Label>
              <Select
                value={formData.role}
                onValueChange={(value: string) => setFormData({ ...formData, role: value })}
              >
                <SelectTrigger className="mt-1 h-10 sm:h-11 text-sm border-2 focus:border-primary transition-colors">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  {roles.map((role: Role) => {
                    const IconComponent = role.icon;
                    return (
                      <SelectItem key={role.value} value={role.value}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span className="font-medium">{role.label}</span>
                          <span className="text-xs text-muted-foreground">- {role.description}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-start gap-2 text-xs bg-muted/30 p-3 rounded-lg">
              <div className="relative flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  className="mt-0.5 rounded border-2 border-border h-4 w-4 accent-primary cursor-pointer"
                  checked={agreedToTerms}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setAgreedToTerms(e.target.checked)
                  }
                  required
                />
                {agreedToTerms && (
                  <CheckCircle2 className="absolute h-4 w-4 text-primary pointer-events-none" />
                )}
              </div>
              <label htmlFor="terms" className="text-muted-foreground cursor-pointer">
                I agree to the{' '}
                <Link to="/terms" className="text-primary font-medium hover:underline">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-primary font-medium hover:underline">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              variant="hero"
              className="w-full h-10 sm:h-11 text-sm font-semibold shadow-lg hover:shadow-xl transition-all"
              size="lg"
            >
              Create Account
            </Button>
          </form>

          <div className="mt-4 sm:mt-5 text-center space-y-2">
            <div className="text-xs sm:text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">
                Sign in
              </Link>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="min-h-[36px] h-9 text-xs hover:bg-muted/50"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignupModal;