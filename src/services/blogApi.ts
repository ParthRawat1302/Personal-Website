export interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  cover_image: string;
  published_at: string;
  reading_time_minutes: number;
  tag_list: string[];
  user: {
    name: string;
    username: string;
    profile_image: string;
  };
  public_reactions_count: number;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  publishedAt: string;
  readTime: number;
  author: {
    name: string;
    avatar: string;
    username: string;
  };
  url: string;
  reactions: number;
}

const DEV_TO_API_BASE = 'https://dev.to/api';

export const fetchDevToArticles = async (
  tag?: string,
  page: number = 1,
  perPage: number = 9
): Promise<BlogPost[]> => {
  try {
    let url = `${DEV_TO_API_BASE}/articles?page=${page}&per_page=${perPage}&state=fresh`;
    
    if (tag) {
      url += `&tag=${tag}`;
    }

    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const articles: DevToArticle[] = await response.json();
    
    return articles.map(article => ({
      id: article.id.toString(),
      title: article.title,
      excerpt: article.description || article.title,
      content: '', // Dev.to API doesn't provide full content in list endpoint
      image: article.cover_image || 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: article.tag_list,
      publishedAt: article.published_at,
      readTime: article.reading_time_minutes || 5,
      author: {
        name: article.user.name,
        avatar: article.user.profile_image,
        username: article.user.username,
      },
      url: article.url,
      reactions: article.public_reactions_count,
    }));
  } catch (error) {
    console.error('Error fetching Dev.to articles:', error);
    // Return fallback data if API fails
    return getFallbackBlogPosts();
  }
};

export const searchDevToArticles = async (
  query: string,
  page: number = 1,
  perPage: number = 9
): Promise<BlogPost[]> => {
  try {
    const url = `${DEV_TO_API_BASE}/articles?page=${page}&per_page=${perPage}&state=fresh&q=${encodeURIComponent(query)}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const articles: DevToArticle[] = await response.json();
    
    return articles.map(article => ({
      id: article.id.toString(),
      title: article.title,
      excerpt: article.description || article.title,
      content: '',
      image: article.cover_image || 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: article.tag_list,
      publishedAt: article.published_at,
      readTime: article.reading_time_minutes || 5,
      author: {
        name: article.user.name,
        avatar: article.user.profile_image,
        username: article.user.username,
      },
      url: article.url,
      reactions: article.public_reactions_count,
    }));
  } catch (error) {
    console.error('Error searching Dev.to articles:', error);
    return [];
  }
};

export const getPopularTags = (): string[] => {
  return [
    'javascript',
    'react',
    'typescript',
    'nodejs',
    'python',
    'webdev',
    'programming',
    'tutorial',
    'beginners',
    'css',
    'html',
    'vue',
    'angular',
    'nextjs',
    'docker',
    'aws',
    'devops',
    'api',
    'database',
    'frontend'
  ];
};

const getFallbackBlogPosts = (): BlogPost[] => {
  return [
    {
      id: '1',
      title: 'Building Scalable React Applications',
      excerpt: 'Learn best practices for structuring and scaling React applications for enterprise-level projects.',
      content: 'Full blog content here...',
      image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['React', 'JavaScript', 'Architecture'],
      publishedAt: '2024-01-15',
      readTime: 8,
      author: {
        name: 'John Developer',
        avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
        username: 'johndev',
      },
      url: '#',
      reactions: 42,
    },
    {
      id: '2',
      title: 'The Future of Web Development',
      excerpt: 'Exploring emerging trends and technologies that will shape the future of web development.',
      content: 'Full blog content here...',
      image: 'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['Web Development', 'Technology', 'Trends'],
      publishedAt: '2024-01-10',
      readTime: 6,
      author: {
        name: 'Jane Tech',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
        username: 'janetech',
      },
      url: '#',
      reactions: 38,
    },
    {
      id: '3',
      title: 'Mastering TypeScript',
      excerpt: 'A comprehensive guide to advanced TypeScript features and best practices for better code quality.',
      content: 'Full blog content here...',
      image: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=800',
      tags: ['TypeScript', 'JavaScript', 'Programming'],
      publishedAt: '2024-01-05',
      readTime: 10,
      author: {
        name: 'Mike Coder',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150',
        username: 'mikecoder',
      },
      url: '#',
      reactions: 55,
    },
  ];
};