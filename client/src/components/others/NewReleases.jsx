// import Image from "next/image"

const newReleases = [
  { id: 1, title: "Neon Dreams", artist: "Synthwave Collective", releaseDate: "2025-03-15", image: "/placeholder.svg" },
  { id: 2, title: "Acoustic Serenity", artist: "Melody Makers", releaseDate: "2025-03-10", image: "/placeholder.svg" },
  { id: 3, title: "Electric Pulse", artist: "Beat Masters", releaseDate: "2025-03-05", image: "/placeholder.svg" },
  { id: 4, title: "Jazzy Nights", artist: "Smooth Operators", releaseDate: "2025-02-28", image: "/placeholder.svg" },
  { id: 5, title: "Rock Revival", artist: "Guitar Heroes", releaseDate: "2025-02-20", image: "/placeholder.svg" },
  { id: 6, title: "Pop Explosion", artist: "Chart Toppers", releaseDate: "2025-02-15", image: "/placeholder.svg" },
]

export default function NewReleases() {
  return (
    <section>
      <h2 className="text-3xl font-bold mb-6">New Releases</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {newReleases.map((album) => (
          <div key={album.id} className="bg-purple-800 bg-opacity-50 rounded-lg overflow-hidden shadow-lg">
            <div className="relative aspect-square">
              <img src={album.image || "/placeholder.svg"} alt={album.title} />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-lg mb-1 truncate">{album.title}</h3>
              <p className="text-sm text-gray-300 mb-2">{album.artist}</p>
              <p className="text-xs text-gray-400 mb-4">Released: {album.releaseDate}</p>
              <div className="flex space-x-2">
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-sm">
                  View Album
                </button>
                <button className="bg-transparent hover:bg-purple-700 text-white font-semibold py-2 px-4 border border-purple-500 hover:border-transparent rounded text-sm">
                  Play All
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
