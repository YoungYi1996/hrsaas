<template>
  <div>
    <el-upload
      list-type="picture-card"
      :limit="1"
      action="#"
      :on-preview="preview"
      :on-remove="handleRemove"
      :on-change="changeFile"
      :before-upload="beforeUpload"
      :file-list="fileList"
      :http-request="upload"
      :class="{ disabled: fileComputed }"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-progress v-if="showPercent" :percentage="percent" style="width: 180px;" />
    <el-dialog title="图片" :visible.sync="showDialog">
      <img :src="imgUrl" style="width:100%" alt="">
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5' // 引入腾讯云COS包
// 实例化COS对象
const cos = new COS({
  SecretId: 'AKIDlO8i4GF1by61kFVZQ3kLo7ILCrIWXKsL', // 身份识别 ID
  SecretKey: 'OgnhOwHUaVEjz1oMp9FGDzZ4WnrgGbjd' // 身份密钥
})
export default {
  data() {
    return {
      fileList: [], // 图片地址
      showDialog: false,
      imgUrl: '',
      currentFileUid: null, // 记录当前正在上传的uid
      percent: 0,
      showPercent: false
    }
  },
  computed: {
    // 设定一个计算属性 判断是否已经上传完了一张
    fileComputed() {
      return this.fileList.length === 1
    }
  },
  methods: {
    preview(file) {
      this.imgUrl = file.url
      this.showDialog = true
    },
    handleRemove(file) {
      this.fileList = this.fileList.filter(item => item.uid !== file.uid)
    },
    changeFile(file, fileList) {
      this.fileList = fileList.map(item => item)
    },
    beforeUpload(file) {
      // 要开始做文件上传的检查了
      // 文件类型 文件大小
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.some(item => item === file.type)) {
        // 如果不存在
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false // 上传终止
      }
      //  检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      this.currentFileUid = file.uid
      this.showPercent = true
      return true
    },
    upload(params) {
      if (params.file) {
        // 执行上传操作
        cos.putObject({
          Bucket: 'young-1306501863', // 存储桶名称
          Region: 'ap-guangzhou', // 地域
          Key: params.file.name, // 文件名
          Body: params.file, // 上传的文件对象
          StorageClass: 'STANDARD', // 上传的模式类型
          onProgress: (params) => {
            this.percent = params.percent * 100
          }

        }, (err, data) => {
          console.log(err || data)
          if (!err && data.statusCode === 200) {
            // 需要知道当前上传成功的是哪一张图片
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currentFileUid) {
                // 将成功的地址赋值给原来的url属性
                return { url: 'http://' + data.Location, upload: true }
                // upload 为true表示这张图片已经上传完毕 这个属性为后期应用的时候做标记
              }
              return item
            })
            setTimeout(() => {
              // 关闭进度条
              this.showPercent = false
              // 重置百分比
              this.percent = 0
            }, 1000)
            // 将上传成功的地址回写到fileList中
          }
        })
      }
    }
  }
}
</script>

<style>
.disabled .el-upload--picture-card {
  display: none
}
</style>
