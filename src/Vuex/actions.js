const toggleDarkMode = (context, payload) => {
  context.commit("DARK_MODE_UPDATED", payload);
};

export {
  toggleDarkMode
}