import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BlogOfficeFashion from '../pages/BlogOfficeFashion';
import PageTransition from '../components/PageTransition';

const BlogRoutes = () => {
  return (
    <Routes>
      <Route 
        path="office-fashion" 
        element={
          <PageTransition>
            <BlogOfficeFashion />
          </PageTransition>
        } 
      />
      {/* Add more blog routes here */}
    </Routes>
  );
};

export default BlogRoutes; 