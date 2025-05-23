"use client";
import React, { useEffect, useState } from "react";
import api from "../utils/api";
import Link from "next/link";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await api.get("/article/");
        console.log(res);
        setArticles(res.articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  const handleViewArticle = (articleId) => {
    router.push(`/article/${articleId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-yellow-300 flex items-center justify-center">
        <div className="bg-black text-yellow-300 px-8 py-4 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-2">
          <div className="text-2xl font-black animate-pulse">LOADING...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyan-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center mt-10">
          <h1 className="text-6xl font-black text-black mb-4 uppercase tracking-tighter transform -rotate-2 inline-block bg-yellow-300 px-8 py-4 border-6 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            ARTICLES
          </h1>
          <div className="text-xl font-bold text-black mt-4 bg-white px-4 py-2 border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] inline-block transform rotate-1">
            TOTAL: {articles.length}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={article._id}
              className={`bg-white border-6 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 transform ${
                index % 3 === 0
                  ? "rotate-2"
                  : index % 3 === 1
                  ? "-rotate-1"
                  : "rotate-1"
              } hover:rotate-0 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] hover:scale-105 transition-all duration-300 cursor-pointer`}
              onClick={() => handleViewArticle(article._id)}
            >
              {article.cover && (
                <div className="mb-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                  <img
                    src={article.cover}
                    alt={article.title}
                    className="w-full h-40 object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              )}

              <h2 className="text-2xl font-black text-black mb-3 uppercase tracking-tight leading-tight border-b-4 border-black pb-2">
                {article.title}
              </h2>

              <p className="text-lg font-bold text-gray-800 mb-4 leading-snug">
                {article.software?.name}
              </p>

              <button className="w-full bg-lime-400 hover:bg-lime-500 text-black font-black py-3 px-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform hover:translate-x-1 hover:translate-y-1 transition-all duration-150 uppercase tracking-wider">
                VIEW ARTICLE
              </button>

              <div className="mt-4 bg-red-400 text-black font-black px-3 py-1 border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] inline-block text-sm uppercase tracking-wide transform -rotate-2">
                {new Date(article.createdAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>

        {articles.length === 0 && (
          <div className="text-center mt-16">
            <div className="bg-red-400 text-black font-black text-3xl px-12 py-8 border-6 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] inline-block transform rotate-3 uppercase tracking-wider">
              NO ARTICLES FOUND!
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
