// hooks/useMarkdownRenderer.js
import React from 'react';

export function useMarkdownRenderer() {
  const handleFormSubmit = (e, onSubmit) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  const MarkdownComponents = {
    form({ node, onSubmit, ...props }) {
      return (
        <form 
          {...props} 
          onSubmit={(e) => handleFormSubmit(e, onSubmit)}
          className="space-y-3 my-2"
        />
      );
    },
    input({ node, ...props }) {
      return (
        <input
          {...props}
          className="w-full p-2 bg-[rgba(30,30,50,0.8)] border border-cyan-500/30 rounded text-slate-300"
        />
      );
    },
    select({ node, ...props }) {
      return (
        <select
          {...props}
          className="w-full p-2 bg-[rgba(30,30,50,0.8)] border border-cyan-500/30 rounded text-slate-300"
        >
          {props.children}
        </select>
      );
    },
    button({ node, ...props }) {
      return (
        <button
          {...props}
          type={props.type || "submit"}
          className="px-4 py-2 bg-cyan-600/80 hover:bg-cyan-500/90 rounded transition-colors"
        />
      );
    }
  };

  return { MarkdownComponents, handleFormSubmit };
}