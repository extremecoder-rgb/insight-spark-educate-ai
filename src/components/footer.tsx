
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="border-t border-border bg-background py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">LI</span>
              </div>
              <span className="font-bold text-xl">LiveInsight</span>
            </Link>
            <p className="mt-4 text-muted-foreground">Empowering educators with real-time student insights powered by AI.</p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Product</h3>
            <ul className="space-y-3">
              <li><Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</Link></li>
              <li><Link to="/integrations" className="text-muted-foreground hover:text-foreground transition-colors">Integrations</Link></li>
              <li><Link to="/roadmap" className="text-muted-foreground hover:text-foreground transition-colors">Roadmap</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-3">
              <li><Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</Link></li>
              <li><Link to="/guides" className="text-muted-foreground hover:text-foreground transition-colors">Guides</Link></li>
              <li><Link to="/help" className="text-muted-foreground hover:text-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/api" className="text-muted-foreground hover:text-foreground transition-colors">API</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/careers" className="text-muted-foreground hover:text-foreground transition-colors">Careers</Link></li>
              <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">&copy; 2025 LiveInsight. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Terms</Link>
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Privacy</Link>
            <Link to="/cookies" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
