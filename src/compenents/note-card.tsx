export function NoteCard() {
  return (
    <button className="text-left outline-none rounded-md bg-slate-800 p-5 space-y-3 overflow-hidden relative transition-all-0.15s hover:ring-2 ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 ">
      <span className="text-sm font-medium text-slate-300">há 2 dias</span>
      <p className="text-sm leading-6 text-slate-400">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa, at modi
        voluptatem recusandae fuga maiores ad? Molestias modi, beatae, placeat
        velit expedita officia totam minima necessitatibus tempora eveniet sint
        laudantium. Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Culpa, at modi voluptatem recusandae fuga maiores ad? Molestias modi,
        beatae, placeat velit expedita officia totam minima necessitatibus
        tempora eveniet sint laudantium.
      </p>
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none ">
        {' '}
      </div>
    </button>
  );
}
