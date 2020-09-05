<template>
  <div class="products">
    <div class="products-top">
      <el-row :gutter="5">
        <el-col :span="3">
          <div class="grid-content bg-purple1">
            <div class="title">USDT合约</div>
            <ul class="currencynav n_hight">
              <li class="active">
                <div class="name"><label>BTC</label><label class="red">-3.95%</label></div><span>10247.6446 ≈ ￥
                  70367.50</span><span>-421.9573</span>
              </li>
              <li class="">
                <div class="name"><label>ETH</label><label class="red">-4.83%</label></div><span>384.0528 ≈ ￥ 2637.17</span><span>-19.5056</span>
              </li>
              <li class="">
                <div class="name"><label>EOS</label><label class="red">-7.41%</label></div><span>2.6730 ≈ ￥ 18.35</span><span>-0.2139</span>
              </li>
              <li class="">
                <div class="name"><label>LTC</label><label class="red">-9.42%</label></div><span>48.3497 ≈ ￥ 332.00</span><span>-5.0296</span>
              </li>
              <li class="">
                <div class="name"><label>BCH</label><label class="red">-7.72%</label></div><span>222.5741 ≈ ￥ 1528.34</span><span>-18.6223</span>
              </li>
              <li class="">
                <div class="name"><label>ETC</label><label class="red">-11.10%</label></div><span>5.1000 ≈ ￥ 35.02</span><span>-0.6374</span>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="13">
          <div class=" bg-purple2">
            <centerkline></centerkline>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple3">
            <div class="title">USDT合约</div>
            <div class="t_tbs">
              <div class="t_tits"><span>方向</span><span>价格(USDT)</span><span>数量(BTC)</span></div>
              <ul id="handicap" class="menu_nav p_hight">
                <li><span class="red">做空</span><span>10263.0338</span><span>35.7682</span>
                  <div class="reds" style="width: 35.7682%;"></div>
                </li>
                <li><span class="red">做空</span><span>10262.5781</span><span>20.9804</span>
                  <div class="reds" style="width: 20.9804%;"></div>
                </li>
                <li><span class="red">做空</span><span>10261.8127</span><span>49.8045</span>
                  <div class="reds" style="width: 49.8045%;"></div>
                </li>
                <li><span class="red">做空</span><span>10261.2926</span><span>32.8264</span>
                  <div class="reds" style="width: 32.8264%;"></div>
                </li>
                <li><span class="red">做空</span><span>10260.6966</span><span>24.5277</span>
                  <div class="reds" style="width: 24.5277%;"></div>
                </li>
                <li><span class="red">做空</span><span>10260.3912</span><span>46.0728</span>
                  <div class="reds" style="width: 46.0728%;"></div>
                </li>
                <li><span class="red">做空</span><span>10259.9449</span><span>29.0891</span>
                  <div class="reds" style="width: 29.0891%;"></div>
                </li>
                <li><span class="red">做空</span><span>10259.8132</span><span>21.4549</span>
                  <div class="reds" style="width: 21.4549%;"></div>
                </li>
                <li><span class="red">做空</span><span>10259.6620</span><span>35.5204</span>
                  <div class="reds" style="width: 35.5204%;"></div>
                </li>
                <li><span class="red">做空</span><span>10259.5537</span><span>27.2001</span>
                  <div class="reds" style="width: 27.2001%;"></div>
                </li>
                <li><span class="red">做空</span><span>10258.8993</span><span>34.4928</span>
                  <div class="reds" style="width: 34.4928%;"></div>
                </li>
                <li><span class="red">做空</span><span>10257.9773</span><span>42.0149</span>
                  <div class="reds" style="width: 42.0149%;"></div>
                </li>
                <li><span class="red">做空</span><span>10257.5679</span><span>40.0967</span>
                  <div class="reds" style="width: 40.0967%;"></div>
                </li>
              </ul>
              <div class="title">最新价：<label class="red">10247.6446</label></div>
              <ul class="menu_nav p_hight">
                <li><span class="green">做多</span><span>10247.5127</span><span>20.1364</span>
                  <div class="greens" style="width: 20.1364%;"></div>
                </li>
                <li><span class="green">做多</span><span>10246.8603</span><span>21.4204</span>
                  <div class="greens" style="width: 21.4204%;"></div>
                </li>
                <li><span class="green">做多</span><span>10246.2502</span><span>41.8055</span>
                  <div class="greens" style="width: 41.8055%;"></div>
                </li>
                <li><span class="green">做多</span><span>10245.9943</span><span>24.2325</span>
                  <div class="greens" style="width: 24.2325%;"></div>
                </li>
                <li><span class="green">做多</span><span>10245.5457</span><span>21.3150</span>
                  <div class="greens" style="width: 21.315%;"></div>
                </li>
                <li><span class="green">做多</span><span>10244.6370</span><span>39.5064</span>
                  <div class="greens" style="width: 39.5064%;"></div>
                </li>
                <li><span class="green">做多</span><span>10243.7575</span><span>34.6670</span>
                  <div class="greens" style="width: 34.667%;"></div>
                </li>
                <li><span class="green">做多</span><span>10243.3297</span><span>44.9915</span>
                  <div class="greens" style="width: 44.9915%;"></div>
                </li>
                <li><span class="green">做多</span><span>10243.2235</span><span>39.4935</span>
                  <div class="greens" style="width: 39.4935%;"></div>
                </li>
              </ul>
            </div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple3 bg-purple4">
            <div class="title">最新成交</div>
            <div class="t_tbs">
              <div class="t_tits">
                <span>时间</span><span>价格(USDT)</span><span>数量(BTC)</span>
              </div>
              <ul class="menu_nav n_hight">
                <li><span>14:56:08</span><span class="tr-mName thead-color green">10247.6446</span><span>0.1339</span></li>
                <li><span>14:56:08</span><span class="tr-mName thead-color green">10247.6446</span><span>0.1286</span></li>
                <li><span>14:56:08</span><span class="tr-mName thead-color green">10247.6446</span><span>0.1385</span></li>
                <li><span>14:56:08</span><span class="tr-mName thead-color green">10247.6446</span><span>0.1404</span></li>
                <li><span>14:56:08</span><span class="tr-mName thead-color green">10247.6446</span><span>0.1217</span></li>
                <li><span>14:56:07</span><span class="tr-mName thead-color green">10248.2908</span><span>0.0602</span></li>
                <li><span>14:56:07</span><span class="tr-mName thead-color green">10248.2908</span><span>0.0558</span></li>
                <li><span>14:56:07</span><span class="tr-mName thead-color green">10248.4266</span><span>0.0601</span></li>
              </ul>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="products-bottom">
        <record></record>
    </div>
  </div>
</template>

<script>
  import record from './components/record.vue'
  import centerkline from './components/centerkline.vue'
  export default {
    data() {
      return {

      }
    },
    created() {

    },
    components:{
      record,
      centerkline
    },
    methods: {}
  }
</script>

<style lang="scss" scoped>
  .products {
    padding: 75px 0 5px;
    background: #010E20;
    color: #fff;

    .products-top {
      padding-bottom: 5px;
      .red {
        color: #e2505b !important;
      }

      .reds {
        background-color: rgba(250, 82, 15, .1);
        height: 30px;
        position: absolute;
        right: 0;
      }

      .green {
        color: #01bd8b !important;
      }

      .greens {
        background-color: rgba(1, 174, 103, .1);
        height: 30px;
        position: absolute;
        right: 0;
      }

      .title {
        font-size: 14px;
        color: #fff;
        background: #212f46;
        padding: 10px;
        border-bottom: 1px solid #1f314d;
      }

      .grid-content {
        background: #031937;
        height: 1095px;
      }

      span:first-of-type {
        text-align: left;
        padding-left: 15px;
      }

      span:last-of-type {
        text-align: right;
        padding-right: 15px;
      }

      span {
        width: 33.3%;
        text-align: center;
        padding: 8px 0;
        font-size: 12px;
        color: #9eaebd;
      }

      .bg-purple1 {
        .currencynav {
          width: 100%;
          overflow: auto;

          li {
            padding: 15px 10px;
            color: #919598;
            cursor: pointer;
            font-size: 12px;
            border-bottom: 1px solid #1f314d;

            span {
              display: block;
              padding-top: 5px;
            }

            span:first-of-type {
              color: #dfdfdf;
            }

            .name {
              font-size: 13px;
              color: #7fa6fb;
              display: -webkit-box;
              display: -ms-flexbox;
              display: flex;
              -webkit-box-pack: justify;
              -ms-flex-pack: justify;
              justify-content: space-between;
            }
          }

          li.active,
          li:hover {
            background: #182841;
          }
        }
      }
      .bg-purple4 {
        overflow: auto;
      }
      .bg-purple3 {
        .t_tbs {
          width: 100%;
          .t_tits {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            background: #1a2639;
          }

          .p_hight {
            height: 453px;
          }

          .menu_nav {
            overflow: auto;

            li {
              display: flex;
              position: relative;
              cursor: pointer;
            }
          }
        }
      }
    }

    .products-bottom {
      height: 563px;
      background: #031937;
    }

  }
</style>
