import React, { useState, useEffect } from "react";
import ImageCard from "./Components/ImageCard";
import axios from "axios";
import ImageSearch from "./Components/ImageSearch";
function App() {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState("");

  useEffect(() => {
    axios
      .get(
        `https://pixabay.com/api/?key=${process.env.REACT_APP_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`
      )
      .then((res) => {
        setImages(res.data.hits);
        setIsLoading(false);
      });
  }, [term]);
  return (
    <div className="container mx-auto">
      <ImageSearch searchText={(text) => setTerm(text)} />
      {!isLoading && images.length === 0 && (
        <h1 className="font-bold text-6xl text-center mx-auto mt-60">
          Oops No Images Found...
        </h1>
      )}
      {isLoading ? (
        <h1 className="font-bold text-6xl text-center mx-auto mt-60">
          Loading...
        </h1>
      ) : (
        <div className="grid sm:grid-cols-2 gap-2 md:grid-cols-3 gap-4 place-items-center">
          {images.map((image) => (
            <ImageCard key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
