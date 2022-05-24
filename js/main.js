const App = {
  data() {
    return {
      code: "",
    };
  },
  methods: {
    run: async function () {
      if (this.code == "") {
        alert("コードを入力してから押してください！");
      } else {
        alert("実行します！");
      }
    },
  },
};

Vue.createApp(App).mount("#app");
