<template lang="pug">
  .dragBar(@click="changeRate($event)")
    .dragBar__rate(:style="{'width': `${dragDetail.nowRate}px`}")
    div(
      :class="{'dragBar__point': true, 'dragBar__point--drag': dragDetail.isDrag}"
      @mousedown="dragStart($event)"
      :style="{'left': `${dragDetail.nowRate - 5}px`}"
    )

</template>

<script>
export default {
  name: 'DragBar',
  props: {
  },
  data () {
    return {
      dragDetail: {
        isDrag: false,
        nowRate: 0
      }
    }
  },
  methods: {
    dragStart (event) {
      console.log('dragStart', event)
      this.dragDetail.isDrag = true
      document.body.addEventListener('mousemove', this.dragMove)
      document.body.addEventListener('mouseup', this.dragEnd)
    },
    dragMove (event) {
      let moveX = event.pageX - this.$el.offsetLeft
      if (moveX >= 0 && moveX < this.$el.offsetWidth) {
        this.dragDetail.nowRate = moveX
      }
    },
    dragEnd (event) {
      console.log('dragEnd')
      this.dragDetail.isDrag = false
      document.body.removeEventListener('mousemove', this.dragMove)
      document.body.removeEventListener('mouseup', this.dragEnd)
    },
    changeRate (event) {
      this.dragMove(event)
    }
  }
}
</script>

<style scoped lang="stylus">
.dragBar
  background: #eee;
  height: 2px;
  margin: 40px 0 10px;
  &__rate
    height: 2px;
    background: #000;
  &__point
    position: relative;
    background: #000;
    width: 10px;
    height: 10px;
    top: -11px;
    display: inline-block;
    border-radius: 5px;
    cursor: pointer;
    &:hover,
    &--drag
      transform scale(1.3)
</style>
