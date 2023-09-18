import { useCallback, useEffect, useState } from 'react';
import { db } from '../../../functions/server/api/db';
import ToolBar from '../ToolBar/ToolBar';
import Button from '../Button/Button';
import { useMarkdownStore } from '../../store/store';
import { useNavigate } from 'react-router-dom';
import { File } from 'phosphor-react';
import './SavedDocuments.css';

interface Document {
  id: number;
  name: string;
  content: string;
}

function SavedDocumentLoader() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const isLoggedIn = useMarkdownStore((state) => state.isLoggedIn);
  const setCurrentFile = useMarkdownStore((state) => state.setCurrentFile);

  const navigate = useNavigate();

  const getDocuments = useCallback(async (): Promise<Document[] | void> => {
    if (!isLoggedIn) return;

    const { data, error } = await db.from('documents').select('*');

    if (!error) {
      return data as Document[];
    }
    return;
  }, [isLoggedIn]);

  const setDocumentInUse = async (id: number) => {
    if (!isLoggedIn) return;

    // get the document from the documents state with an matching id
    const document = documents.find((document) => document.id === id);

    if (document) {
      setCurrentFile(document.content);
      navigate('/');
    }

    return;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await getDocuments();

        if (fetchedData) {
          setDocuments(fetchedData);
        }
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    };

    fetchData();
  }, [getDocuments]);

  return (
    <>
      <h1>Open saved documents</h1>
      <ul className="savedDocuments">
        {documents.map((document) => {
          return (
            <li className="savedDocument" key={document.id}>
              <h2>{document.name}</h2>
              <Button
                text="Open"
                icon={File}
                handler={() => setDocumentInUse(document.id)}
              />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default function SavedDocuments() {
  return (
    <>
      <ToolBar />
      <main className="savedDocumentsContainer">
        <SavedDocumentLoader />
      </main>
    </>
  );
}
