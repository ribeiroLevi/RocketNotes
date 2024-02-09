import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'sonner';

interface NewNoteCardProps {
  onNoteCreated: (content: string) => void;
}

let speechRecognition: SpeechRecognition | null = null;

export function NewNoteCard({ onNoteCreated }: NewNoteCardProps) {
  const [shouldShowOnboarding, setshouldShowOnboarding] = useState(true);
  const [content, setContent] = useState('');
  const [isRecording, setRecording] = useState(false);

  function handleStartEditor() {
    setshouldShowOnboarding(false);
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);

    if (event.target.value == '') {
      setshouldShowOnboarding(true);
    }
  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault();

    onNoteCreated(content);

    setContent('');
    setshouldShowOnboarding(true);

    if (content === '') {
      return;
    }

    toast.success('Nota Criada com Sucesso');
  }

  function handleStartRecording() {
    setRecording(true);
    setshouldShowOnboarding(false);

    const isSpeechRecognitionAPIAvailable =
      'SpeechReconition' in window || 'webkitSpeechRecognition' in window;

    if (!isSpeechRecognitionAPIAvailable) {
      alert('Seu navegador não possui API de Reconhecimento Vocal');

      return;
    }

    const SpeechRecognitionAPI =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    const speechRecognition = new SpeechRecognitionAPI();

    speechRecognition.lang = 'pt-BR';
    speechRecognition.continuous = true;
    speechRecognition.maxAlternatives = 1;
    speechRecognition.interimResults = true;

    speechRecognition.onresult = (event) => {
      const transcription = Array.from(event.results).reduce((text, result) => {
        return text.concat(result[0].transcript);
      }, '');

      setContent(transcription);
    };

    speechRecognition.onerror = (event) => {
      console.error(event);
    };

    speechRecognition.start();
  }

  function handleStopRecording() {
    setRecording(false);

    if (speechRecognition !== null) {
      speechRecognition.stop();
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="rounded-md bg-slate-700 p-5 space-y-3 outline-none hover:ring-2 ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400">
        <span className="text-sm font-medium text-slate-200">
          Adicionar Nota
        </span>
        <p className="text-sm leading-6 text-slate-400">
          Grave nota em áudio ou digite
        </p>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50"></Dialog.Overlay>
        <Dialog.Content className="overflow-hidden fixed inset-0 md:left-1/2 md:inset-auto md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] md:w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>
          <form action="" className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-4 p-5">
              <span className="text-sm font-medium text-slate-300">
                Adicionar Nota
              </span>

              {shouldShowOnboarding === true ? (
                <p className="text-sm leading-6 text-slate-400">
                  Comece{' '}
                  <button
                    type="button"
                    onClick={handleStartRecording}
                    className="font-medium text-lime-400 hover:underline"
                  >
                    gravando um nota
                  </button>{' '}
                  em áudio ou se preferir use{' '}
                  <button
                    type="button"
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
                  value={content}
                ></textarea>
              )}
            </div>

            {isRecording ? (
              <button
                onClick={handleStopRecording}
                type="button"
                className="w-full flex items-center justify-center gap-2 bg-slate-900 py-4 text-center text-sm text-slate-300 outline-none font-medium hover:text-slate-100"
              >
                <div className="size-3 rounded-full bg-red-500 animate-pulse" />
                Gravando (Clique Para Interromper)
              </button>
            ) : (
              <button
                onClick={handleSaveNote}
                type="button"
                className="w-full bg-lime-400 py-4 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
              >
                Salvar nota
              </button>
            )}
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
