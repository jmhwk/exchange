<template>
  <div class="contextpage">
    <div class="tits">{{ $t('safety.safety_h1') }}</div>
    <div class="author"><span>{{ $t('dashboard.footer_agreementhzz') }}：AUTEX</span><span>{{ $t('dashboard.footer_agreementhtime') }}：2020/4/17</span></div>
    <div class="content"><p>{{ $t('safety.safetyp1') }}</p>
      <h1>{{ $t('safety.safetyp2') }}</h1>
      <p>
        {{ $t('safety.safetyp3') }}
        <br>{{ $t('safety.safetyp4') }}
        <br>{{ $t('safety.safetyp5') }}
        <br>{{ $t('safety.safetyp6') }}
      </p>
      <h1>{{ $t('safety.safetyp7') }}</h1>
      <p>
        {{ $t('safety.safetyp8') }}
        <br>{{ $t('safety.safetyp9') }}</p>
      <h1>{{ $t('safety.safetyp10') }}</h1>
      <p>{{ $t('safety.safetyp11') }}</p></div>
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
