<template>
  <div id="app">
    <form>
      <h1>Another Notepad</h1>
      <p>Title</p>
      <input type="text" v-model="note.header" required />
      <p>Note</p>
      <textarea v-model="note.body" form required />
      <section>
        <h2>Importance</h2>
        <div>
          <label for="minor">Minor</label>
          <input
            type="radio"
            id="minor"
            name="level"
            :value="levels.MINOR"
            v-model="note.level"
            required
          />
        </div>
        <div>
          <label for="minor">Major</label>
          <input
            type="radio"
            id="major"
            name="level"
            :value="levels.MAJOR"
            v-model="note.level"
            required
          />
        </div>
        <div>
          <label for="minor">Critical</label>
          <input
            type="radio"
            id="critical"
            name="level"
            :value="levels.CRITICAL"
            v-model="note.level"
            required
          />
        </div>
      </section>
      <button @click="createNote" type="submit" form>Add Note</button>
    </form>

    <Note
      v-for="(note, index) in notes"
      :key="`note-${index}`"
      :title="note.title"
      :body="note.body"
      :index="index + 1"
      :level="note.level"
      :id="note.id"
      :levels="levels"
      @clicked="onChildClick"
    />
  </div>
</template>

<script>
import { reactive, watchEffect } from "@vue/composition-api";
import Note from "./components/Note.vue";

export default {
  name: "App",
  components: {
    Note
  },
  setup() {
    // note side

    const note = reactive({
      header: "",
      body: "",
      id: Symbol(),
      level: null
    });

    const notes = reactive({ array: [] });

    const createNote = () => {
      if (note.body !== "" && note.level !== null) {
        notes.array.push({
          title: note.header,
          body: note.body,
          level: note.level,
          id: note.id
        });
        clearFields();
      }
    };

    const clearFields = () => {
      note.header = "";
      note.body = "";
    };

    const levels = {
      UNKNOWN: Symbol("UNKNOWN"),
      MINOR: Symbol("MINOR"),
      MAJOR: Symbol("MAJOR"),
      CRITICAL: Symbol("CRITICAL")
    };

    const onChildClick = value => {
      // updating notes array
      notes.array.splice(value, 1);

      // updating DOM class
      notes.array.splice(notes.array.length);
    };

    watchEffect(() => {});

    return {
      note,
      notes: notes.array,
      createNote,
      clearFields,
      levels,
      onChildClick
    };
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
