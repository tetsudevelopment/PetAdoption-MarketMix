let app = new Vue({
  el: "#app",
  data: {
    dataHref: {
      href1: "../../src/view/main.html",
      href2: "../../index.html",
    },
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
    userLogin: {},
    dataPets: [
      {
        id: 1,
        name: "Sacha",
        race: "Bulldog",
        age: "1 año",
        status: "Adoptar",
        img: "../assets/Animals/Sacha.jpg",
        description: "Hermosa y juguetona perrita",
      },
      {
        id: 2,
        name: "Rex",
        race: "Labrador retriever",
        age: "3 meses",
        status: "Adoptar",
        img: "../assets/Animals/Rex.jpg",
        description: "Hermosa y juguetona perrita",
      },
      {
        id: 3,
        name: "Gema",
        race: "Pastor alemán",
        age: "2 años",
        status: "Adoptar",
        img: "../assets/Animals/Gema.jpg",
        description: "Hermosa y juguetona perrita",
      },
      {
        id: 4,
        name: "Niña",
        race: "Akita Inu",
        age: "2 años",
        status: "Adoptar",
        img: "../assets/Animals/Niña.jpg",
        description: "Hermosa y juguetona perrita",
      },
    ],
    dataPet: [],
    petsForm: {
      img: "",
      name: "",
      age: "",
      race: "",
      age: "",
      description:'',
    },
    imgPets: [
      "../assets/Animals/Sacha.jpg",
      "../assets/Animals/Rex.jpg",
      "../assets/Animals/Gema.jpg",
      "../assets/Animals/Niña.jpg",
    ],
    sessionStorageUser: {
      userId: "",
      userPin: "",
    },
  },
  created() {
    this.session();
    this.local();
  },
  mounted() {},
  computed: {},
  methods: {
    local() {
      if (localStorage.getItem("dataLocal") !== null) {
        this.dataPet = JSON.parse(localStorage.getItem("dataLocal"));
      } else {
        this.dataPet = this.dataPets;
      }
      this.localStorage();
    },
    localStorage() {
      localStorage.setItem("dataLocal", JSON.stringify(this.dataPet));
    },
    session() {
      if (sessionStorage.getItem("sessionStorageUser") !== null) {
        this.userLogin = JSON.parse(
          sessionStorage.getItem("sessionStorageUser")
        );
      } else {
        this.userLogin = {};
      }
    },
    sessionStorage() {
      sessionStorage.setItem(
        "sessionStorageUser",
        JSON.stringify(this.userLogin)
      );
    },
    agregar() {
      this.dataPetsStorage.push({
        name: this.petsForm.name,
        age: this.petsForm.age,
        race: this.petsForm.race,
        status: "Adoptar",
        img: this.petsForm.img,
      });
    },
    prueba(item) {
      this.petsForm.img = item;
    },
    alertAdoption() {
      Swal.fire({
        title: "Custom width, padding, color, background.",
        width: 600,
        padding: "3em",
        color: "#716add",
        background: "#fff url(/images/trees.png)",
        backdrop: `
      rgba(0,0,123,0.4)
      url("/images/nyan-cat.gif")
      left top
      no-repeat
      `,
      });
    },
    alert(icon, title, text, value) {
      if (value == 0) {
        Swal.fire({
          icon: icon,
          title: title,
          text: text,
          showClass: { popup: "animate__animated animate__fadeInDown" },
          hideClass: { popup: "animate__animated animate__fadeOutUp" },
        });
      } else {
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
        });

        Toast.fire({
          icon: icon,
          title: title,
        });
      }
    },
    login() {
      let user = this.dataUser.find(
        (element) => element.userId == this.sessionStorageUser.userId
      );
      let index = this.dataUser.indexOf(user);
      if (
        this.sessionStorageUser.userId == "" ||
        this.sessionStorageUser.userPin == ""
      ) {
        this.alert(
          (icon = "error"),
          (title = "Espacios vacios"),
          (text = '"Porfavor Llene los campos correspondientes"'),
          (value = 0)
        );
      } else if (index == -1) {
        this.alert(
          (icon = "error"),
          (title = "Error de credenciales"),
          (text = "El usuario no existe en nuestra base de datos"),
          (value = 0)
        );
      } else if (user.userPin == this.sessionStorageUser.userPin) {
        this.alert(
          (icon = "success"),
          (title = "Se inicio sesión correctamente"),
          (text = "Correct"),
          (value = 1)
        );
        this.userLogin = {
          userId: this.sessionStorageUser.userId,
          userPin: this.sessionStorageUser.userPin,
          name: user.name,
          category: user.category,
          status: 1,
        };
        this.sessionStorage();
      } else {
        this.alert(
          (icon = "error"),
          (title = "Pin Erroneo"),
          (text = "Su Pin no es Correcto"),
          (value = 0)
        );
      }
    },
    logOut() {
      this.userLogin = {};
      this.sessionStorageUser.userId = "";
      this.sessionStorageUser.userPin = "";
      this.sessionStorage();
    },
    toAdopt(index, item) {
      let date = new Date();
      let fecha =`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
      let toAdopt = {
        id: item.id,
        name: this.userLogin.name,
        race: item.race,
        age: item.age,
        status: "Adoptado",
        img: item.img,
        description: item.description,
        userName: this.userLogin.name,
        date:fecha
      }; 
      let cambio = this.dataPet.splice(index, 1, toAdopt);
      console.log(cambio, 'Cambio');
      this.localStorage();
    },
    agg() {
      this.dataPets.push({
        id: this.dataPet.length + 1,
        name: this.petsForm.name,
        race: this.petsForm.race,
        age: this.petsForm.age + " año",
        status: "Adoptar",
        img: this.petsForm.img,
        description: this.petsForm.description,
      });
      this.localStorage();
    },
    deleteItem(index) {
      this.dataPets.splice(index,1);
      this.localStorage();
    }
  },
});
