import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Search, Tag, ExternalLink, Heart, Loader2 } from 'lucide-react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { fetchDevToArticles, searchDevToArticles, getPopularTags, BlogPost } from '../../services/blogApi';

const Blog: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const allTags = getPopularTags();
  
  useEffect(() => {
    loadBlogPosts();
  }, [selectedTag]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const debounceTimer = setTimeout(() => {
        handleSearch();
      }, 500);
      return () => clearTimeout(debounceTimer);
    } else if (!selectedTag) {
      loadBlogPosts();
    }
  }, [searchTerm]);

  const loadBlogPosts = async () => {
    setLoading(true);
    setError(null);
    try {
      const posts = await fetchDevToArticles(selectedTag || undefined);
      setBlogPosts(posts);
    } catch (err) {
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError(null);
    try {
      const posts = await searchDevToArticles(searchTerm);
      setBlogPosts(posts);
    } catch (err) {
      setError('Failed to search blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = searchTerm.trim() ? blogPosts : blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = !selectedTag || post.tags.some(tag => 
      tag.toLowerCase() === selectedTag.toLowerCase()
    );
    return matchesSearch && matchesTag;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const BlogCard: React.FC<{ post: BlogPost; index: number }> = ({ post, index }) => (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group glass rounded-xl overflow-hidden hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-all duration-300 hover:scale-105"
    >
      {/* Featured Image */}
      <div className="relative overflow-hidden">
        <motion.img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Read Time Badge */}
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 bg-white/90 dark:bg-black/90 backdrop-blur-sm text-secondary-700 dark:text-secondary-300 text-xs font-medium rounded-full flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>{post.readTime} min read</span>
          </span>
        </div>

        {/* Author Badge */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2 bg-white/90 dark:bg-black/90 backdrop-blur-sm rounded-full px-3 py-1">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-6 h-6 rounded-full object-cover"
            />
            <span className="text-xs font-medium text-secondary-700 dark:text-secondary-300">
              {post.author.name}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Meta Info */}
        <div className="flex items-center space-x-4 text-sm text-secondary-600 dark:text-secondary-400 mb-3">
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formatDate(post.publishedAt)}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Heart className="w-4 h-4" />
            <span>{post.reactions}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
          {post.title}
        </h3>

        {/* Excerpt */}
        <p className="text-secondary-600 dark:text-secondary-400 mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-colors duration-200 ${
                selectedTag === tag
                  ? 'bg-primary-600 text-white'
                  : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800/50'
              }`}
            >
              {tag}
            </motion.button>
          ))}
        </div>

        {/* Read More */}
        <motion.a
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ x: 5 }}
          className="flex items-center space-x-2 text-primary-600 dark:text-primary-400 font-medium hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200 group"
        >
          <span>Read More</span>
          <ExternalLink className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
        </motion.a>
      </div>
    </motion.article>
  );

  return (
    <section id="blog" className="py-20 bg-secondary-50 dark:bg-secondary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary-900 dark:text-secondary-100 mb-4">
            Latest <span className="gradient-text">Blog Posts</span>
          </h2>
          <p className="text-xl text-secondary-600 dark:text-secondary-400 max-w-3xl mx-auto">
            Insights, tutorials, and thoughts on web development, design trends, and technology.
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isIntersecting ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto mb-8">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-secondary-400" />
            <input
              type="text"
              placeholder="Search blog posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 glass rounded-lg border border-secondary-200 dark:border-secondary-700 focus:border-primary-500 dark:focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-500/20 transition-all duration-200"
              disabled={loading}
            />
            {loading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
              </div>
            )}
          </div>

          {/* Tag Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            <div className="flex items-center space-x-2 mb-2">
              <Tag className="w-4 h-4 text-secondary-600 dark:text-secondary-400" />
              <span className="text-secondary-600 dark:text-secondary-400 font-medium">Tags:</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedTag(null);
                setSearchTerm('');
              }}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                !selectedTag
                  ? 'bg-primary-600 text-white'
                  : 'glass text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-primary-900/20'
              }`}
              disabled={loading}
            >
              All
            </motion.button>
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setSelectedTag(selectedTag === tag ? null : tag);
                  setSearchTerm('');
                }}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
                  selectedTag === tag
                    ? 'bg-primary-600 text-white'
                    : 'glass text-secondary-700 dark:text-secondary-300 hover:bg-primary-100 dark:hover:bg-primary-900/20'
                }`}
                disabled={loading}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
              <p className="text-secondary-600 dark:text-secondary-400">
                Loading amazing blog posts...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
              Oops! Something went wrong
            </h3>
            <p className="text-secondary-600 dark:text-secondary-400 mb-4">
              {error}
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={loadBlogPosts}
              className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-colors duration-200"
            >
              Try Again
            </motion.button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.length > 0 ? (
              filteredPosts.slice(0, 6).map((post, index) => (
                <BlogCard key={post.id} post={post} index={index} />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-full text-center py-12"
              >
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-secondary-900 dark:text-secondary-100 mb-2">
                  No posts found
                </h3>
                <p className="text-secondary-600 dark:text-secondary-400">
                  Try adjusting your search terms or selected tags.
                </p>
              </motion.div>
            )}
          </div>
        )}

        {/* Load More Button */}
        {!loading && !error && filteredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <p className="text-secondary-600 dark:text-secondary-400 text-sm">
                Powered by{' '}
                <a
                  href="https://dev.to"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:underline font-medium"
                >
                  Dev.to Community
                </a>
              </p>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Blog;