import './CharCounter.css';

export default function CharCounter({ charCount }: { charCount: number }) {
  return (
    <div data-testid="charCounter" className="charCounter">
      <p>Characters: {charCount}</p>
    </div>
  );
}
