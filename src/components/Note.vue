<template>
  <div :class="[color !== getColor() ? getColor() : color ]">
    <h2 v-if="title !== ''">{{ title }}</h2>
    <p>{{ body }}</p>
    <button @click="deleteNote">Del</button>
  </div>
</template>

<script>
import {} from "@vue/composition-api";

export default {
  name: "Note",
  props: {
    id: Symbol,
    title: String,
    body: String,
    index: Number,
    level: Symbol,
    levels: Object
  },
  setup(props, { emit }) {
    const getColor = function() {
      switch (props.level) {
        case props.levels.MINOR:
          return "minor";
        case props.levels.MAJOR:
          return "major";
        case props.levels.CRITICAL:
          return "critical";
      }
    };

    const color = getColor();

    const deleteNote = () => {
      emit("clicked", props.index - 1);
    };

    return { color, deleteNote, getColor };
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.minor {
  background-color: green;
}

.major {
  background-color: yellow;
}

.critical {
  background-color: red;
}
</style>
