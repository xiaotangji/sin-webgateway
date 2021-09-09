<template>
  <div>
    <el-row class="toolPanel">
      <div style="float: right">
        <el-tooltip class="item" effect="dark" content="添加" placement="top-start">
          <el-button type="success" size="mini" icon="el-icon-circle-plus" circle style="float: right" @click="addRouting"></el-button>
        </el-tooltip>
      </div>
    </el-row>
    <el-row>
      <el-table
        :data="tableData.rows"
        :height="tableData.height"
        stripe
        border
        style="width: 100%">
        <el-table-column
          type="index"
          :index="indexMethod"
          width="50">
        </el-table-column>
        <el-table-column
          prop="purpose_network"
          label="目的网络"
          width="150">
        </el-table-column>
        <el-table-column
          prop="subnet_mask"
          label="子网掩码"
          width="150">
        </el-table-column>
        <el-table-column
          prop="interface"
          label="接口">
        </el-table-column>
        <el-table-column
          prop="gateway"
          label="网关">
        </el-table-column>
        <el-table-column
          prop="distance"
          label="距离"
          width="150">
        </el-table-column>
        <el-table-column
          prop="track_logo"
          label="Track标识">
        </el-table-column>
        <el-table-column label="操作" width="150">
          <template slot-scope="scope">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top-start">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="handleEdit(scope.$index, scope.row)" circle></el-button>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="删除" placement="top-start">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.$index, scope.row)" circle></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row class="paginationPanel">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange" :current-page="this.tableData.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="this.tableData.pageSize"
        layout="total,sizes, prev, pager,next,jumper"
        :total="this.tableData.total">
      </el-pagination>
    </el-row>
    <el-dialog title="添加路由" :close-on-click-modal="false":visible.sync="dialogFormVisibleAdd">
      <el-form :model="routingFormAdd" style="margin-left: 27%" :rules="rulesAdd" ref="routingFormAdd" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="目的网络：" prop="purpose_network">
          <el-input v-model="routingFormAdd.purpose_network" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="子网掩码：" prop="subnet_mask" style="width: 60%">
          <el-input v-model="routingFormAdd.subnet_mask" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="接口：" prop="interface" style="width: 60%">
          <el-select v-model="routingFormAdd.interface">
            <el-option label="test1" value="test1"></el-option>
            <el-option label="test2" value="test2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="网关：" prop="gateway" style="width: 60%">
          <el-input v-model="routingFormAdd.gateway" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="距离：" prop="distance" style="width: 60%">
          <el-input v-model="routingFormAdd.distance" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="Track标识：" prop="track_logo" style="width: 60%">
          <el-input v-model="routingFormAdd.track_logo" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormAdd('routingFormAdd')">确定</el-button>
          <el-button @click="cancleAdd('routingFormAdd')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <el-dialog title="编辑路由"  :close-on-click-modal="false" :modal-append-to-body = "false" :close-on-press-escape="false" :visible.sync="dialogFormVisibleEdit">
      <el-form :model="routingFormEdit" style="margin-left: 27%" :rules="rulesEdit" ref="routingFormEdit" size="mini" label-width="130px" class="demo-ruleForm">
        <el-form-item label="目的网络：" prop="purpose_network">
          <el-input v-model="routingFormEdit.purpose_network" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="子网掩码：" prop="subnet_mask" style="width: 60%">
          <el-input v-model="routingFormEdit.subnet_mask" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="接口：" prop="interface" style="width: 60%">
          <el-input v-model="routingFormEdit.interface" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="网关：" prop="gateway" style="width: 60%">
          <el-input v-model="routingFormEdit.gateway" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="距离：" prop="distance" style="width: 60%">
          <el-input v-model="routingFormEdit.distance" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item label="Track标识：" prop="track_logo" style="width: 60%">
          <el-input v-model="routingFormEdit.track_logo" style="width: auto"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitFormEdit('routingFormEdit')">确定</el-button>
          <el-button @click="cancleEdit('routingFormEdit')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import $ from "jquery";
import {
  addRoutingStatic,
  deleteFromRoutingStaticById,
  selectFromRoutingStatic,
  updateRoutingStatic
} from "../../../../api/routers";

export default {
  name: 'StaticRouting',
  data() {
    return {
      tableData: {
        height: 600,
        sort: "",
        order: "",
        page: 1,
        rows: [],
        currentPage: 1,
        pageSize: 10,
        total: null,
      }, // 表格数据源
      routingFormAdd: {
        purpose_network: '',
        subnet_mask: '',
        interface: '',
        gateway: '',
        distance: '',
        track_logo: ''
      },
      routingFormEdit: {
        id:'',
        purpose_network: '',
        subnet_mask: '',
        interface: '',
        gateway: '',
        distance: '',
        track_logo: ''
      },
      rulesAdd: {
        purpose_network: [
          { required: true, message: '请输入目的网络', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        subnet_mask: [
          { required: true, message: '请输入子网掩码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ]
      },
      rulesEdit: {
        purpose_network: [
          { required: true, message: '请输入目的网络', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ],
        subnet_mask: [
          { required: true, message: '请输入子网掩码', trigger: 'blur' },
          { min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur' }
        ]
      },
      deviceNameOptions: [],
      conNameArr: [],
      conNameId: [],
      idProtocol: '',
      // 是否加载数据
      loading:true,
      deviceNameSearch: '',
      dialogFormVisibleAdd: false,
      dialogFormVisibleEdit: false
    }
  },
  created () {
    this.selectFromRoutingStatic();
  },
  methods: {
    selectFromRoutingStatic(){
      selectFromRoutingStatic((this.tableData.currentPage-1)*this.tableData.pageSize,this.tableData.pageSize,this.tableData.sort,this.tableData.order).then(res => {
        this.updateHeight();
        if(res.data.result){
          this.tableData.rows = res.data.data.routeList;
          this.tableData.total =  res.data.data.count;
        }else{
          this.$message({
            type: 'error',
            message: '查询失败!'
          });
        }
      })
    },


    addRouting(){
      this.dialogFormVisibleAdd = true;
    },

    handleEdit(index, row){
      this.dialogFormVisibleEdit = true;
      this.routingFormEdit.id = row.id;
      this.routingFormEdit.purpose_network = row.purpose_network;
      this.routingFormEdit.subnet_mask = row.subnet_mask;
      this.routingFormEdit.interface = row.interface;
      this.routingFormEdit.gateway = row.gateway;
      this.routingFormEdit.distance =  row.distance;
      this.routingFormEdit.track_logo = row.track_logo;
    },


    submitFormAdd(routingFormAdd){
      this.$refs[routingFormAdd].validate((valid) => {
        if (valid) {
          this.$confirm('确定添加吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            if((this.routingFormEdit.interface != null && this.routingFormAdd.interface != '') || (this.routingFormEdit.gateway != null && this.routingFormAdd.gateway != '') ){
              addRoutingStatic(this.routingFormAdd).then(res=>{
                if(res.data.result){
                  this.$refs[routingFormAdd].resetFields();
                  this.dialogFormVisibleAdd = false;
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  });
                  this.selectFromRoutingStatic();
                }else{
                  this.$message({
                    type: 'error',
                    message: '添加失败!'
                  });
                }
              })
            }else{
              this.$message({
                type: 'warning',
                message: '请配置接口或网关!'
              });
            }
          }).catch(() => {
            /*this.$message({
              type: 'info',
              message: '已取消添加'
            });*/
          });
        } else {
          return false;
        }
      });
    },

    cancleAdd(routingFormAdd){
      this.$refs[routingFormAdd].resetFields();
      this.dialogFormVisibleAdd = false;
    },

    submitFormEdit(routingFormEdit){
      this.$refs[routingFormEdit].validate((valid) => {
        if (valid) {
          this.$confirm('确定编辑吗?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            updateRoutingStatic(this.routingFormEdit).then(res=>{
              if(res.data.result){
                this.$message({
                  type: 'success',
                  message: '编辑成功!'
                });
                this.$refs[routingFormEdit].resetFields();
                this.dialogFormVisibleEdit = false;
                this.selectFromRoutingStatic();
              }else{
                this.$message({
                  type: 'error',
                  message: '编辑失败!'
                });
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消编辑'
            });
          });
        } else {
          return false;
        }
      });
    },

    cancleEdit(routingFormEdit){
      this.$refs[routingFormEdit].resetFields();
      this.dialogFormVisibleEdit = false;
    },

    handleDelete(index, row) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteFromRoutingStaticById(row.id).then(res=>{
          if(res.status == 200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.tableData.total = res.data.data;
            let totalPage = Math.ceil(this.tableData.total)/this.tableData.pageSize;
            this.tableData.currentPage = this.tableData.currentPage > totalPage ? totalPage : this.tableData.currentPage;
            this.selectFromRoutingStatic();
          }else{
            this.$message({
              type: 'success',
              message: '删除失败!'
            });
          }
        })
      }).catch(() => {
        /*this.$message({
          type: 'info',
          message: '已取消删除'
        });*/
      });
    },


    handleSizeChange: function (size) {
      this.tableData.pageSize = size;
      //this.handleCurrentChange(this.currentPage);
      this.selectFromRoutingStatic();
    },
    handleCurrentChange: function (currentPage) {
      this.tableData.currentPage = currentPage;
      //this.currentChangePage(this.tableData,currentPage)
      this.selectFromRoutingStatic();
    },
    //分页方法（重点）
    currentChangePage(list,currentPage) {
      let from = (currentPage - 1) * this.tableData.pageSize;
      let to = currentPage * this.tableData.pageSize;
      this.tempList = [];
      for (; from < to; from++) {
        if (list[from]) {
          this.tempList.push(list[from]);
        }
      }
    },
    indexMethod(index) {
      return parseInt((this.tableData.currentPage - 1) * this.tableData.pageSize + index + 1)
    },
    // 更新表格高度
    updateHeight() {
      this.tableData.height =
        window.innerHeight -
        $(".paginationPanel").height() -
        $(".toolPanel").height()-120;
    },
  }
}
</script>

<style>

</style>
