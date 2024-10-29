import SearchBar from "../SearchBar/SearchBar";
import ImageGallery from "../ImageGallery/ImageGallery";
import LoadMoreBtn from "../LoadMoreBtn/LoadMoreBtn";
import ImageModal from "../ImageModal/ImageModal";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import { fetchImages } from "../../services/api";
import { Image } from "../../types";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>("");
  const [totalPages, setTotalPages] = useState<number>(0);
  const [selectedImage, setSelectedImage] = useState<Image | null>(null);

  useEffect(() => {
    if (!query) return;

    const getPhotos = async () => {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await fetchImages(page, query);
        if (data.results.length === 0) {
          toast.error("No images found!", {
            style: {
              backgroundColor: "#ace1af",
              color: "#1b4d3e",
            },
            duration: 3000,
            position: "top-right",
          });
        }
        setImages((prev) => [...prev, ...data.results]);
        setTotalPages(data.total_pages);
      } catch {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    getPhotos();
  }, [page, query]);

  const handleSearch = (value: string) => {
    if (value === query) return;
    setQuery(value);
    setImages([]);
    setPage(1);
  };

  const loadMore = () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const openModal = (image: Image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={openModal} />
      )}
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {images.length > 0 && page < totalPages && !isLoading && (
        <LoadMoreBtn onClick={loadMore} />
      )}
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={closeModal} />
      )}
    </>
  );
}

export default App;
