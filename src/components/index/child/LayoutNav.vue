<template>
    <div id="nav-wrap">
        <h1 class="logo"><img src="../../../assets/logo.png" alt="" /></h1>
        <el-menu
                style="border-right: none"
                class="el-menu-vertical-demo"
                default-active="2"
                background-color="#344a5f"
                text-color="#fff"
                active-text-color="#ffd04b"
                :collapse="!openState">
            <el-menu-item index="1">
                <i class="el-icon-location"></i>
                <span>控制台</span>
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title">
                    <i class="el-icon-menu"></i>
                    <span slot="title">信息管理</span>
                </template>
                <el-menu-item index="2-1">选项1</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
            </el-submenu>
            <el-menu-item index="3">
                <i class="el-icon-document"></i>
                <span slot="title">用户管理</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    export default {
        name: "LayoutNav",
        data() {
            return {
            }
        },
        props: {
            openState: {
                type: Boolean,
                required: true,
                default: true
            },
        }
    }
</script>

<style lang="scss" scoped>
    .logo {
        text-align: center;
        img {
            margin: 28px auto 25px;
            width: 92px;
            @include webkit(transition, all 0.3s ease 0s);
        }
    }
    #nav-wrap {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        background-color: #344a5f;
        @include webkit(transition, all 0.3s ease 0s);
        svg {
            font-size: 20px;
            margin-right: 10px;
        }
    }
    .open {
        #nav-wrap {
            width: $navMenu;
        }
    }

    .close {
        #nav-wrap {
            width: $navMenuMin;
        }
        .logo img {
            width: 60%;
        }
    }
</style>