<template>
    <div>
        <LayoutHeader></LayoutHeader>
        <layout-nav></layout-nav>
        <layout-main></layout-main>
    </div>

</template>

<script>
import LayoutHeader from "./child/LayoutHeader";
import LayoutMain from "./child/LayoutMain";
import LayoutNav from "./child/LayoutNav";

export default {
    name: "index",
    components: {LayoutNav, LayoutMain, LayoutHeader}
}

</script>


<style lang="scss" scoped>

</style>
