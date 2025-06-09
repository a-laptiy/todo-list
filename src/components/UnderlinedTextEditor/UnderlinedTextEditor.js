import React, { useState, useEffect, useRef } from 'react';
import { Editor, EditorState, RichUtils, convertFromRaw, SelectionState } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './UnderlinedTextEditor.scss';

const UnderlinedTextEditor = ({ initialText = '', onChange }) => {
  const [editorState, setEditorState] = useState(() => {
    const contentState = convertFromRaw({
      entityMap: {},
      blocks: initialText.split('\n').map(line => ({
        key: Math.random().toString(36).substr(2, 9),
        text: line,
        type: 'underlined',
        depth: 0,
        inlineStyleRanges: [],
        entityRanges: [],
        data: {}
      }))
    });
    
    let state = EditorState.createWithContent(contentState);
    
    const lastBlock = contentState.getLastBlock();
    const length = lastBlock.getLength();
    
    const selection = SelectionState.createEmpty(lastBlock.getKey())
      .set('anchorOffset', length)
      .set('focusOffset', length);
    
    return EditorState.forceSelection(state, selection);
  });

  const editorRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, []);

  const handleChange = (newEditorState) => {
    setEditorState(newEditorState);
    
    if (onChange) {
      const content = newEditorState.getCurrentContent();
      const text = content.getBlocksAsArray().map(block => block.getText()).join('\n');
      onChange(text);
    }
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleChange(newState);
      return 'handled';
    }
    return 'not-handled';
  };

  const customStyleMap = {
    UNDERLINE: {
      textDecoration: 'underline',
    },
  };

  const blockStyleFn = () => {
    return 'underlined-block';
  };

  return (
    <div className={`underlined-editor ${isFocused ? 'focused' : ''}`}>
      <Editor
        ref={editorRef}
        editorState={editorState}
        onChange={handleChange}
        handleKeyCommand={handleKeyCommand}
        customStyleMap={customStyleMap}
        blockStyleFn={blockStyleFn}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder='Enter you task'
      />
    </div>
  );
};

export default UnderlinedTextEditor;
