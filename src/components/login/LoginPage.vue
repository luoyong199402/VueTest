<template>
    <div id="login_page" class="page-head">
        <el-form :model="loginData" ref="loginForm" :label-position="'top'" :rules="loginRules" label-width="80px">
            <el-form-item label="邮箱" prop="username" class="item-from">
                <el-input v-model="loginData.username" type="text" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password" class="item-from">
                <el-input v-model="loginData.password" type="password" autocomplete="off" minlength="6"
                          maxlength="20"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="code"  class="item-from">
                <el-row :gutter="10">
                    <el-col :span="15">
                        <el-input v-model="loginData.code" type="text" maxlength="6" autocomplete="off"></el-input>
                    </el-col>
                    <el-col :span="9">
                        <el-button type="success" class="width-full" @click="getCode" :loading="pageState.verificationCodeButton.loading" :disabled="pageState.verificationCodeButton.disabled" >{{ pageState.verificationCodeButton.currentButtonName }}</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item>
                <el-button type="danger" @click="onSubmit('loginForm')" class="login-btn width-full">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {
        validateEmail,
        validateMaxLength,
        validateEqLength,
        validateMinLength,
        validateNull,
        validateCode,

    } from "@/utils/validate";
    import {login, getSms} from "../../api/login";

    export default {
        name: "LoginPage",
        data() {
            const validateUserName = (rule, value, callback) => {
                if (validateNull(value)) {
                    callback(new Error('邮箱不能空！'));
                }

                if (!validateEmail(value)) {
                    callback(new Error('用户名不是一个标准的邮箱格式！'));
                }
                callback();
            };

            const validatePassword = (rule, value, callback) => {
                if (validateNull(value)) {
                    callback(new Error('密码不能为空！'));
                }

                if (!validateMinLength(value, 6) || !validateMaxLength(value, 20)) {
                    callback(new Error('密码需要一个在6-20位之间的数据！'));
                }
                callback();
            };

            const validateFormCode = (rule, value, callback) => {
                if (validateNull(value)) {
                    callback(new Error('验证码不能为空！'));
                }

                if (!validateEqLength(value, 6)) {
                    callback(new Error('验证码的长度为6！'));
                }

                if (!validateCode(value)) {
                    callback(new Error('请输入由数字和字母构成的验证码！'));
                }
                callback();
            };

            return {
                pageState: {
                    verificationCodeButton: {
                        loading: false,
                        disabled: false,
                        lock: false,
                        lockTime: -1,
                        initButtonName: '获取验证码',
                        currentButtonName: '获取验证码',
                        lockTimerFunc: () => {
                           if (this.pageState.verificationCodeButton.lockTimer == null) {
                               this.pageState.verificationCodeButton.lockTimer = setInterval(this.pageState.verificationCodeButton.lockTimerFunc, 1000);
                           } else {
                               if (this.pageState.verificationCodeButton.lockTime > 0 && this.pageState.verificationCodeButton.lock) {
                                   this.pageState.verificationCodeButton.lockTime--;
                                   this.pageState.verificationCodeButton.currentButtonName = '剩余时间：' + this.pageState.verificationCodeButton.lockTime;
                               } else {
                                   this.pageState.verificationCodeButton.lock = false;
                                   this.pageState.verificationCodeButton.disabled = false;
                                   this.pageState.verificationCodeButton.lockTime = -1;
                                   this.pageState.verificationCodeButton.lockTimer = null;
                                   this.pageState.verificationCodeButton.currentButtonName = this.pageState.verificationCodeButton.initButtonName;
                                   clearInterval(this.pageState.verificationCodeButton.lockTimer);
                               }
                           }
                        },
                        startLock: () => {
                            clearInterval(this.pageState.verificationCodeButton.lockTimer);
                            this.pageState.verificationCodeButton.lock = true;
                            this.pageState.verificationCodeButton.disabled = true;
                            this.pageState.verificationCodeButton.lockTime = 60;
                            this.pageState.verificationCodeButton.lockTimer = null;
                            this.pageState.verificationCodeButton.lockTimerFunc();
                        },
                        lockTimer: null
                    }
                },

                loginData: {
                    username: '1624787124@qq.com',
                    password: '123456',
                    code: ''
                },
                loginRules: {
                    username: [
                        { validator: validateUserName, trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    code: [
                        { validator: validateFormCode, trigger: 'blur' }
                    ],
                }
            };
        },
        methods: {
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        login(this.loginData).then(response => {
                            alert(response.data.data.token);
                            this.$store.commit('setToken', response.data.data);
                        });
                    } else {
                        this.$message({
                            message: '表单验证失败，请检查表单信息！',
                            type: 'warning'
                        });
                        return false;
                    }
                });
            },
            getCode() {
                let email = this.loginData.username;
                // 验证为空
                if (validateNull(email)) {
                    this.$message({
                        message: '请输入邮箱！',
                        type: 'warning'
                    });
                    return ;
                }

                // 验证邮箱合法性
                if (!validateEmail(email)) {
                    this.$message({
                        message: '输入的邮箱不是一个合法的邮箱！',
                        type: 'warning'
                    });
                    return ;
                }

                this.pageState.verificationCodeButton.disabled = true;
                this.pageState.verificationCodeButton.loading = true;
                this.pageState.verificationCodeButton.currentButtonName = "获取中"
                getSms({businessKey: email, type: 'EMAIL', scope: 'REGISTER'}).then(response => {
                    this.loginData.code = response.data.code;
                    // 执行锁定操作
                    this.pageState.verificationCodeButton.startLock();
                }).catch(response => {
                    console.log(response);
                    this.pageState.verificationCodeButton.disabled = false;
                    this.pageState.verificationCodeButton.currentButtonName = this.pageState.verificationCodeButton.initButtonName;
                }).finally(() => {
                    this.pageState.verificationCodeButton.loading = false;
                });
            }
        },
        watch: {
            "loginData.username": function(newVal) {
                if (validateEmail(newVal)) {
                    this.pageState.verificationCodeButton.disabled = false;
                } else {
                    this.pageState.verificationCodeButton.disabled = true;
                }
            }
        },
        beforeDestroy() {
            clearInterval(this.pageState.verificationCodeButton.lockTimer);
        }
    }
</script>

<style lang="scss" scoped>
    .page-head {
        margin-top: 15px;
    }

    .width-full {
        width: 100%;
    }

    .login-btn {
        margin-top: 19px;
    }

    .item-from {
        margin-bottom: 13px;
    }
</style>