// CirclePage.jsx — individual circle detail: posts feed, upvote, new post, comments
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Users, MessageCircle, ThumbsUp, Plus, Send, Loader2,
  ChevronDown, Lock, Clock, TrendingUp, X, AlertCircle
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useAuth } from '../utils/AuthContext';
import { useModal } from '../context/ModalContext';
import {
  getCircleBySlug, joinCircle, leaveCircle,
  getPosts, createPost, upvotePost,
  getComments, createComment,
} from '../services/circlesService';

function timeAgo(dateStr) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const m = Math.floor(diff / 60000);
  if (m < 1) return 'just now';
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function Avatar({ name, size = 8 }) {
  const initials = (name || '?').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
  const colors = ['bg-blue-500', 'bg-purple-500', 'bg-emerald-500', 'bg-orange-500', 'bg-rose-500', 'bg-indigo-500'];
  const color = colors[initials.charCodeAt(0) % colors.length];
  return (
    <div className={`w-${size} h-${size} rounded-full ${color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
      {initials}
    </div>
  );
}

export default function CirclePage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { openModal } = useModal();

  const [circle, setCircle] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingCircle, setLoadingCircle] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [isMember, setIsMember] = useState(false);
  const [joining, setJoining] = useState(false);
  const [sort, setSort] = useState('new'); // 'new' | 'top'
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);

  // New post
  const [showNewPost, setShowNewPost] = useState(false);
  const [postTitle, setPostTitle] = useState('');
  const [postBody, setPostBody] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [postError, setPostError] = useState('');

  // Open comments
  const [openPostId, setOpenPostId] = useState(null);
  const [comments, setComments] = useState({});
  const [loadingComments, setLoadingComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [sendingComment, setSendingComment] = useState({});

  const [upvoted, setUpvoted] = useState({});

  // Load circle info
  useEffect(() => {
    const load = async () => {
      try {
        const data = await getCircleBySlug(slug);
        setCircle(data);
        if (isAuthenticated && user && data.memberIds?.includes(user.$id)) {
          setIsMember(true);
        }
      } catch { } finally { setLoadingCircle(false); }
    };
    load();
  }, [slug, isAuthenticated, user]);

  // Load posts
  useEffect(() => {
    const load = async () => {
      setLoadingPosts(true);
      try {
        const data = await getPosts(slug, { sort, page });
        setPosts(page === 1 ? data.posts : prev => [...prev, ...data.posts]);
        setHasMore(data.hasMore);
      } catch { } finally { setLoadingPosts(false); }
    };
    load();
  }, [slug, sort, page]);

  const handleSortChange = (s) => { setSort(s); setPage(1); };

  const handleJoinLeave = async () => {
    if (!isAuthenticated) { openModal('login'); return; }
    setJoining(true);
    try {
      if (isMember) {
        await leaveCircle(slug);
        setIsMember(false);
        setCircle(c => c && { ...c, memberCount: Math.max(0, c.memberCount - 1) });
      } else {
        await joinCircle(slug);
        setIsMember(true);
        setCircle(c => c && { ...c, memberCount: c.memberCount + 1 });
      }
    } catch { } finally { setJoining(false); }
  };

  const handleUpvote = async (e, postId) => {
    e.stopPropagation();
    if (!isAuthenticated) { openModal('login'); return; }
    try {
      const res = await upvotePost(postId);
      setUpvoted(p => ({ ...p, [postId]: res.upvoted }));
      setPosts(prev => prev.map(p => p._id === postId ? { ...p, upvoteCount: res.upvoteCount } : p));
    } catch { }
  };

  const handleNewPost = async () => {
    if (!isAuthenticated) { openModal('login'); return; }
    if (!isMember) { setPostError('Join this circle first to post.'); return; }
    if (!postTitle.trim()) { setPostError('Title cannot be empty.'); return; }
    setSubmitting(true);
    setPostError('');
    try {
      const post = await createPost(slug, { title: postTitle, body: postBody });
      setPosts(prev => [post, ...prev]);
      setPostTitle(''); setPostBody(''); setShowNewPost(false);
      setCircle(c => c && { ...c, postCount: c.postCount + 1 });
    } catch (err) {
      setPostError(err?.response?.data?.error || 'Failed to post. Try again.');
    } finally { setSubmitting(false); }
  };

  const toggleComments = async (postId) => {
    if (openPostId === postId) { setOpenPostId(null); return; }
    setOpenPostId(postId);
    if (!comments[postId]) {
      setLoadingComments(p => ({ ...p, [postId]: true }));
      try {
        const data = await getComments(postId);
        setComments(p => ({ ...p, [postId]: data }));
      } catch { } finally { setLoadingComments(p => ({ ...p, [postId]: false })); }
    }
  };

  const handleComment = async (postId) => {
    const body = commentInputs[postId]?.trim();
    if (!body) return;
    if (!isAuthenticated) { openModal('login'); return; }
    setSendingComment(p => ({ ...p, [postId]: true }));
    try {
      const c = await createComment(postId, body);
      setComments(prev => ({ ...prev, [postId]: [...(prev[postId] || []), c] }));
      setCommentInputs(p => ({ ...p, [postId]: '' }));
      setPosts(prev => prev.map(p => p._id === postId ? { ...p, commentCount: p.commentCount + 1 } : p));
    } catch { } finally { setSendingComment(p => ({ ...p, [postId]: false })); }
  };

  if (loadingCircle) return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navigation />
      <div className="flex items-center justify-center mt-40 text-slate-400">
        <Loader2 className="w-8 h-8 animate-spin mr-3" /> Loading circle…
      </div>
    </div>
  );

  if (!circle) return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navigation />
      <div className="flex flex-col items-center justify-center mt-40 text-slate-400 gap-3">
        <AlertCircle className="w-10 h-10 opacity-40" />
        <p className="font-medium">Circle not found.</p>
        <button onClick={() => navigate('/circles')} className="text-blue-600 hover:underline text-sm">← Back to Circles</button>
      </div>
    </div>
  );

  const PostCard = ({ post }) => {
    const isOpen = openPostId === post._id;
    const hasUpvoted = upvoted[post._id];
    return (
      <article className="bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all">
        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-2.5">
              <Avatar name={post.authorName} size={8} />
              <div>
                <span className="text-sm font-semibold text-gray-800">{post.authorName}</span>
                <div className="flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                  <Clock className="w-3 h-3" />{timeAgo(post.createdAt)}
                </div>
              </div>
            </div>
          </div>

          <h3 className="font-semibold text-gray-900 mb-1.5 cursor-pointer hover:text-blue-700 transition-colors"
            onClick={() => toggleComments(post._id)}>
            {post.title}
          </h3>
          {post.body && <p className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3">{post.body}</p>}

          <div className="flex items-center gap-4 pt-3 border-t border-gray-100">
            <button onClick={(e) => handleUpvote(e, post._id)}
              className={`flex items-center gap-1.5 text-sm font-medium transition-colors ${hasUpvoted ? 'text-blue-600' : 'text-gray-400 hover:text-blue-600'}`}>
              <ThumbsUp className={`w-4 h-4 ${hasUpvoted ? 'fill-current' : ''}`} />
              {post.upvoteCount || 0}
            </button>
            <button onClick={() => toggleComments(post._id)}
              className="flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-blue-600 transition-colors">
              <MessageCircle className="w-4 h-4" />
              {post.commentCount || 0}
              <span className="text-gray-300 ml-1">{isOpen ? '▲' : '▼'}</span>
            </button>
          </div>
        </div>

        {/* Comments section */}
        {isOpen && (
          <div className="border-t border-gray-100 bg-gray-50 rounded-b-xl p-4 space-y-3">
            {loadingComments[post._id] ? (
              <div className="flex items-center gap-2 text-gray-400 text-sm"><Loader2 className="w-4 h-4 animate-spin" /> Loading…</div>
            ) : (comments[post._id] || []).length === 0 ? (
              <p className="text-sm text-gray-400">No comments yet. Be the first!</p>
            ) : (
              (comments[post._id] || []).map(c => (
                <div key={c._id} className="flex gap-2.5">
                  <Avatar name={c.authorName} size={7} />
                  <div className="flex-1 bg-white rounded-xl px-3 py-2 border border-gray-100">
                    <span className="text-xs font-bold text-gray-700">{c.authorName}</span>
                    <span className="text-xs text-gray-400 ml-2">{timeAgo(c.createdAt)}</span>
                    <p className="text-sm text-gray-700 mt-0.5">{c.body}</p>
                  </div>
                </div>
              ))
            )}

            {/* Comment input */}
            <div className="flex gap-2 pt-1">
              <input
                value={commentInputs[post._id] || ''}
                onChange={e => setCommentInputs(p => ({ ...p, [post._id]: e.target.value }))}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleComment(post._id); } }}
                placeholder={isAuthenticated ? "Write a comment…" : "Log in to comment"}
                disabled={!isAuthenticated}
                className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-300 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <button onClick={() => handleComment(post._id)} disabled={sendingComment[post._id] || !isAuthenticated}
                className="w-9 h-9 flex items-center justify-center bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:opacity-40 transition-colors flex-shrink-0">
                {sendingComment[post._id] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
          </div>
        )}
      </article>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Navigation />
      <div className="max-w-4xl mx-auto px-4 pt-24 pb-16">

        {/* Back */}
        <button onClick={() => navigate('/circles')}
          className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-gray-700 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> All Circles
        </button>

        {/* Circle header */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-5 shadow-sm">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex-1 min-w-0">
              <span className="text-xs font-semibold bg-blue-100 text-blue-700 px-2.5 py-0.5 rounded-full mb-2 inline-block">
                {circle.category}
              </span>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">{circle.name}</h1>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xl">{circle.description}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-400">
                <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{(circle.memberCount || 0).toLocaleString()} members</span>
                <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{(circle.postCount || 0).toLocaleString()} posts</span>
              </div>
            </div>
            <button onClick={handleJoinLeave} disabled={joining}
              className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all flex-shrink-0 ${
                isMember
                  ? 'bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-600 border border-gray-200'
                  : 'bg-gray-900 text-white hover:bg-blue-700'
              }`}>
              {joining ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
              {isMember ? 'Leave Circle' : !isAuthenticated ? <><Lock className="w-3.5 h-3.5" /> Join Circle</> : 'Join Circle'}
            </button>
          </div>

          {/* Rules */}
          {circle.rules?.length > 0 && (
            <details className="mt-4 pt-4 border-t border-gray-100">
              <summary className="text-xs font-bold text-gray-400 uppercase tracking-wider cursor-pointer hover:text-gray-600 transition-colors">
                Community Rules <ChevronDown className="w-3.5 h-3.5 inline ml-1" />
              </summary>
              <ol className="mt-3 space-y-1.5">
                {circle.rules.map((r, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-gray-600">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center flex-shrink-0 font-bold">{i + 1}</span>
                    {r}
                  </li>
                ))}
              </ol>
            </details>
          )}
        </div>

        {/* Posts header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <button onClick={() => handleSortChange('new')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${sort === 'new' ? 'bg-slate-900 text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>
              <Clock className="w-3.5 h-3.5" /> New
            </button>
            <button onClick={() => handleSortChange('top')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${sort === 'top' ? 'bg-slate-900 text-white' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'}`}>
              <TrendingUp className="w-3.5 h-3.5" /> Top
            </button>
          </div>

          <button
            onClick={() => { if (!isAuthenticated) { openModal('login'); return; } setShowNewPost(p => !p); }}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-sm">
            {showNewPost ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            {showNewPost ? 'Cancel' : 'New Post'}
          </button>
        </div>

        {/* New post form */}
        {showNewPost && (
          <div className="bg-white rounded-xl border border-gray-200 p-5 mb-4 shadow-sm">
            <h3 className="font-semibold text-gray-800 mb-3">Create a post</h3>
            {!isMember && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-100 rounded-lg px-3 py-2 mb-3 text-sm text-amber-700">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                You need to join this circle to post.
              </div>
            )}
            <input value={postTitle} onChange={e => setPostTitle(e.target.value)}
              placeholder="Post title *" maxLength={300}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm mb-2.5 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-300 transition-all" />
            <textarea value={postBody} onChange={e => setPostBody(e.target.value)}
              placeholder="Add more details (optional)"
              rows={3}
              className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm resize-none mb-2.5 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-300 transition-all" />
            {postError && <p className="text-sm text-red-500 mb-2">{postError}</p>}
            <div className="flex justify-end">
              <button onClick={handleNewPost} disabled={submitting || !isMember}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 disabled:opacity-40 transition-colors">
                {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Post
              </button>
            </div>
          </div>
        )}

        {/* Posts feed */}
        {loadingPosts && page === 1 ? (
          <div className="flex items-center justify-center py-16 text-slate-400">
            <Loader2 className="w-6 h-6 animate-spin mr-2" /> Loading posts…
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-gray-200 rounded-2xl bg-white">
            <MessageCircle className="w-10 h-10 mx-auto mb-2 text-gray-300" />
            <p className="font-medium text-gray-400 mb-1">No posts yet</p>
            <p className="text-sm text-gray-400">Be the first to start a discussion!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map(p => <PostCard key={p._id} post={p} />)}
            {hasMore && (
              <button onClick={() => setPage(pg => pg + 1)} disabled={loadingPosts}
                className="w-full py-3 text-sm text-blue-600 font-semibold hover:bg-blue-50 rounded-xl border border-blue-100 transition-colors flex items-center justify-center gap-2">
                {loadingPosts ? <Loader2 className="w-4 h-4 animate-spin" /> : null} Load more
              </button>
            )}
          </div>
        )}
      </div>
      <Footer />
      <style>{`
        .line-clamp-3 { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
      `}</style>
    </div>
  );
}
