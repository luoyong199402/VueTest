<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>

export default {
  name: "svgIcon",
  data() {
    const msg = ref("手把手撸码的说法的前端");
    // 计算属性，得出最终结果，并返回
    const iconName = `#icon-${this.props.iconClass}`;
    const svgClass = this.className ? `svg-icon ${this.className}` : `svg-icon`;
    return {
      msg,
      iconName,
      svgClass
    };
  },
  props: {
    iconClass: {
      type: String, // 定义接收的值类型
      default: ""
    },
    className: {
      type: String,
      default: ""
    }
  }

};
</script>
<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  /*fill: currentColor;*/
}
</style>
