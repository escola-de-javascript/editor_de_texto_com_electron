import Vue from 'vue'
import VueQuillEditor, { Quill } from "vue-quill-editor";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from '@appsflare/quill-image-resize-module'
import QuillEmoji from 'quill-emoji'
import "quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";

Quill.register({
    'modules/imageDrop': ImageDrop,
    'modules/imageResize': ImageResize,
    'modules/emoji': QuillEmoji
});

Vue.use(VueQuillEditor)