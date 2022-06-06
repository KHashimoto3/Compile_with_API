const App = {
  data() {
    return {
      code: "",
      output_txt: "",
      err_txt: "",
    };
  },
  methods: {
    run: async function () {
      if (this.code == "") {
        alert("コードを入力してから押してください！");
      } else {
        const data_obj = {
          code: this.code,
          options: "warning,gnu++1y",
          compiler: "gcc-head",
          "compiler-option-raw": "-Dx=hogefuga\n-O3",
        };

        /*
        const data_obj = {
          code:
            '#include <iostream>\nint main() { int x = 0; std::cout << "hoge" << std::endl; }',
          options: "warning,gnu++1y",
          compiler: "gcc-head",
          "compiler-option-raw": "-Dx=hogefuga\n-O3",
        };*/

        const url = "https://wandbox.org/api/compile.json";

        let err_msg;

        try {
          const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data_obj),
          });
          if (!response.ok) {
            switch (response.status) {
              default:
                err_msg = "何らかの理由でエラーが発生しました。";
                throw new Error(err_msg);
            }
          } else {
            const response_data = await response.json();
            this.output_txt = response_data.program_output;
            this.err_txt = response_data.compiler_message;
            console.log(response_data);
          }
        } catch (err_msg) {
          alert(err_msg);
        }
      }
    },
  },
};

Vue.createApp(App).mount("#app");
