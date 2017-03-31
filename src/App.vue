<template>
  <div id="app">
     <json-editor :json="json"/>
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
  components: {
    JsonEditor
  }
}
</script>

<style>
</style>
