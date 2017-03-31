<template>
    <div ref="jsoneditor">
    </div>
</template>

<script>

import JSONEditor from 'jsoneditor/dist/jsoneditor-minimalist.js'
import 'jsoneditor/dist/jsoneditor.min.css'

export default {
  name: 'json-editor',
  data () {
    return {
      editor: null
    }
  },
  props: {
    json: {
      required: true
    },
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mounted () {
    const container = this.$refs.jsoneditor
    const options = this.options
    this.editor = new JSONEditor(container, options)
    this.editor.set(this.json)
  },
  beforeDestroy () {
    if (this.editor) {
      this.editor.destroy()
      this.editor = null
    }
  }
}
</script>

<style>
</style>
