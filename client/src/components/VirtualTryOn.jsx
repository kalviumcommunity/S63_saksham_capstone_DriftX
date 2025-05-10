import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCamera, FaUpload, FaMale, FaFemale } from 'react-icons/fa';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useRef as useThreeRef } from 'react';

// Animated sphere component for R3F
const AnimatedSphere = ({ basePos, color, size, speed, idx }) => {
  const meshRef = useThreeRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.x = basePos[0] + Math.sin(t * speed + idx) * 0.7;
      meshRef.current.position.y = basePos[1] + Math.cos(t * speed + idx) * 0.7;
      meshRef.current.position.z = basePos[2] + Math.sin(t * speed * 0.7 + idx) * 0.5;
    }
  });
  return (
    <mesh ref={meshRef} position={basePos}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial color={color} transparent opacity={0.45} />
    </mesh>
  );
};

// 3D Animated Background Component with animated spheres
const AnimatedBackground = () => {
  const spheres = Array.from({ length: 10 }, (_, i) => ({
    basePos: [Math.sin(i) * 3, Math.cos(i) * 2, Math.sin(i * 2) * 2],
    color: `hsl(${i * 36}, 80%, 60%)`,
    size: 0.7 + 0.2 * (i % 3),
    speed: 0.5 + 0.2 * (i % 5),
    idx: i
  }));
  return (
    <Canvas className="absolute inset-0 w-full h-full z-0" camera={{ position: [0, 0, 10], fov: 60 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 10, 7]} intensity={1.2} />
      {spheres.map((s, i) => (
        <AnimatedSphere key={i} {...s} />
      ))}
      <OrbitControls enablePan={false} enableZoom={false} enableRotate={false} />
    </Canvas>
  );
};

// Fisher-Yates shuffle
function shuffleArray(array) {
  const arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

let lastProductIds = [];

const VirtualTryOn = () => {
  const [isARSupported, setIsARSupported] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [step, setStep] = useState(1);
  const [gender, setGender] = useState('female');
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    if (navigator.xr) {
      navigator.xr.isSessionSupported('immersive-ar')
        .then((supported) => setIsARSupported(supported))
        .catch(() => setIsARSupported(false));
    }
  }, []);

  // Start camera
  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
    } catch (error) {
      alert('Could not access camera.');
    }
  };

  // Capture image from camera
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/png');
      setImagePreview(dataUrl);
      stopCamera();
      setShowCamera(false);
      setStep(3);
      handleImageSubmit(dataUrl);
    }
  };

  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
  };

  // Handle file upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setStep(3);
        handleImageSubmit(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Fetch product suggestions from DummyJSON
  const handleImageSubmit = async (imageData) => {
    setIsLoading(true);
    setSuggestions([]);
    let apiUrl = '';
    if (gender === 'female') {
      apiUrl = 'https://dummyjson.com/products/category/womens-dresses';
    } else {
      apiUrl = 'https://dummyjson.com/products/category/mens-shirts';
    }
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      let products = data.products || [];
      // Remove last shown products
      if (lastProductIds.length > 0) {
        products = products.filter(p => !lastProductIds.includes(p.id));
      }
      // If not enough left, reset
      if (products.length < 6) {
        products = data.products;
      }
      const shuffled = shuffleArray(products);
      const selected = shuffled.slice(0, 6);
      lastProductIds = selected.map(p => p.id);
      setSuggestions(selected);
    } catch (err) {
      setSuggestions([{ title: 'Mock Dress', price: 99.99, images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80'] }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Step indicator
  const StepIndicator = () => (
    <div className="flex justify-center mb-6 gap-2">
      <div className={`w-4 h-4 rounded-full ${step === 1 ? 'bg-blue-500' : 'bg-gray-400'} transition-all duration-300`} />
      <div className={`w-4 h-4 rounded-full ${step === 2 ? 'bg-blue-500' : 'bg-gray-400'} transition-all duration-300`} />
      <div className={`w-4 h-4 rounded-full ${step === 3 ? 'bg-blue-500' : 'bg-gray-400'} transition-all duration-300`} />
    </div>
  );

  const handleProductSelect = (product) => {
    setSelectedProduct(product);
    if (!streamRef.current) {
      startCamera();
    }
  };

  const demoProducts = [
    {
      id: 1,
      name: "Summer Dress",
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f",
      price: "$89.99"
    },
    {
      id: 2,
      name: "Casual Jacket",
      image: "https://images.unsplash.com/photo-1483985988355-763728e1935b",
      price: "$129.99"
    },
    {
      id: 3,
      name: "Evening Gown",
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3",
      price: "$199.99"
    }
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* 3D Animated Background */}
      <div className="absolute inset-0 z-0">
        <AnimatedBackground />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60 pointer-events-none" />
      </div>
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Virtual Try-On
          </h2>
          <p className="text-xl text-gray-200">
            Experience our products in AR before you buy
          </p>
        </motion.div>
        <StepIndicator />
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {/* Camera/Upload/Preview */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative bg-white/10 backdrop-blur-xl rounded-2xl p-8 flex flex-col items-center justify-center min-h-[400px] shadow-2xl border border-white/10 transition-all duration-500"
          >
            {step === 1 && (
              <div className="flex flex-col items-center justify-center w-full h-96">
                <div className="mb-8 flex gap-8">
                  <button onClick={() => { setGender('female'); setStep(2); }} className={`p-6 rounded-full shadow-lg text-4xl flex items-center justify-center transition-all duration-300 ${gender === 'female' ? 'bg-pink-500 text-white scale-110' : 'bg-gray-200 text-pink-600 hover:bg-pink-100'}`}><FaFemale /></button>
                  <button onClick={() => { setGender('male'); setStep(2); }} className={`p-6 rounded-full shadow-lg text-4xl flex items-center justify-center transition-all duration-300 ${gender === 'male' ? 'bg-blue-500 text-white scale-110' : 'bg-gray-200 text-blue-600 hover:bg-blue-100'}`}><FaMale /></button>
                </div>
                <span className="text-gray-300 mt-4 text-lg">Select your style to get started</span>
              </div>
            )}
            {step === 2 && (
              <div className="flex flex-col items-center justify-center w-full h-96">
                <button onClick={startCamera} className="mb-6 p-6 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition text-3xl flex items-center justify-center animate-bounce"><FaCamera /></button>
                <label className="mb-2 p-6 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition text-3xl flex items-center justify-center cursor-pointer animate-bounce delay-150">
                  <FaUpload />
                  <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
                <span className="text-gray-300 mt-4">Capture or upload your photo to try on products</span>
                <button onClick={() => setStep(1)} className="mt-8 px-6 py-2 bg-gray-700 text-white rounded-full">Back</button>
              </div>
            )}
            {showCamera && (
              <>
                <video ref={videoRef} autoPlay playsInline className="w-full h-96 object-cover rounded-xl mb-4 border-4 border-blue-500" />
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                <button onClick={captureImage} className="mt-4 px-8 py-3 bg-blue-600 text-white rounded-full font-bold shadow-lg hover:bg-blue-700 transition text-lg">Capture</button>
                <button onClick={() => { stopCamera(); setShowCamera(false); }} className="mt-2 px-6 py-2 bg-gray-700 text-white rounded-full">Cancel</button>
              </>
            )}
            {step === 3 && imagePreview && !showCamera && (
              <>
                <img src={imagePreview} alt="Preview" className="w-full h-96 object-contain rounded-xl border-4 border-green-500 bg-white mb-4" />
                <button onClick={() => { setImagePreview(null); setStep(2); }} className="mt-2 px-6 py-2 bg-gray-700 text-white rounded-full">Remove</button>
              </>
            )}
            {isLoading && <div className="mt-4 text-blue-400 animate-pulse text-lg">Analyzing your look...</div>}
          </motion.div>
          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="space-y-8"
          >
            <h3 className="text-2xl font-semibold text-white mb-4">Suggested Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {suggestions.length === 0 && !isLoading && <div className="text-gray-400">No suggestions yet.</div>}
              {suggestions.map((product, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.07, boxShadow: '0 8px 32px #00f4' }}
                  className="bg-white/20 backdrop-blur-lg rounded-xl overflow-hidden shadow-xl flex flex-col items-center p-4 border border-white/10 transition-all duration-300"
                >
                  <img src={product.images?.[0] || product.image} alt={product.title || product.name} className="w-32 h-40 object-cover rounded-lg mb-3" />
                  <div className="text-lg font-semibold text-white mb-1">{product.title || product.name}</div>
                  <div className="text-blue-300 font-bold mb-2">${product.price}</div>
                  <button className="bg-blue-600 text-white px-5 py-2 rounded-full font-medium mt-2 shadow hover:bg-blue-700 transition">View Product</button>
                </motion.div>
              ))}
            </div>
            {!isARSupported && (
              <div className="mt-6 p-4 bg-yellow-500/20 rounded-lg">
                <p className="text-yellow-200">
                  AR is not supported on your device. You can still try products using your camera.
                </p>
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VirtualTryOn; 