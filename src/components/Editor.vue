<template>
  <div class="editor">
    <button @click="openFile" class="button is-small">Abrir filepath</button>
    <button @click="saveFile" class="button is-small">Salvar filepath</button>
    <quill-editor v-model="content" :options="editorOption" @change="onEditorChange($event)"></quill-editor>
  </div>
</template>

<script>
import hljs from "highlight.js";
import { remote } from "electron";
import "highlight.js/styles/monokai-sublime.css";
import "bulma/css/bulma.min.css";
import fs from "fs";

export default {
  name: "Editor",
  data() {
    return {
      content: "",
      editorOption: {
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"],
              ["blockquote", "code-block"],
              [{ header: 1 }, { header: 2 }],
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }],
              [{ indent: "-1" }, { indent: "+1" }],
              [{ direction: "rtl" }],
              [{ size: ["small", false, "large", "huge"] }],
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ["emoji"],
              ["clean"],
              ["link", "image", "video"]
            ],
            handlers: { emoji: function() {} }
          },
          syntax: {
            highlight: text => hljs.highlightAuto(text).value
          },
          imageDrop: true,
          imageResize: {
            modules: ["Resize", "DisplaySize", "Toolbar"]
          },
          "emoji-toolbar": true,
          "emoji-shortname": true
        }
      }
    };
  },
  methods: {
    openFile() {
      const [filepath] = remote.dialog.showOpenDialog({
        properties: ["openFile"]
      });
      const context = this;

      if (filepath === undefined || !filepath.includes(".escola_js")) {
        alert("Nenhum arquivo selecionado ou formato não suportado.");
        return;
      }
      fs.readFile(filepath, "utf-8", (err, data) => {
        if (err) {
          alert("Um erro ocorreu ao abrir arquivo:" + err.message);
          return;
        }
        context.content = data;
      });
    },
    saveFile() {
      const filenameToSave = remote.dialog.showSaveDialog();

      const filePathToSave = filenameToSave.includes(".escola_js")
        ? filenameToSave
        : `${fileToSave}.escola_js`;
      fs.writeFile(filePathToSave, this.content, err => {
        if (err) throw err;
        console.log("The file has been saved!");
      });
    },
    onEditorChange({ html }) {
      this.content = html;
    }
  }
};
</script>

<style>
.quill-editor,
.quill-code {
  width: 100%;
  height: 90vh;
}

.quill-code {
  height: auto;
  border: none;
}
.quill-code > .title {
  border: 1px solid #ccc;
  border-left: none;
  height: 3em;
  line-height: 3em;
  text-indent: 1rem;
  font-weight: bold;
}

button {
  margin: 0 5px 0 5px;
}
</style>
