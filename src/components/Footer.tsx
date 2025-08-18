import { FaFacebookF, FaLinkedinIn, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { FaApple, FaAndroid } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-green-100 text-gray-800 mt-10 rounded-t-xl">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Links grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-sm">
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-700">About Us</a></li>
              <li><a href="#" className="hover:text-green-700">Feedback</a></li>
              <li><a href="#" className="hover:text-green-700">Trust & Safety</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-700">Help & Support</a></li>
              <li><a href="#" className="hover:text-green-700">Our Foundation</a></li>
              <li><a href="#" className="hover:text-green-700">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-700">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-green-700">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-green-700">Accessibility</a></li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-green-700">Desktop App</a></li>
              <li><a href="#" className="hover:text-green-700">Enterprise Solutions</a></li>
              <li><a href="#" className="hover:text-green-700">Release Notes</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-300"></div>

        {/* Social & Mobile apps */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <span className="font-medium">Follow Us</span>
            <FaFacebookF className="hover:text-green-700 cursor-pointer" />
            <FaLinkedinIn className="hover:text-green-700 cursor-pointer" />
            <FaTwitter className="hover:text-green-700 cursor-pointer" />
            <FaYoutube className="hover:text-green-700 cursor-pointer" />
            <FaInstagram className="hover:text-green-700 cursor-pointer" />
          </div>

          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <span className="font-medium">Mobile app</span>
            <FaApple className="hover:text-green-700 cursor-pointer" />
            <FaAndroid className="hover:text-green-700 cursor-pointer" />
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-6 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} LeadCraft Inc. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
