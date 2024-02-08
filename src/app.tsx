import logo from './assets/logo_nlw.svg';
import { NoteCard } from './compenents/note-card';
import { NewNoteCard } from './compenents/new-note-card';

export function App() {
  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6">
      <img src={logo} alt="nlw-expert" />

      <form className="w-full ">
        <input
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500 "
          placeholder="Busque em suas notas"
          type="text"
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-3 auto-rows-[250px] gap-6">
        {/* REACT COMPONENT */}
        <NewNoteCard />
        <NoteCard
          note={{
            date: new Date(),
            content: 'Hello World',
          }}
        />
      </div>
    </div>
  );
}
