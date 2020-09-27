<template>
  <div>
    <div class="auth-nav">
      <div class="logo"><img src="../images/icon/head.png" alt=""></div>
      <div class="texts">
        <div class="mobile">
          <h1>Hi {{user.phone}}</h1>
          <i>UID：{{user.uid|| '——'}}</i>
        </div>
        <span>最后登录时间：{{user.updateTime}}<label>IP：{{user.id|| '——'}}</label></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import { dateFormat, eqTimestampToTime, timestampToTime  } from '../../assets/js/time.js'
  export default {
    data() {
      return {
        time:''
      };
    },
    created() {
    },
    computed: {
      ...mapState({
        user:state => state.user.user
      }),
    },
    methods: {},
  }
</script>

<style lang="scss">
  .auth-nav {
    background: #031937;
    display: flex;
    padding: 30px 20px;
    align-items: center;

    .logo {
      img {
        width: 78px;
        height: 78px;
      }
    }

    .texts {
      color: #fff;
      margin-left: 20px;

      span {
        font-size: 14px;
        display: block;
        padding-top: 15px;
        color: #ffffff99 ;

        label {
          padding-left: 20px;
        }
      }

      .mobile {
        display: flex;

        h1 {
          font-size: 24px;
          padding-right: 10px;
        }

        i {
          text-align: center;
          width: 130px;
          padding: 3px 0;
          color: #1476FE;
          border: 1px solid #1476FE;
          opacity: 1;
          border-radius: 30px;
        }
      }
    }
  }
</style>
