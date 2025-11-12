
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import HomePage from '@/pages/HomePage';
import SafetyRatingsPage from '@/pages/SafetyRatingsPage';

function App() {
  return (
    <>
      <Helmet>
        <title>SafeQuote - Find Safe Cars, Insurance & Driver's Ed</title>
        <meta name="description" content="Compare safety ratings, prices, and insurance quotes for new and preowned vehicles. The ultimate tool for parents shopping for their teen's first car." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/safequote-safety-ratings" element={<SafetyRatingsPage />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
