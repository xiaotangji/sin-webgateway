<template>
  <div>
    <div style="height: 50%;" >
        <div class="toolPanel">
        <div  class="search-con search-con-top">
          <Select v-model="tableDataCxxf.pch" clearable class="search-col" placeholder="请选择批次">
            <Option v-for="item in pchColumns" :key="`search-col-${item.key}`" :value="item.value">{{ item.key }}</Option>
          </Select>
          <Select v-model="tableDataCxxf.lx" clearable class="search-input" placeholder="请选择程序类型">
            <Option v-for="item in lxColumns" :value="item.value" :key="item.value">{{ item.key }}</Option>
          </Select>
          <Button type="primary" @click="selectUpdatedProgram" style="margin-left: 15px">搜索</Button>
          <Button type="primary" @click="openUpdateProgramModal" style="margin-left: 15px">下发</Button>
        </div>
      </div>
        <Table :loading="tableDataCxxf.loading" border :columns="columnFromCxxf" :height="tableDataCxxf.height" @on-sort-change="sortChange" :data="tableDataCxxf.dataFrom" show-sizer></Table>
        <Page ref='pageEntityCxxf' :total=tableDataCxxf.total :current="tableDataCxxf.page" :page-size="tableDataCxxf.pageSize" show-elevator show-total show-sizer @on-change="changeCxxfPage" @on-page-size-change="changeCxxfPageSize"></Page>
    </div>
    <div style="height: 50%;border-top: rgba(204,204,204,0.72) solid 1px;padding-top: 2px">
        <div class="toolPanel">
        <div  class="search-con search-con-top">
          <Select v-model="tableDataCxsc.pch" clearable class="search-col">
            <Option v-for="item in pchColumns" :key="`search-col-${item.key}`" :value="item.value">{{ item.key }}</Option>
          </Select>
          <Select v-model="tableDataCxsc.lx" clearable class="search-input">
            <Option v-for="item in lxColumns" :value="item.value" :key="item.value">{{ item.key }}</Option>
          </Select>
          <Button type="primary" @click="selectUploadedProgram" style="margin-left: 15px">搜索</Button>
          <Button type="primary" @click="openUploadProgramModal" style="margin-left: 15px">上传</Button>
        </div>
        </div>
        <Table :loading="tableDataCxsc.loading" border :columns="columnFromCxsc" :height="tableDataCxsc.height" @on-sort-change="sortChange" :data="tableDataCxsc.dataFrom" show-sizer></Table>
        <Page ref='pageEntityCxsc' :total=tableDataCxsc.total :current="tableDataCxsc.page" :page-size="tableDataCxsc.pageSize" show-elevator show-total show-sizer @on-change="changeCxscPage" @on-page-size-change="changeCxscPageSize"></Page>
    </div>
    <Modal
      v-model="cxxfModalFlag"
      title="下发程序"
      class-name="vertical-center-modal"
      :mask-closable="false"
      :closable="false"
    >
      <div style="top:20px;height:450px;overflowY:scroll;">
        <Form  :model="Cxxfform" ref="Cxxfform" :rules="ruleInlineCxxf" label-position="left" :label-width="100">
          <Form-item label="批次号" prop="pch">
            <Select v-model="Cxxfform.pch" clearable style="width:260px" @on-change="handleChange">
              <Option v-for="item in pchColumns" :value="item.value" :key="item.value">{{ item.key }}</Option>
            </Select>
          </Form-item>
          <Form-item label="类型" prop="lx">
            <Select v-model="Cxxfform.lx" style="width:260px"  @on-change="handleChange">
              <Option v-for="item in lxColumns" :value="item.value" :key="item.value">{{ item.key }}</Option>
            </Select>
          </Form-item>
          <Form-item label="车辆编号" prop="sfjh">
            <Select v-model="Cxxfform.sfjh"  multiple filterable clearable style="width:260px">
              <Option v-for="item in clbhColumns" :value="item.value" :key="item.value" :label="item.value">
                <span style="float: left">{{ item.text }}</span>
                <span :class="item.status == '在线' ? 'zaixian' : 'lixian'">{{ item.status }}</span>
              </Option>
            </Select>
          </Form-item>
          <Form-item label="程序名称" prop="cxmc">
            <Select v-model="Cxxfform.cxmc" style="width:260px" :transfer="true">
              <Option v-for="item in programColumns" :value="item.value" :key="item.value" :label="item.value">{{ item.text }}</Option>
            </Select>
          </Form-item>
          <Form-item label="升级时间" prop="xfrq">
            <DatePicker :value="Cxxfform.xfrq" type="date" :clearable="false" placeholder="请选择日期" style="width: 200px"></DatePicker>
          </Form-item>
        </Form>
      </div>
      <div slot="footer">
        <Button type="info" style="margin-right: 5px" @click="cancleUpdate('Cxxfform')">取消</Button>
        <Poptip
          confirm
          title="确认下发吗？"
          @on-ok="doUpdate('Cxxfform')">
          <Button type="primary" :loading="Cxxfform.loadingStatus">确定</Button>
        </Poptip>
      </div>
    </Modal>
    <Modal
      v-model="cxscModalFlag"
      title="上传程序"
      class-name="vertical-center-modal"
      :mask-closable="false"
      :closable="false"
      >
      <div style="top:20px;height:250px;overflowY:scroll;">
      <Form  :model="Cxscform" ref="Cxscform" :rules="ruleInlineCxsc" label-position="left" :label-width="100">
        <Form-item label="批次号" prop="pch">
          <Select v-model="Cxscform.pch" style="width:260px">
            <Option v-for="item in pchColumns" :value="item.value" :key="item.value">{{ item.key }}</Option>
          </Select>
        </Form-item>
        <Form-item label="类型" prop="lx">
          <Select v-model="Cxscform.lx" style="width:260px">
            <Option v-for="item in lxColumns" :value="item.value" :key="item.value">{{ item.key }}</Option>
          </Select>
        </Form-item>
        <Form-item label="程序说明" prop="bz">
          <Input v-model="Cxscform.bz"></Input>
        </Form-item>
        <Form-item label="程序" prop="file">
<!--          v-model="Cxscform.file"-->
          <Upload style="width:80%;"
                  :before-upload="handleBeforeUpload">
            <Button icon="md-cloud-upload">点击上传</Button>
            <span v-if="Cxscform.file !== null" style="color:green;">{{ Cxscform.file.name }}</span>
          </Upload>
<!--          <div v-if="Cxscform.file !== null"><Button type="text" @click="upload" :loading="Cxscform.loadingStatus">{{ loadingStatus ? 'Uploading' : 'Click to upload' }}</Button></div>-->
        </Form-item>
      </Form>
      </div>
      <div slot="footer">
        <Button type="info" style="margin-right: 5px" @click="cancleUpload('Cxscform')">取消</Button>
        <Poptip
          confirm
          title="确认上传吗？"
          @on-ok="doUpload('Cxscform')">
          <Button type="primary" :loading="Cxscform.loadingStatus">确定</Button>
        </Poptip>
      </div>
    </Modal>
  </div>
</template>
<script>
import $ from 'jquery'
import _ from 'lodash'
import {
  selectUpdatedProgramIsExistEd,
  getUpdatedProgram,
  getUploadedProgram,
  uploadProgram,
  selectCxmcFromCxglByLxAndPch,
  updateProgram
} from '@/api/program'
import { selectTreeOfSfjhQcbh } from '@/api/vehicle'
import Page from '../../node_modules/iview/src/components/page/page.vue'
export default {
  name: 'programManage_page',
  data () {
    const validateUpload = (rule, value, callback) => {
      console.log(this.Cxscform)
      if (this.Cxscform.file === void 0 || this.Cxscform.file === null) {
        callback(new Error('请上传文件'))
      } else {
        callback()
      }
    }
    const validateUpdatetime = (rule, value, callback) => {
      console.log(this.Cxxfform)
      if (this.Cxxfform.xfrq === void 0 || this.Cxxfform.xfrq === '') {
        callback(new Error('请选择下发日期'))
      } else {
        callback()
      }
    }
    return {
      columnFromCxxf: [
        {
          title: '序号',
          key: 'Id',
          type: 'index',
          fixed: 'left',
          width: 80
        },
        {
          title: '批次号',
          key: 'pch',
          width: 80
        },
        {
          title: '类型',
          key: 'lx',
          width: 80,
          render: (h, params) => {
            return h('span', {}, params.row.lx === '1' ? '正式' : params.row.lx === '2' ? '测试' : '--')
          }
        },
        {
          title: '线路号',
          key: 'xqbh',
          width: 110
        },
        {
          title: '汽车号',
          key: 'sfjh',
          width: 100
        },
        {
          title: '程序名称',
          key: 'cxmc',
          width: 200
        },
        {

          title: '下发人',
          key: 'xfry',
          width: 110
        },
        {
          title: '下发状态',
          key: 'sfxf',
          width: 110,
          render: (h, params) => {
            return h('span', {}, params.row.sfxf === 0 ? '未下发' : params.row.sfxf === 1 ? '已下发' : '--')
          }
        },
        {
          title: '下发日期',
          key: 'xfrq',
          width: 110
        }
      ],
      columnFromCxsc: [
        {
          title: '序号',
          key: 'Id',
          type: 'index',
          fixed: 'left',
          width: 80
        },
        {
          title: '批次号',
          key: 'pch',
          width: 80
        },
        {
          title: '类型',
          key: 'lx',
          width: 80,
          render: (h, params) => {
            return h('span', {}, params.row.lx === '1' ? '正式' : params.row.lx === '2' ? '测试' : '--')
          }
        },
        {
          title: '程序名称',
          key: 'cxmc',
          width: 220
        },
        {
          title: '版本号',
          key: 'bbh',
          width: 80
        },
        {
          title: '程序路径',
          key: 'cxlj',
          width: 300
        },
        {

          title: '备注',
          key: 'bz',
          width: 300
        },
        {
          title: '操作人',
          key: 'czr',
          width: 80
        },
        {
          title: '创建时间',
          key: 'cjsj',
          width: 180
        }
      ],
      pchColumns: [
        { 'key': '2021', 'value': '2021' }
      ],
      lxColumns: [
        { 'key': '测试', 'value': '2' },
        { 'key': '正式', 'value': '1' }
      ],
      programColumns: [],
      clbhColumns: [],
      // 修改操作弹窗显示
      cxxfModalFlag: false,
      cxscModalFlag: false,
      Cxscform: {
        fileList: [],
        loadingStatus: false,
        file: null,
        fileName: '',
        pch: '2021',
        lx: '2',
        bz: ''
      },
      Cxxfform: {
        pch: '',
        // 1正式
        lx: '',
        sfjh: [],
        cxmc: '',
        xfrq: new Date().format('yyyy-MM-dd'),
        xfry: ''
      },
      tableDataCxxf: {
        pch: '',
        lx: '',
        loading: true,
        // 高度
        height: 0,
        // 返回数据
        dataFrom: [],
        // 返回数据数量
        total: 0,
        // 分页和排序参数
        page: 1,
        pageSize: 10,
        sortField: '',
        sortType: ''
      },
      tableDataCxsc: {
        pch: '',
        lx: '',
        loading: true,
        // 高度
        height: 0,
        // 返回数据
        dataFrom: [],
        // 返回数据数量
        total: 0,
        // 分页和排序参数
        page: 1,
        pageSize: 10,
        sortField: '',
        sortType: ''
      },
      ruleInlineCxsc: {
        pch: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        lx: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        bz: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        file: [
          { required: true, validator: validateUpload, trigger: 'change' }
        ]
      },
      ruleInlineCxxf: {
        sfjh: [
          { type: 'array', required: true, message: '不能为空', trigger: 'change' }
        ],
        cxmc: [
          { type: 'string', required: true, message: '不能为空', trigger: 'change' }
        ],
        xfrq: [
          { required: true, validator: validateUpdatetime, message: '不能为空', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    // Page.props.pageSize.default = 10;
    // Page.props.current.default = 1;
    this.selectUpdatedProgram();
    this.selectUploadedProgram();
  },
  mounted () {
    // console.log(this.$refs.pageEntity)
    // this.tableData.height = window.innerHeight - $('.toolPanel').height() - this.$refs.pageEntity.styles.height;
    // this.tableData.height = window.innerHeight - $('.toolPanel').height() - 50;
    // 用以下语句设置高度，此处不同于新区平台项目；window.innerHeight不代表打开的菜单页高度
    this.tableDataCxxf.height = ($('.content-wrapper').height() / 2) - $('.toolPanel').height() - 50
    this.tableDataCxsc.height = ($('.content-wrapper').height() / 2) - $('.toolPanel').height() - 50
    // this.Cxscform.fileList = this.$refs.Cxscform.fileList
  },
  methods: {
    // 同时监听select和input
    handleChange: _.debounce(function () {
      selectCxmcFromCxglByLxAndPch(this.Cxxfform.lx, this.Cxxfform.pch).then(res => {
        if (res.data.result) {
          this.programColumns = res.data.data
        } else {
          this.$Message.error('程序名称数据异常')
        }
      })
    }, 400),
    // 阻止默认上传
    handleBeforeUpload (file) {
      if (!file.name.endsWith('.tar.gz')) {
        this.$Notice.warning({
          title: '文件格式错误',
          desc: file.name + '文件格式不正确,必须为tar.gz'
        })
        return false
      }
      if (file.name.length !== 25) {
        this.$Notice.warning({
          title: '文件名长度错误',
          desc: file.name + '长度必须为25'
        })
        return false
      }
      selectUpdatedProgramIsExistEd(file.name).then(res => {
        if (res.data.code === 0) {
          this.Cxscform.file = file
          this.Cxscform.fileName = file.name
          return false
        } else {
          this.$Notice.warning({
            title: '系统已有该文件',
            desc: file.name + '重复'
          })
          return false
        }
      })
    },
    doUpdate (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let wgbhlist = this.Cxxfform.sfjh.join(',')
          let programName = this.Cxxfform.cxmc
          let updateTime = this.Cxxfform.xfrq
          this.Cxxfform.loadingStatus = true
          updateProgram(wgbhlist,programName,updateTime).then(res => {
            this.$Message.info(res.data.msg)
            this.Cxxfform.loadingStatus = false
            if (res.data.code === 0) {
              this.cxxfModalFlag = false
              this.selectUploadedProgram()
            }
            this.$refs[name].resetFields()
          })
        } else {
          this.$Message.error('请正确填写参数!')
        }
      })
    },
    doUpload: function (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          let formData = new FormData()
          formData.append('cxmc', this.Cxscform.fileName)
          formData.append('bz', this.Cxscform.bz)
          formData.append('lx', this.Cxscform.lx)
          formData.append('pch', this.Cxscform.pch)
          formData.append('file', this.Cxscform.file)
          this.Cxscform.loadingStatus = true
          uploadProgram(formData).then(res => {
            this.$Message.info(res.data.msg)
            this.Cxscform.loadingStatus = false
            if (res.data.code === 0) {
              this.cxscModalFlag = false
              this.selectUploadedProgram()
            }
            this.$refs[name].resetFields()
          })
        } else {
          this.$Message.error('请正确填写参数!')
        }
      })
    },
    openUploadProgramModal () {
      this.cxscModalFlag = true
    },
    openUpdateProgramModal () {
      this.cxxfModalFlag = true
      this.handleChange()
      selectTreeOfSfjhQcbh().then(res => {
        if (res.data.result) {
          let sfjhQcbhIsOnline = res.data.datas
          sfjhQcbhIsOnline = sfjhQcbhIsOnline.filter(item => item.qcbh != null)
          let comparatorFun = (A, B) => {
            if (A.gxsj !== '' && B.gxsj !== '') {
              return A.zjgxsj - B.zjgxsj > 0 ? -1 : 1
            } else if (A.gxsj === '') {
              return 1
            } else if (B.gxsj === '') {
              return -1
            } else {
              return 0
            }
          }
          sfjhQcbhIsOnline = sfjhQcbhIsOnline.sort((A, B) => comparatorFun(A, B));
          sfjhQcbhIsOnline = sfjhQcbhIsOnline.map(function (x) {
            if (x.onLine === 1) {
              return { text: `${x.qcbh}`, value: `${x.qcbh}`, status: '在线' }
            } else {
              return { text: `${x.qcbh}`, value: `${x.qcbh}`, status: '离线' }
            }
          })
          this.clbhColumns = sfjhQcbhIsOnline
        }
      }).catch(err => {
        this.$Message.error(err);
      })
    },
    selectUploadedProgram () {
      this.tableDataCxsc.loading = true
      this.$Loading.start()
      let pch = this.tableDataCxsc.pch
      let lx = this.tableDataCxsc.lx
      // let current = page === undefined || null || '' ? 1 : page
      // Page.props.current.default = current
      let limit = this.tableDataCxsc.pageSize
      let page = this.tableDataCxsc.page
      let sort = this.tableDataCxsc.sortField
      let order = this.tableDataCxsc.sortType
      getUploadedProgram(pch, lx, page, limit, sort, order).then(res => {
        if (res.data.result) {
          this.tableDataCxsc.dataFrom = res.data.data.rows
          this.tableDataCxsc.total = res.data.data.total
          this.$Loading.finish()
          this.tableDataCxsc.loading = false
        } else {
          this.$Message.error(res.data.message)
        }
      })
      error: () => {
        this.$Loading.error()
      }
    },
    selectUpdatedProgram () {
      this.tableDataCxxf.loading = true
      this.$Loading.start()
      let pch = this.tableDataCxxf.pch
      let lx = this.tableDataCxxf.lx
      // let current = page === undefined || null || '' ? 1 : page
      // Page.props.current.default = current
      let limit = this.tableDataCxxf.pageSize
      let page = this.tableDataCxxf.page
      let sort = this.tableDataCxxf.sortField
      let order = this.tableDataCxxf.sortType
      getUpdatedProgram(pch, lx, page, limit, sort, order).then(res => {
        if (res.data.result) {
          this.tableDataCxxf.dataFrom = res.data.data.rows
          this.tableDataCxxf.total = res.data.data.count
          this.$Loading.finish()
          this.tableDataCxxf.loading = false
        } else {
          this.$Message.error(res.data.message)
        }
      })
      error: () => {
        this.$Loading.error()
      }
    },

    changeCxxfPage (page) {
      this.tableDataCxxf.page = page
      this.selectUpdatedProgram()
    },

    changeCxxfPageSize (page) {
      // Page.props.pageSize.default = page
      this.tableDataCxxf.page = 1
      this.tableDataCxxf.pageSize = page
      this.selectUpdatedProgram()
    },
    changeCxscPage (page) {
      this.tableDataCxsc.page = page
      this.selectUploadedProgram()
    },

    changeCxscPageSize (page) {
      // Page.props.pageSize.default = page
      this.tableDataCxsc.page = 1
      this.tableDataCxsc.pageSize = page
      this.selectUploadedProgram()
    },
    deleteCllx (clbh) {
      this.$Loading.start()
      updateSbcs(clbh).then(res => {
        if (res.data.result) {
          this.$Message.info('修改成功')
        } else {
          this.$Message.info('修改失败')
        }
        this.loading = false
        this.editFrom = false
        this.$Loading.finish()
        this.selectCllx()
      })
    },
    cancleUpload: function (name) {
      this.cxscModalFlag = false
      this.$refs[name].resetFields()
    },
    cancleUpdate: function (name) {
      this.cxxfModalFlag = false
      this.$refs[name].resetFields()
    },
    /*
      * 排序变更
         */
    sortChange ({ key, order }) {
      if (order === 'descending') {
        this.tableData.sortType = 'desc'
      } else {
        this.tableData.sortType = 'asc'
      }
      this.tableData.sortField = key
      this.selectCllx()
    }
  }
}
</script>
<style lang="less" scoped>
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

  .ivu-modal{
    top: 0;
  }
  }
  .search-con .search-col{
    display: inline-block;
    width: 120px;
  }
  .search-con .search-input{
    display: inline-block;
    width: 200px;
  }
  .lixian{
    float: right; color: #8492a6; font-size: 13px
  }
  .zaixian{
    float: right; color: green; font-size: 13px
  }
</style>
