import './Footer.css';

export default function Footer({ children }: { children?: React.ReactNode }) {
  return (
    <div className="footer" data-testid="footer">
      {children}
    </div>
  );
}
