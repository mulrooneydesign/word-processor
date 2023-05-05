import { ArrowFatDown, ArrowFatUp } from 'phosphor-react';
import { useMarkdownStore } from '../../../store/store';

import './Minimizer.css';

export default function Minimizer() {
  const toggleTextAreaIsOpen = useMarkdownStore(
    (state) => state.toggleTextAreaIsOpen
  );

  const textAreaIsOpen = useMarkdownStore((state) => state.textAreaIsOpen);

  const handleToggleOpen = () => {
    toggleTextAreaIsOpen();
  };

  return (
    <div
      className="minimizer"
      data-testid="minimizer"
      onClick={handleToggleOpen}>
      {textAreaIsOpen ? (
        <ArrowFatDown data-testid="arrow" className="arrow" />
      ) : (
        <ArrowFatUp data-testid="arrow" className="arrow" />
      )}
    </div>
  );
}
