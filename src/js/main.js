let app = new Vue({
  el: "#app",
  data: {
    dataUser: [
      {
        userId: "1234",
        userPin: 1234,
        name: "Brayan Marin",
        category: "User",
        status: 0,
      },
      {
        userId: "4321",
        userPin: 1234,
        name: "Brayan Marin",
        category: "User",
        status: 0,
      },
      {
        userId: "4567",
        userPin: 1234678,
        name: "Brayan Marin",
        category: "Admin",
        status: 0,
      },
    ],
    dataPets: [
      { id: 001, name: "Sacha", race: "Bulldog", age: 2, status: "Adoption" },
      {
        id: 002,
        name: "Rex",
        race: "Labrador retriever",
        age: 3,
        status: "Adoption",
      },
      {
        id: 003,
        name: "Gema",
        race: "Pastor alemán",
        age: 2,
        status: "Adoption",
      },
      { id: 004, name: "Niña", race: "Bulldog", age: 2, status: "Adoption" },
    ],
    category: '',
    userId: '',
    userPin:'',

  },
  created() {
    // if (localStorage.getItem("products") !== null) {
    //   this.newArrayProds = JSON.parse(localStorage.getItem("products"));
    // } else {
    //   this.listData();
    // }
  },
  mounted() {
    // this.$refs.name.focus();
  },
  computed: {
    
  },
  methods: {
    login() {
      let user = this.dataUser.find(element => element.userId==this.userId)
      let index = this.dataUser.indexOf(user)
      if (index == -1) {
        console.log('El usuario no existe en nuestra base de datos');
      } else if (user.userPin == this.userPin) {
        this.category = this.dataUser[index].category;
        this.dataUser[index].status = 1;
      } else {
        console.log('Pin Incorrecto');
      }
    },
  },
});
