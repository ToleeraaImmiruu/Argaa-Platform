import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Simple SVG icons for social media
const FacebookIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
);
const TwitterIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const InstagramIcon = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.012 3.584-.07 4.85c-.148 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.012-3.584.07-4.85c.148-3.225 1.664-4.771 4.919-4.919 1.266-.058 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.059-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>
);


const Footer = () => {
    return (
        <motion.footer 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800 text-gray-300"
        >
            <div className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    
                    {/* Column 1: Brand and Mission */}
                    <div className="col-span-1 md:col-span-2">
                        <h2 className="text-2xl font-bold text-white mb-4">
                            Argaa<span className="text-blue-500">Platform</span>
                        </h2>
                        <p className="max-w-md text-gray-400">
                            Our mission is to connect travelers with authentic, unforgettable experiences led by passionate local guides. We believe in the power of community-driven tourism to create genuine connections and lasting memories.
                        </p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Explore</h3>
                        <ul className="space-y-2">
                            <li><Link to="/" className="hover:text-blue-400 transition-colors">Official Tours</Link></li>
                            <li><Link to="/custom-tours" className="hover:text-blue-400 transition-colors">Community Trips</Link></li>
                            <li><Link to="/signup" className="hover:text-blue-400 transition-colors">Become a Guide</Link></li>
                            <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                        </ul>
                    </div>
                    
                    {/* Column 3: Contact & Socials */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
                        <ul className="space-y-2 mb-4">
                            <li><a href="mailto:contact@argaa.com" className="hover:text-blue-400 transition-colors">contact@argaa.com</a></li>
                            <li><p>Addis Ababa, Ethiopia</p></li>
                        </ul>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><FacebookIcon className="h-6 w-6" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon className="h-6 w-6" /></a>
                            <a href="#" className="text-gray-400 hover:text-white transition-colors"><InstagramIcon className="h-6 w-6" /></a>
                        </div>
                    </div>

                </div>

                {/* Bottom Bar */}
                <div className="mt-12 border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© {new Date().getFullYear()} Argaa Platform. All Rights Reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link to="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
                        <Link to="/terms-of-service" className="hover:text-white">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;