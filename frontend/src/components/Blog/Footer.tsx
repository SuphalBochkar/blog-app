const Footer = () => {
  return (
    <div className="bg-gray-900 text-white rounded-lg p-6">
      <div className="grid gap-4 grid-cols-1 md:grid-cols-5">
        {/* About Section */}
        <div className="space-y-4 col-span-1">
          <div className="text-3xl font-bold">Blog Spot.</div>
          <div className="text-base font-normal text-gray-400">
            Empowering writers to share their voices, connect with readers, and
            showcase their stories through a dynamic and engaging platform.
          </div>
        </div>
        <div className="col-span-1"></div>

        {/* About Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">About</h3>
          <ul className="space-y-2 text-base font-normal text-gray-400">
            <li>
              <a href="#" className="hover:underline">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Career
              </a>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Support</h3>
          <ul className="space-y-2 text-base font-normal text-gray-400">
            <li>
              <a href="#" className="hover:underline">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Return
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                FAQ
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter Signup */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Get Updates</h3>
          <p>Enter your email address to subscribe to our newsletter.</p>
          <div className="mt-4">
            <input
              type="email"
              placeholder="Your Email"
              className="p-2 w-full rounded-md border border-gray-600 bg-gray-900 text-white"
            />
            <button className="mt-2 w-full text-gray-900 p-2 bg-gray-100 rounded-md hover:bg-gray-600 hover:text-white transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-900 pt-6">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm">
          <div>&copy; 2024 Blog Spot. All rights reserved.</div>
          <div className="space-x-4">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
