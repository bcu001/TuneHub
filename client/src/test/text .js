import { useState } from "react";
import axios from "axios";
import { use } from "react";

const categories = [
  "Pop",
  "Rock",
  "Hip Hop",
  "Jazz",
  "Electronic",
  "Classical",
  "R&B",
  "Country",
  "Reggae",
  "Folk",
];

const UploadSong = ({ setIsUpload }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    artist: "",
    category: "",
    audio: null,
    releaseDate: "",
    image: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };
  const fileToBlob = (blobName) => {
    const file = formData[blobName];

    if (file) {
      const blob = new Blob([file], { type: file.type });
      return blob;
    }
    return null;
  };
  function blobToUrl(blob) {
    if (blob) {
      const url = URL.createObjectURL(blob);
      return url;
    }
    console.error("The provided blob is not a valid audio file.");
    return null;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const { audio } = formData;
    const a = fileToBlob(audio);

    try {
      axios.post("http://localhost:8000/api/upload/song", JSON.stringify(a));
    } catch (err) {
      console.log(err);
    }
  };

  const onCancelled = (e) => {
    e.preventDefault();
    console.log("Cancelled Uploading Song!");
    setIsUpload(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="relative max-w-md mx-auto p-6 bg-white shadow-md rounded-md mt-10"
      encType="multipart/form-data"
    >
      {step === 1 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Upload Song</h2>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="text"
            name="artist"
            placeholder="Song Artist"
            value={formData.artist}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <select
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          >
            {categories.map((c, idx) => (
              <option key={idx} value={c}>
                {c}
              </option>
            ))}
          </select>
          <div className="flex justify-between">
            <button className="p-2 bg-gray-300 rounded" onClick={onCancelled}>
              Cancel
            </button>
            <button
              onClick={() => setStep(2)}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Upload Song Audio</h2>
          <input
            type="file"
            name="audio"
            accept="audio/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate}
            onChange={handleChange}
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="p-2 bg-gray-300 rounded"
            >
              Back
            </button>
            <button
              onClick={() => setStep(3)}
              className="p-2 bg-blue-500 text-white rounded"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2 className="text-xl font-bold mb-4">Upload Song Image</h2>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full p-2 border rounded mb-2"
          />
          <div className="flex justify-between">
            <button
              onClick={() => setStep(2)}
              className="p-2 bg-gray-300 rounded"
            >
              Back
            </button>
            <button
              type="submit"
              className="p-2 bg-green-500 text-white rounded"
            >
              Upload
            </button>
          </div>
        </div>
      )}
    </form>
  );
};

export default UploadSong;
