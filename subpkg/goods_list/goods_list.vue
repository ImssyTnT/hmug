<template>
  <view>
    <van-card :thumb-link="`/subpkg/goods_detail/goods_detail?id=${item.goods_id}`" v-for="item in goods"
      :key="item.goods_id" :price="item.goods_price | toFixed" :title="item.goods_name"
      :thumb="item.goods_small_logo || defaultPic" />
  </view>
</template>

<script>
  import {
    getGoodsListApi
  } from '@/api/goods.js'
  import toast from '@/utils/toast.js'
  export default {
    data() {
      return {
        queryData: {
          query: '',
          cli: '',
          pagenum: 1,
          pagesize: 10
        },
        goods: [],
        total: '',
        // 默认的空图片
        defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png',
        isLoading: false
      };
    },
    onLoad(options) {
      this.queryData.query = options.query
      this.getGoodsList()
    },

    methods: {
      // 获取商品列表
      async getGoodsList(stopPullDown) {
        this.isLoading = true
        const {
          total,
          goods
        } = await getGoodsListApi(this.queryData)
        this.goods = [...this.goods, ...goods]
        this.total = total
        this.isLoading = false
        stopPullDown && stopPullDown()
      },

      // 监听用户下拉行为
      onPullDownRefresh() {
        this.queryData = {
          query: this.queryData.query,
          cli: '',
          pagenum: 1,
          pagesize: 10,
        }
        this.goods = []
        this.total = ''

        this.getGoodsList(() => {
          uni.stopPullDownRefresh()
        })
      },

      // 监听上拉加载
      onReachBottom() {
        if (this.queryData.pagenum * this.queryData.pagesize >= this.total) return toast('没有更多数据了')
        if (this.isLoading) return
        this.queryData.pagenum++
        this.getGoodsList()
      }
    }
  }
</script>

<style lang="scss">

</style>
