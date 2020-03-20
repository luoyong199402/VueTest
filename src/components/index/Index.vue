<template>
    <div :class="[openState ? 'open' : 'close']">
        <LayoutHeader @changeMenu="changeMenu" @exit="exit"></LayoutHeader>
        <layout-nav :open-state="openState"></layout-nav>
        <layout-main></layout-main>
    </div>

</template>

<script>
import LayoutHeader from "./child/LayoutHeader";
import LayoutMain from "./child/LayoutMain";
import LayoutNav from "./child/LayoutNav";
import {logout} from "@/api/login";
import {getUserInfo} from "@/api/user";

export default {
    name: "index",
    components: {LayoutNav, LayoutMain, LayoutHeader},
    data() {
        getUserInfo().then((response) => {
            this.$store.commit("setUserInfo", response.data.principal);
        });

        return {
            openState: true
        };
    },
    methods: {
        changeMenu() {
            this.openState = !this.openState;
        },

        exit() {
            this.$confirm('你即将退出系统， 请确认是否继续！', '提示', {
                confirmButtonText: '退出',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                const loading = this.$loading({
                    lock: true,
                    text: '退出中， 请稍后！',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                });

                logout().then(() => {
                    this.$store.commit('clearToken');
                    this.$store.commit('clearUserInfo');
                    this.$router.push({
                        name: "loginPage"
                    });
                }).finally(() => {
                    loading.close();
                });
            });
        }
    }
}

</script>

<style lang="scss" scoped>

</style>
