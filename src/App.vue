<template lang="pug">
  main#app
    .player
      img(src="./assets/images/bg1.png")
      .music-container
        .music__info
          .music__name music name
          .music__author music author
        .music__control
          .music__progress-rate
            input(type="range" min="0" max="100" v-model="value")
          .music__buttons
            .button__shuffle-playback
              img(src="./assets/images/btn_ShufflePlayback.svg")
            .button__previous
              img(src="./assets/images/btn_Rewind.svg")
            .button__play(v-if="!musicStatus" @click="changeMusicStatus()")
              img(src="./assets/images/btn_Play.svg")
            .button__pause(v-else @click="changeMusicStatus()")
              img(src="./assets/images/btn_pause.svg")
            .button__next
              img(src="./assets/images/btn_Fast.svg")
            .button__repeat-all(v-if="repeatStatus === 0" @click="changeRepeatStatus()")
              img(src="./assets/images/btn_RepeatAll.svg")
            .button__repeat-one(v-else @click="changeRepeatStatus()")
              img(src="./assets/images/btn_RepeatOne.svg")
</template>

<script>
import axios from 'axios'

import './assets/style/normalize.css'
import './assets/style/reset.css'

export default {
  name: 'app',
  components: {
  },
  data () {
    return {
      value: 50,
      repeatStatus: 0,
      musicStatus: false
    }
  },
  mounted () {
    const api = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails&chart=mostPopular&key=AIzaSyAY4THLuVYiFhrRAPZCseQDbCO3bxNJD9A`
    axios.get(api).then(res => {
      console.log(res)
    })
      .catch(err => {
        console.log(err)
      })
  },
  computed: {
  },
  methods: {
    changeRepeatStatus () {
      this.repeatStatus++
      if (this.repeatStatus === 2) {
        this.repeatStatus = 0
      }
    },
    changeMusicStatus () {
      this.musicStatus = !this.musicStatus
    }
  }
}
</script>
<style lang="stylus" scoped>
#app
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
.player
  max-width: 1024px;
.music
  &-container
    position: relative;
    padding: 60px 10px;
    margin-top: -100px;
    background-image: linear-gradient(rgba(255, 255, 255, 0) 0, #fff 90px);
  &__info
    text-align: center;
    line-height: 1.5;
  &__name
    font-size: 22px;
  &__author
    font-size: 16px;
  &__buttons
    display: flex;
    align-items: center;
    justify-content: space-around;
</style>
