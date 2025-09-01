import { FEATURES } from "../../../app/data/features";

export default function Features() {
  return (
    <section className="w-full bg-gradient-to-r from-teal-200 to-teal-300 py-10 rounded-2xl text-black mt-28 font-sans">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
        {FEATURES.map((f, i) => (
          <div key={i} className="flex flex-col items-center gap-3">
            {f.icon}
            <h3 className="text-base md:text-3xl font-semibold">{f.title}</h3>
            <p className="text-xs md:text-sm text-gray-700">{f.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
