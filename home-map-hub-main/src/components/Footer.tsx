import { Link } from 'react-router-dom';
import { Building2, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    'For Tenants': [
      { label: 'Search Properties', href: '/properties' },
      { label: 'Map Search', href: '/map' },
      { label: 'How It Works', href: '/#how-it-works' },
      { label: 'FAQs', href: '/faq' },
    ],
    'For Landlords': [
      { label: 'List Property', href: '/list-property' },
      { label: 'Dashboard', href: '/dashboard/landlord' },
      { label: 'Pricing', href: '/pricing' },
      { label: 'Resources', href: '/resources' },
    ],
    'Company': [
      { label: 'About Us', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Careers', href: '/careers' },
      { label: 'Blog', href: '/blog' },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Building2 className="h-6 w-6 text-secondary-foreground" />
              </div>
              <span className="font-serif text-2xl font-bold">HomeLeasing</span>
            </Link>
            <p className="text-primary-foreground/70 max-w-sm mb-6">
              Your trusted platform for finding the perfect rental property. Connect with landlords and agents seamlessly.
            </p>
            <div className="space-y-2 text-sm text-primary-foreground/70">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>contact@homeleasing.com</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+254714137834</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>New York, NY 10001</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-sm text-primary-foreground/70 hover:text-secondary transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            © {currentYear} HomeLeasing. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-primary-foreground/60">
            <Link to="/privacy" className="hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-secondary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
