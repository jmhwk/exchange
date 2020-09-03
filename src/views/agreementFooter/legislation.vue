<template>
  <div class="contextpage">
    <div class="tits">{{ $t('legislatio.legislatio_h1') }}</div>
    <div class="author"><span>{{ $t('dashboard.footer_agreementhzz') }}：AUTEX</span><span>{{ $t('dashboard.footer_agreementhtime') }}：2020/4/17</span></div>
    <div class="content"><h1>{{ $t('legislatio.legislatiop1') }}</h1>
      <p>{{ $t('legislatio.legislatiop2') }}</p>
      <h1>{{ $t('legislatio.legislatiop3') }}</h1>
      <p>{{ $t('legislatio.legislatiop4') }} </p>
      <h1>{{ $t('legislatio.legislatiop5') }}</h1>
      <p>{{ $t('legislatio.legislatiop6') }}</p>
      <h1>{{ $t('legislatio.legislatiop7') }}</h1>
      <p>{{ $t('legislatio.legislatiop8') }}</p>
      <h1>{{ $t('legislatio.legislatiop9') }}</h1>
      <p>{{ $t('legislatio.legislatiop10') }}</p></div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
  .contextpage{
    .tits {
      width: 100%;
      border-bottom: 1px solid #f4f4f4;
      text-align: center;
      padding: 25px 0 15px;
      font-size: 24px;
    }
    .author {
      text-align: center;
      padding: 10px 0 0;
      span {
          padding: 0 10px;
          color: #c1bdbd;
          font-size: 13px;
      }
    }
    .content {
      h1 {
        font-size: 16px;
        margin: 10px 0;
      }
      p {
        font-size: 14px;
        display: block;
        margin: 30px 0;
        line-height: 35px;
      }
    }
  }
</style>
