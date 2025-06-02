import { Link } from "react-router-dom";

const categories = [
  { category: "Pop", bgColor: "rgba(255, 105, 180, 0.3)" }, // Pink
  { category: "Rock", bgColor: "rgba(139, 0, 0, 0.3)" }, // Dark Red
  { category: "Hip Hop", bgColor: "rgba(255, 165, 0, 0.3)" }, // Orange
  { category: "Jazz", bgColor: "rgba(75, 0, 130, 0.3)" }, // Indigo
  { category: "Electronic", bgColor: "rgba(0, 191, 255, 0.3)" }, // Sky Blue
  { category: "Classical", bgColor: "rgba(255, 255, 224, 0.3)" }, // Light Yellow
  { category: "R&B", bgColor: "rgba(128, 0, 128, 0.3)" }, // Purple
  { category: "Country", bgColor: "rgba(210, 105, 30, 0.3)" }, // Chocolate Brown
  { category: "Reggae", bgColor: "rgba(34, 139, 34, 0.3)" }, // Green
  { category: "Folk", bgColor: "rgba(222, 184, 135, 0.3)" }, // Tan
];

export default function TrendingCategories() {
  return (
    <section className="mr-2">
      <h2 className="text-4xl font-bold text-white mb-6">Explore Categories</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4 mx-2">
        {categories.map((c) => (
          <Link
            key={c.category}
            to={`/category/${c.category.toLowerCase()}`} // Added dynamic link
            className="flex-none px-4 py-2 rounded text-white w-[200px] h-[250px] backdrop-blur-2xl flex items-center justify-center text-center font-bold text-lg"
            style={{ backgroundColor: c.bgColor }} // Using inline styles for bgColor
          >
            {c.category}
          </Link>
        ))}
      </div>
    </section>
  );
}
