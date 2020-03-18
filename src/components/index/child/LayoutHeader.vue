<template>
    <div id="header-wrap">
        <div class="pull-left header-icon"><svg-icon iconClass="menu" className="menu" /></div>
        <div class="pull-right">
            <div class="user-info pull-left">
                <!--<img src="../../../assets/images/face.jpg" alt="">-->
                用户名
            </div>
            <div class="header-icon pull-left">
              <svg-icon iconClass="exit" className="exit" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LayoutHeader"
    }
</script>

<style lang="scss" scoped>
    .open {
        #header-wrap { left: 111px; }
    }
    .close {
        #header-wrap { left: 20px; }
    }

    .header-icon {
        padding: 0 32px;
        svg {
            margin-bottom: -8px;
            font-size: 25px;
            cursor: pointer;
        }

    }
    .user-info {
        height: 100%;
        padding: 0 32px;
        border-right: 1px solid #ededed;
        + .header-icon {
            padding: 0 28px;
        }
        img {
            display: inline-block;
            margin-bottom: -12px;
            margin-right: 18px;
            border-radius: 50px;
        }
    }
</style>