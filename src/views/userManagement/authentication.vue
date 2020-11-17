<template>
  <div class="authentication">
    <Head />
    <div class="auth-autonym">
      <div class="authony-head">
        <span>实名认证</span>
        <span>{{user.checkStatus | statusName}}</span>
        </div>
      <div class="authony-content" v-if="goapprovel">
        <p>请注意认证信息一经验证不能修改，请确定如实填写正确信息。</p>
        <div class="auth-conter">
          <h1><i></i>KYC.1基础认证</h1>
          <ul>
            <li>认证后可获得以下权限</li>
            <li>1.认证后可以提币，单笔限额50000 USDT，单日限额200000 USDT；</li>
            <li>2.认证后可以法币交易，单笔限额1000 CNY，单日限额2000 CNY。</li>
          </ul>
        </div>
        <el-button type="primary" style="width: 470px; position: absolute;top: 50%;left: 50%;margin-left: -215px;background: #102646;border-color: #102646;"  v-if="user.checkStatus == 1 || user.checkStatus == 2 ">{{user.checkStatus | statusName}}</el-button>
          <el-button type="primary" style="width: 470px; position: absolute;top: 50%;left: 50%;margin-left: -215px;background: #1476fe;"
            @click="approve" v-else>重新认证</el-button>
      </div>
      <div class="form" v-else>
        <el-form ref="form" :model="form" label-width="96px">
          <el-form-item label="真实姓名">
            <el-input v-model="form.idName" placeholder="请填写您本人的真实姓名" />
          </el-form-item>
          <el-form-item label="身份证号">
            <el-input v-model="form.cardNo" placeholder="请填写您本人的身份证号" />
          </el-form-item>
          <h1>上传身份证照片</h1>
          <el-dialog :visible.sync="dialogVisible" width="400px">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
          <el-form-item>
            <div class="img_upload_line">
              <div class="img_upload_box" @click.capture="fileType = 'fd_0'">
                <el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :auto-upload="false"
                  :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-change="selectFiles" title="个人信息页"
                  :class="{hide:hideUpload}" :file-list="form.idImageA">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <p>点击上传人像页</p>
              </div>
              <div class="img_upload_box" @click.capture="fileType = 'fd_1'">
                <el-upload action="http://47.242.81.154/user/identityAuthen" list-type="picture-card" :auto-upload="false"
                  :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-change="selectFiles" title="国徽页"
                  :class="{hide:hideUpload1}" :file-list="form.idImageB">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <p>点击上传国徽页</p>
              </div>
              <div class="img_upload_box" @click.capture="fileType = 'fd_2'">
                <el-upload action="http://47.242.81.154/user/identityAuthen" list-type="picture-card" :auto-upload="false"
                  :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-change="selectFiles" title="手持"
                  :class="{hide:hideUpload2}" :file-list="form.handImage">
                  <i class="el-icon-plus"></i>
                </el-upload>
                <p>点击上传手持证件+个人签字纸照片</p>
              </div>
            </div>
          </el-form-item>
          <div class="prompt">
            <ul>
              <li>1.所有图片禁止含有其他水印，(仅用于AUTEX认证类的水印例外）否则无法通过；</li>
              <li>2.人像照片请完成露出上半身，并手持身份证正面照和个人签字纸照片；</li>
              <li>3.个人签字纸内容包含“AUTEX”和当天的日期；</li>
              <li>4.拍照请勿拍的太远，否则看不清字面将导致无法通过审核。</li>
            </ul>
            <p style="color: #b68920;">提示：单张照片请勿超过5MB大小，点击提交后耐心等待上传，请勿重复点击</p>
          </div>


          <el-form-item>
            <el-button type="primary" style="background: #1476fe;" @click="submit">去认证</el-button>
          </el-form-item>
        </el-form>
      </div>
      <!--        <el-button type="primary"style="width: 470px; position: absolute;top: 50%;left: 50%;margin-left: -215px;background: #1476fe;" @click="approve">去认证</el-button> -->

    </div>
  </div>
  </div>
</template>

<script>
  import Head from './head.vue'
  import {mapState} from 'vuex'
  import {
    identityAuthen,
    uploadBase64
  } from '../../api'
  export default {
    components: {
      Head
    },
    filters: {
      statusName(val) {
        // 0待支付 1已参团 2已中签 3未中签 4已取消
        switch (val) {
          case 1:
            return '待审核'
          case 2:
            return '已认证'
          case -1:
            return '未通过'
          default:
          return '未认证'
        }
      }
    },
    data() {
      return {
        goapprovel: true,
        //图片查看弹框和信息
        dialogVisible: false,
        dialogImageUrl: "",
        //每次点击上传时区分此时上传的文件类型
        // fd_0 正面
        // fd_1 反面
        // fd-2 手持
        fileType: "",
        // 验证对象
        form: {
          idName: '',
          cardNo: '',
          idImageA: [],
          idImageB: [],
          handImage: []
        },
        imglist: {
          idImageA: '',
          idImageB: '',
          handImage: '',
        },
        hideUpload: false,
        hideUpload1: false,
        hideUpload2: false,
        limitCount: 1
      };
    },
    created() {

    },
    computed: {
      ...mapState({
        user:state => state.user.user,
      }),
    },
    methods: {
      approve() {
        this.goapprovel = false
      },
      // 图片上传
      async uploadBase64(item, list) {
        // const base64Data = new URLSearchParams();
        // base64Data.append('base64Data', item)
        let params = {
          base64Data: item
        }
        let index = 1
        let result = await uploadBase64({
          params,
          index
        })
        if (result.code == 200) {
          this.$message.success("上传成功");

        } else {
          this.$message({
            message: result.msg,
            type: 'error'
          })
          return
        }
        if (list == 1) {
          this.imglist.idImageA = result.data
        } else if (list == 2) {
          this.imglist.idImageB = result.data
        } else {
          this.imglist.handImage = result.data
        }

      },

      async forget() {
        let that = this
        const {
          cardNo,
          idName
        } = that.form
        const {
          handImage,
          idImageA,
          idImageB
        } = this.imglist
        // let idImageA = this.form.idImageA[0].url
        // let idImageB = this.form.idImageB[0].url
        // let handImage = this.form.handImage[0].url
        let cardType = 0
        let country = 'chinese'
        let result = await identityAuthen({
          cardNo,
          handImage,
          idImageA,
          idImageB,
          idName,
          cardType,
          country
        })
        if (result.code == 200) {
          this.$message.success("上传成功");
          this.goTo('/log')
        } else {
          that.$message({
            message: result.msg,
            type: 'error'
          })
        }
      },
      // 图片转换
      getBase64(file) {
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult = "";
          reader.readAsDataURL(file);
          reader.onload = function() {
            imgResult = reader.result;
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },
      onSubmit() {},
      //选择文件方法
      selectFiles(file, fileList) {
        let _this = this;
        // console.log(file, fileList);
        if (_this.fileType == "fd_0") {
          this.getBase64(file.raw).then(res => {
            this.uploadBase64(res, 1)
          });
          _this.form.idImageA = fileList;
          _this.hideUpload = fileList.length >= _this.limitCount;
        } else if (_this.fileType == "fd_1") {
          this.getBase64(file.raw).then(res => {
            this.uploadBase64(res, 2)
          });
          _this.form.idImageB = fileList;
          _this.hideUpload1 = fileList.length >= _this.limitCount;
        } else if (_this.fileType == "fd_2") {
          this.getBase64(file.raw).then(res => {
            this.uploadBase64(res, 3)
          });
          _this.form.handImage = fileList;
          _this.hideUpload2 = fileList.length >= _this.limitCount;
        }
      },
      //文件移除方法
      handleRemove(file, fileList) {
        let _this = this;
        // console.log(file, fileList);
        if (_this.fileType == "fd_0") {
          _this.form.idImageA = [];
        } else if (_this.fileType == "fd_1") {
          _this.form.idImageB = [];
        } else if (_this.fileType == "fd_2") {
          _this.form.handImage = [];
        }
      },
      //上传格式校验
      handlePictureCardPreview(file) {
        if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(file.name)) {
          this.$message.warning("暂不支持查看该格式文件！");
          return false;
        } else {
          this.dialogImageUrl = file.url;
          this.dialogVisible = true;
        }
      },
      //图片查看
      toView_IMG(e) {
        this.dialogImageUrl = e.toElement.src;
        this.dialogVisible = true;
      },
      //点击上传
      submit() {
        if (!this.form.idImageA[0]) {
          this.$message.warning('请上传正面照')
          return
        }
        if (!this.form.idImageB[0]) {
          this.$message.warning('请上传反面照')
          return
        }
        if (!this.form.handImage[0]) {
          this.$message.warning('请上传手持照')
          return
        }
        // let formData = formData.append("idImageA", this.form.idImageA[0].url);
        this.forget()
      }
    }
  }
</script>

<style lang="scss">
  .authentication {
    color: #787d87;

    .auth-autonym {
      width: 100%;
      height: 816px;
      background: #031937;

      .authony-head {
        padding: 20px;
        background: #041f43;
        margin: 5px 0;
        span:first-child{
          color: #1476FE;
        }
        span{
          padding: 0 10px;
          color:#F33E3F;
        }
      }

      .form {
        margin-top: 40px;
        margin-left: 130px;

        h1 {
          color: rgba($color: #fff, $alpha: 0.8);
          padding: 18px;
          font-size: 14px;
        }

        //图片上传
        .img_upload_line {
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 662px;

          // text-align: center;
          .img_upload_box {
            width: 220px;
            height: 180px;
            overflow: hidden;
          }
        }

        .hide .el-upload--picture-card {
          display: none;
        }

        .prompt {
          width: 662px;
          line-height: 30px;
          font-size: 14px;
          padding-left: 18px;
        }

        .el-form {
          .el-form-item {
            margin-bottom: 20px;

            .el-form-item__label {
              color: rgba($color: #fff, $alpha: 0.8);
              padding: 0px 20px;
              text-align: justify;
              text-align-last: justify;
            }

            .el-form-item__content {
              width: 470px;

              span {
                padding-left: 16px;

                >a {
                  font-size: 14px;
                  color: $money-blue;
                }
              }

              input {
                width: 100%;
                background-color: rgba($color: #243b5d, $alpha: 0.41);
                height: 40px !important;
              }

              .el-button {
                width: 100%;
                margin-top: 50px;
              }
            }
          }
        }
      }

      .authony-content {
        padding: 20px;
        // background: #031937;
        height: 100%;
        position: relative;

        p {
          font-size: 12px;
        }

        .auth-conter {
          font-size: 14px;

          h1 {
            color: #fff;
            padding: 20px 0;

            i {
              display: inline-block;
              width: 2px;
              height: 12px;
              background: #1476FE;
              margin-right: 10px;
            }
          }

          ul {
            padding-left: 10px;

            li {
              padding: 5px 0;
            }
          }
        }
      }
    }
  }
</style>
