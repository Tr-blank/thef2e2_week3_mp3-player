<template lang="pug">
  main#app
    .player
      .song__image(:style="{'background-image': `url(${albumsList[nowSongDetail.albumID][nowSongDetail.songID].image})`}")
      .song-container
        .song__info
          .song__name {{albumsList[nowSongDetail.albumID][nowSongDetail.songID].name}}
          .song__author {{albumsList[nowSongDetail.albumID][nowSongDetail.songID].singer}}
        .song__control
          DragBar
          .song__buttons
            .button__shuffle-playback
              img(src="./assets/images/btn_ShufflePlayback.svg")
            .button__previous(@click="prevSong()")
              img(src="./assets/images/btn_Rewind.svg")
            .button__play(v-if="!nowSongDetail.isPlaying" @click="changeSongStatus()")
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
      albumsList: song,
      nowSongDetail: {
        isPlaying: false,
        albumID: 0,
        songID: 0,
        songTotalTime: 0,
        currentlyTime: 0
      },
      audio: null
    }
  },
  mounted () {
    this.audio = new Audio()
    if (this.audio.canPlayType('audio/mpeg;')) {
      this.audio.type = 'audio/mpeg'
      this.audio.src = this.currentlySongSrc
      this.setSong()
    }
  },
  computed: {
    currentlySongSrc () {
      return this.albumsList[this.nowSongDetail.albumID][this.nowSongDetail.songID].src
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
      this.nowSongDetail.isPlaying = !this.nowSongDetail.isPlaying
      if (this.nowSongDetail.isPlaying) {
        this.audio.play()
      } else {
        this.audio.pause()
      }
    },
    nextSong () {
      this.nowSongDetail.songID++
      if (this.nowSongDetail.songID > this.albumsList[this.nowSongDetail.albumID].length - 1) {
        this.nowSongDetail.songID = 0
      }
      this.setSong()
    },
    prevSong () {
      this.nowSongDetail.songID--
      if (this.nowSongDetail.songID < 0) {
        this.nowSongDetail.songID = this.albumsList[this.nowSongDetail.albumID].length - 1
      }
      this.setSong()
    },
    setSong () {
      this.audio.src = this.currentlySongSrc
      this.audio.load()
      this.nowSongDetail.songTotalTime = this.audio.duration
      this.currentlyTime = this.audio.currentTime
      if (this.nowSongDetail.isPlaying) {
        this.audio.play()
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
