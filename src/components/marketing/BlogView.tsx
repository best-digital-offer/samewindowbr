import React, { useState } from 'react';
import { BLOG_POSTS, BlogPost } from '../../data/blogPosts';
import { ArrowLeft, BookOpen, Clock, Calendar, ChevronRight, User } from 'lucide-react';

interface BlogViewProps {
  onBackToApp: () => void;
}

export const BlogView: React.FC<BlogViewProps> = ({ onBackToApp }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-16">
        <button
          onClick={() => setSelectedPost(null)}
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Articles</span>
        </button>

        <article className="bg-[#0d1017] border border-slate-800 rounded-xl p-6 sm:p-8 space-y-6 shadow-xl">
          <div className="space-y-3 border-b border-slate-800 pb-6">
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span className="text-cyan-400 font-semibold">{selectedPost.category}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedPost.publishedAt}</span>
              <span aria-hidden="true">·</span>
              <span>{selectedPost.readTime}</span>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-100 leading-tight">
              {selectedPost.title}
            </h1>

            <div className="flex items-center gap-2 pt-2 text-xs text-slate-300">
              <span className="font-semibold">{selectedPost.author.name}</span>
              <span className="text-slate-500">({selectedPost.author.role})</span>
            </div>
          </div>

          <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
            {selectedPost.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-16">
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Operant Engineering</span>
          <span aria-hidden="true">·</span>
          <span>Technical Whitepapers & Research</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-slate-100">
          Architecture & Engineering Log
        </h1>
        <p className="text-xs text-slate-400">
          Deep dives into parallel headless browser workers, autonomous exploratory QA heuristics, and Model Context Protocol integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {BLOG_POSTS.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="bg-[#0e121a] border border-slate-800 rounded-xl p-5 space-y-3 cursor-pointer hover:border-cyan-500/40 hover:bg-slate-900/60 transition-all flex flex-col justify-between shadow-md"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="text-cyan-400 font-semibold">{post.category}</span>
                <span aria-hidden="true">·</span>
                <span>{post.readTime}</span>
              </div>

              <h2 className="text-sm font-bold text-slate-100 leading-snug hover:text-cyan-300 transition-colors">
                {post.title}
              </h2>

              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                {post.excerpt}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span className="truncate">{post.author.name}</span>
              <span className="text-cyan-400 flex items-center gap-1 font-medium shrink-0">
                Read Article
                <ChevronRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
