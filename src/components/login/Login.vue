<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li :class="{ current: item.current == 'login' }" @click="toggleMenu('login')">登录</li>
        <li :class="{ current: item.current == 'register' }" @click="toggleMenu('register')">注册</li>
      </ul>
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'login',
  data() {
    return {
      item: {
        current: 'login'
      }
    }
  },
  methods: {
    toggleMenu(val) {
      this.item.current = val;
      switch (val) {
        case "login":
          this.$router.push({path: '/login_page'});
          break;
        case "register":
          this.$router.push({path: '/register_page'});
          break;
        default:
          this.$router.push({path: '/login_page'});
          break;
      }
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        switch (route.name) {
          case "loginPage":
            this.item.current = 'login';
            break;
          case "registerPage":
            this.item.current = 'register';
            break;
          default:
            this.item.current = 'login';
            break;
        }
      },
      immediate: true
    }
  },
}
</script>


<style lang="scss" scoped>
  #login {
    height: 100vh;
    background-color: #344a5f;
  }

  .login-wrap {
    width: 330px;
    margin: auto;
    padding: 50px;
  }

  .menu-tab {
    text-align: center;
    li {
      display: inline-block;
      width: 88px;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
    }
    .current {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }


</style>
