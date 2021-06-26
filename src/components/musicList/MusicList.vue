<template>
  <div class="music-list">
    <div class="back" @click="$router.back()">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image" ref="bgImage" :style="bgImageStyle">
      <!-- <div class="play-btn-wrapper">
        <div v-show="songs.length > 0" class="play-btn">
          <i class="icon-play"></i>
          <span class="text">随机播放全部</span>
        </div>
      </div>-->
      <div class="filter" :style="filterStyle"></div>
    </div>
    <scroll
      class="list"
      :probe-type="3"
      :style="scrollStyle"
      v-loading:[loadingText]="loading"
      @scroll="onScroll"
    >
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
    </scroll>
  </div>
</template>

<script>
import SongList from '@/components/base/songList/SongList'
import Scroll from '@/components/base/scroll/Scroll'

//!这个组件是歌手歌曲列表和巅峰歌曲列表的基础组件
export default {
  name: 'music-list',
  components: {
    SongList,
    Scroll
  },
  props: {
    songs: {
      type: Array,
      default () {
        return []
      }
    },
    title: String,
    pic: String,
    loading: Boolean,
    noResultText: {
      type: String,
      default: '抱歉，没有找到可播放的歌曲'
    },
    rank: Boolean
  },
  data () {
    return {
      imageHeight: 0,
      scrollY: 0,
      maxTranslateY: 0,
      loadingText: '晚风',
      maxScrollY: 160
    }
  },
  computed: {
    bgImageStyle () {
      const scrollY = this.scrollY
      let zIndex = 0
      let paddingTop = '70%'//一开始7图片高度70%
      let height = 0
      let translateZ = 0
      let scale = 1
      //下拉放大图片
      if (scrollY < 0) {
        scale = 1 + Math.abs(scrollY / this.imageHeight)
      }
      if (scrollY > this.maxScrollY) {
        zIndex = 10//图片弄到最上面 盖住list
        paddingTop = 0
        translateZ = 1
        height = '40px'//图片后面高度变成40px 只显示头一点点的东西
      }

      return {
        backgroundImage: `url(${this.pic})`,
        zIndex,
        paddingTop,
        height,
        transform: `scale(${scale})translateZ(${translateZ}px)`
      }
    },
    scrollStyle () {
      return {
        top: `${this.imageHeight}px`
      }
    },
    filterStyle () {
      let blur = 0
      let scrollY = this.scrollY// !我们在计算属性里面用别的值得时候 我们要先用变量缓存以下this.scrollY 因为每次执行this.scrollY都会执行依赖收集得过程 而计算属性会变化很多次 所以性能不好
      //watch同理 filterStyle收集scrollY的依赖
      let imageHeight = this.imageHeight //!计算属性filerStyle会收集imaheHeright得这个依赖 如如果你下面还执行this.imageHeight 那么又会收集者依赖过程
      if (scrollY >= 0) {
        blur = Math.min(160 / imageHeight, scrollY / imageHeight) * 20
      }
      return {
        backgroundFilter: `blur(${blur}px)`
      }
    }
  },
  mounted () {
    this.imageHeight = this.$refs.bgImage.clientHeight // 动态获取图片高度 我们没有把图片高度自己设置死 而是完全采用线上图片多高 然后这里动态获取高度
  },
  methods: {
    onScroll (pos) {

      this.scrollY = -pos.y
      console.log('this.scrollY', this.scrollY);
    }
  }

}
</script>

<style lang="scss" scoped>
.music-list {
  position: relative;
  height: 100%;
  .back {
    position: absolute;
    top: 0;
    left: 6px;
    z-index: 20;
    transform: translateZ(2px);
    .icon-back {
      display: block;
      padding: 10px;
      font-size: $font-size-large-x;
      color: $color-theme;
    }
  }
  .title {
    position: absolute;
    top: 0;
    left: 10%;
    width: 80%;
    z-index: 20;
    transform: translateZ(2px);
    @include no-wrap();
    text-align: center;
    line-height: 40px;
    font-size: $font-size-large;
    color: $color-text;
  }
  .bg-image {
    position: relative;
    width: 100%;
    transform-origin: top;
    background-size: cover;
    .play-btn-wrapper {
      position: absolute;
      bottom: 20px;
      z-index: 10;
      width: 100%;
      .play-btn {
        box-sizing: border-box;
        width: 135px;
        padding: 7px 0;
        margin: 0 auto;
        text-align: center;
        border: 1px solid $color-theme;
        color: $color-theme;
        border-radius: 100px;
        font-size: 0;
      }
      .icon-play {
        display: inline-block;
        vertical-align: middle;
        margin-right: 6px;
        font-size: $font-size-medium-x;
      }
      .text {
        display: inline-block;
        vertical-align: middle;
        font-size: $font-size-small;
      }
    }
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(7, 17, 27, 0.4);
    }
  }
  .list {
    position: absolute;
    bottom: 0;
    width: 100%;
    z-index: 0;
    .song-list-wrapper {
      padding: 20px 30px;
      background: $color-background;
    }
  }
}
</style>
