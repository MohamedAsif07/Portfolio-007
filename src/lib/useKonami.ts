import { useEffect, useState } from 'react';

const KONAMI_CODE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a'
];

export function useKonami(callback: () => void) {
  const [inputState, setInputState] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const allowedKey = KONAMI_CODE[inputState];
      
      if (e.key === allowedKey) {
        if (inputState === KONAMI_CODE.length - 1) {
          callback();
          setInputState(0);
        } else {
          setInputState(inputState + 1);
        }
      } else {
        setInputState(0);
        if (e.key === KONAMI_CODE[0]) {
          setInputState(1);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [inputState, callback]);
}
