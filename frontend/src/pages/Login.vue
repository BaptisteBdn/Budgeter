<template>
  <card type="user">
    <p class="card-text"></p>
    <div class="author">
      <div class="block block-one"></div>
      <div class="block block-two"></div>
      <div class="block block-three"></div>
      <div class="block block-four"></div>
      <a>
        <img class="avatar" src="img/rabbit3.png" alt="..." />
      </a>
    </div>
    <p></p>
    <form name="form" @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username</label>
        <input
          v-model="user.username"
          v-validate="'required'"
          type="text"
          class="form-control"
          name="username"
        />
        <div
          v-if="errors.has('username')"
          class="alert alert-danger"
          role="alert"
        >
          Username is required!
        </div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input
          v-model="user.password"
          v-validate="'required'"
          type="password"
          class="form-control"
          name="password"
        />
        <div
          v-if="errors.has('password')"
          class="alert alert-danger"
          role="alert"
        >
          Password is required!
        </div>
      </div>
      <div class="form-group">
        <button class="btn btn-primary btn-block">
          <span>Login</span>
        </button>
      </div>
    </form>
  </card>
</template>

<script>
import User from "../models/user";
import NotificationTemplate from "./Notifications/NotificationTemplate";

export default {
  name: "Login",
  data() {
    return {
      user: new User("", ""),
      type: ["danger", "success"],
      icon: ["tim-icons icon-bell-55", "tim-icons icon-check-2"],
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/dashboard");
    }
  },
  methods: {
    handleLogin() {
      this.$validator.validateAll().then((isValid) => {
        if (!isValid) {
          return;
        }

        if (this.user.username && this.user.password) {
          this.$store.dispatch("auth/login", this.user).then(
            () => {
              this.$router.push("/dashboard");
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
<style>
</style>