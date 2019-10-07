<template>
  <div>
    <FilePanel ref="filePanel" @open="openHandler" @rename="renameHandler" @remove='removeHandler' id="filepanel"></FilePanel>
    <CodePanel
      ref="codePanel"
      :isFile="isFile"
      :listdir="listdir"
      :load="load"
      @save="saveHandler"
      @close="closeHandler"
      id="codepanel"
    ></CodePanel>
  </div>
</template>

<script>
import FilePanel from "./FilePanel.vue";
import CodePanel from "./CodePanel.vue";

export default {
  data: function() {
    return {};
  },
  methods: {
    isFile: function(path) {
      return this.$refs.filePanel.isFile(path);
    },
    listdir: function(path) {
      return this.$refs.filePanel.listdir(path);
    },
    load: function(path) {
      return this.$refs.filePanel.load(path);
    },
    openHandler: function(regId, title, content) {
      this.$refs.codePanel.openTab(regId, title, content);
    },
    renameHandler: function(regId, title) {
      this.$refs.codePanel.rename(regId, title);
    },
    removeHandler: function(regId) {
      this.$refs.codePanel.remove(regId);
    },
    saveHandler: function(regId, content) {
      this.$refs.filePanel.save(regId, content);
    },
    closeHandler: function(regId) {
      this.$refs.filePanel.close(regId);
    },
    keypressHandler: function(e) {
      if (e.ctrlKey) {
        if (e.code === 'Enter') {
          this.$refs.codePanel.run()
        } else if (e.code === 'KeyS') {
          this.$refs.codePanel.save()
          e.preventDefault()
        }
      }
    }
  },
  created: function() {
    document.addEventListener('keydown', this.keypressHandler.bind(this))
  },
  components: { FilePanel, CodePanel }
};
</script>

<style>
@media (min-width: 21rem) {
  #filepanel {
    width: 20rem;
    float: left;
    background-color: rgb(9, 22, 29);
  }
  #codepanel {
    margin-left: 20.5rem;
  }
}
</style>