import { useMarkdownStore } from '../../store/store';
import { X } from 'phosphor-react';
import { db } from '../../api/db';
import { getUserId } from '../../api/getUserId';
import Input from '../Input/Input';

import './Save.css';
import Tooltip from '../Tooltip/Tooltip';
import { useState } from 'react';

export function Save() {
  const dbFileName = useMarkdownStore((state) => state.dbFileName);

  const [pending, setPending] = useState(false);

  function onChangeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    useMarkdownStore.setState({ dbFileName: e.target.value });
  }

  const markdown = useMarkdownStore((state) => state.markdown);

  async function saveToDatabaseHandler(event: { preventDefault: () => void }) {
    event.preventDefault();

    if (!markdown) return;
    if (!dbFileName) return;

    const user_id = await getUserId();

    if (pending || !user_id) return;
    setPending(true);

    const { error } = await db
      .from('documents')
      .insert([{ name: dbFileName, content: markdown, user_id }]);

    if (!error) {
      setPending(false);
      onCloseHandler();
    }
  }

  function onCloseHandler() {
    useMarkdownStore.setState({ saveFileNameMenuIsOpen: false });
  }

  return (
    <div className="save">
      <form className="saveForm" onSubmit={saveToDatabaseHandler}>
        <X className="close" onClick={onCloseHandler} />
        <Input
          type="text"
          placeholder={dbFileName}
          required={true}
          handler={onChangeHandler}
        />
        <Tooltip text="Save your file">
          <Input type="submit" value="Save File" pending={pending} />
        </Tooltip>
      </form>
    </div>
  );
}
