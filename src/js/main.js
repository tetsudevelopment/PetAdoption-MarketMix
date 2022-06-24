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
    userLogin:{},
    dataPets: [
      {
        id: 001,
        name: "Sacha",
        race: "Bulldog",
        age: "1 año",
        status: "Adoption",
        img: "../assets/Animals/Sacha.jpg",
      },
      {
        id: 002,
        name: "Rex",
        race: "Labrador retriever",
        age: "3 meses",
        status: "Adoption",
        img: "../assets/Animals/Rex.jpg",
      },
      {
        id: 003,
        name: "Gema",
        race: "Pastor alemán",
        age: "2 años",
        status: "Adoption",
        img: "../assets/Animals/Gema.jpg",
      },
      {
        id: 004,
        name: "Niña",
        race: "Akita Inu",
        age: "2 años",
        status: "Adoption",
        img: "../assets/Animals/Niña.jpg",
      },
    ],
    sessionStorageUser: {
      userId: "",
      userPin: "",
    },
    category: "",
  },
  created() {
    if (sessionStorage.getItem("sessionStorageUser") !== null) {
      this.userLogin = JSON.parse(sessionStorage.getItem("sessionStorageUser"));
    } else {
      this.userLogin = {};
    }
  },
  mounted() {
    this.$refs.userId.focus();
  },
  computed: {},
  methods: {
    login() {
      let user = this.dataUser.find(
        (element) => element.userId == this.sessionStorageUser.userId
      );
      let index = this.dataUser.indexOf(user);
      if (
        this.sessionStorageUser.userId == "" ||
        this.sessionStorageUser.userPin == ""
      ) {
        alert("Porfavor Llene los campos correspondientes");
      } else if (index == -1) {
        console.log("El usuario no existe en nuestra base de datos");
      } else if (user.userPin == this.sessionStorageUser.userPin) {
        this.userLogin={
            userId: this.sessionStorageUser.userId,
            userPin: this.sessionStorageUser.userPin,
            name: user.name,
            category: user.category,
            status: 1,
            href: "menu.html",}
        this.sessionStorage();
      } else {
        console.log("Pin Incorrecto");
      }
    },
    sessionStorage() {
      sessionStorage.setItem(
        "sessionStorageUser",
        JSON.stringify(this.userLogin)
      );
    },
    logOut() {
      this.userLogin.splice(0,1)
    },
  },
});
