<template>
  <div id="app">
     <json-editor ref="editor" :onChange="onChange" :json="json"/>
  </div>
</template>

<script>
import JsonEditor from './components/JsonEditor'

export default {
  name: 'app',
  data () {
    return {
      json: {
        'integer': 42,
        'float': 1.24,
        'string': 'foo',
        'array': ['one', 2, 'three'],
        'object': {
          'foo': 'bar'
        }
      }
    }
  },
  methods: {
    onChange (newVal) {
      console.log(newVal)
    }
  },
  components: {
    JsonEditor
  }
}
</script>

<style>
</style>
