import React, { useState } from "react";

export default function Chatbot() {
  const [disease, setDisease] = useState("");
  const [info, setInfo] = useState(null);

  const data = {
    fever: {
      medicine: "Paracetamol, Ibuprofen",
      food: "Light soups, fruits, plenty of water",
      exercise: "Rest, light stretching only",
      foodImages: [
        "https://www.medicalnewstoday.com/content/images/articles/318/318619/five-bottles-of-water.jpg",
        "http://baltana.com/files/wallpapers-2/Fruit-HD-Wallpapers-03484.jpg",
      ],
      exerciseImages: [
        "https://kemtai.com/wp-content/uploads/2023/03/pexels-shvets-production-8899546.jpg",
        "https://sunflowercommunities.org/wp-content/uploads/2022/02/dementiaphysicalexercise.jpeg",
      ],
    },
    cold: {
      medicine: "Antihistamines, Decongestants",
      food: "Ginger tea, warm broth, citrus fruits",
      exercise: "Mild yoga, breathing exercises",
      foodImages: [
        "http://4.bp.blogspot.com/--6r30eWGmVg/Tkek64O1hdI/AAAAAAAAAMo/wG0PZkuI0lw/s1600/Citrus+Fruits4.jpg",
        "https://cdn.shopify.com/s/files/1/0687/6050/2545/files/ginger-slices-jagger.webp?v=1688973432",
      ],
      exerciseImages: [
        "https://img.freepik.com/premium-photo/group-meditation-yoga-studio-breathing-exercises-men-women-meditating-breathing-with-ey_737376-2936.jpg",
        "https://zenfulspirit.com/wp-content/uploads/2015/11/3rd-image1.jpg",
      ],
    },
    headache: {
      medicine: "Acetaminophen, Ibuprofen",
      food: "Hydrating foods, nuts, green leafy vegetables",
      exercise: "Meditation, gentle walking",
      foodImages: [
        "https://livelovefruit.com/wp-content/uploads/2015/05/hydrating-foods.jpg",
        "https://healthwire.pk/wp-content/uploads/2022/08/green-leafy-vegetables.jpg",
      ],
      exerciseImages: [
        "https://static01.nyt.com/images/2022/08/03/well/FITNESS-WALKING-MEALS/FITNESS-WALKING-MEALS-mediumSquareAt3X.jpg",
        "https://getmegiddy.com/sites/default/files/2022-11/meditation-for-men_social.jpg",
      ],
    },
  };

  const handleSearch = () => {
    const key = disease.trim().toLowerCase();
    setInfo(data[key] || null);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 flex flex-col md:flex-row gap-6 max-w-5xl w-full">
        {/* Left Side - Chatbot */}
        <div className="flex-1 max-w-xl">
          <h1 className="text-2xl font-bold mb-4 mt-4 text-green-600 text-center">
            AI Chatbot
          </h1>

          {/* Input */}
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              placeholder="Enter your disease..."
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleSearch}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Search
            </button>
          </div>

          {/* Result */}
          {disease && (
            <div className="bg-gray-50 border rounded-lg p-4">
              <h2 className="text-xl font-semibold capitalize">{disease}</h2>
              {info ? (
                <div className="mt-3 space-y-2">
                  <p>
                    <b>Medicine:</b> {info.medicine}
                  </p>
                  <p>
                    <b>Food:</b> {info.food}
                  </p>
                  <p>
                    <b>Exercise:</b> {info.exercise}
                  </p>
                </div>
              ) : (
                <p className="text-red-500 mt-2">No data found</p>
              )}
            </div>
          )}
        </div>

        {/* Right Side - Images */}
        {info && (
          <div className="flex-1">
            <div>
              <h3 className="text-lg font-semibold mb-2">Food Suggestions</h3>
              <div className="flex flex-wrap gap-3 mb-6">
                {info.foodImages.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt="Food"
                    className="w-40 h-40 object-cover rounded-lg shadow"
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Exercise Suggestions</h3>
              <div className="flex flex-wrap gap-3">
                {info.exerciseImages.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt="Exercise"
                    className="w-40 h-40 object-cover rounded-lg shadow"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
