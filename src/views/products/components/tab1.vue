<template>
	<div>
		<div class="intsnav">
      <el-row :gutter="30">
        <el-col :span="12"><h5>委托类型<span style="color: #031937;">{{contraForm.selling}}</span></h5></el-col>
        <el-col :span="12"><h5>杠杆（X）</h5></el-col>
      </el-row>
      <el-row :gutter="30">
        <el-col :span="12">
          <ul class="lever">
            <li v-for="(i,n) in genre" :key="n"  @click="toggle(n,i.name)" :class="{active:active==n}" >{{i.name}}</li>
          </ul>
        </el-col>
        <el-col :span="12">
          <el-select v-model="value1" placeholder="请选择">
            <el-option v-for="(item,index) in options" :key="index" :label="item.lendRate" :value="item.lendRate" />
          </el-select>
        </el-col>
      </el-row>
      <div v-if="displaynone !=2">
        <el-row :gutter="30">
          <el-col :span="12"><h5>买入价格</h5></el-col>
          <el-col :span="12"><h5>买入数量</h5></el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="12">
            <ul class="lever" v-if="displaynone ==0">
              <li v-for="(i,n) in genrelist" :key="n"  @click="toggle1(n,i.name)" :class="{active:active1==n}" >{{i.name}}</li>
            </ul>
            <span v-else>以当前最优价格下单</span>
          </el-col>
          <el-col :span="12">
            <ul class="lever">
              <li v-for="(i,n) in genrenum" :key="n"  @click="toggle2(n,i.label,numFilter((lendobj.amount*value1)/formsell.sell))" :class="{active:active2==n}" >{{i.name}}</li>
            </ul>
          </el-col>
        </el-row> 
      </div>  
<!--      <div v-else>
        <el-row :gutter="30">
          <el-col :span="24"><h5>计划委托类型</h5></el-col>
        </el-row>
        <el-row :gutter="30">
          <el-col :span="24">
          <el-select v-model="value2" placeholder="请选择">
            <el-option v-for="(item,index) in Check" :key="index" :label="item.name" :value="item.name" />
          </el-select>
          </el-col>
        </el-row>
      </div>   -->
    </div>
		<el-row class="deal" :gutter="30"  v-if="displaynone ==0">
		  <el-col :span="12">
		    <div class="ints">
		      <h5>价格</h5>
		      <div class="its">
		        <input type="text" maxlength="12"  v-model="form.price" placeholder="请输入买入价格" >
		      </div>
		    </div>
		    <div class="ints">
		      <h5>数量</h5>
		      <div class="its">
		        <input type="text" maxlength="12" v-model="form.qty"  placeholder="请输入买入量"></div>
		    </div>
		    <div class="rate flexcenter">
		      <a>可用（{{lendobj.coinName}}）<label>{{numFilter(lendobj.amount || 0)}}</label></a>
		      <a>可开多：<label>{{numFilter((lendobj.amount*value1)/formsell.sell || 0)}}</label></a>
		    </div>
		    <input type="button" value="买入开多" class="lbtns" @click="add(1,1,form)">
		  </el-col>
		  <el-col :span="12">
		    <div class="ints">
		      <h5>价格</h5>
		      <div class="its">
		        <input type="text" maxlength="12"  v-model="form1.price" placeholder="请输入买入价格" >
		      </div>
		    </div>
		    <div class="ints">
		      <h5>数量</h5>
		      <div class="its">
		        <input type="text" maxlength="12" v-model="form1.qty"  placeholder="请输入买入量"></div>
		    </div>
		    <div class="rate flexcenter">
		      <a>可用（{{lendobj.coinName}}）<label>{{numFilter(lendobj.amount || 0)}}</label></a>
		      <a>可开空：<label>{{numFilter((lendobj.amount*value1)/formsell.buy || 0)}}</label></a>
		    </div>
		    <input type="button" value="卖出开空" class="lbtns lbtns1" @click="add(2,1,form1)">
		  </el-col>
		</el-row>
    <el-row class="deal" :gutter="30"  v-if="displaynone ==1">
      <el-col :span="12">
        <div class="ints">
          <h5>数量</h5>
          <div class="its">
            <input type="text" maxlength="12" v-model="form.qty"  placeholder="请输入买入量"></div>
        </div>
        <div class="rate flexcenter">
          <a>可用（{{lendobj.coinName}}）<label>{{numFilter(lendobj.amount || 0)}}</label></a>
          <a>可开多：<label>{{numFilter((lendobj.amount*value1)/formsell.sell || 0)}}</label></a>
        </div>
        <input type="button" value="买入开多" class="lbtns" @click="add(1,2,form)">
      </el-col>
      <el-col :span="12">
        <div class="ints">
          <h5>数量</h5>
          <div class="its">
            <input type="text" maxlength="12" v-model="form1.qty"  placeholder="请输入买入量"></div>
        </div>
        <div class="rate flexcenter">
          <a>可用（{{lendobj.coinName}}）<label>{{numFilter(lendobj.amount || 0)}}</label></a>
          <a>可开空：<label>{{numFilter((lendobj.amount*value1)/formsell.buy || 0)}}</label></a>
        </div>
        <input type="button" value="卖出开空" class="lbtns lbtns1" @click="add(2,2,form1)">
      </el-col>
    </el-row>
    <el-row class="deal" :gutter="30"  v-if="displaynone ==2">
      <el-col :span="12">
        <div class="ints">
          <h5>触发价格</h5>
          <div class="its">
            <input type="text" maxlength="12" v-model="form.triggerPrice"  placeholder="请输入触发价格"></div>
        </div>
        <div class="ints">
          <h5>委托价格</h5>
          <div class="its">
            <input type="text" maxlength="12" v-model="form.stopPrice"  placeholder="请输入委托价格"></div>
        </div>
        <div class="ints">
          <h5>数量</h5>
          <div class="its">
            <input type="text" maxlength="12" v-model="form.qty"  placeholder="请输入买入量"></div>
        </div>
        <div class="rate flexcenter">
          <a>可用（{{lendobj.coinName}}）<label>{{numFilter(lendobj.amount || 0)}}</label></a>
          <a>可开多：<label>{{numFilter((lendobj.amount*value1)/formsell.sell || 0)}}</label></a>
        </div>
        <input type="button" value="买入开多" class="lbtns" @click="add(1,3,form)">
      </el-col>
      <el-col :span="12">
        <div class="ints">
          <h5>触发价格</h5>
          <div class="its">
            <input type="text" maxlength="12" v-model="form1.triggerPrice"  placeholder="请输入触发价格"></div>
        </div>
        <div class="ints">
          <h5>委托价格</h5>
          <div class="its">
            <input type="text" maxlength="12" v-model="form1.stopPrice"  placeholder="请输入委托价格"></div>
        </div>
        <div class="ints">
          <h5>数量</h5>
          <div class="its">
            <input type="text" maxlength="12" v-model="form1.qty"  placeholder="请输入买入量"></div>
        </div>
        <div class="rate flexcenter">
          <a>可用（{{lendobj.coinName}}）<label>{{numFilter(lendobj.amount || 0)}}</label></a>
          <a>可开空：<label>{{numFilter((lendobj.amount*value1)/formsell.buy || 0)}}</label></a>
        </div>
        <input type="button" value="卖出开空" class="lbtns lbtns1" @click="add(2,3,form1)">
      </el-col>
    </el-row>
	</div>
</template>

<script>
  import {numFilter} from '@/assets/js/time.js'
  import { lendadd,lendRateConfig } from '@/api'
  import { mapState } from 'vuex'
	export default {
    props:{
      lendobj:{
        type: Object,
        default: () => {}
      },
      // form:{
      //   type: Object,
      //   default: () => {}
      // },
      // form1:{
      //   type: Object,
      //   default: () => {}
      // },
      formsell:{
        type: Object,
        default: () => {}
      }
    },
		data() {
			return {
        price:{},
        options:[],
        numFilter:numFilter,
        form:{
          price:0, //价格
          qty:0, // 数量
          triggerPrice:'', // 触发
          stopPrice:'' // 委托
        },
        form1:{
          price:0, //价格
          qty:0, // 数量
          triggerPrice:'', // 触发
          stopPrice:'' // 委托
        },
        active:0,
        active1:0,
        active2:-1,
        value1: 10,
        value2:'计划委托',
        displaynone:0,
				genre:[{name:'限价委托'},{name:'市价委托'},{name:'计划委托'}],
        genrelist:[{name:'买一价'},{name:'卖一价'}],
        // Check:[{name:'单项计划委托'}],
        genrenum:[{name:'10%',label:'0.1'},{name:'20%',label:'0.2'},{name:'50%',label:'0.5'},{name:'100%',label:'1'}],
        genrelist:[{name:'买一价'},{name:'卖一价'}],
			};
		},
    computed: {
      ...mapState({
        contraForm: function(state) {
          if (JSON.stringify(state.websocket.coinsForm) != '{}') {
            let contraForm = state.websocket.contraForm
            this.form.price = contraForm.selling
            this.form1.price = contraForm.Buying
          }
          return state.websocket.contraForm
        },
      })
    },
    mounted() {
      // this.form.price =this.numFilter(this.formsell.sell)
      // this.form1.price =this.numFilter(this.formsell.buy)
      this.lendRateConfig()
    }, 
    methods: {
      // 委托类型
      toggle(i,v){
        this.active=i;
        this.displaynone = i
      },
      // 买入价格
      toggle1(i,v){
        this.contraForm.selling = 0
        this.active1=i;
        if(i==1){
          this.form.price =this.numFilter(this.formsell.buy)
          this.form1.price =this.numFilter(this.formsell.buy)
        }else{
          this.form.price =this.numFilter(this.formsell.sell)
          this.form1.price =this.numFilter(this.formsell.sell)
        }
      },
      // 买卖接口
      async add(type,list,form) {
        let lendRate = this.value1 
        form.price = list==1?form.price:''
        this.formsell.orderType = list
        const { price, qty,stopPrice,triggerPrice} = form
        const { orderType, marketId } = this.formsell
        const result = await lendadd({lendRate, marketId, orderType, price, qty,type,stopPrice ,triggerPrice})
        if (result.code == 200) {
          this.$message({
            message: '委托成功',
            type: 'success'
          })
          window.location.reload();
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
        }
      },
      
      // 杠杆接口
      async lendRateConfig() {
        const result = await lendRateConfig(1)
        if (result.code == 200) {
          this.options = result.data
        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
        }
      },
      // 买入数量
      toggle2(i,a,v){
        this.active2=i;
        this.form.qty =this.numFilter(v*a)
        this.form1.qty =this.numFilter(v*a)
      },
      formatTooltip(val) {
        return val+'X';
      }
    },
	}
</script>

<style lang="scss" scoped="">

  
</style>
