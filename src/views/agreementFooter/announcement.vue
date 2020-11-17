<template>
  <div class="boybg">
    <div class="contextpage">
      <el-tabs :tab-position="tabPosition"  @tab-click="handleClick" v-model="activeName">
        <el-tab-pane :label="i.cnTitle"  v-for="(i,n) in articlelist" :key="n">
          <div class="content">
            <div class="titlist flexaround">
              <h1>{{i.cnTitle}}</h1>
              <p>{{timestampToTime(i.createTime,'all')}}</p>
            </div>
            <p v-html="transBr(i.cnContent)"></p>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>

</template>

<script>
  import {
    article
  } from '@/api'
  import {
    timestampToTime
  } from '@/assets/js/time.js'
export default {
  data() {
    return {
      articlelist:[],
      tabPosition: 'left',
      timestampToTime:timestampToTime,
      activeName:'0',
    }
  },
  mounted() {
    this.activeName = this.$route.query.n
    this.article()
  },
  methods: {
    transBr(val){
      return  (val + '').replace(/\n/g,"<br/>")
    }, 

    // 公告
    async article() {
      let type = 2
      const result = await article(type)
      if (result.code == 200) {
        this.articlelist = result.data
      }
    },
    handleClick(tab) {
      // console.log(tab);
    }
  }
}
</script>

<style lang="scss">
  .contextpage{
     padding: 160px 0;
     min-height: 0;
    .content {
      .titlist {
        width: 100%;
        border-bottom: 1px solid #f4f4f4;
        text-align: center;
        font-size: 24px;
        margin:0 70px;
        p{
          color: #999;
        }
        h1 {
          font-size: 20px;
          font-weight: bold;
        }
      }
      p {
        font-size: 14px;
        padding:0 70px;
        text-align: justify;
        letter-spacing: 1px;
      }
    }
  }
</style>
