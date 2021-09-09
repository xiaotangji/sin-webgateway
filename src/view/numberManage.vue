<template>
  <div>
    <div class="toolPanel">
      <Select v-model="form.cphm" clearable style="width:200px"  placeholder="请选择车牌号">
        <Option v-for="item in this.form.cphmarr" :value="item" :key="item">{{ item }}</Option>
      </Select>
      <Button type="primary" @click="serchCphm" style="margin-left: 15px">搜索</Button>
      <Button type="info" @click="addSfjh" style="margin-left: 15px">添加</Button>
    </div>
    <Table border :columns="columnFrom"  @sort-change="sortChange" :data="form.dataFrom" show-sizer></Table>
    <Page  ref='pageEntity' :total=this.form.total show-elevator show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
    <Modal
      v-model="addFrom"
      title="添加车辆"
      class-name="vertical-center-modal"
      :mask-closable="false"
      :closable="false"
      >
      <Form :model="formLeft" ref="formLeft" :rules="ruleInline" label-position="left" :label-width="100">
        <Form-item label="tbox编号" prop="wgbh">
          <Input v-model="formLeft.wgbh"></Input>
        </Form-item>
        <Form-item label="汽车编号" prop="qcbh">
          <Input v-model="formLeft.qcbh"></Input>
        </Form-item>
        <Form-item label="车牌号" prop="cph">
          <Input v-model="formLeft.cph"></Input>
        </Form-item>
        <Form-item label="车辆类型" prop="cllx">
          <Select v-model="formLeft.cllx"  filterable allow-create clearable @on-create="handleCar" placeholder="请选择车辆类型">
            <Option v-for="item in this.cllxarr" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </Form-item>
        <Form-item label="汽车识别号" prop="qcsbhm">
          <Input v-model="formLeft.qcsbhm"></Input>
        </Form-item>
        <Form-item label="sim卡ICCID" prop="simiccid">
          <Input v-model="formLeft.simiccid"></Input>
        </Form-item>
        <Form-item label="发动机编号" prop="fdjbh">
          <Input v-model="formLeft.fdjbh"></Input>
        </Form-item>
        <Form-item label="驱动电机序号" prop="qddjxh">
          <Input v-model="formLeft.qddjxh"></Input>
        </Form-item>
        <Form-item label="可充电储能系统编码" prop="kcdcnxtbm">
          <Input v-model="formLeft.kcdcnxtbm"></Input>
        </Form-item>
        <Form-item label="公司名称" prop="gsmc">
          <Select v-model="formLeft.gsmc" placeholder="请选择公司名称">
            <Option v-for="item in this.gsmcarr" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="info"  style="margin-right: 5px" @click="cancleAdd('formLeft')">取消</Button>
        <Poptip
          confirm
          title="确认添加吗？"
          @on-ok="confirmAdd('formLeft')">
          <Button type="primary">确定</Button>
        </Poptip>
      </div>
    </Modal>
    <Modal
      v-model="editFrom"
      title="修改车辆"
      class-name="vertical-center-modal"
      style="width:300px"
      :mask-closable="false"
      :closable="false"
      >
      <Form :model="formRight" ref="formRight" :rules="ruleInliner" label-position="left" :label-width="100">
        <Form-item label="车牌号" prop="cph">
          <Input v-model="formRight.cph" disabled></Input>
        </Form-item>
        <Form-item label="tbox编号" prop="wgbh">
          <Input v-model="formRight.wgbh"></Input>
        </Form-item>
        <Form-item label="汽车编号" prop="qcbh">
          <Input v-model="formRight.qcbh"></Input>
        </Form-item>
        <Form-item label="车辆类型" prop="cllx">
          <Select v-model="formRight.cllx" placeholder="请选择车辆类型">
            <Option v-for="item in this.cllxarr" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </Form-item>
        <Form-item label="汽车识别号" prop="qcsbhm">
          <Input v-model="formRight.qcsbhm"></Input>
        </Form-item>
        <Form-item label="sim卡ICCID" prop="simiccid">
          <Input v-model="formRight.simiccid"></Input>
        </Form-item>
        <Form-item label="发动机编号" prop="fdjbh">
          <Input v-model="formRight.fdjbh"></Input>
        </Form-item>
        <Form-item label="驱动电机序号" prop="qddjxh">
          <Input v-model="formRight.qddjxh"></Input>
        </Form-item>
        <Form-item label="可充电储能系统编码" prop="kcdcnxtbm">
          <Input v-model="formRight.kcdcnxtbm"></Input>
        </Form-item>
        <Form-item label="公司名称" prop="gsmc">
          <Select v-model="formRight.gsmc" placeholder="请选择公司名称">
            <Option v-for="item in this.gsmcarr" :value="item" :key="item">{{ item }}</Option>
          </Select>
        </Form-item>
      </Form>
      <div slot="footer">
        <Button type="info" style="margin-right: 5px" @click="cancleEdit">取消</Button>
        <Poptip
          confirm
          title="确认修改吗？"
          @on-ok="confirmEdit('formRight')">
          <Button type="primary">确定</Button>
        </Poptip>
      </div>
    </Modal>
  </div>
</template>
<script>
import { selectFromSfjhQcbhByCphm, addSfjhQcbh, deleteSfjhQcbhByCphm, updateSfjhQcbhByCphm } from '@/api/sfjhqcbh'
import Page from '../../node_modules/iview/src/components/page/page.vue'
export default {
  name: 'numberManage_page',
  data () {
    return {
      columnFrom: [
        {
          title: '序号',
          key: 'cphm',
          type: 'index',
          width: 60
        },
        {
          title: '车牌号',
          key: 'cphm'
          // sortable: true
        },
        {
          title: '汽车编号',
          key: 'qcbh'
          // sortable: true
        },
        {
          title: 'tbox编号',
          key: 'tboxbh'
          // sortable: true
        },
        {
          title: '车辆类型',
          key: 'cllx'
        },
        {
          title: '识别号',
          key: 'qcsbh'
        },
        {
          title: 'sim卡ICCID',
          key: 'simiccid'
        },
        {
          title: '发动机编号',
          key: 'fdjbh'
        },
        {
          title: '驱动电机序号',
          key: 'qddjxh'
        },
        {
          title: '公司名称',
          key: 'gsbh',
          width: 160,
          render: (h, params) => {
            let gsm = params.row.gsbh === 0 ? '成都市郫都区巴士公交有限公司' : '其他'
            return h('span', {
            }, gsm)
          }
        },
        {
          title: '操作人',
          key: 'czr',
          width: 100
        },
        {
          title: '更新时间',
          key: 'gxsj',
          width: 160,
          render: (h, params) => {
            let gx = params.row.gxsj;
            let gxm = gx.substring(0, 4) + '-' + gx.substring(4, 6) + '-' + gx.substring(6, 8) + ' ' + gx.substring(8, 10) + ':' + gx.substring(10, 12) + ':' + gx.substring(12, 14)
            return h('span', {
            }, gxm)
          }
        },
        {
          title: '操作',
          width: 140,
          fixed: 'right',
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
                    this.updateSfjhQcbh(params)
                  }
                }
              }, '编辑'),
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
                  title: '确定删除吗？'
                },
                on: {
                  'on-ok': () => {
                    this.deleteSfjh(params);// 调用删除方法
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
                }, '删除')
              ])
            ]);
          }
        }
      ],
      sortField: '',
      sortType: '',
      addFrom: false,
      editFrom: false,
      gsmcarr: [],
      cllxarr: [],
      mapwgbh: {},
      mapqcbh: {},
      mapqcsbh: {},
      mapcphm: {},
      updatedata: {},
      formLeft: {
        wgbh: '',
        qcbh: '',
        cph: '',
        gsmc: '',
        cllx: '',
        qcsbhm: '',
        simiccid: '',
        fdjbh: '',
        qddjxh: '',
        kcdcnxtbm: ''
      },
      formRight: {
        wgbh: '',
        qcbh: '',
        cph: '',
        gsmc: '',
        cllx: '',
        qcsbhm: '',
        simiccid: '',
        fdjbh: '',
        qddjxh: '',
        kcdcnxtbm: ''
      },
      form: {
        height: 0,
        dataFrom: [],
        total: 0,
        cphm: '',
        cphmarr: [],
        page: 1,
        pageSize: '',
        order: '',
        sort: ''
      },
      ruleInline: {
        wgbh: [
          { required: true, message: '请填写tbox编号', trigger: 'blur' },
          { type: 'string', max: 8, message: 'tbox编号长度不能超过8位', trigger: 'blur' }
        ],
        qcbh: [
          { required: true, message: '请填写汽车编号', trigger: 'blur' },
          { type: 'string', max: 8, message: '汽车编号长度不能超过8位', trigger: 'blur' }
        ],
        cph: [
          { required: true, message: '请填写车牌号', trigger: 'blur' },
          { type: 'string', max: 8, message: '车牌号长度不能超过20位', trigger: 'blur' }
        ],
        cllx: [
          { required: true, message: '请选择车辆类型', trigger: 'change' }
        ],
        qcsbhm: [
          { required: true, message: '请填写汽车识别号', trigger: 'blur' },
          { type: 'string', max: 30, message: '汽车识别号长度不能超过30位', trigger: 'blur' }
        ],
        simiccid: [
          { required: true, message: '请填写SIM卡ID', trigger: 'blur' },
          { type: 'string', max: 30, message: 'SIM卡ID长度不能超过30位', trigger: 'blur' }
        ],
        fdjbh: [
          { required: true, message: '请填写发动机编号', trigger: 'blur' },
          { type: 'string', max: 30, message: '发动机编号长度不能超过20位', trigger: 'blur' }
        ],
        qddjxh: [
          { required: true, message: '请填写驱动电机序号', trigger: 'blur' },
          { type: 'string', max: 30, message: '驱动电机序号长度不能超过20位', trigger: 'blur' }
        ],
        kcdcnxtbm: [
          { required: true, message: '请填写可充电储能系统编码', trigger: 'blur' },
          { type: 'string', max: 30, message: '可充电储能系统编码长度不能超过20位', trigger: 'blur' }
        ],
        gsmc: [
          { required: true, message: '请选择公司名称', trigger: 'change' }
        ]
      },
      ruleInliner: {
        wgbh: [
          { required: true, message: '请填写tbox编号', trigger: 'blur' },
          { type: 'string', max: 8, message: 'tbox编号长度不能超过8位', trigger: 'blur' }
        ],
        qcbh: [
          { required: true, message: '请填写汽车编号', trigger: 'blur' },
          { type: 'string', max: 8, message: '汽车编号长度不能超过8位', trigger: 'blur' }
        ],
        cph: [
          { required: true, message: '请填写车牌号', trigger: 'blur' },
          { type: 'string', max: 8, message: '车牌号长度不能超过20位', trigger: 'blur' }
        ],
        cllx: [
          { required: true, message: '请选择车辆类型', trigger: 'blur' }
        ],
        qcsbhm: [
          { required: true, message: '请填写汽车识别号', trigger: 'blur' },
          { type: 'string', max: 30, message: '汽车识别号长度不能超过30位', trigger: 'blur' }
        ],
        simiccid: [
          { required: true, message: '请填写SIM卡ID', trigger: 'blur' },
          { type: 'string', max: 30, message: 'SIM卡ID长度不能超过30位', trigger: 'blur' }
        ],
        fdjbh: [
          { required: true, message: '请填写发动机编号', trigger: 'blur' },
          { type: 'string', max: 30, message: '发动机编号长度不能超过20位', trigger: 'blur' }
        ],
        qddjxh: [
          { required: true, message: '请填写驱动电机序号', trigger: 'blur' },
          { type: 'string', max: 30, message: '驱动电机序号长度不能超过20位', trigger: 'blur' }
        ],
        kcdcnxtbm: [
          { required: true, message: '请填写可充电储能系统编码', trigger: 'blur' },
          { type: 'string', max: 30, message: '可充电储能系统编码长度不能超过20位', trigger: 'blur' }
        ],
        gsmc: [
          { required: true, message: '请选择公司名称', trigger: 'change' }
        ]
      }
    }
  },
  created () {
    Page.props.pageSize.default = 10;
    Page.props.current.default = 1;
    this.selectSfjhQcbh();
  },
  methods: {
    selectSfjhQcbh (page) {
      this.$Loading.start();
      let cphm = this.form.cphm == undefined || null ? '' : this.form.cphm
      let current = page == undefined || null || '' ? 1 : page
      Page.props.current.default = current
      let pagesized = Page.props.pageSize.default == undefined ? 1 : Page.props.pageSize.default
      let sqlStartIndex = (current - 1) * pagesized
      let sqlNumber = pagesized
      let sortField = this.sortField
      let sortType = this.sortType
      selectFromSfjhQcbhByCphm(cphm, sqlStartIndex, sqlNumber, sortField, sortType).then(res => {
        this.form.dataFrom = res.data.datas.rows;
        this.form.total = res.data.datas.count;
        this.form.cphmarr = res.data.datas.cphmlist;
        this.cllxarr = res.data.datas.cllx;
        this.gsmcarr = res.data.datas.gsmc;
        this.mapwgbh = res.data.datas.mapwgbh;
        this.mapqcbh = res.data.datas.mapqcbh;
        this.mapcphm = res.data.datas.mapcphm;
        this.mapqcsbh = res.data.datas.mapqcsbh;
        this.$Loading.finish();
      })
      error: () => {
        this.$Loading.error();
      }
    },
    serchCphm () {
      this.$Loading.start();
      let pag = this.form.page;
      let cphm = this.form.cphm === undefined || null ? '' : this.form.cphm;
      let current = pag === undefined || null ? 1 : pag;
      let pagesized = Page.data().currentPageSize === undefined ? Page.props.pageSize.default : Page.data().currentPageSize;
      let sqlStartIndex = (current - 1) * pagesized;
      let sqlNumber = pagesized;
      let sortField = this.sortField;
      let sortType = this.sortType;
      selectFromSfjhQcbhByCphm(cphm, sqlStartIndex, sqlNumber, sortField, sortType).then(res => {
        this.form.dataFrom = res.data.datas.rows;
        this.form.total = res.data.datas.count;
        this.form.cphmarr = res.data.datas.cphmlist;
        this.cllxarr = res.data.datas.cllx;
        this.gsmcarr = res.data.datas.gsmc;
        this.mapwgbh = res.data.datas.mapwgbh;
        this.mapqcbh = res.data.datas.mapqcbh;
        this.mapcphm = res.data.datas.mapcphm;
        this.mapqcsbh = res.data.datas.mapqcsbh;
        this.$Loading.finish();
      })
      error: () => {
        this.$Loading.error();
      }
    },
    changePage (page) {
      this.selectSfjhQcbh(page)
    },

    changePageSize (page) {
      Page.props.pageSize.default = page;
      this.selectSfjhQcbh()
    },
    confirmAdd (name) {
      if (this.mapwgbh[this.formLeft.wgbh] !== null) {
        this.$Message.info('该网关号已存在');
      } else if (this.mapqcbh[this.formLeft.qcbh] !== null) {
        this.$Message.info('该汽车号已存在');
      } else if (this.mapcphm[this.formLeft.cph] !== null) {
        this.$Message.info('该车牌号号已存在');
      } else if (this.mapqcsbh[this.formLeft.qcsbhm] !== null) {
        this.$Message.info('该汽车识别号已存在');
      } else {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Loading.start();
            let sfjhqcbh = {};
            sfjhqcbh.tboxbh = this.formLeft.wgbh;
            sfjhqcbh.qcbh = this.formLeft.qcbh;
            sfjhqcbh.cphm = this.formLeft.cph;
            sfjhqcbh.cllx = this.formLeft.cllx;
            sfjhqcbh.qcsbh = this.formLeft.qcsbhm;
            sfjhqcbh.simiccid = this.formLeft.simiccid;
            sfjhqcbh.fdjbh = this.formLeft.fdjbh;
            sfjhqcbh.qddjxh = this.formLeft.qddjxh;
            sfjhqcbh.kcdcnxtbm = this.formLeft.kcdcnxtbm;
            sfjhqcbh.gsbh = this.formLeft.gsmc === '蜀都' ? 0 : 1;
            addSfjhQcbh(sfjhqcbh).then(res => {
              if (res.data.result) {
                this.$Message.info('添加成功');
              } else {
                this.$Message.info('添加失败');
              }
              this.addFrom = false;
              this.$refs[name].resetFields()
              this.$Loading.finish();
              this.selectSfjhQcbh(this.$refs.pageEntity.currentPage);
            })
          } else {

          }
        })
      }
    },
    confirmEdit (name) {
      let dadas = this.updatedata;
      if (dadas.row.tboxbh !== this.formRight.wgbh && this.mapwgbh[this.formRight.wgbh] !== null) {
        this.$Message.info('该网关号已存在');
      } else if (dadas.row.qcbh !== this.formRight.qcbh && this.mapqcbh[this.formRight.qcbh] !== null) {
        this.$Message.info('该汽车号已存在');
      } else if (dadas.row.qcsbh !== this.formRight.qcsbhm && this.mapqcsbh[this.formRight.qcsbhm] !== null) {
        this.$Message.info('该汽车识别号已存在');
      } else {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Loading.start();
            let sfjhqcbh = {};
            sfjhqcbh.tboxbh = this.formRight.wgbh;
            sfjhqcbh.qcbh = this.formRight.qcbh;
            sfjhqcbh.cphm = this.formRight.cph;
            sfjhqcbh.cllx = this.formRight.cllx;
            sfjhqcbh.qcsbh = this.formRight.qcsbhm;
            sfjhqcbh.simiccid = this.formRight.simiccid;
            sfjhqcbh.fdjbh = this.formRight.fdjbh;
            sfjhqcbh.qddjxh = this.formRight.qddjxh;
            sfjhqcbh.kcdcnxtbm = this.formRight.kcdcnxtbm;
            sfjhqcbh.gsbh = this.formRight.gsmc === '蜀都' ? 0 : 1;
            updateSfjhQcbhByCphm(sfjhqcbh).then(res => {
              if (res.data.result) {
                this.$Message.info('修改成功');
              } else {
                this.$Message.info('修改失败');
              }
              this.loading = false;
              this.editFrom = false;
              this.$refs[name].resetFields()
              this.$Loading.finish();
              this.selectSfjhQcbh(this.$refs.pageEntity.currentPage);
            })
          }
        })
      }
    },
    cancleAdd (formName) {
      this.$refs[formName].resetFields();
      this.formLeft.wgbh = '';
      this.formLeft.qcbh = '';
      this.formLeft.cph = '';
      this.formLeft.cllx = '';
      this.formLeft.qcsbhm = '';
      this.formLeft.simiccid = '';
      this.formLeft.fdjbh = '';
      this.formLeft.qddjxh = '';
      this.formLeft.kcdcnxtbm = '';
      this.formLeft.gsmc = '';
      this.addFrom = false;
    },
    cancleEdit () {
      this.formRight.wgbh = '';
      this.formRight.qcbh = '';
      this.formRight.cph = '';
      this.formRight.cllx = '';
      this.formRight.qcsbhm = '';
      this.formRight.simiccid = '';
      this.formRight.fdjbh = '';
      this.formRight.qddjxh = '';
      this.formRight.kcdcnxtbm = '';
      this.formRight.gsmc = '';
      this.editFrom = false;
    },
    handleCar (val) {
      this.formLeft.cllx = val;
    },
    addSfjh () {
      this.addFrom = true;
    },
    updateSfjhQcbh (data) {
      this.editFrom = true;
      this.formRight.wgbh = data.row.tboxbh;
      this.formRight.qcbh = data.row.qcbh;
      this.formRight.cph = data.row.cphm;
      this.formRight.gsmc = data.row.gsbh === 0 ? '蜀都' : '其他';
      this.formRight.cllx = data.row.cllx;
      this.formRight.qcsbhm = data.row.qcsbh;
      this.formRight.simiccid = data.row.simiccid;
      this.formRight.fdjbh = data.row.fdjbh;
      this.formRight.qddjxh = data.row.qddjxh;
      this.formRight.kcdcnxtbm = data.row.kcdcnxtbm;
      this.updatedata = data;
    },
    deleteSfjh (data) {
      this.$Loading.start();
      deleteSfjhQcbhByCphm(data.row.cphm).then(res => {
        if (res.data.result) {
          this.$Message.info('删除成功');
        } else {
          this.$Message.info('删除失败');
        }
        this.selectSfjhQcbh(1);
        this.$refs.pageEntity.currentPage = 1;
        this.$Loading.finish();
      })
    },

    /*
      * 排序变更
         */
    sortChange ({ prop, order }) {
      if (order === 'descending') {
        this.sortType = 'desc';
      } else {
        this.sortType = 'asc';
      }
      this.sortField = prop;
      this.selectSfjhQcbh();
    }
  }
}
</script>
<style lang="less">
  .vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;

  .ivu-modal{
    top: 0;
  }
  }
</style>
