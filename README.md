# Vue2 json editor Wrapper

## Usage

Importing: 

```
import JSONEditor from 'vue2-jsoneditor'

export default {
    name: 'app',
    data () {
        return {
            json: {
                foo: 'bar'
            }
        }
    }
    methods: {
         onChange(newJson) {
            // handle json changes
         }
    }
    components: {
        JSONEditor
    }
}
```

Then you can use it like this in your template:

```
<template>
    <json-editor :onChange="onChange" :json="json" />
</template>
```

You can also put a ref on the editor to access the JsonEditor object directly:

```
<template>
    <json-editor ref="editor" />
</template>
    
```

After you can access it like this:

```
const editor = this.$refs.editor.editor // a little redundant, but it does the trick!
editor.set(...) // At this point, you can use the methods available here: https://github.com/josdejong/jsoneditor/blob/master/docs/api.md#methods

```

## Build Setup

Vue.js 2 Webpack template was used to generate this project.

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build component
npm run build:component

# run all tests
npm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
