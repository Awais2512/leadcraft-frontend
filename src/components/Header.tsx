import React from 'react';
import { Button } from './ui/button';
import { Logo } from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, User, Settings, LogOut, LayoutDashboard, Briefcase } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback } from './ui/avatar';

interface HeaderProps {
  isAuthenticated?: boolean;
  user?: {
    name: string;
    email: string;
    initials: string;
  };
  onSignIn?: () => void;
  onSignUp?: () => void;
  onSignOut?: () => void;
  onProfile?: () => void;
  onSettings?: () => void;
  onDashboard?: () => void;
  onJobs?: () => void;
  currentPage?: 'dashboard' | 'profile' | 'jobs';
}

export function Header({
  isAuthenticated = false,
  user,
  onSignIn,
  onSignUp,
  onSignOut,
  onProfile,
  onSettings,
  onDashboard,
  onJobs,
  currentPage
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <Logo size="md" />
            
            {/* Navigation for authenticated users */}
            {isAuthenticated && (
              <nav className="hidden md:flex items-center space-x-6">
                <Button
                  variant={currentPage === 'dashboard' ? 'default' : 'ghost'}
                  onClick={onDashboard}
                  className={currentPage === 'dashboard' ? 'leadcraft-gradient' : ''}
                >
                  <LayoutDashboard className="h-4 w-4 mr-2" />
                  Dashboard
                </Button>
                <Button
                  variant={currentPage === 'jobs' ? 'default' : 'ghost'}
                  onClick={onJobs}
                  className={currentPage === 'jobs' ? 'leadcraft-gradient' : ''}
                >
                  <Briefcase className="h-4 w-4 mr-2" />
                  Jobs
                </Button>
                <Button
                  variant={currentPage === 'profile' ? 'default' : 'ghost'}
                  onClick={onProfile}
                  className={currentPage === 'profile' ? 'leadcraft-gradient' : ''}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </nav>
            )}
          </div>

          {/* Desktop Navigation - Landing Page */}
          {!isAuthenticated && (
            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </a>
              <a
                href="#about"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                About
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </a>
            </nav>
          )}

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            
            {!isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-3">
                <Button variant="ghost" onClick={onSignIn}>
                  Sign In
                </Button>
                <Button onClick={onSignUp} className="leadcraft-gradient">
                  Get Started
                </Button>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user?.initials || 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex flex-col space-y-1 p-2">
                    <p className="text-sm font-medium leading-none">{user?.name}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onDashboard}>
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onJobs}>
                    <Briefcase className="mr-2 h-4 w-4" />
                    Jobs
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onProfile}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onSettings}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border">
            <nav className="flex flex-col space-y-1 py-4">
              {!isAuthenticated ? (
                <>
                  <a
                    href="#features"
                    className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  >
                    Features
                  </a>
                  <a
                    href="#pricing"
                    className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  >
                    Pricing
                  </a>
                  <a
                    href="#about"
                    className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  >
                    About
                  </a>
                  <a
                    href="#contact"
                    className="block px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-colors"
                  >
                    Contact
                  </a>
                  <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                    <Button variant="ghost" onClick={onSignIn} className="justify-start">
                      Sign In
                    </Button>
                    <Button onClick={onSignUp} className="justify-start leadcraft-gradient">
                      Get Started
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={onDashboard}
                    className="justify-start"
                  >
                    <LayoutDashboard className="h-4 w-4 mr-2" />
                    Dashboard
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={onJobs}
                    className="justify-start"
                  >
                    <Briefcase className="h-4 w-4 mr-2" />
                    Jobs
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={onProfile}
                    className="justify-start"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={onSettings}
                    className="justify-start"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}