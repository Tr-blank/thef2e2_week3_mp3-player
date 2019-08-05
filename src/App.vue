<template lang="pug">
  main#app
    .player
      .song__image(:style="{'background-image': `url(${albumsList[nowPlaying.albumID][nowPlaying.songID].image})`}")
      .song-container
        .song__info
          .song__name {{albumsList[nowPlaying.albumID][nowPlaying.songID].name}}
          .song__author {{albumsList[nowPlaying.albumID][nowPlaying.songID].singer}}
        .song__control
          DragBar
          .song__buttons
            .button__shuffle-playback
              img(src="./assets/images/btn_ShufflePlayback.svg")
            .button__previous(@click="prevSong()")
              img(src="./assets/images/btn_Rewind.svg")
            .button__play(v-if="!songStatus" @click="changeSongStatus()")
              img(src="./assets/images/btn_Play.svg")
            .button__pause(v-else @click="changeSongStatus()")
              img(src="./assets/images/btn_pause.svg")
            .button__next(@click="nextSong()")
              img(src="./assets/images/btn_Fast.svg")
            .button__repeat-all(v-if="repeatStatus === 0" @click="changeRepeatStatus()")
              img(src="./assets/images/btn_RepeatAll.svg")
            .button__repeat-one(v-else @click="changeRepeatStatus()")
              img(src="./assets/images/btn_RepeatOne.svg")
</template>

<script>
import DragBar from '@/components/DragBar'

import { song } from './datas/song'

import './assets/style/normalize.css'
import './assets/style/reset.css'

export default {
  name: 'app',
  components: {
    DragBar
  },
  data () {
    return {
      repeatStatus: 0,
      songStatus: false,
      albumsList: song,
      nowPlaying: {
        albumID: 0,
        songID: 0
      },
      audio: null
    }
  },
  mounted () {
    // console.log(this.currentlySongSrc)
    this.audio = new Audio()
    if (this.audio.canPlayType('audio/mpeg;')) {
      this.audio.type = 'audio/mpeg'
      this.audio.src = this.currentlySongSrc
    }
  },
  computed: {
    currentlySongSrc () {
      return this.albumsList[this.nowPlaying.albumID][this.nowPlaying.songID].src
    }
  },
  methods: {
    changeRepeatStatus () {
      this.repeatStatus++
      if (this.repeatStatus === 2) {
        this.repeatStatus = 0
      }
    },
    changeSongStatus () {
      this.songStatus = !this.songStatus
      if (this.songStatus) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    },
    nextSong () {
      this.nowPlaying.songID++
      if (this.nowPlaying.songID > this.albumsList[this.nowPlaying.albumID].length - 1) {
        this.nowPlaying.songID = 0
      }
    },
    prevSong () {
      this.nowPlaying.songID--
      if (this.nowPlaying.songID < 0) {
        this.nowPlaying.songID = this.albumsList[this.nowPlaying.albumID].length - 1
      }
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
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  margin: 10px;
  width: 100%;
.song
  &__image
    width 100%
    padding-top 50%
    background-position: center center;
    background-size: cover;
  &-container
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
    max-width: 320px;
    margin: 0 auto;
</style>
