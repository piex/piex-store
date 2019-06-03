import React, { FC, useState, useMemo, useCallback, KeyboardEvent } from 'react';

interface ITodoTextInputProps {
  placeholder?: string;
  newTodo?: boolean;
  editing?: boolean;
  text: string;
  onSave: (arg: string) => void;
}

const TodoTextInput: FC<ITodoTextInputProps> = ({ editing = false, newTodo = false, text, placeholder, onSave }) => {
  const [newText, setText] = useState(text);

  const classNames = useMemo(() => {
    let str = '';
    editing && (str += 'edit ');
    newTodo && (str += 'new-todo');
    return str;
  }, [editing, newTodo]);

  const handleBlur = useCallback(
    () => {
      onSave(newText);
    },
    [onSave, newText],
  );

  const handleSubmit = useCallback((evt: KeyboardEvent<HTMLInputElement>) => {
    if (evt.which === 13) {
      onSave(newText);
      if (newTodo) {
        setText('');
      }
    }
  }, [newTodo, newText, setText, onSave]);

  return (
    <input
      type="text"
      className={classNames}
      placeholder={placeholder}
      autoFocus={true}
      value={newText}
      onChange={evt => setText(evt.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleSubmit}
    />
  );
};

export default TodoTextInput;
