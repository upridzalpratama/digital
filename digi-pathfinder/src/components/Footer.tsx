import { Link } from "react-router-dom";
import { Compass } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-muted/30 mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-2">
            <div className="rounded-xl bg-gradient-primary p-2">
              <Compass className="h-4 w-4 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold">Routsy</p>
              <p className="text-xs text-muted-foreground">Digital Marketing Career Pathfinder</p>
            </div>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="#" className="hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link to="#" className="hover:text-foreground transition-colors">
              Contact
            </Link>
          </div>
        </div>
        
        <div className="mt-6 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Routsy. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
