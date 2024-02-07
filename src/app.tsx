import logo from './assets/logo_nlw.svg';
import { NoteCard } from './compenents/note-card';

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
        <div className="rounded-md bg-slate-700 p-5 space-y-3">
          <span className="text-sm font-medium text-slate-200">
            Adicionar Nota
          </span>
          <p className="text-sm leading-6 text-slate-400">
            Grave nota em áudio
          </p>
        </div>
        {/* REACT COMPONENT */}
        <NoteCard />
      </div>
    </div>
  );
}
