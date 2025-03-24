"use client";

export default function Footer() {
  return (
    <footer className="w-full p-6 bg-[rgba(10,10,20,0.95)] border-t border-[rgba(0,255,255,0.1)]">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Side: Copyright */}
        <p className="text-slate-400 text-sm">
          &copy; {new Date().getFullYear()} LLM GEM. All rights reserved.
        </p>

        {/* Right Side: Links */}
        <div className="flex items-center gap-4">
          <a
            href="/privacy-policy"
            className="text-slate-400 hover:text-cyan-300 transition-colors duration-200 text-sm"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="text-slate-400 hover:text-cyan-300 transition-colors duration-200 text-sm"
          >
            Terms of Service
          </a>
          {/* <a
            href="https://twitter.com/llmgem"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-cyan-300 transition-colors duration-200 text-sm"
          >
            Twitter
          </a> */}
        </div>
      </div>
    </footer>
  );
}

