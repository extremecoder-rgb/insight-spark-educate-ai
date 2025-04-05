
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="py-4 border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-50">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">LI</span>
          </div>
          <span className="font-bold text-xl">LiveInsight</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="hover:text-highlight transition-colors">Home</Link>
          <Link to="/features" className="hover:text-highlight transition-colors">Features</Link>
          <Link to="/pricing" className="hover:text-highlight transition-colors">Pricing</Link>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link to="/signup">
              <Button>Get Started</Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={toggleMenu} className="relative">
            <Menu className={`h-6 w-6 transition-opacity ${isOpen ? 'opacity-0' : 'opacity-100'}`} />
            <X className={`h-6 w-6 absolute transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0'}`} />
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden fixed inset-x-0 top-[73px] p-4 bg-background border-b border-border transform ${isOpen ? 'translate-y-0' : '-translate-y-full'} transition-transform duration-300 ease-in-out z-40`}>
          <div className="flex flex-col space-y-4">
            <Link to="/" className="py-2 hover:text-highlight transition-colors" onClick={toggleMenu}>Home</Link>
            <Link to="/features" className="py-2 hover:text-highlight transition-colors" onClick={toggleMenu}>Features</Link>
            <Link to="/pricing" className="py-2 hover:text-highlight transition-colors" onClick={toggleMenu}>Pricing</Link>
            <div className="pt-2 flex flex-col space-y-3">
              <Link to="/login">
                <Button variant="outline" className="w-full">Log In</Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
