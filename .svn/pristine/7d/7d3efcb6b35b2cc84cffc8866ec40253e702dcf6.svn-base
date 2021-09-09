<template>
  <div>
    <div class="toolPanel">
      <div  class="search-con search-con-top">
        <Select v-model="searchKey" class="search-col" @on-change="handleChange">
          <Option v-for="item in columns" :key="`search-col-${item.key}`" :value="item.value">{{ item.key }}</Option>
        </Select>
        <Select v-model="searchValue" class="search-input" filterable allow-create clearable   @on-create="handleCreate">
          <Option v-for="item in inputarr" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Button type="primary" @click="selectCllx" style="margin-left: 15px">搜索</Button>
      </div>
    </div>
    <Table :loading="tableData.loading" border :columns="columnFrom" :height="tableData.height" @on-sort-change="sortChange" :data="tableData.dataFrom" show-sizer></Table>
    <Page ref='pageEntity' :total=tableData.total :current="tableData.page" :page-size="tableData.pageSize" show-elevator show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
    <Modal
      v-model="editFrom"
      title="修改设备参数"
      class-name="vertical-center-modal"
      :mask-closable="false"
      >
      <div style="top:20px;height:500px;overflowY:scroll;">
      <Form  :model="form" ref="form" :rules="ruleInline" label-position="left" :label-width="100">
        <Form-item label="车辆编号" prop="clbh">
          <Input v-model="form.clbh" disabled></Input>
        </Form-item>
<!--        <Form-item label="车辆终端本地存贮时间周期" prop="_0x01">-->
<!--          <Input v-model="form._0x01"></Input>-->
<!--        </Form-item>-->
<!--        <Form-item label="正常上报时间周期" prop="_0x02">-->
<!--          <Input v-model="form._0x02"></Input>-->
<!--        </Form-item>-->
<!--        <Form-item label="出现报警上报时间周期" prop="_0x03">-->
<!--          <Input v-model="form._0x03"></Input>-->
<!--        </Form-item>-->
<!--        <Form-item label="远程服务管理平台域名长度" prop="_0x04">-->
<!--          <Input v-model="form._0x04"></Input>-->
<!--        </Form-item>-->
<!--        <Form-item label="远程服务管理平台域名" prop="_0x05">-->
<!--          <Input v-model="form._0x05"></Input>-->
<!--        </Form-item>-->
<!--        <Form-item label="远程服务管理平台端口" prop="_0x06">-->
<!--          <Input v-model="form._0x06"></Input>-->
<!--        </Form-item>-->
<!--        <Form-item label="硬件版本" prop="_0x07">-->
<!--          <Input v-model="form._0x07"></Input>-->
<!--        </Form-item>-->
<!--        <Form-item label="固件版本" prop="_0x08">-->
<!--          <Input v-model="form._0x08"></Input>-->
<!--        </Form-item>-->
<!--        <Form-item label="终端心跳发送周期(S)" prop="_0x09">-->
<!--          <Input v-model="form._0x09"></Input>-->
<!--        </Form-item>-->
<!--        <Form-item label="终端应答超时时间(S)" prop="_0x0A">-->
<!--          <Input v-model="form._0x0A"></Input>-->
<!--        </Form-item>-->
<!--        <Form-item label="平台应答超时时间(S)" prop="_0x0B">-->
<!--          <Input v-model="form._0x0B"></Input>-->
<!--        </Form-item>-->
<!--        <Form-item label="三次登入失败到下次登入时间" prop="_0x0C">-->
<!--          <Input v-model="form._0x0C"></Input>-->
<!--        </Form-item>-->
<!--        <Form-item label="公共平台域名长度" prop="_0x0D">-->
<!--          <Input v-model="form._0x0D"></Input>-->
<!--        </Form-item>-->
<!--        <Form-item label="公共平台域名" prop="_0x0E">-->
<!--          <Input v-model="form._0x0E"></Input>-->
<!--        </Form-item>-->
<!--        <Form-item label="公共平台端口" prop="_0x0F">-->
<!--          <Input v-model="form._0x0F"></Input>-->
<!--        </Form-item>-->
<!--        <Form-item label="抽样检测" prop="_0x10">-->
<!--          <Input v-model="form._0x10"></Input>-->
<!--        </Form-item>-->
        <Form-item label="下发参数" prop="csnr">
          <Select v-model="form.csnr" multiple filterable clearable style="width:260px">
            <Option v-for="item in csnrColumns" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </Form-item>
        <Form-item
          v-for="(item) in form.csnr"
          :key="item"
          :label="returnProByValue(item)"
          :prop="item"
          :rules="{required: true, message: '不能为空', trigger: 'blur'}">
          <row v-if="item !=='_0x10'">
            <Input type="text" v-model="form[item]" placeholder="Enter something..."></Input>
          </row>
          <row v-if="item ==='_0x10'">
            <Select v-model="form[item]" style="width:260px">
              <Option v-for="item in cyjc_Columns" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </row>
        </Form-item>
      </Form>
      </div>
      <div slot="footer">
        <Button type="info" style="margin-right: 5px" @click="cancleEdit">取消</Button>
        <Poptip
          confirm
          title="确认下发吗？"
          @on-ok="confirmEdit('form')">
          <Button type="primary">确定</Button>
        </Poptip>
      </div>
    </Modal>
  </div>
</template>
<script>
import $ from 'jquery'
import _ from 'lodash'
import { selectAllSfjhQcbh } from '@/api/sfjhqcbh'
import { selectFromSbcs, updateSbcsByEntity, updateSbcs } from '@/api/sbcs'
import Page from '../../node_modules/iview/src/components/page/page.vue'
export default {
  name: 'paramManage_page',
  data () {
    return {
      columnFrom: [
        {
          title: '序号',
          key: 'Id',
          type: 'index',
          fixed: 'left',
          width: 80
        },
        {
          title: '车辆编号',
          key: 'clbh',
          // sortable: true,
          width: 100
        },
        {
          title: '车辆终端本地存贮时间周期(毫秒)',
          key: '_0x01',
          width: 100
        },
        {
          title: '正常上报时间周期(秒)',
          key: '_0x02',
          width: 100
        },
        {
          title: '出现报警上报时间周期(秒)',
          key: '_0x03',
          width: 100
        },
        {
          title: '远程服务管理平台域名长度',
          key: '_0x04',
          width: 100
        },
        {

          title: '远程服务管理平台域名',
          key: '_0x05',
          width: 160
        },
        {
          title: '远程服务管理平台端口',
          key: '_0x06',
          width: 100
        },
        {
          title: '硬件版本',
          key: '_0x07',
          width: 110
        },
        {
          title: '固件版本',
          key: '_0x08',
          width: 110
        },
        {
          title: '终端心跳发送周期(秒)',
          key: '_0x09',
          width: 100
        },
        {
          title: '终端应答超时时间(秒)',
          key: '_0x0A',
          width: 100
        },
        {
          title: '平台应答超时时间(秒)',
          key: '_0x0B',
          width: 100
        },
        {
          title: '三次登入失败到下次登入时间(分)',
          key: '_0x0C',
          width: 110
        },
        {
          title: '公共平台域名长度',
          key: '_0x0D',
          width: 100
        },
        {
          title: '公共平台域名',
          key: '_0x0E',
          width: 160
        },
        {
          title: '公共平台端口',
          key: '_0x0F',
          width: 120
        },
        {
          title: '抽样检测',
          key: '_0x10',
          width: 100,
          render: (h, params) => {
            return h('span', {}, params.row._0x10 === '01' ? '是' : params.row._0x10 === '02' ? '否' : '--')
          }
        },
        {
          title: '下发状态',
          key: 'xfzt',
          width: 100,
          render: (h, params) => {
            return h('span', {}, params.row.xfzt === '0' ? '下发完成' : params.row.xfzt === '1' ? '查询中' : params.row.xfzt === '2' ? '下发中' : '--')
          }
        },
        // {
        //   title: '参数内容',
        //   key: 'csnr',
        //   width: 180
        // },
        {
          title: '下发时间',
          key: 'xfsj',
          width: 160
          // render: (h, params) => {
          //   let gx = params.row.gxsj;
          //   let gxm = gx.substring(0, 4) + '-' + gx.substring(4, 6) + '-' + gx.substring(6, 8) + ' ' + gx.substring(8, 10) + ':' + gx.substring(10, 12) + ':' + gx.substring(12, 14)
          //   return h('span', {
          //   }, gxm)
          // }
        },
        {
          title: '操作',
          fixed: 'right',
          width: 190,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'warning',
                  size: 'small'
                },
                style: {
                  marginRight: '8px'
                },
                on: {
                  click: () => {
                    this.updateParam(params)
                  }
                }
              }, '参数下发'),
              // h('Button', {//不加气泡之前的代码
              //   props: {
              //     size: 'small'
              //   },
              //   style: {
              //     marginRight: '5px',
              //     display: (this.isEdit === true? 'inline-block':'None')
              //   },
              //   on: {
              //     click: () => {
              //        this.review_id = params.row.id;//保存当前数据的id
              //        this.deletedMind();
              //     }
              //   }
              // }, '删除'),
              // 加上气泡
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '确定查询吗？',
                  transfer: true
                },
                on: {
                  'on-ok': () => {
                    this.queryParam(params.row.clbh)// 调用删除方法
                  },
                  'on-cancel': () => {
                  }
                }
              }, [
                h('Button', {
                  props: {
                    size: 'small',
                    type: 'error'
                  }
                }, '参数查询')
              ])
            ])
          }
        }
      ],
      inputarr: [],
      columns: [
        { 'key': 'VIN', 'value': 'qcsbh' },
        { 'key': '车牌号', 'value': 'cphm' },
        { 'key': '自编号', 'value': 'qcbh' },
        { 'key': '设备号', 'value': 'tboxbh' }],
      cyjc_Columns: [
        {
          value: '01',
          label: '是'
        }, {
          value: '02',
          label: '否'
        }],
      csnrColumns: [
        {
          value: '_0x01',
          label: '车辆终端本地存贮时间周期'
        },
        {
          value: '_0x02',
          label: '正常上报时间周期'
        },
        {
          value: '_0x03',
          label: '出现报警上报时间周期'
        },
        {
          value: '_0x04',
          label: '远程服务管理平台域名长度'
        },
        {
          value: '_0x05',
          label: '远程服务管理平台域名'
        },
        {
          value: '_0x06',
          label: '远程服务管理平台端口'
        },
        {
          value: '_0x07',
          label: '硬件版本'
        },
        {
          value: '_0x08',
          label: '固件版本'
        },
        {
          value: '_0x09',
          label: '终端心跳发送周期'
        },
        {
          value: '_0x0A',
          label: '终端应答超时时间'
        },
        {
          value: '_0x0B',
          label: '平台应答超时时间'
        },
        {
          value: '_0x0C',
          label: '三次登入失败到下次登入时间'
        },
        {
          value: '_0x0D',
          label: '公共平台域名长度'
        },
        {
          value: '_0x0E',
          label: '公共平台域名'
        },
        {
          value: '_0x0F',
          label: '公共平台端口'
        },
        {
          value: '_0x10',
          label: '抽样检测'
        }
      ],
      searchKey: 'qcbh',
      searchValue: '',
      // 修改操作弹窗显示
      editFrom: false,
      cllxarr: [],
      updatedata: {},
      form: {
        clbh: '',
        _0x01: '',
        _0x02: '',
        _0x03: '',
        _0x04: '',
        _0x05: '',
        _0x06: '',
        _0x07: '',
        _0x08: '',
        _0x09: '',
        _0x0A: '',
        _0x0B: '',
        _0x0C: '',
        _0x0D: '',
        _0x0E: '',
        _0x0F: '',
        _0x10: '',
        xfzt: '',
        csnr: []
      },
      tableData: {
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
      ruleInline: {
        clbh: [
          { type: 'string', required: true, message: '车辆编号不能为空', trigger: 'change' }
        ],
        _0x01: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        _0x02: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        _0x03: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        _0x04: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        _0x05: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        _0x06: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        _0x07: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        _0x08: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        _0x09: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        _0x0A: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        _0x0B: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        _0x0C: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        _0x0D: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        _0x0E: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        _0x0F: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ],
        _0x10: [
          { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        ]
        // csnr: [
        //   { type: 'string', required: true, message: '不能为空', trigger: 'blur' }
        // ]
      }
    }
  },
  created () {
    // Page.props.pageSize.default = 10;
    // Page.props.current.default = 1;
    this.selectCllx();
  },
  mounted () {
    // console.log(this.$refs.pageEntity)
    // this.tableData.height = window.innerHeight - $('.toolPanel').height() - this.$refs.pageEntity.styles.height;
    // this.tableData.height = window.innerHeight - $('.toolPanel').height() - 50;
    // 用以下语句设置高度，此处不同于新区平台项目；window.innerHeight不代表打开的菜单页高度
    this.tableData.height = $('.content-wrapper').height() - $('.toolPanel').height() - 50;
    this.selectAllSfjhQcbh()
  },
  methods: {
    returnProByValue (val) {
      for (let i = 0; i < this.csnrColumns.length; i++) {
        if (this.csnrColumns[i].value === val) {
          return this.csnrColumns[i].label
        }
      }
      return ''
    },
    handleCreate (value) {
      this.params.searchValue = value
    },
    handleChange () {
      if (this.searchKey) {
        let inputarr = this.allSfjhQcbh.map(x => x[this.searchKey]).filter(x => x !== void 0)
        inputarr = [...new Set(inputarr)].sort((a, b) => a && b ? a.localeCompare(b) : 0)
        let inputArr = inputarr.map(x => ({
          label: x,
          value: x
        }))
        this.inputarr = inputArr
      }
    },
    selectAllSfjhQcbh () {
      selectAllSfjhQcbh().then(res => {
        if (res.data.result) {
          this.allSfjhQcbh = res.data.datas
          this.handleChange()
        }
      })
    },
    selectCllx () {
      this.tableData.loading = true
      this.$Loading.start()
      let searchKey = this.searchKey
      let searchVal = this.searchValue
      // let current = page === undefined || null || '' ? 1 : page
      // Page.props.current.default = current
      let pagesized = this.tableData.pageSize
      let sqlStartIndex = (this.tableData.page - 1) * pagesized
      let sqlNumber = pagesized
      let sortField = this.tableData.sortField
      let sortType = this.tableData.sortType
      selectFromSbcs(searchKey, searchVal, sqlStartIndex, sqlNumber, sortField, sortType).then(res => {
        this.tableData.dataFrom = res.data.datas.rows
        this.tableData.total = res.data.datas.total
        this.$Loading.finish()
        this.tableData.loading = false
      })
      error: () => {
        this.$Loading.error()
      }
    },
    changePage (page) {
      this.tableData.page = page
      this.selectCllx()
    },

    changePageSize (page) {
      // Page.props.pageSize.default = page
      this.tableData.page = 1
      this.tableData.pageSize = page
      this.selectCllx()
    },
    queryParam (clbh) {
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
    confirmEdit (name) {
      this.$refs[name].validate((valid) => {
        if (valid) {
          this.$Loading.start()
          let sbcs = this.copyForm()
          sbcs.xfzt = '2';
          updateSbcsByEntity(sbcs).then(res => {
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
        } else {
          this.$Message.error('请正确填写参数!')
        }
      })
    },
    copyForm () {
      let sbcs = {}
      sbcs.clbh = this.form.clbh
      sbcs._0x01 = this.form._0x01
      sbcs._0x02 = this.form._0x02
      sbcs._0x03 = this.form._0x03
      sbcs._0x04 = this.form._0x04
      sbcs._0x05 = this.form._0x05
      sbcs._0x06 = this.form._0x06
      sbcs._0x07 = this.form._0x07
      sbcs._0x08 = this.form._0x08
      sbcs._0x09 = this.form._0x09
      sbcs._0x0A = this.form._0x0A
      sbcs._0x0B = this.form._0x0B
      sbcs._0x0C = this.form._0x0C
      sbcs._0x0D = this.form._0x0D
      sbcs._0x0E = this.form._0x0E
      sbcs._0x0F = this.form._0x0F
      sbcs._0x10 = this.form._0x10
      sbcs.xfzt = this.form.xfzt
      sbcs.csnr = this.form.csnr.join('')
      return sbcs
    },
    cancleEdit () {
      this.form = this.updatedata
      this.editFrom = false
    },
    updateParam (data) {
      this.editFrom = true
      this.form = Object.assign({}, data.row)
      this.form.csnr = []
      // this.updatedata =  data.row;
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
</style>
