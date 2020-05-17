<template>
  <div id="app" :data-theme="themeText.toLowerCase()">
    <ToggleSwitch 
      :text="'Enable Dark Mode'"
      @changeTheme="themeChange"
    />
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
import { reactive, ref, onBeforeMount } from "@vue/composition-api";
import Note from "./components/Note.vue";
import ToggleSwitch from "./components/ToggleSwitch.vue"
import { store } from "./Vuex/store";

export default {
  name: "App",
  components: {
    Note,
    ToggleSwitch
  },
  setup() {
    // theme mode

    let isDarkModeRef = ref(false);

    const themeChange = () => {
      store.dispatch("toggleDarkMode", !store.getters.darkMode);
    }
    
    let themeText = ref(store.getters.darkMode === true ? "Dark" : "Light");

    onBeforeMount(() => {
      store.subscribe((mutation, state) => {
        if (mutation.type === "DARK_MODE_UPDATED") {
          if (state.isDarkMode === true) {
            themeText.value = "Dark";
          } else if (state.isDarkMode === false) {
            themeText.value = "Light";
          }
        }
      })
    })

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
      note.level = null;
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

    return {
      note,
      notes: notes.array,
      createNote,
      clearFields,
      levels,
      onChildClick,
      themeText,
      isDarkModeRef,
      themeChange
    };
  }
};
</script>

<style lang="scss">
:root {
  --dark: #141414;
  --light: #dbdbdb;

  [data-theme="light"] {
  --bg-color: var(--light);
  --text-color: var(--dark);
  }

  [data-theme="dark"] {
  --bg-color: var(--dark);
  --text-color: var(--light);
  }
}

@import "./SCSS/partials/_color-themes.scss";
* {
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  color: var(--text-color);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
