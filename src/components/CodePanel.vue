<template>
  <div>
    <header class="fullwidth">
      <ul class="tabpanel">
        <li
          v-for="(tab, i) in tabs"
          :key="i"
          @click="switchTab(i)"
          class="tab"
          :class="{activeTab: (i === tabId)}"
        >
          {{ tab.title }}
          <span v-if="tab.isModified">*</span>
          <button @click.stop="closeTab(i)">x</button>
        </li>
      </ul>
      <span class="codecmd-wrapper">
        <button @click="run" :disabled="!active">
          <i class="fas fa-play"></i> 실행
        </button>
        <button @click="save" :disabled="!active">
          <i class="fas fa-save"></i> 저장
        </button>
      </span>
    </header>
    <main v-if="active" class="fullwidth">
      <textarea :value="code" @input="modify" rows="20" class="fullwidth"></textarea>
      <div id="output">
        <span>결과</span>
        <span :class="{warn: warn}">(객체 {{numObjects}}개):</span>
        <span>{{ result }}</span>
      </div>
    </main>
  </div>
</template>

<script>
// MODULARITY?
import { joinPath, normalizePath } from "../path.js";

const pbhhg = require("../../unsuspected-hangeul/pbhhg_js/dist/pbhhg.js");
const ioUtils = {
  print: s => alert(s),
  input: () => prompt("")
};
export default {
  props: ["isFile", "listdir", "load"],
  data: function() {
    return {
      tabs: [],
      tabId: -1,
      code: "",
      result: "",
      numObjects: 0,
      warn: false
    };
  },
  methods: {
    run: function() {
      if (!this.active) return;
      const loadUtils = {
        joinPath,
        normalizePath,
        isFile: this.isFile.bind(this),
        listdir: this.listdir.bind(this),
        load: this.load.bind(this)
      };
      const results = pbhhg.main(this.code, ioUtils, loadUtils);
      this.result = results.join(" ");
      this.numObjects = results.length;
      this.warn = results.length > 1;
    },

    modify: function(e) {
      this.code = e.target.value;
      this.$set(this.tabs[this.tabId], "isModified", true);
    },

    save: function() {
      if (!this.active) return;
      const tab = this.tabs[this.tabId];
      this.$emit("save", tab.regId, this.code);
      this.$set(this.tabs[this.tabId], "isModified", false);
    },

    findTab: function(regId) {
      return this.tabs.findIndex(tab => tab.regId === regId);
    },

    rename: function(regId, title) {
      const tabId = this.findTab(regId);
      if (tabId !== -1) {
        this.$set(this.tabs[tabId], "title", title);
      }
    },

    remove: function(regId) {
      const tabId = this.findTab(regId);
      if (tabId !== -1) {
        this.forceClose(tabId)
      }
    },

    forceClose: function(tabId) {
      this.tabs.splice(tabId, 1);
      this.tabId = -1
      if (this.tabs.length > 0) {
        if (tabId >= this.tabs.length) {
          tabId = this.tabs.length - 1;
        }
        this.switchTab(tabId);
      }
    },

    initTab: function() {
      this.code = "";
      this.result = "";
      this.numObjects = 0;
      this.warn = false;
    },

    switchTab: function(tabId) {
      if (this.tabId >= 0) {
        this.$set(this.tabs[this.tabId], "content", this.code);
      }
      this.initTab();
      this.tabId = tabId;
      this.code = this.tabs[tabId].content;
    },

    openTab: function(regId, title, content) {
      let tabId = this.findTab(regId);
      if (tabId === -1) {
        tabId = this.tabs.length;
        this.tabs.push({ title, content, regId, isModified: false });
      }
      this.switchTab(tabId);
    },

    closeTab: function(tabId) {
      const tab = this.tabs[tabId];
      if (tab.isModified) {
        const response = confirm(
          "'" +
            tab.title +
            "'에 저장하지 않은 변경사항이 있습니다. 저장하지 않고 닫을까요?"
        );
        if (!response) return;
        this.$set(tab, "isModified", false);
      }
      this.forceClose(tabId)
      this.$emit("close", tab.regId);
    }
  },
  computed: {
    active: function() {
      return this.tabs.length > 0;
    }
  }
};
</script>

<style>
.fullwidth {
  width: 100%;
}
.warn {
  color: orange;
}

.tabpanel {
  display: inline-block;
  width: calc(100% - 8rem);
  padding: 0;
  margin: 0;
  overflow: hidden;
  height: 1.5rem;
}

.tab {
  display: inline-block;
  padding: 0.2rem;
  background-color: #111;
}
.activeTab {
  background-color: #333;
}
.codecmd-wrapper {
  float: right;
  width: 8rem;
}

textarea {
  background-color: #333;
  font-family: serif;
  font-size: 1.1rem;
  border: none;
  color: white;
}
</style>