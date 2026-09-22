import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Sofa } from "lucide-react";

type FooterLink = {
  label: string;
  href: string;
};

type FooterProps = {
  companyName?: string;
  links?: FooterLink[];
};

const FacebookIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.9h2.54V9.85c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.44 2.9h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
  </svg>
);

const InstagramIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.98c-3.14 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.6-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.6.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.6.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.63 3.63 0 0 0-.88-1.35 3.63 3.63 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.6-.07-4.74-.07Zm0 3.37a5.49 5.49 0 1 1 0 10.98 5.49 5.49 0 0 1 0-10.98Zm0 1.98a3.51 3.51 0 1 0 0 7.02 3.51 3.51 0 0 0 0-7.02Zm5.71-2.28a1.28 1.28 0 1 1 0 2.56 1.28 1.28 0 0 1 0-2.56Z" />
  </svg>
);

const TwitterIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.65l-5.21-6.82-5.96 6.82H1.68l7.73-8.84L1.25 2.25h6.82l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64Z" />
  </svg>
);

const YoutubeIcon = ({ size = 15 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.5 6.5a3 3 0 0 0-2.11-2.12C19.5 3.87 12 3.87 12 3.87s-7.5 0-9.39.51A3 3 0 0 0 .5 6.5 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.5 3 3 0 0 0 2.11 2.12c1.89.51 9.39.51 9.39.51s7.5 0 9.39-.51a3 3 0 0 0 2.11-2.12A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.5ZM9.6 15.6V8.4l6.24 3.6-6.24 3.6Z" />
  </svg>
);

const Footer = ({
  companyName = "Furnew",
  links = [],
}: FooterProps) => {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-primary-dark/10 bg-primary-dark text-white/70">
      <div className="container grid gap-10 py-12 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary text-white">
              <Sofa size={18} />
            </span>
            <span className="font-josefin text-[19px] font-semibold text-white">
              {companyName}
            </span>
          </Link>

          <p className="mt-4 text-[14px] leading-relaxed">
            Furniture that feels like home. Thoughtfully crafted pieces for
            everyday living.
          </p>

          <div className="mt-5 flex items-center gap-2">
            {[
              { Icon: FacebookIcon, label: "Facebook" },
              { Icon: InstagramIcon, label: "Instagram" },
              { Icon: TwitterIcon, label: "Twitter" },
              { Icon: YoutubeIcon, label: "Youtube" },
            ].map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-primary hover:bg-primary hover:text-white"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>


        <div>
          <h3 className="font-josefin text-[15px] font-semibold text-white">
            Shop
          </h3>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            <li>
              <Link to="/products" className="hover:text-primary">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-primary">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-primary">
                Blogs
              </Link>
            </li>
            <li>
              <Link to="/carts" className="hover:text-primary">
                Cart
              </Link>
            </li>
          </ul>
        </div>

    
        <div>
          <h3 className="font-josefin text-[15px] font-semibold text-white">
            Account
          </h3>
          <ul className="mt-4 space-y-2.5 text-[14px]">
            <li>
              <Link to="/login" className="hover:text-primary">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-primary">
                Register
              </Link>
            </li>
            <li>
              <Link to="/orders" className="hover:text-primary">
                My Orders
              </Link>
            </li>
            <li>
              <Link to="/my-products" className="hover:text-primary">
                My Products
              </Link>
            </li>
          </ul>
        </div>

    
        <div>
          <h3 className="font-josefin text-[15px] font-semibold text-white">
            Contact
          </h3>
          <ul className="mt-4 space-y-3 text-[14px]">
            <li className="flex items-center gap-2.5">
              <MapPin size={15} className="text-primary" />
              Kathmandu, Nepal
            </li>
            <li className="flex items-center gap-2.5">
              <Phone size={15} className="text-primary" />
              <a href="tel:+9779800000000" className="hover:text-primary">
                +977 98-0000-0000
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail size={15} className="text-primary" />
              <a
                href="mailto:support@furnew.com"
                className="hover:text-primary"
              >
                support@furnew.com
              </a>
            </li>
          </ul>
        </div>
      </div>

   
      <div className="border-t border-white/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-4 text-[13px] sm:flex-row">
          <p className="text-white/50">
            © {year} {companyName}. All rights reserved.
          </p>

        
          {links.length > 0 ? (
            <div className="flex flex-wrap items-center gap-5">
              {links.map((l) => (
                <Link
                  key={l.label}
                  to={l.href}
                  className="text-white/50 hover:text-primary"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-5">
              <Link to="/privacy" className="text-white/50 hover:text-primary">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-white/50 hover:text-primary">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-white/50 hover:text-primary">
                Contact
              </Link>
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;