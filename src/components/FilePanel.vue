<template>
  <nav>
    <header style="overflow: hidden;">
      파일
      <span id="globalcmd-wrapper">
        <button @click="addNode(true)">
          <i class="fas fa-plus"></i> 새 파일
        </button>
        <button @click="addNode(false)">
          <i class="fas fa-folder-plus"></i> 새 폴더
        </button>
      </span>
    </header>

    <sl-vue-tree
      v-model="nodes"
      ref="slVueTree"
      :allow-multiselect="true"
      @select="onSelect"
      @beforedrop="beforeDrop"
    >
      <template slot="title" slot-scope="{ node }">
        <span class="item-icon" v-if="node.isLeaf">
          <i class="fas fa-file"></i>
        </span>
        {{ node.title }}
      </template>

      <template slot="toggle" slot-scope="{ node }">
        <button v-if="!node.isLeaf" :aria-label="node.isExpanded? '접기': '펼치기'">
          <i v-if="node.isExpanded" class="fas fa-chevron-down"></i>
          <i v-else class="fas fa-chevron-right"></i>
        </button>
      </template>

      <template slot="sidebar" slot-scope="{ node }">
        <span id="localcmd-wrapper">
          <button class="item-icon" @click.stop="rename(node)">
            <i class="fas fa-edit" title="이름 바꾸기"></i>
          </button>
          <button class="item-icon" @click.stop="removeNode(node)">
            <i class="fas fa-trash-alt" title="삭제"></i>
          </button>
        </span>
      </template>

      <template slot="draginfo">{{selectedNodesTitle}}</template>
    </sl-vue-tree>
  </nav>
</template>

<script>
import SlVueTree from "sl-vue-tree";

import PreImportedNodes from "../preimported.js";

function createNode(title, isLeaf) {
  let newNode = { title: title, isLeaf: isLeaf };
  if (isLeaf) {
    newNode.data = { content: "" };
  } else {
    newNode.isExpanded = true;
  }
  return newNode;
}

export default {
  data: function() {
    return {
      nodes: JSON.parse(JSON.stringify(PreImportedNodes)),
      selectedNodesTitle: "",
      openedNodesRegistry: []
    };
  },
  methods: {
    registerNode: function(node) {
      const reg = this.openedNodesRegistry;
      const idx = reg.find(n => !n) || reg.length;
      this.$set(reg, idx, node);
      this.$set(node.data, "regId", idx);
    },

    /**** Handle events from click ****/
    onSelect: function(nodes) {
      this.selectedNodesTitle = nodes.map(node => node.title).join(", ");
      if (nodes.length === 1) {
        let node = nodes[0];
        if (node.isLeaf) {
          if (node.data.regId == undefined) {
            this.registerNode(node);
          }
          this.$emit("open", node.data.regId, node.title, node.data.content);
        }
      }
    },

    /**** Handle events from drag&drop ****/
    isDescribedBy: function(node, position) {
      if (!node.path) return false;
      const parentPath = node.path.slice(0, -1);
      let maybeParentPath = position.node.path;
      if (position.placement !== "inside") {
        maybeParentPath = maybeParentPath.slice(0, -1);
      }
      return parentPath.toString() === maybeParentPath.toString();
    },

    inhabitants: function(position) {
      if (position.placement === "inside") {
        return position.node.children || [];
      }
      if (position.node.path.length === 1) {
        return this.nodes;
      }
      const parentPath = position.node.path.slice(0, -1);
      const parent = this.$refs.slVueTree.getNode(parentPath);
      return parent.children || [];
    },

    isDuplicateAt: function(node, position) {
      return this.inhabitants(position).some(n => n.title === node.title);
    },

    immigrationCheck: function(node, position) {
      if (this.isDescribedBy(node, position)) return true; // domestic
      return !this.isDuplicateAt(node, position); // foreign
    },

    beforeDrop: function(nodes, position, cancel) {
      const names = nodes.map(node => node.title);
      if (names.some((name, i, arr) => arr.indexOf(name) !== i)) cancel();
      if (!nodes.every(node => this.immigrationCheck(node, position))) cancel();
    },

    /**** Handle events from button click ****/
    inputName: function(msg, virtualNode, position) {
      const defaultName = virtualNode.title;
      var rejectMsg = "";
      do {
        var title = prompt(rejectMsg + msg, defaultName);
        if (!title || title === defaultName) return "";
        if ([".", ".."].indexOf(title) !== -1) {
          rejectMsg =
            "'" +
            title +
            "'은 사용할 수 없는 이름입니다. 다른 이름으로 해주세요.\n";
          continue;
        } else if (title.indexOf("/") !== -1 || title.indexOf("\\") !== -1) {
          rejectMsg =
            "'/'이나 '\\'은 이름에 사용할 수 없습니다. 다른 이름으로 해주세요.\n";
          continue;
        } else
          rejectMsg =
            "'" + title + "'은(는) 이미 있습니다. 다른 이름으로 해주세요.\n";
        virtualNode.title = title;
      } while (this.isDuplicateAt(virtualNode, position));
      return title;
    },

    rename: function(node) {
      const msg = "'" + node.title + "'을(를) 다음 이름으로 변경합니다.";
      const virtualNode = { title: node.title, path: node.path };
      const position = { node: node, placement: "before" };
      var title = this.inputName(msg, virtualNode, position);
      if (!title) return;
      this.$refs.slVueTree.updateNode(node.path, { title: title });
      if (node.data.regId !== undefined) {
        this.$emit("rename", node.data.regId, title);
      }
    },

    getLastSelected: function() {
      let selected = this.$refs.slVueTree.getSelected();
      return selected.length > 0 && selected[selected.length - 1];
    },

    makePosition: function(node) {
      if (!node) node = { path: [] };
      const position = { node: node };
      position.placement = node.isLeaf ? "before" : "inside";
      return position;
    },

    positionToPath: function(position) {
      let path = position.node.path.slice();
      if (position.placement === "inside") {
        path.push(position.node.children.length || 0);
      } else if (position.placement === "after") {
        path.push(path.pop() + 1);
      }
      return path;
    },

    addNode: function(isLeaf) {
      const selected = this.getLastSelected();
      const position = this.makePosition(selected);

      const msg =
        "새로 만들 " + (isLeaf ? "파일" : "폴더") + "의 이름을 정해주세요.";
      const virtualNode = { title: "" };
      var title = this.inputName(msg, virtualNode, position);
      if (!title) return;

      const newNode = createNode(title, isLeaf);
      if (selected) {
        var newPath = this.positionToPath(position);
        this.$refs.slVueTree.insert(position, newNode);
      } else {
        var newPath = [this.nodes.length];
        this.nodes.push(newNode);
      }
      this.$refs.slVueTree.select(newPath);
    },

    removeNode: function(node) {
      const response = confirm(
        "'" + node.title + "'을 삭제합니다.\n삭제하면 되돌릴 수 없습니다."
      );
      if (response) {
        this.recursivelyEmitRemove(node);
        this.$refs.slVueTree.remove([node.path]);
      }
    },

    recursivelyEmitRemove: function(node) {
      if (node.isLeaf) {
        if (node.data.regId !== undefined) {
          this.$emit("remove", node.data.regId);
          this.close(node.data.regId);
        }
      } else {
        node.children.forEach(this.recursivelyEmitRemove.bind(this));
      }
    },

    /**** For utility outside ****/
    getNodesFromPath: function(path) {
      if (!path) return null;
      const hierarchy = path.split(/[/\\]+/g);
      if (hierarchy.length === 0) return null;
      if (hierarchy[0] === ".") hierarchy.shift();
      let nodes = this.nodes;
      for (let i = 0; i < hierarchy.length; i++) {
        if (nodes.length === 0) return null;
        var cur = nodes.find(node => node.title === hierarchy[i]);
        if (!cur) return null;
        nodes = cur.children;
      }
      return { cur, nodes };
    },

    isFile: function(path) {
      const node = this.getNodesFromPath(path).cur;
      return node && node.isLeaf;
    },

    listdir: function(path) {
      const nodes = this.getNodesFromPath(path).nodes;
      return nodes.map(node => node.title) || [];
    },

    load: function(path) {
      const node = this.getNodesFromPath(path).cur;
      return node && node.data.content;
    },

    /**** Handle events from outside ****/
    close: function(regId) {
      const node = this.openedNodesRegistry[regId];
      this.$set(node.data, "regId", undefined);
      this.$set(this.openedNodesRegistry, regId, undefined);
    },

    save: function(regId, content) {
      const node = this.openedNodesRegistry[regId];
      this.$set(node.data, "content", content);
    }
  },
  components: { SlVueTree }
};
</script>

<style>
@import "~sl-vue-tree/dist/sl-vue-tree-dark.css";

.sl-vue-tree.sl-vue-tree-root {
  overflow-x: hidden;
  overflow-y: auto;
}

.item-icon {
  display: inline-block;
  text-align: center;
  width: 1rem;
  margin: 0;
}

#localcmd-wrapper {
  display: inline-block;
  width: 2.5rem;
}

#globalcmd-wrapper {
  float: right;
  height: 2rem;
}

.screen-reader-only {
  position: absolute;
  left: -10000px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
</style>