// Load scripts.
import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Alignment from '@ckeditor/ckeditor5-alignment/src/alignment';
import { SourceEditing } from '@ckeditor/ckeditor5-source-editing';
import MathType from '@wiris/mathtype-ckeditor5/src/plugin';

// Load styles.
import './static/style.css';

import packageInfo from '@wiris/mathtype-ckeditor5/package.json';

// Load the file that contains common imports between demos.
import * as Generic from 'resources/demos/imports';

// Apply specific demo names to all the objects.
document.getElementById('header_title_name').innerHTML = 'MathType for CKEditor 5 on HTML';
document.getElementById('version_editor').innerHTML = 'CKEditor: ';

// Insert the initial content in the editor
document.getElementById('editor').innerHTML = Generic.editorContentMathML;

// Copy the editor content before initializing it.
// Currently disabled by decision of QA.
// Generic.copyContentFromxToy('editor', 'transform_content');

window.editor = null;

// Create the CKEditor 5.
ClassicEditor
  .create(document.querySelector('#editor'), {
    plugins: [Essentials, Paragraph, Bold, Italic, MathType, Alignment, SourceEditing],
    toolbar: ['bold', 'italic', 'MathType', 'ChemType', 'alignment:left', 'alignment:center', 'alignment:right', 'sourceEditing'],
    // language: 'de',
    // mathTypeParameters: {
    //   editorParameters: { language: 'es' }, // MathType config, including language
    // },
  })
  .then((editor) => {
    window.editor = editor;
    // Add listener on click button to launch updateContent function.
    // document.getElementById('btn_update').addEventListener('click', (e) => {
    //   e.preventDefault();
    //   Generic.updateContent(editor.getData(), 'transform_content');
    // });

    // Get and set the editor and wiris versions in this order.
    Generic.setEditorAndWirisVersion('5.0.0', packageInfo.version);
    editor.editing.view.focus();
    // updateFunction();
  })
  .catch((error) => {
    console.error(error.stack); //eslint-disable-line
  });

document.getElementById('btn_update').addEventListener('click', (e) => {
  e.preventDefault();
  Generic.updateContent(window.editor.getData(), 'transform_content');
});
