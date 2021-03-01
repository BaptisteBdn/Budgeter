<template>
  <card type="user">
    <p class="card-text"></p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a>
        <img class="avatar" src="img/default-avatar.png" alt="..." />
      </a>
    </div>
    <p></p>
    <form name="form" @submit.prevent="handleRegister">
      <div>
        <div class="form-group">
          <label for="username">Username</label>
          <input
            v-model="user.username"
            v-validate="'required|min:3|max:20'"
            type="text"
            class="form-control"
            name="username"
          />
          <div
            v-if="submitted && errors.has('username')"
            class="alert alert-danger"
            role="alert"
          >
            {{ errors.first("username") }}
          </div>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input
            v-model="user.password"
            v-validate="'required|min:6|max:50'"
            type="password"
            class="form-control"
            name="password"
          />
          <div
            v-if="submitted && errors.has('password')"
            class="alert alert-danger"
            role="alert"
          >
            {{ errors.first("password") }}
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block">Sign Up</button>
        </div>
      </div>
    </form>
  </card>
</template>

<script>
import User from "../models/user";
import NotificationTemplate from "./Notifications/NotificationTemplate";

export default {
  name: "Register",
  data() {
    return {
      user: new User("", ""),
      submitted: false,
      type: ["danger", "success"],
      icon: ["tim-icons icon-bell-55", "tim-icons icon-check-2"],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    },
  },
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleRegister() {
      this.submitted = true;
      this.$validator.validate().then((isValid) => {
        if (isValid) {
          this.$store.dispatch("auth/register", this.user).then(
            (data) => {
              this.notifyVue("bottom", "center", 1, data.message);
              this.$router.push("/login");
            },
            (error) => {
              this.notifyVue(
                "bottom",
                "center",
                0,
                (error.response && error.response.data.message) ||
                  error.message ||
                  error.toString()
              );
            }
          );
        }
      });
    },
    notifyVue(verticalAlign, horizontalAlign, success, message) {
      this.$notify({
        component: NotificationTemplate,
        horizontalAlign: horizontalAlign,
        verticalAlign: verticalAlign,
        type: this.type[success],
        icon: this.icon[success],
        message: message,
        timeout: 2500,
      });
    },
  },
};
</script>