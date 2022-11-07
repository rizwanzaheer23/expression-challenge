import React, { useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export const WysiwygEditor = ({ setEditorState, editorState, show }) => {
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
  };

  return (
    <Editor
      editorState={editorState}
      toolbarClassName="toolbarClassName"
      wrapperClassName={`editorWrapper ${!show ? "editorHide" : ""}`}
      editorClassName="editor"
      onEditorStateChange={onEditorStateChange}
    />
  );
};
