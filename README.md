# Vue2 json editor Wrapper

## Usage

Importing: 

```
import JSONEditor from 'vue2-jsoneditor'

export default {
    name: 'app',
    components: {
        JSONEditor
    }
}
```

Then you can use it like this in your template:

```
<template>
    <json-editor :json="{ foo: 'bar'}" />
</template>
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
