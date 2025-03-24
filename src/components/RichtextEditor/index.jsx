"use client";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const RichtextEditor = ({ value, onChange, id, onBlur }) => {
  return (
    <CKEditor
      id={id}
      editor={ClassicEditor}
      config={{
        removePlugins: ["ImageUpload", "EasyImage", "MediaEmbed"],
      }}
      data={value}
      onBlur={onBlur}
      onReady={(editor) => {
        if (
          editor &&
          editor.editing &&
          editor.editing.view &&
          editor.editing.view.document
        ) {
          editor.editing.view.change((writer) => {
            const root = editor.editing.view.document.getRoot();
            if (root) {
              writer.setStyle("min-height", "300px", root);
            }
          });
        }
      }}
      onChange={(event, editor) => {
        const richText = editor.getData();
        onChange(richText);
      }}
    />
  );
};

export default RichtextEditor;
