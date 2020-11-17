<template>
  <div class="contextpage">
    <div class="tits">{{ $t('privacy.privacyh1') }}</div>
    <div class="author">
      <span>{{ $t('dashboard.footer_agreementhzz') }}：AUTEX</span>
      <span>{{ $t('dashboard.footer_agreementhtime') }}：2020/3/17</span>
    </div>
    <div class="content">
      <h1>{{ $t('privacy.privacyp1') }}</h1>
      <p>
        1.1 AUTEX是一家根据美国相关法律在美国注册成立的公司，该公司运营网站<a href=" www.autex.cc"> www.autex.cc</a>（以下称“本网站”或“网站”），该网站是一个专门供用户进行区块链相关服务（以下称“该服务”或“服务”）的平台。为了本协议表述之方便，公司和该网站在本协议中合称使用“我们”或其他第一人称称呼。        <br>
        1.2 只要登陆该网站的自然人或其他主体均为本网站的用户，本协议表述之便利，以下使用“您”或其他第二人称。
        <br>
        1.3 为了本协议表述之便利，我们和您在本协议中合称为“双方”，我们或您单称为“一方”。
      </p>
      <h1>{{ $t('privacy.privacyp5') }}</h1>
      <p>{{ $t('privacy.privacyp6') }}</p>
      <h1>{{ $t('privacy.privacyp7') }}</h1>
      <p>
        {{ $t('privacy.privacyp8') }}
        <br>
        {{ $t('privacy.privacyp9') }}
        <!-- <br /> -->
        <!-- {{$t('privacy.privacyp10')}} -->
        <br>
        {{ $t('privacy.privacyp11') }}
        <br>
        {{ $t('privacy.privacyp12') }}
        <br>
        {{ $t('privacy.privacyp13') }}
      </p>
      <h1>{{ $t('privacy.privacyp14') }}</h1>
      <p>
        {{ $t('privacy.privacyp15') }}
        <br>
        {{ $t('privacy.privacyp16') }}
        <br>{{ $t('privacy.privacyp17') }}
        <br>{{ $t('privacy.privacyp18') }}
        <br>{{ $t('privacy.privacyp19') }}
        <br>{{ $t('privacy.privacyp21') }}
      </p>
      <h1>{{ $t('privacy.privacyp22') }}</h1>
      <p>
        {{ $t('privacy.privacyp23') }}
        <br>{{ $t('privacy.privacyp24') }}
        <br>{{ $t('privacy.privacyp25') }}
      </p><h1>{{ $t('privacy.privacyp26') }}</h1>
      <p>
        {{ $t('privacy.privacyp27') }}
        <br>{{ $t('privacy.privacyp28') }}
        <br>{{ $t('privacy.privacyp29') }}
        <br>{{ $t('privacy.privacyp30') }}
        <br>{{ $t('privacy.privacyp31') }}
        <br>{{ $t('privacy.privacyp32') }}
        <br>{{ $t('privacy.privacyp33') }}
        <br>{{ $t('privacy.privacyp34') }}
        <br>{{ $t('privacy.privacyp35') }}
        <br>{{ $t('privacy.privacyp36') }}
      </p>
      <h1>{{ $t('privacy.privacyp37') }}</h1>
      <p>
        {{ $t('privacy.privacyp38') }}
        <br>{{ $t('privacy.privacyp39') }}
        <br>{{ $t('privacy.privacyp40') }}
        <br>{{ $t('privacy.privacyp41') }}
        <br>{{ $t('privacy.privacyp42') }}
        <br>{{ $t('privacy.privacyp43') }}
        <br>{{ $t('privacy.privacyp44') }}
        <br>{{ $t('privacy.privacyp45') }}
      </p><h1>{{ $t('privacy.privacyp46') }}</h1>
      <p>{{ $t('privacy.privacyp47') }}</p>
      <h1>{{ $t('privacy.privacyp48') }}</h1>
      <p>
        {{ $t('privacy.privacyp49') }}
        <br>{{ $t('privacy.privacyp50') }}
        <br>{{ $t('privacy.privacyp51') }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss">
.contextpage {
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
      margin: 10px 0 !important;
      line-height: 35px;
    }
  }
}
</style>
