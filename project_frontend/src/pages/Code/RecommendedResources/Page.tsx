const resources = Array.from({ length: 10 }).map((_, i) => ({
  id: i + 1,
  title: "Common React Mistakes",
  image: "https://png.pngtree.com/background/20210714/original/pngtree-abstract-red-technology-background-picture-image_1240372.jpg",
  link: "#"
}));

export default function RecommendedResources() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-red-500 mb-6">Recommended Resources</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {resources.map((res) => (
          <div
            key={res.id}
            className="bg-[#2a2a2a] p-4 rounded-md flex flex-col items-center text-center"
          >
            <h3 className="text-sm text-white font-semibold mb-2">
              {res.title}
            </h3>
            <img
              src={res.image}
              alt={res.title}
              className="rounded-md mb-3 w-full h-24 object-cover"
            />
            <button className="bg-[#b3364b] hover:bg-[#992f40] text-white text-sm px-4 py-2 rounded w-full mt-auto">
              View Resource
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
