# vue3-music

## 运行过程

npm install
npm run serve

## 技术栈

vue3+项目复杂度较高

## 亮点

歌手列表 :1.实现固定 title 显示为滑动到的区域的 title 且这个固定 title 在下一个 title 往上滑动的时候会向上挤走的动画 2.实现快速滑动列表 手指在上面点击或者滑动 左侧列表会跟随着快读移动 维持滑动距离和 index 之间的关系 处理 index 过大和不合法的问题
歌手详情列表 1.实现上滑列表遮住除了名字的图 下滑实现一个图片放缩的效果
播放器组件:很多地方都可以进去这个组件所以是个全局组件 而且播放列表 播放顺序等都是全局状态 用 vuex
vuex:mutation 直接修改 state
action 不可以直接修改 state 而是执行 mutations 里面的方法 而且可异步
Action 提交的是 mutation，而不是直接变更状态。
Action 可以包含任意异步操作。
mapActions 是把 action 里面的东西全部放到 methods 里
