import { useEffect } from 'react';
import TextArea from './components/TextArea/TextArea';
import ToolBar from './components/ToolBar/ToolBar';
import Signup from './components/Signup/Signup';
import { db } from './api/db';
import { useMarkdownStore } from './store/store';

function App() {
  const isLoggedIn = useMarkdownStore((state) => state.isLoggedIn);
  const setIsLoggedIn = useMarkdownStore((state) => state.setIsLoggedIn);

  useEffect(() => {
    db.auth.getSession().then(({ data: { session }, error }) => {
      if (!error && session) {
        setIsLoggedIn(true);
      }
    });

    const {
      data: { subscription },
    } = db.auth.onAuthStateChange((_event, session) => {
      if (session) setIsLoggedIn(true);
      return;
    });

    return () => subscription.unsubscribe();
  }, [setIsLoggedIn]);

  if (!isLoggedIn) {
    return <Signup />;
  }

  return (
    <div className="app">
      <ToolBar />
      <TextArea />
    </div>
  );
}

export default App;
