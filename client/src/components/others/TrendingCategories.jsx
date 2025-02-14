const categories = ["Pop", "Rock", "Hip Hop", "Jazz", "Electronic", "Classical", "R&B", "Country", "Reggae", "Folk"]

export default function TrendingCategories() {
  return (
    <section>
      <h2 className="text-3xl font-bold my-6">Explore Categories</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {categories.map((category) => (
          <button
            key={category}
            className="flex-none px-4 py-2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold hover:from-purple-700 hover:to-blue-700 transition-colors duration-300"
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  )
}