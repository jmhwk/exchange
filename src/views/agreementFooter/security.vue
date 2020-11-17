<template>
  <div class="contextpage">
    <div class="tits">{{ $t('security.security_h1') }}</div>
    <div class="author"><span>{{ $t('dashboard.footer_agreementhzz') }}：AUTEX</span><span>{{ $t('dashboard.footer_agreementhtime') }}：2020/5/17</span></div>
    <div class="content">
      <p>AUTEX交易所筹建于2020年4月，总部位于美国。AUTEX核心团队成员来自知名科技企业和金融企业，深耕区块链技术社区和传统金融行业。AUTEX持有美国FINANCIAL  CRIMES颁发的MSB金融牌照，面向全球提供安全、专业、便捷的数字资产服务。</p>
      <p>作为创新型交易平台，AUTEX秉承“口碑即一切”的初心，将平台和产品服务做到极致，让口碑成为目前追求的核心，也希望与用户共同构建社区新生态。</p>
      <p>在技术方面，AUTEX的技术团队在互联网和区块链领域均具有丰富的技术研发经验，通过不断创新，自主研发了核心高速交易撮合系统，打造多重风控安全体系，已经拥有一整套严谨、专业的风控审核安全机制，且平台均采用冷热钱包隔离，为用户数字资产保驾护航。</p>
      <h2>国际化的专业团队</h2><p>AUTEX的运营团队核心来自国内外知名大厂；成本核算与财务核心，来自普华永道；市值管理师与风控团队来自高盛；市场成员拥有多年互联网金融产品开发和运营经验，均为早期加密货币投资者和信仰者，在加密货币领域具有丰富的经验和背景。</p>
      <h2>银行级安全保障</h2><p>多级防火墙，多重签名，冷热隔离钱包，百人技术团队24小时轮岗，保障平台用户加密资产与交易的安全。</p>
      <h2>极致的交易体验</h2><p>高效的撮合引擎系统，高灵活性和高扩展性的架构设计，使用流畅不卡顿，界面友好，操作简单，安全高效。</p>
      <h2>优质高效的服务</h2><p>专属定制化服务，成熟的客户服务和技术支持体系，7*24小时响应客户需求，快速高效解决客户问题。</p>
      <h2>未来规划</h2><p>AUTEX将布局全球生态，还将在全球其他国家和地区建立完整的良性生态布局。</p>
      <p>AUTEX所做的一切，都将以用户安全交易、和谐健康发展为前提，让用户以最简单、最安全的方式参与到区块链产业投资当中。</p>
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
      h1,h2 {
        font-size: 16px;
        margin: 10px 0;
        padding: 0 70px;
        font-weight: bold;
      }

      p {
        font-size: 14px;
        display: block;
        margin: 0px 0;
        line-height: 35px;
      }
    }
  }
</style>
