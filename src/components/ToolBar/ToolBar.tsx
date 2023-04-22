import {
  ArrowUUpLeft,
  ArrowUUpRight,
  FloppyDisk,
  FolderNotchOpen,
} from 'phosphor-react';

import Button from './components/Button/Button';

import './ToolBar.css';

export default function ToolBar() {
  return (
    <div className="toolBar" data-testid="toolBar">
      <h1 className="title">Markdown</h1>
      <div className="buttonGroup">
        <Button icon={FloppyDisk} text="Save" />
        <Button icon={FolderNotchOpen} text="Load" />
        <Button icon={ArrowUUpLeft} text="Undo" />
        <Button icon={ArrowUUpRight} text="Redo" />
      </div>
    </div>
  );
}
