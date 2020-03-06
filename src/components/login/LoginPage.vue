<template>
    <div id="login_page">
        <el-form :model="loginData" ref="loginData" :label-position="'top'" label-width="80px">
            <el-form-item label="邮箱">
                <el-input v-model="loginData.username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
                <el-input v-model="loginData.password"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
                <el-input v-model="loginData.code"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">登录</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "LoginPage",
        data() {
            return {
                loginData: {
                    loginName: '',
                    password: '',
                    code: ''
                }
            };
        },
        methods: {
            onSubmit() {
                alert(this.loginData.loginName);
            }
        }
    }
</script>

<style lang="scss" scoped>
</style>