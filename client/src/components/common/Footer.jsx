import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-purple-900 text-white py-8 rounded-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-2">TuneHub</h3>
            <p className="text-sm">Your ultimate music streaming platform</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link href="/" className="hover:text-purple-300 transition-colors duration-300">
                Home
              </Link>
              <Link href="/about" className="hover:text-purple-300 transition-colors duration-300">
                About Us
              </Link>
              <Link href="/connect" className="hover:text-purple-300 transition-colors duration-300">
                Connect
              </Link>
              <Link href="/privacy" className="hover:text-purple-300 transition-colors duration-300">
                Privacy Policy
              </Link>
            </nav>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-purple-300 transition-colors duration-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-purple-300 transition-colors duration-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-purple-300 transition-colors duration-300">
                <Instagram className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center text-sm">
          <p>&copy; 2025 TuneHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer