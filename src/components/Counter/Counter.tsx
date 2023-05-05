import './Counter.css';

export default function Counter({
  count,
  title,
}: {
  count: number;
  title: string;
}) {
  return (
    <div data-testid="counter" className="counter">
      <p>
        {title}
        {count}
      </p>
    </div>
  );
}
