import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto ml-48 px-4 py-8">
        <div className="flex flex-col md:flex-row justify-around items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © 2024 RBAC Dashboard. All rights reserved. <br />
              Developed By{" "}
              <Link
                href="https://mrabhaykumawat.netlify.app/"
                className="text-sm text-blue-600 hover:text-gray-900"
              >
                Abhay Kumawat
              </Link>
            </p>
          </div>
          <nav className="flex space-x-4 mb-4 md:mb-0">
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Terms of Service
            </Link>
          </nav>
          <div className="flex space-x-4">
            <a
              href="https://github.com/MrAbhayKumawat/rbac-ui-dashboard"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-900"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
