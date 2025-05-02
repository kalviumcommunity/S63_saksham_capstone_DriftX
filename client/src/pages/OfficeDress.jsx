import React from 'react';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const OfficeDress = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-7xl mx-auto px-4 py-12"
    >
      <motion.h1
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-4xl font-bold mb-8 text-center text-white"
      >
        How to Dress for the Office?
      </motion.h1>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid md:grid-cols-2 gap-8"
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-white">Essential Tips for Office Attire</h2>
          <motion.ul
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="list-disc pl-6 space-y-4 text-gray-300"
          >
            <li>Choose classic, well-fitted pieces that make you feel confident</li>
            <li>Stick to a professional color palette</li>
            <li>Invest in quality basics like blazers and tailored pants</li>
            <li>Pay attention to grooming and accessories</li>
            <li>Consider your workplace culture and dress code</li>
          </motion.ul>
        </div>

        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="rounded-lg overflow-hidden shadow-xl"
        >
          <img
            src="https://media.licdn.com/dms/image/v2/D4E12AQHOtZ3gpkakqQ/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1734087569665?e=2147483647&v=beta&t=DQfdd_6GQ_IB0c2mh7wkNyznqzIewgJNazWPsPAaikk"
            alt="Professional office attire"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </motion.div>

      {/* Video Sections Container */}
      <div className="relative mt-24 mb-32">
        {/* First Video Section - Left Side */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="relative z-10 w-2/3 ml-0"
        >
          <div className="bg-gradient-to-r from-[#ff9900]/20 to-black/30 rounded-xl p-1">
            <video
              className="w-full h-[400px] object-cover rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
              controls
              poster="https://www.powersutra.co/cdn/shop/articles/interview_dress_code_for_female.jpg?v=1726489970&width=2048"
              onMouseEnter={(e) => e.target.play()}
              onMouseLeave={(e) => e.target.pause()}
            >
              <source src="/videos/lady4.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>

        {/* Second Video Section - Right Side, Overlapping */}
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="absolute top-32 right-0 w-2/3 z-20"
        >
          <div className="bg-gradient-to-l from-[#ff9900]/20 to-black/30 rounded-xl p-1">
            <video
              className="w-full h-[400px] object-cover rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
              controls
              poster="https://imgmedia.lbb.in/media/2023/04/642ab3d945fac707c1357c95_1680520153751.jpg"
              onMouseEnter={(e) => e.target.play()}
              onMouseLeave={(e) => e.target.pause()}
            >
              <source src="/videos/lady5.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.4 }}
        className="mt-12 bg-white/10 backdrop-blur-md p-8 rounded-lg"
      >
        <h3 className="text-2xl font-semibold mb-6 text-white">Pro Tips</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-4 bg-white/5 backdrop-blur-md rounded-lg shadow">
            <h4 className="font-semibold mb-2 text-[#ff9900]">Wardrobe Essentials</h4>
            <p className="text-gray-300">Build a versatile collection of mix-and-match pieces</p>
          </div>
          <div className="p-4 bg-white/5 backdrop-blur-md rounded-lg shadow">
            <h4 className="font-semibold mb-2 text-[#ff9900]">Seasonal Transitions</h4>
            <p className="text-gray-300">Learn to layer effectively for year-round style</p>
          </div>
          <div className="p-4 bg-white/5 backdrop-blur-md rounded-lg shadow">
            <h4 className="font-semibold mb-2 text-[#ff9900]">Accessorizing</h4>
            <p className="text-gray-300">Choose subtle, professional accessories</p>
          </div>
        </div>
      </motion.div>

      {/* Interactive Dress Code Builder */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 relative"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff9900] to-purple-600">
              Interactive Dress Code Builder
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {[
              {
                title: "Business Formal",
                icon: "👔",
                items: [
                  { name: "Tailored Suit", status: "Essential" },
                  { name: "Dress Shirt", status: "Must-Have" },
                  { name: "Formal Shoes", status: "Required" }
                ]
              },
              {
                title: "Business Casual",
                icon: "🎯",
                items: [
                  { name: "Blazer", status: "Recommended" },
                  { name: "Chinos", status: "Optional" },
                  { name: "Smart Shoes", status: "Preferred" }
                ]
              },
              {
                title: "Smart Casual",
                icon: "✨",
                items: [
                  { name: "Polo Shirt", status: "Acceptable" },
                  { name: "Dress Pants", status: "Suggested" },
                  { name: "Loafers", status: "Optional" }
                ]
              }
            ].map((category) => (
              <motion.div
                key={category.title}
                whileHover={{ scale: 1.05 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ff9900] to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <div className="relative">
                  <div className="text-4xl mb-4">{category.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-6">{category.title}</h3>
                  <div className="space-y-4">
                    {category.items.map((item) => (
                      <motion.div
                        key={item.name}
                        whileHover={{ x: 10 }}
                        className="flex items-center justify-between p-2 bg-white/5 rounded-lg"
                      >
                        <span className="text-gray-300">{item.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.status === "Essential" ? "bg-green-500/50" :
                          item.status === "Must-Have" ? "bg-blue-500/50" :
                          item.status === "Required" ? "bg-purple-500/50" :
                          "bg-yellow-500/50"
                        }`}>
                          {item.status}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Professional Color Psychology */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-900/30 to-[#ff9900]/30 rounded-2xl p-8 mb-16"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Color Psychology in Professional Attire</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { color: "Navy Blue", meaning: "Authority & Trust", hex: "#000080" },
                { color: "Charcoal Gray", meaning: "Professional & Reliable", hex: "#36454F" },
                { color: "Burgundy", meaning: "Power & Ambition", hex: "#800020" },
                { color: "Forest Green", meaning: "Growth & Stability", hex: "#228B22" }
              ].map((color) => (
                <motion.div
                  key={color.color}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6 relative overflow-hidden group"
                >
                  <div className="w-full h-24 rounded-lg mb-4" style={{ backgroundColor: color.hex }}></div>
                  <h4 className="text-lg font-semibold text-white mb-2">{color.color}</h4>
                  <p className="text-gray-300 text-sm">{color.meaning}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Advanced Style Combinations */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 mb-16"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Advanced Style Combinations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Power Meeting",
                  items: ["Tailored Navy Suit", "Crisp White Shirt", "Burgundy Tie", "Oxford Shoes"],
                  impact: "High Authority"
                },
                {
                  title: "Creative Professional",
                  items: ["Patterned Blazer", "Solid Shirt", "Dark Jeans", "Leather Boots"],
                  impact: "Innovative"
                },
                {
                  title: "Executive Presence",
                  items: ["Charcoal Suit", "Light Blue Shirt", "Silver Accessories", "Black Oxfords"],
                  impact: "Leadership"
                },
                {
                  title: "Smart Casual Friday",
                  items: ["Navy Blazer", "Quality Polo", "Khaki Chinos", "Brown Loafers"],
                  impact: "Approachable"
                }
              ].map((combo) => (
                <motion.div
                  key={combo.title}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
                >
                  <h4 className="text-xl font-semibold text-white mb-4">{combo.title}</h4>
                  <ul className="space-y-3">
                    {combo.items.map((item, index) => (
                      <motion.li
                        key={item}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-gray-300"
                      >
                        <span className="w-2 h-2 bg-gradient-to-r from-[#ff9900] to-purple-600 rounded-full mr-2"></span>
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-4 flex items-center">
                    <span className="text-sm text-[#ff9900]">Impact: </span>
                    <span className="ml-2 px-3 py-1 bg-white/10 rounded-full text-xs text-white">
                      {combo.impact}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Professional Accessory Guide */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-[#ff9900]/30 to-purple-600/30 rounded-2xl p-8 mb-16"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Professional Accessory Guide</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  category: "Essential Accessories",
                  items: [
                    { name: "Classic Watch", importance: "High" },
                    { name: "Quality Belt", importance: "High" },
                    { name: "Professional Bag", importance: "Medium" }
                  ]
                },
                {
                  category: "Statement Pieces",
                  items: [
                    { name: "Silk Scarf", importance: "Medium" },
                    { name: "Cufflinks", importance: "Low" },
                    { name: "Tie Clip", importance: "Medium" }
                  ]
                },
                {
                  category: "Finishing Touches",
                  items: [
                    { name: "Pocket Square", importance: "Low" },
                    { name: "Subtle Jewelry", importance: "Medium" },
                    { name: "Quality Sunglasses", importance: "Medium" }
                  ]
                }
              ].map((section) => (
                <motion.div
                  key={section.category}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
                >
                  <h4 className="text-xl font-semibold text-white mb-4">{section.category}</h4>
                  <div className="space-y-4">
                    {section.items.map((item) => (
                      <motion.div
                        key={item.name}
                        whileHover={{ x: 5 }}
                        className="flex items-center justify-between p-2 bg-white/10 rounded-lg"
                      >
                        <span className="text-gray-300">{item.name}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.importance === "High" ? "bg-green-500/50" :
                          item.importance === "Medium" ? "bg-yellow-500/50" :
                          "bg-red-500/50"
                        }`}>
                          {item.importance}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Seasonal Wardrobe Planner */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black/30 backdrop-blur-lg rounded-2xl p-8"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Seasonal Wardrobe Planner</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                {
                  season: "Spring",
                  key_pieces: ["Light Blazers", "Cotton Shirts", "Khaki Pants"],
                  colors: ["Pastels", "Light Gray", "Navy"]
                },
                {
                  season: "Summer",
                  key_pieces: ["Linen Suits", "Short Sleeves", "Light Fabrics"],
                  colors: ["White", "Light Blue", "Beige"]
                },
                {
                  season: "Autumn",
                  key_pieces: ["Wool Blazers", "Sweaters", "Dark Denim"],
                  colors: ["Burgundy", "Olive", "Brown"]
                },
                {
                  season: "Winter",
                  key_pieces: ["Heavy Suits", "Overcoats", "Wool Pants"],
                  colors: ["Charcoal", "Navy", "Black"]
                }
              ].map((season) => (
                <motion.div
                  key={season.season}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
                >
                  <h4 className="text-xl font-semibold text-white mb-4">{season.season}</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-semibold text-[#ff9900] mb-2">Key Pieces</h5>
                      <ul className="space-y-2">
                        {season.key_pieces.map((piece) => (
                          <li key={piece} className="text-gray-300 flex items-center">
                            <span className="w-1 h-1 bg-[#ff9900] rounded-full mr-2"></span>
                            {piece}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-[#ff9900] mb-2">Color Palette</h5>
                      <div className="flex flex-wrap gap-2">
                        {season.colors.map((color) => (
                          <span key={color} className="px-2 py-1 bg-white/10 rounded-full text-xs text-white">
                            {color}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* AI-Powered Virtual Stylist */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="py-16 relative"
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-white mb-12 text-center">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#ff9900] to-purple-600">
              AI-Powered Virtual Stylist
            </span>
          </h2>

          {/* Real-time Style Analysis */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 mb-16"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Real-time Style Analysis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Style Score Dashboard */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
              >
                <h4 className="text-xl font-semibold text-white mb-6">Professional Style Score</h4>
                <div className="space-y-6">
                  {[
                    { metric: "Professional Impact", score: 92, trend: "+5%" },
                    { metric: "Color Coordination", score: 88, trend: "+3%" },
                    { metric: "Outfit Balance", score: 95, trend: "+7%" },
                    { metric: "Trend Alignment", score: 85, trend: "+4%" }
                  ].map((item) => (
                    <div key={item.metric} className="relative">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">{item.metric}</span>
                        <div className="flex items-center">
                          <span className="text-white font-bold">{item.score}</span>
                          <span className="ml-2 text-green-400 text-sm">{item.trend}</span>
                        </div>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.score}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-[#ff9900] to-purple-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Real-time Recommendations */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
              >
                <h4 className="text-xl font-semibold text-white mb-6">AI Recommendations</h4>
                <div className="space-y-4">
                  {[
                    {
                      type: "Immediate Improvements",
                      suggestions: [
                        "Adjust collar symmetry",
                        "Consider darker shoes",
                        "Add pocket square"
                      ]
                    },
                    {
                      type: "Style Enhancements",
                      suggestions: [
                        "Try monochromatic palette",
                        "Experiment with textures",
                        "Layer with vest"
                      ]
                    }
                  ].map((section) => (
                    <div key={section.type} className="bg-white/5 rounded-lg p-4">
                      <h5 className="text-[#ff9900] font-semibold mb-3">{section.type}</h5>
                      <ul className="space-y-2">
                        {section.suggestions.map((suggestion, index) => (
                          <motion.li
                            key={suggestion}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center text-gray-300"
                          >
                            <span className="w-2 h-2 bg-gradient-to-r from-[#ff9900] to-purple-600 rounded-full mr-2"></span>
                            {suggestion}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* 3D Outfit Visualizer */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-900/30 to-[#ff9900]/30 rounded-2xl p-8 mb-16"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">3D Outfit Visualizer</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  view: "Front View",
                  controls: ["Rotate", "Zoom", "Pan"],
                  features: ["Fabric Simulation", "Light Adjustment", "Color Analysis"]
                },
                {
                  view: "Side View",
                  controls: ["Fit Check", "Proportion", "Balance"],
                  features: ["Measurement Guide", "Posture Analysis", "Style Lines"]
                },
                {
                  view: "Detail View",
                  controls: ["Texture", "Pattern", "Material"],
                  features: ["Close-up Detail", "Quality Check", "Finish Analysis"]
                }
              ].map((view) => (
                <motion.div
                  key={view.view}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
                >
                  <h4 className="text-xl font-semibold text-white mb-4">{view.view}</h4>
                  <div className="aspect-square mb-4 bg-gradient-to-br from-white/5 to-white/10 rounded-lg flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      className="w-16 h-16 border-2 border-[#ff9900] border-t-transparent rounded-full"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h5 className="text-sm font-semibold text-[#ff9900] mb-2">Controls</h5>
                      <div className="flex flex-wrap gap-2">
                        {view.controls.map((control) => (
                          <span key={control} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">
                            {control}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-sm font-semibold text-[#ff9900] mb-2">Features</h5>
                      <div className="flex flex-wrap gap-2">
                        {view.features.map((feature) => (
                          <span key={feature} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Advanced Style Analytics */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-black/30 backdrop-blur-lg rounded-2xl p-8 mb-16"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Advanced Style Analytics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Trend Prediction */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
              >
                <h4 className="text-xl font-semibold text-white mb-6">Trend Prediction</h4>
                <div className="space-y-6">
                  {[
                    { trend: "Sustainable Workwear", probability: 95, timeframe: "Next 6 Months" },
                    { trend: "Smart Fabrics", probability: 88, timeframe: "Next Year" },
                    { trend: "Biometric Clothing", probability: 75, timeframe: "2 Years" }
                  ].map((item) => (
                    <div key={item.trend} className="relative">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-300">{item.trend}</span>
                        <span className="text-[#ff9900]">{item.timeframe}</span>
                      </div>
                      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.probability}%` }}
                          transition={{ duration: 1, delay: 0.5 }}
                          className="h-full bg-gradient-to-r from-[#ff9900] to-purple-600"
                        />
                      </div>
                      <div className="mt-1 text-right">
                        <span className="text-sm text-gray-400">{item.probability}% probability</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Style Impact Analysis */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
              >
                <h4 className="text-xl font-semibold text-white mb-6">Style Impact Analysis</h4>
                <div className="space-y-6">
                  {[
                    {
                      category: "Professional Perception",
                      metrics: [
                        { name: "Authority", value: 92 },
                        { name: "Approachability", value: 88 },
                        { name: "Competence", value: 95 }
                      ]
                    },
                    {
                      category: "Personal Brand",
                      metrics: [
                        { name: "Uniqueness", value: 85 },
                        { name: "Memorability", value: 90 },
                        { name: "Consistency", value: 87 }
                      ]
                    }
                  ].map((section) => (
                    <div key={section.category} className="bg-white/5 rounded-lg p-4">
                      <h5 className="text-[#ff9900] font-semibold mb-4">{section.category}</h5>
                      <div className="space-y-4">
                        {section.metrics.map((metric) => (
                          <div key={metric.name} className="relative">
                            <div className="flex justify-between mb-1">
                              <span className="text-gray-300">{metric.name}</span>
                              <span className="text-white">{metric.value}%</span>
                            </div>
                            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${metric.value}%` }}
                                transition={{ duration: 1, delay: 0.5 }}
                                className="h-full bg-gradient-to-r from-[#ff9900] to-purple-600"
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Smart Wardrobe Integration */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-[#ff9900]/30 to-purple-600/30 rounded-2xl p-8"
          >
            <h3 className="text-3xl font-bold text-white mb-8 text-center">Smart Wardrobe Integration</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Outfit Generator",
                  features: [
                    "Weather-based suggestions",
                    "Calendar event matching",
                    "Style preference learning"
                  ],
                  status: "Active"
                },
                {
                  title: "Virtual Closet Scanner",
                  features: [
                    "Real-time inventory",
                    "Wear frequency tracking",
                    "Maintenance alerts"
                  ],
                  status: "Connected"
                },
                {
                  title: "Style Evolution Tracker",
                  features: [
                    "Personal trend analysis",
                    "Style journey mapping",
                    "Future recommendations"
                  ],
                  status: "Learning"
                }
              ].map((system) => (
                <motion.div
                  key={system.title}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="text-xl font-semibold text-white">{system.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs ${
                      system.status === "Active" ? "bg-green-500/50" :
                      system.status === "Connected" ? "bg-blue-500/50" :
                      "bg-purple-500/50"
                    }`}>
                      {system.status}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {system.features.map((feature, index) => (
                      <motion.div
                        key={feature}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center text-gray-300"
                      >
                        <motion.span
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 180, 360]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          className="w-2 h-2 bg-gradient-to-r from-[#ff9900] to-purple-600 rounded-full mr-2"
                        />
                        {feature}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-xl md:text-2xl text-gray-300"
      >
        A comprehensive guide to mastering professional style
        <Link 
          to="/blog/office-fashion"
          className="ml-4 inline-block px-6 py-2 bg-gradient-to-r from-[#ff9900] to-purple-600 text-white rounded-full hover:from-[#ff9900]/80 hover:to-purple-600/80 transition-all duration-300"
        >
          Read More
        </Link>
      </motion.p>
    </motion.div>
  );
};

export default OfficeDress;