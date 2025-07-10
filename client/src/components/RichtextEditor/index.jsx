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
        editor.editing.view.change((writer) => {
          writer.setStyle("min-height", "300px", editor.editing.view.document.getRoot());
        });
      }}
      onChange={(event, editor) => {
        const richText = editor.getData();
        onChange(richText);
      }}
    />
  );
};

export default RichtextEditor;
