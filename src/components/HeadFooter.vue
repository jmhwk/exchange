<template>
  <div class="footer_container flexcenterlist">
    <div class="footer-left">
      <router-link to="/index"><img src="../assets/imgaes/logo.png" alt=""></router-link>
    </div>
    <div class="footer-right">
      <div class="foter1">
        <p>{{$t('footer.footer_service_user1')}}</p>
        <router-link to="/">{{$t('footer.footer_help')}}</router-link>
        <div><router-link to="/footer/pneumatic">{{$t('footer.footer_service_user2')}}</router-link></div>
      </div>
      <div class="foter1">
        <p>{{$t('footer.footer_about_us')}}</p>
        <div><router-link to="/footer/security">{{$t('footer.footer_about_us')}} AUTEX</router-link></div>
        <div>{{$t('footer.footer_service_user3')}}</div>
      </div>
      <div class="foter1">
        <p>{{$t('footer.footer_service_user4')}}</p>
        <div><router-link to="/footer/safety">{{$t('footer.footer_service_user5')}}</router-link></div>
        <div><router-link to="/footer/user">{{$t('footer.footer_service_agreement')}}</router-link></div>
        <div><router-link to="/footer/legislation">{{$t('footer.footer_service_user6')}}</router-link></div>
        <div><router-link to="/footer/privacy">{{$t('footer.footer_privacy_policy')}}</router-link></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
     
    }
  },
  methods: {
  },
 
}
</script>
<style lang="scss" scoped>
  .footer_container{
    width:100%;
    height:350px;
    background:#031d44;
    color:#727983;
    .footer-left{
      img{
        width: 196px;
        height:73px;
      }
    }
    .footer-right{
      width: 800px;
      display: flex;
      justify-content: space-around;
      font-size: 14px;
      .foter1{
        line-height: 25px;
        p{
          color: #fff;
          padding: 30px 0;
        }
        div:hover{
          color: #fff;
        }
      }
    }
  }
  
</style>


