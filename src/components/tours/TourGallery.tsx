import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface TourGalleryProps {
  images: string[];
  tourName: string;
}

const TourGallery: React.FC<TourGalleryProps> = ({ images, tourName }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const openLightbox = (index: number) => {
    setCurrentImage(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const goToPrevious = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return;
      
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen]);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className={`overflow-hidden rounded-lg cursor-pointer ${
              index === 0 ? 'md:col-span-2 md:row-span-2' : ''
            }`}
            onClick={() => openLightbox(index)}
          >
            <img 
              src={image} 
              alt={`${tourName} - Image ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
              style={{ height: index === 0 ? '400px' : '200px' }}
            />
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center">
          <button 
            className="absolute top-4 right-4 text-white hover:text-secondary-500 transition-colors duration-200"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>

          <button 
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-colors duration-200"
            onClick={goToPrevious}
          >
            <ChevronLeft size={24} />
          </button>

          <img 
            src={images[currentImage]} 
            alt={`${tourName} - Image ${currentImage + 1}`}
            className="max-h-[80vh] max-w-[80vw] object-contain"
          />

          <button 
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 hover:bg-opacity-70 text-white p-2 rounded-full transition-colors duration-200"
            onClick={goToNext}
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black bg-opacity-50 px-4 py-2 rounded-full text-white text-sm">
            {currentImage + 1} / {images.length}
          </div>
        </div>
      )}
    </div>
  );
};

export default TourGallery;