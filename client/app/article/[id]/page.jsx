"use client";
import api from "@/app/utils/api";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = ({ params }) => {
  const [articles, setArticles] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = use(params);
  const router = useRouter();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get(`/article/${id}`);
        console.log(res);
        setArticles(res.article);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setError("Failed to load article");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [id]);

  const handleBackToList = () => {
    router.push("/article");
  };

 if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-400 to-red-400 flex items-center justify-center p-4">
        <div className="relative">
          <div className="bg-black text-yellow-300 px-12 py-8 border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transform rotate-3 animate-pulse">
            <div className="text-4xl font-black uppercase tracking-widest">LOADING...</div>
            <div className="text-lg font-bold mt-2">BRUTAL CONTENT INCOMING</div>
          </div>
          <div className="absolute -top-4 -right-4 bg-red-500 text-white px-4 py-2 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform -rotate-12 font-black text-sm">
            WAIT!
          </div>
        </div>
      </div>
    );
  }

  if (error || !articles) {
    return (
      <div className="min-h-screen bg-red-400 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="bg-black text-red-400 px-16 py-12 border-8 border-black shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] transform rotate-2 mb-8">
            <div className="text-6xl font-black uppercase mb-4">ERROR!</div>
            <div className="text-2xl font-bold">ARTICLE NOT FOUND</div>
          </div>
          <button
            onClick={handleBackToList}
            className="bg-lime-400 hover:bg-lime-500 text-black font-black px-8 py-4 border-6 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-2 hover:translate-y-2 transition-all duration-200 uppercase tracking-wider text-xl"
          >
            GO BACK HOME
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-200 to-blue-200 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <div className="mb-8 flex justify-end">
          <button
            onClick={handleBackToList}
            className="bg-red-500 hover:bg-red-600 text-white font-black px-8 py-4 border-6 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 transition-all duration-150 uppercase tracking-wider transform -rotate-1 hover:rotate-0"
          >
            BACK
          </button>
        </div>

        {/* Main Content Container */}
        <div className="bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-8 transform rotate-1">
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            
            {/* Left Side - Image and Title */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Image Container */}
              <div className="bg-gray-100 border-6 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] aspect-square flex items-center justify-center transform -rotate-1 hover:rotate-0 transition-transform duration-300">
                {articles.cover ? (
                  <img
                    src={articles.cover}
                    alt={articles.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-4xl font-black text-gray-400 uppercase tracking-wider transform rotate-12">
                    IMAGE
                  </div>
                )}
              </div>
              
              {/* Title */}
              <div className="bg-yellow-300 border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                <h2 className="text-2xl font-black text-black uppercase tracking-tight leading-tight">
                  {articles.title}
                </h2>
              </div>
            </div>

            {/* Right Side - Description */}
            <div className="lg:col-span-2">
              <div className="bg-lime-200 border-6 border-black h-full p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transform -rotate-1 hover:rotate-0 transition-transform duration-300 relative">
                
                {/* Description Header */}
                <div className="absolute -top-4 -left-4 bg-red-500 text-white px-4 py-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-black text-lg uppercase transform rotate-12">
                  DESC
                </div>
                
                {/* Description Content */}
                <div className="pt-8">
                  <p className="text-xl font-bold text-black leading-relaxed mb-8">
                    {articles.description}
                  </p>
                  
                  {/* Meta Info */}
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;