type Resource = {
  title: string;
  image: string;
  link?: string;
};

const mockResources: Resource[] = Array(6).fill({
  title: "Common React Mistakes",
  image: "https://png.pngtree.com/background/20210714/original/pngtree-abstract-red-technology-background-picture-image_1240372.jpg",
});

export default function CommitRecommendedResources() {
  return (
    <div className="">
      <div className="flex flex-wrap gap-4 overflow-x-auto pb-2">
        {mockResources.map((res, idx) => (
          <div
            key={idx}
            className="w-44 min-w-[170px] bg-[#1c2128] rounded-lg border border-[#30363d] p-3 flex flex-col items-center gap-2"
          >
            <h3 className="text-sm text-center font-medium text-white">
              {res.title}
            </h3>
            <img
              src={res.image}
              alt={res.title}
              className="w-full h-[80px] object-cover rounded bg-pink-300"
            />
            <button className="w-full mt-2 bg-[#c43b4e] hover:bg-[#a12d3c] transition text-white text-xs py-1 rounded">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
