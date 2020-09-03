<template>
  <div class="contextpage">
    <div class="tits">{{ $t('security.security_h1') }}</div>
    <div class="author"><span>{{ $t('dashboard.footer_agreementhzz') }}：AUTEX</span><span>{{ $t('dashboard.footer_agreementhtime') }}：2020/3/17</span></div>
    <div class="content">
      <p>{{ $t('security.securityp1') }}</p>
      <p>{{ $t('security.securityp2') }}</p>
      <p>{{ $t('security.securityp3') }}</p>
      <p>{{ $t('security.securityp4') }}</p>
      <h1>{{ $t('security.securityp5') }}</h1>
      <p>{{ $t('security.securityp6') }}</p>
      <h1>{{ $t('security.securityp7') }}</h1>
      <p>{{ $t('security.securityp8') }}</p>
      <h1>{{ $t('security.securityp9') }}</h1>
      <p>{{ $t('security.securityp10') }}</p>
      <h1>{{ $t('security.securityp11') }}</h1>
      <p>{{ $t('security.securityp12') }}</p>
      <h1>{{ $t('security.securityp13') }}</h1>
      <p>{{ $t('security.securityp14') }}</p>
      <p>{{ $t('security.securityp15') }}</p>
      <p>{{ $t('security.securityp16') }}</p></div>
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
