import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const Blog = () => {
  const [expandedArticles, setExpandedArticles] = useState([]);
  const articleRefs = useRef([]);

  useEffect(() => {
    // Initialize GSAP animations for hover effects
    articleRefs.current.forEach((article, index) => {
      gsap.from(article, {
        scale: 0.95,
        opacity: 0.8,
        duration: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: article,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });

      gsap.to(article, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: article,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      });
    });
  }, []);

  const handleReadMore = (index) => {
    const contentElement = articleRefs.current[index].querySelector('.article-content');
    if (expandedArticles.includes(index)) {
      gsap.to(contentElement, {
        maxHeight: 0,
        opacity: 0,
        duration: 0.5,
        ease: 'power2.inOut',
        onComplete: () => {
          setExpandedArticles(expandedArticles.filter((i) => i !== index));
        },
      });
    } else {
      gsap.fromTo(
        contentElement,
        { maxHeight: 0, opacity: 0 },
        {
          maxHeight: '1000px',
          opacity: 1,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => {
            setExpandedArticles([...expandedArticles, index]);
          },
        }
      );
    }
  };

  const articles = [
    {
      title: 'Exploring the Mega City',
      image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1353&q=80',
      excerpt:
        'Mega City is a bustling metropolis known for its towering skyscrapers, vibrant culture, and cutting-edge technology. In this article, we dive deep into what makes this city so unique.',
      content: [
        'Mega City is home to over 20 million people, making it one of the most populous cities in the world. Its skyline is dominated by iconic structures like the Sky Tower and the Infinity Bridge.',
        'The city is also a hub for innovation, with numerous tech startups and research institutions calling it home.',
        'The cultural scene in Mega City is equally impressive. From world-class museums to underground music venues, there\'s something for everyone.',
      ],
    },
    {
      title: 'The Future of Urban Living',
      image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      excerpt:
        'As cities grow, the way we live in them is evolving. Discover how Mega City is leading the way in sustainable urban living.',
      content: [
        'Mega City has implemented cutting-edge green technologies, including vertical gardens and solar-powered public transport.',
        'The city\'s urban planning focuses on walkability and reducing carbon emissions, making it a model for future cities.',
        'Residents enjoy a high quality of life, with access to green spaces, clean air, and efficient public services.',
      ],
    },
    {
      title: 'A Culinary Journey Through Mega City',
      image: 'https://images.unsplash.com/photo-1514933651103-17e6db40e1b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      excerpt:
        'Mega City is a food lover\'s paradise. Join us as we explore the diverse culinary scene that makes this city so delicious.',
      content: [
        'From street food stalls to Michelin-starred restaurants, Mega City offers a wide range of dining options.',
        'The city\'s food scene is a melting pot of flavors, influenced by cultures from around the world.',
        'Don\'t miss the chance to try local delicacies like the Mega City Burger and the Infinity Sushi Roll.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-16">
        <h1 className="text-5xl font-bold text-center mb-12 text-gray-800">Welcome to the Mega City Blog</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={index}
              ref={(el) => (articleRefs.current[index] = el)}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />

              <div className="p-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">{article.title}</h2>
                <p className="text-gray-700 mb-4">{article.excerpt}</p>

                <button
                  onClick={() => handleReadMore(index)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
                >
                  {expandedArticles.includes(index) ? 'Read Less' : 'Read More'}
                </button>

                <div className="article-content overflow-hidden">
                  {article.content.map((paragraph, i) => (
                    <p key={i} className="text-gray-700 mb-4">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;