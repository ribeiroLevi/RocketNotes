import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

export function NewNoteCard() {
  const [shouldShowOnboarding, setshouldShowOnboarding] = useState(true);
  const [content, sentContent] = useState('');

  function handleStartEditor() {
    setshouldShowOnboarding(false);
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    if (event.target.value == '') {
      setshouldShowOnboarding(true);
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();

    toast.success('Nota Criada com Sucesso');
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md bg-slate-700 p-5 space-y-3 outline-none hover:ring-2 ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar Nota
        </span>
        <p className="text-sm leading-6 text-slate-400">Grave nota em áudio</p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50"></Dialog.Overlay>
        <Dialog.Content className="overflow-hidden fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <form
            action=""
            onSubmit={handleSaveNote}
            className="flex-1 flex flex-col"
          >
            <div className="flex flex-1 flex-col gap-4 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar Nota
              </span>

              {shouldShowOnboarding === true ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{' '}
                  <button className="font-medium text-lime-400 hover:underline">
                    gravando um nota
                  </button>{' '}
                  em áudio ou se preferir use{' '}
                  <button
                    onClick={handleStartEditor}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    apenas texto
                  </button>
                </p>
              ) : (
                <textarea
                  autoFocus
                  onChange={handleContentChanged}
                  className="text-small leading-6 text-slate-400 resize-none flex-1 outline-none bg-transparent"
                ></textarea>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
            >
              Salvar nota
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}