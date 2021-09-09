<template>
  <div>
    <div class="toolPanel">
      <Select v-model="form.cllx" clearable style="width:200px"  placeholder="请选择汽车类型">
        <Option v-for="item in this.form.cllxarr" :value="item" :key="item">{{ item }}</Option>
      </Select>
      <Button type="primary" @click="serchCllx" style="margin-left: 15px">搜索</Button>
      <Button type="info" @click="addCllx" style="margin-left: 15px">添加</Button>
    </div>
    <Table border :columns="columnFrom"  @sort-change="sortChange" :data="form.dataFrom" show-sizer></Table>
    <Page  ref='pageEntity' :total=this.form.total show-elevator show-total show-sizer @on-change="changePage" @on-page-size-change="changePageSize"></Page>
    <Modal
      v-model="addFrom"
      title="添加车辆类型"
      class-name="vertical-center-modal"
      :mask-closable="false"
      >
      <div style="height:600px;overflowY:scroll;">
        <Form :model="formLeft" ref="formLeft" :rules="ruleInline" label-position="left" :label-width="120">
          <Form-item label="车辆类型" prop="cllx">
            <Input v-model="formLeft.cllx"></Input>
          </Form-item>
          <Form-item label="纯电续驶里程" prop="cdxslc">
            <Input v-model="formLeft.cdxslc"></Input>
          </Form-item>
          <Form-item label="各挡位传动比" prop="gdwcdb">
            <Input v-model="formLeft.gdwcdb"></Input>
          </Form-item>
          <Form-item label="通用报警预值" prop="tybjyz">
            <Input v-model="formLeft.tybjyz"></Input>
          </Form-item>
          <Form-item label="车载储能装置类型总能量" prop="czcnzzlxznl">
            <Input v-model="formLeft.czcnzzlxznl"></Input>
          </Form-item>
          <Form-item label="车载储能装置类型冷却方式" prop="czcnzzlxlqfs">
            <Input v-model="formLeft.czcnzzlxlqfs"></Input>
          </Form-item>
          <Form-item label="额定电压" prop="eddy">
            <Input v-model="formLeft.eddy"></Input>
          </Form-item>
          <Form-item label="驱动电机型号" prop="qddjxingh">
            <Input v-model="formLeft.qddjxingh"></Input>
          </Form-item>
          <Form-item label="驱动电机安装数量" prop="qddjazsl">
            <Input v-model="formLeft.qddjazsl"></Input>
          </Form-item>
          <Form-item label="驱动电机布置型式及位置" prop="qddjbzxswz">
            <Input v-model="formLeft.qddjbzxswz"></Input>
          </Form-item>
          <Form-item label="驱动电机冷却方式" prop="qddjlqfs">
            <Input v-model="formLeft.qddjlqfs"></Input>
          </Form-item>
          <Form-item label="驱动电机额定电压" prop="qddjeddy">
            <Input v-model="formLeft.qddjeddy"></Input>
          </Form-item>
          <Form-item label="驱动电机最大工作电流" prop="qddjzdgzdl">
            <Input v-model="formLeft.qddjzdgzdl"></Input>
          </Form-item>
          <Form-item label="驱动电机额定功率" prop="qddjedgl">
            <Input v-model="formLeft.qddjedgl"></Input>
          </Form-item>
          <Form-item label="驱动电机峰值功率" prop="qddjfzgl">
            <Input v-model="formLeft.qddjfzgl"></Input>
          </Form-item>
          <Form-item label="驱动电机额定转速" prop="qddjedzs">
            <Input v-model="formLeft.qddjedzs"></Input>
          </Form-item>
          <Form-item label="驱动电机最高转速" prop="qddjzgzs">
            <Input v-model="formLeft.qddjzgzs"></Input>
          </Form-item>
          <Form-item label="驱动电机额定转矩" prop="qddjedzj">
            <Input v-model="formLeft.qddjedzj"></Input>
          </Form-item>
          <Form-item label="驱动电机峰值转矩" prop="qddjfzzj">
            <Input v-model="formLeft.qddjfzzj"></Input>
          </Form-item>
          <Form-item label="驱动电机最大输出转矩" prop="qddjzdsczj">
            <Input v-model="formLeft.qddjzdsczj"></Input>
          </Form-item>
          <Form-item label="整车质保期" prop="zczbq">
            <Input v-model="formLeft.zczbq"></Input>
          </Form-item>
          <Form-item label="准载人数" prop="zzrs">
            <Input v-model="formLeft.zzrs"></Input>
          </Form-item>
          <Form-item label="整车质量" prop="zczl">
            <Input v-model="formLeft.zczl"></Input>
          </Form-item>
          <Form-item label="整备质量" prop="zbzl">
            <Input v-model="formLeft.zbzl"></Input>
          </Form-item>
          <Form-item label="纯电工况法续驶里程" prop="cdgkfxslc">
            <Input v-model="formLeft.cdgkfxslc"></Input>
          </Form-item>
          <Form-item label="匀速法续驶里程" prop="ysfxslc">
            <Input v-model="formLeft.ysfxslc"></Input>
          </Form-item>
          <Form-item label="最高车速" prop="zgcs">
            <Input v-model="formLeft.zgcs"></Input>
          </Form-item>
          <Form-item label="能量回收装置" prop="nlhszz">
            <Input v-model="formLeft.nlhszz"></Input>
          </Form-item>
          <Form-item label="新能源车辆类型" prop="xnycllx">
            <Input v-model="formLeft.xnycllx"></Input>
          </Form-item>
          <Form-item label="车载充电机额定输入电压" prop="czcdjedsrdy">
            <Input v-model="formLeft.czcdjedsrdy"></Input>
          </Form-item>
          <Form-item label="车载充电机额定输入电流" prop="czcdjedsrdl">
            <Input v-model="formLeft.czcdjedsrdl"></Input>
          </Form-item>
          <Form-item label="车载充电机额定输入频率" prop="czcdjedsrpl">
            <Input v-model="formLeft.czcdjedsrpl"></Input>
          </Form-item>
          <Form-item label="车载充电机输出电压" prop="czcdjscdy">
            <Input v-model="formLeft.czcdjscdy"></Input>
          </Form-item>
          <Form-item label="车载充电机输出电流" prop="czcdjscdl">
            <Input v-model="formLeft.czcdjscdl"></Input>
          </Form-item>
          <Form-item label="车载充电机输出功率" prop="czcdjscgl">
            <Input v-model="formLeft.czcdjscgl"></Input>
          </Form-item>
          <Form-item label="车载储能装置生产企业" prop="czcnzzscqy">
            <Input v-model="formLeft.czcnzzscqy"></Input>
          </Form-item>
          <Form-item label="储能装置成箱个数" prop="cnzzcxgs">
            <Input v-model="formLeft.cnzzcxgs"></Input>
          </Form-item>
          <Form-item label="每箱电池包个数" prop="mxdcbgs">
            <Input v-model="formLeft.mxdcbgs"></Input>
          </Form-item>
          <Form-item label="每包电池单体个数" prop="mbdcdtgs">
            <Input v-model="formLeft.mbdcdtgs"></Input>
          </Form-item>
          <Form-item label="总电池单体串数" prop="zdcdtcs">
            <Input v-model="formLeft.zdcdtcs"></Input>
          </Form-item>
          <Form-item label="总电池单体并数" prop="zdcdtbs">
            <Input v-model="formLeft.zdcdtbs"></Input>
          </Form-item>
          <Form-item label="探针总个数" prop="tzzgs">
            <Input v-model="formLeft.tzzgs"></Input>
          </Form-item>
          <Form-item label="每单体电池探针个数" prop="mdtdctzgs">
            <Input v-model="formLeft.mdtdctzgs"></Input>
          </Form-item>
          <Form-item label="车载储能装置类型" prop="czcnzzlx">
            <Input v-model="formLeft.czcnzzlx"></Input>
          </Form-item>
          <Form-item label="车载储能装置总成质量" prop="czcnzzzczl">
            <Input v-model="formLeft.czcnzzzczl"></Input>
          </Form-item>
          <Form-item label="车载储能装置总成标称容量" prop="czcnzzzcbcrl">
            <Input v-model="formLeft.czcnzzzcbcrl"></Input>
          </Form-item>
          <Form-item label="车载储能装置额定总能量" prop="czcnzzedznl">
            <Input v-model="formLeft.czcnzzedznl"></Input>
          </Form-item>
          <Form-item label="车载储能装置额定电压" prop="czcnzzeddy">
            <Input v-model="formLeft.czcnzzeddy"></Input>
          </Form-item>
          <Form-item label="车载储能装置总成额定输出电流" prop="czcnzzzcedscdl">
            <Input v-model="formLeft.czcnzzzcedscdl"></Input>
          </Form-item>
          <Form-item label="车载储能装置冷却方式" prop="czcnzzlqfs">
            <Input v-model="formLeft.czcnzzlqfs"></Input>
          </Form-item>
          <Form-item label="车载储能装置加热方式" prop="czcnzzjrfs">
            <Input v-model="formLeft.czcnzzjrfs"></Input>
          </Form-item>
          <Form-item label="车载储能装置单体型号" prop="czcnzzdtxh">
            <Input v-model="formLeft.czcnzzdtxh"></Input>
          </Form-item>
          <Form-item label="车载储能装置单体标称电压" prop="czcnzzdtbcdy">
            <Input v-model="formLeft.czcnzzdtbcdy"></Input>
          </Form-item>
          <Form-item label="车载储能装置单体外形" prop="czcnzzdtwx">
            <Input v-model="formLeft.czcnzzdtwx"></Input>
          </Form-item>
          <Form-item label="车载储能装置系统数" prop="czcnzzxts">
            <Input v-model="formLeft.czcnzzxts"></Input>
          </Form-item>
          <Form-item label="燃油类型" prop="rylx">
            <Input v-model="formLeft.rylx"></Input>
          </Form-item>
          <Form-item label="燃油标号" prop="rybh">
            <Input v-model="formLeft.rybh"></Input>
          </Form-item>
          <Form-item label="油箱容量" prop="yxrl">
            <Input v-model="formLeft.yxrl"></Input>
          </Form-item>
          <Form-item label="最大输出功率" prop="zdscgl">
            <Input v-model="formLeft.zdscgl"></Input>
          </Form-item>
          <Form-item label="额定功率" prop="edgl">
            <Input v-model="formLeft.edgl"></Input>
          </Form-item>
          <Form-item label="最大输出转矩" prop="zdsczj">
            <Input v-model="formLeft.zdsczj"></Input>
          </Form-item>
          <Form-item label="成箱后的储能装置型号" prop="cxhdcnzzxh">
            <Input v-model="formLeft.cxhdcnzzxh"></Input>
          </Form-item>
          <Form-item label="动汽车驱动电机型号" prop="dqcqddjxh">
            <Input v-model="formLeft.dqcqddjxh"></Input>
          </Form-item>
          <Form-item label="驱动电机控制器型号" prop="qddjkzqxh">
            <Input v-model="formLeft.qddjkzqxh"></Input>
          </Form-item>
          <Form-item label="驱动电机控制器生产企业" prop="qddjkzqscqy">
            <Input v-model="formLeft.qddjkzqscqy"></Input>
          </Form-item>
          <Form-item label="电动汽车整车控制器型号" prop="ddqczckzqxh">
            <Input v-model="formLeft.ddqczckzqxh"></Input>
          </Form-item>
          <Form-item label="电动汽车整车控制器生产企业" prop="ddqczckzqscqy">
            <Input v-model="formLeft.ddqczckzqscqy"></Input>
          </Form-item>
          <Form-item label="储能装置总成标称电压" prop="cnzzzcbcdy">
            <Input v-model="formLeft.cnzzzcbcdy"></Input>
          </Form-item>
          <Form-item label="车载能源管理系统型号硬件" prop="cznyglxtxhyj">
            <Input v-model="formLeft.cznyglxtxhyj"></Input>
          </Form-item>
          <Form-item label="车载能源管理系统型号软件" prop="cznyglxtxhrj">
            <Input v-model="formLeft.cznyglxtxhrj"></Input>
          </Form-item>
          <Form-item label="车载能源管理系统生产企业" prop="cznyglxtscqy">
            <Input v-model="formLeft.cznyglxtscqy"></Input>
          </Form-item>
          <Form-item label="电动汽车车载充电机型号" prop="ddqcczcdjxh">
            <Input v-model="formLeft.ddqcczcdjxh"></Input>
          </Form-item>
          <Form-item label="电动汽车车载充电机生产企业" prop="ddqcczcdjscqy">
            <Input v-model="formLeft.ddqcczcdjscqy"></Input>
          </Form-item>
          <Form-item label="新能源汽车车载实时监控装置型号硬件" prop="xnyqcczssjkzzxhyj">
            <Input v-model="formLeft.xnyqcczssjkzzxhyj"></Input>
          </Form-item>
          <Form-item label="新能源汽车车载实时监控装置型号软件" prop="xnyqcczssjkzzxhrj">
            <Input v-model="formLeft.xnyqcczssjkzzxhrj"></Input>
          </Form-item>
          <Form-item label="新能源汽车车载实时监控装置生产企业" prop="xnyqcczssjkzzscqy">
            <Input v-model="formLeft.xnyqcczssjkzzscqy"></Input>
          </Form-item>
      </Form>
      </div>
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
      :mask-closable="false"
      >
      <div style="height:600px;overflowY:scroll;">
        <Form :model="formRight" ref="formRight" :rules="ruleInline" label-position="left" :label-width="100">
        <Form-item label="车辆类型" prop="cllx">
          <Input v-model="formRight.cllx" disabled></Input>
        </Form-item>
        <Form-item label="纯电续驶里程" prop="cdxslc">
          <Input v-model="formRight.cdxslc"></Input>
        </Form-item>
        <Form-item label="各挡位传动比" prop="gdwcdb">
          <Input v-model="formRight.gdwcdb"></Input>
        </Form-item>
        <Form-item label="通用报警预值" prop="tybjyz">
          <Input v-model="formRight.tybjyz"></Input>
        </Form-item>
        <Form-item label="车载储能装置类型总能量" prop="czcnzzlxznl">
          <Input v-model="formRight.czcnzzlxznl"></Input>
        </Form-item>
        <Form-item label="车载储能装置类型冷却方式" prop="czcnzzlxlqfs">
          <Input v-model="formRight.czcnzzlxlqfs"></Input>
        </Form-item>
        <Form-item label="额定电压" prop="eddy">
          <Input v-model="formRight.eddy"></Input>
        </Form-item>
        <Form-item label="驱动电机型号" prop="qddjxingh">
          <Input v-model="formRight.qddjxingh"></Input>
        </Form-item>
        <Form-item label="驱动电机安装数量" prop="qddjazsl">
          <Input v-model="formRight.qddjazsl"></Input>
        </Form-item>
        <Form-item label="驱动电机布置型式及位置" prop="qddjbzxswz">
          <Input v-model="formRight.qddjbzxswz"></Input>
        </Form-item>
        <Form-item label="驱动电机冷却方式" prop="qddjlqfs">
          <Input v-model="formRight.qddjlqfs"></Input>
        </Form-item>
        <Form-item label="驱动电机额定电压" prop="qddjeddy">
          <Input v-model="formRight.qddjeddy"></Input>
        </Form-item>
        <Form-item label="驱动电机最大工作电流" prop="qddjzdgzdl">
          <Input v-model="formRight.qddjzdgzdl"></Input>
        </Form-item>
        <Form-item label="驱动电机额定功率" prop="qddjedgl">
          <Input v-model="formRight.qddjedgl"></Input>
        </Form-item>
        <Form-item label="驱动电机峰值功率" prop="qddjfzgl">
          <Input v-model="formRight.qddjfzgl"></Input>
        </Form-item>
        <Form-item label="驱动电机额定转速" prop="qddjedzs">
          <Input v-model="formRight.qddjedzs"></Input>
        </Form-item>
        <Form-item label="驱动电机最高转速" prop="qddjzgzs">
          <Input v-model="formRight.qddjzgzs"></Input>
        </Form-item>
        <Form-item label="驱动电机额定转矩" prop="qddjedzj">
          <Input v-model="formRight.qddjedzj"></Input>
        </Form-item>
        <Form-item label="驱动电机峰值转矩" prop="qddjfzzj">
          <Input v-model="formRight.qddjfzzj"></Input>
        </Form-item>
        <Form-item label="驱动电机最大输出转矩" prop="qddjzdsczj">
          <Input v-model="formRight.qddjzdsczj"></Input>
        </Form-item>
        <Form-item label="整车质保期" prop="zczbq">
          <Input v-model="formRight.zczbq"></Input>
        </Form-item>
        <Form-item label="准载人数" prop="zzrs">
          <Input v-model="formRight.zzrs"></Input>
        </Form-item>
        <Form-item label="整车质量" prop="zczl">
          <Input v-model="formRight.zczl"></Input>
        </Form-item>
        <Form-item label="整备质量" prop="zbzl">
          <Input v-model="formRight.zbzl"></Input>
        </Form-item>
        <Form-item label="纯电工况法续驶里程" prop="cdgkfxslc">
          <Input v-model="formRight.cdgkfxslc"></Input>
        </Form-item>
        <Form-item label="匀速法续驶里程" prop="ysfxslc">
          <Input v-model="formRight.ysfxslc"></Input>
        </Form-item>
        <Form-item label="最高车速" prop="zgcs">
          <Input v-model="formRight.zgcs"></Input>
        </Form-item>
        <Form-item label="能量回收装置" prop="nlhszz">
          <Input v-model="formRight.nlhszz"></Input>
        </Form-item>
        <Form-item label="新能源车辆类型" prop="xnycllx">
          <Input v-model="formRight.xnycllx"></Input>
        </Form-item>
        <Form-item label="车载充电机额定输入电压" prop="czcdjedsrdy">
          <Input v-model="formRight.czcdjedsrdy"></Input>
        </Form-item>
        <Form-item label="车载充电机额定输入电流" prop="czcdjedsrdl">
          <Input v-model="formRight.czcdjedsrdl"></Input>
        </Form-item>
        <Form-item label="车载充电机额定输入频率" prop="czcdjedsrpl">
          <Input v-model="formRight.czcdjedsrpl"></Input>
        </Form-item>
        <Form-item label="车载充电机输出电压" prop="czcdjscdy">
          <Input v-model="formRight.czcdjscdy"></Input>
        </Form-item>
        <Form-item label="车载充电机输出电流" prop="czcdjscdl">
          <Input v-model="formRight.czcdjscdl"></Input>
        </Form-item>
        <Form-item label="车载充电机输出功率" prop="czcdjscgl">
          <Input v-model="formRight.czcdjscgl"></Input>
        </Form-item>
        <Form-item label="车载储能装置生产企业" prop="czcnzzscqy">
          <Input v-model="formRight.czcnzzscqy"></Input>
        </Form-item>
        <Form-item label="储能装置成箱个数" prop="cnzzcxgs">
          <Input v-model="formRight.cnzzcxgs"></Input>
        </Form-item>
        <Form-item label="每箱电池包个数" prop="mxdcbgs">
          <Input v-model="formRight.mxdcbgs"></Input>
        </Form-item>
        <Form-item label="每包电池单体个数" prop="mbdcdtgs">
          <Input v-model="formRight.mbdcdtgs"></Input>
        </Form-item>
        <Form-item label="总电池单体串数" prop="zdcdtcs">
          <Input v-model="formRight.zdcdtcs"></Input>
        </Form-item>
        <Form-item label="总电池单体并数" prop="zdcdtbs">
          <Input v-model="formRight.zdcdtbs"></Input>
        </Form-item>
        <Form-item label="探针总个数" prop="tzzgs">
          <Input v-model="formRight.tzzgs"></Input>
        </Form-item>
        <Form-item label="每单体电池探针个数" prop="mdtdctzgs">
          <Input v-model="formRight.mdtdctzgs"></Input>
        </Form-item>
        <Form-item label="车载储能装置类型" prop="czcnzzlx">
          <Input v-model="formRight.czcnzzlx"></Input>
        </Form-item>
        <Form-item label="车载储能装置总成质量" prop="czcnzzzczl">
          <Input v-model="formRight.czcnzzzczl"></Input>
        </Form-item>
        <Form-item label="车载储能装置总成标称容量" prop="czcnzzzcbcrl">
          <Input v-model="formRight.czcnzzzcbcrl"></Input>
        </Form-item>
        <Form-item label="车载储能装置额定总能量" prop="czcnzzedznl">
          <Input v-model="formRight.czcnzzedznl"></Input>
        </Form-item>
        <Form-item label="车载储能装置额定电压" prop="czcnzzeddy">
          <Input v-model="formRight.czcnzzeddy"></Input>
        </Form-item>
        <Form-item label="车载储能装置总成额定输出电流" prop="czcnzzzcedscdl">
          <Input v-model="formRight.czcnzzzcedscdl"></Input>
        </Form-item>
        <Form-item label="车载储能装置冷却方式" prop="czcnzzlqfs">
          <Input v-model="formRight.czcnzzlqfs"></Input>
        </Form-item>
        <Form-item label="车载储能装置加热方式" prop="czcnzzjrfs">
          <Input v-model="formRight.czcnzzjrfs"></Input>
        </Form-item>
        <Form-item label="车载储能装置单体型号" prop="czcnzzdtxh">
          <Input v-model="formRight.czcnzzdtxh"></Input>
        </Form-item>
        <Form-item label="车载储能装置单体标称电压" prop="czcnzzdtbcdy">
          <Input v-model="formRight.czcnzzdtbcdy"></Input>
        </Form-item>
        <Form-item label="车载储能装置单体外形" prop="czcnzzdtwx">
          <Input v-model="formRight.czcnzzdtwx"></Input>
        </Form-item>
        <Form-item label="车载储能装置系统数" prop="czcnzzxts">
          <Input v-model="formRight.czcnzzxts"></Input>
        </Form-item>
        <Form-item label="燃油类型" prop="rylx">
          <Input v-model="formRight.rylx"></Input>
        </Form-item>
        <Form-item label="燃油标号" prop="rybh">
          <Input v-model="formRight.rybh"></Input>
        </Form-item>
        <Form-item label="油箱容量" prop="yxrl">
          <Input v-model="formRight.yxrl"></Input>
        </Form-item>
        <Form-item label="最大输出功率" prop="zdscgl">
          <Input v-model="formRight.zdscgl"></Input>
        </Form-item>
        <Form-item label="额定功率" prop="edgl">
          <Input v-model="formRight.edgl"></Input>
        </Form-item>
        <Form-item label="最大输出转矩" prop="zdsczj">
          <Input v-model="formRight.zdsczj"></Input>
        </Form-item>
        <Form-item label="成箱后的储能装置型号" prop="cxhdcnzzxh">
          <Input v-model="formRight.cxhdcnzzxh"></Input>
        </Form-item>
        <Form-item label="动汽车驱动电机型号" prop="dqcqddjxh">
          <Input v-model="formRight.dqcqddjxh"></Input>
        </Form-item>
        <Form-item label="驱动电机控制器型号" prop="qddjkzqxh">
          <Input v-model="formRight.qddjkzqxh"></Input>
        </Form-item>
        <Form-item label="驱动电机控制器生产企业" prop="qddjkzqscqy">
          <Input v-model="formRight.qddjkzqscqy"></Input>
        </Form-item>
        <Form-item label="电动汽车整车控制器型号" prop="ddqczckzqxh">
          <Input v-model="formRight.ddqczckzqxh"></Input>
        </Form-item>
        <Form-item label="电动汽车整车控制器生产企业" prop="ddqczckzqscqy">
          <Input v-model="formRight.ddqczckzqscqy"></Input>
        </Form-item>
        <Form-item label="储能装置总成标称电压" prop="cnzzzcbcdy">
          <Input v-model="formRight.cnzzzcbcdy"></Input>
        </Form-item>
        <Form-item label="车载能源管理系统型号硬件" prop="cznyglxtxhyj">
          <Input v-model="formRight.cznyglxtxhyj"></Input>
        </Form-item>
        <Form-item label="车载能源管理系统型号软件" prop="cznyglxtxhrj">
          <Input v-model="formRight.cznyglxtxhrj"></Input>
        </Form-item>
        <Form-item label="车载能源管理系统生产企业" prop="cznyglxtscqy">
          <Input v-model="formRight.cznyglxtscqy"></Input>
        </Form-item>
        <Form-item label="电动汽车车载充电机型号" prop="ddqcczcdjxh">
          <Input v-model="formRight.ddqcczcdjxh"></Input>
        </Form-item>
        <Form-item label="电动汽车车载充电机生产企业" prop="ddqcczcdjscqy">
          <Input v-model="formRight.ddqcczcdjscqy"></Input>
        </Form-item>
        <Form-item label="新能源汽车车载实时监控装置型号硬件" prop="xnyqcczssjkzzxhyj">
          <Input v-model="formRight.xnyqcczssjkzzxhyj"></Input>
        </Form-item>
        <Form-item label="新能源汽车车载实时监控装置型号软件" prop="xnyqcczssjkzzxhrj">
          <Input v-model="formRight.xnyqcczssjkzzxhrj"></Input>
        </Form-item>
        <Form-item label="新能源汽车车载实时监控装置生产企业" prop="xnyqcczssjkzzscqy">
          <Input v-model="formRight.xnyqcczssjkzzscqy"></Input>
        </Form-item>
      </Form>
      </div>
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
import { selectFromCarType, addToCarType, deleteFromCarTypeByCllx, updateCarTypeByCllx,queryBeforeDeleteFromSfjhqcbhByCllx } from '@/api/sfjhqcbh'
import Page from '../../node_modules/iview/src/components/page/page.vue'
import ViewUI from 'view-design';
export default {
  name: 'numberManage_page',
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
          title: '车辆类型',
          key: 'cllx',
          // sortable: true,
          width: 110
        },
        {
          title: '纯电续驶里程',
          key: 'cdxslc',
          width: 180
        },
        {

          title: '各挡位传动比',
          key: 'gdwcdb',
          width: 110
        },
        {
          title: '通用报警预值',
          key: 'tybjyz',
          width: 110
        },
        {
          title: '车载储能装置类型总能量',
          key: 'czcnzzlxznl',
          width: 110
        },
        {
          title: '车载储能装置类型冷却方式',
          key: 'czcnzzlxlqfs',
          width: 110
        },
        {
          title: '额定电压',
          key: 'eddy',
          width: 150
        },
        {
          title: '驱动电机型号',
          key: 'qddjxingh',
          width: 180
        },
        {
          title: '驱动电机安装数量',
          key: 'qddjazsl',
          width: 190
        },
        {
          title: '驱动电机布置型式及位置',
          key: 'qddjbzxswz',
          width: 180
        },
        {
          title: '驱动电机冷却方式',
          key: 'qddjlqfs',
          width: 110
        },
        {
          title: '驱动电机额定电压',
          key: 'qddjeddy',
          width: 180
        },
        {
          title: '驱动电机最大工作电流',
          key: 'qddjzdgzdl',
          width: 110
        },
        {
          title: '驱动电机额定功率',
          key: 'qddjedgl',
          width: 110
        },
        {
          title: '驱动电机峰值功率',
          key: 'qddjfzgl',
          width: 180
        },
        {
          title: '驱动电机额定转速',
          key: 'qddjedzs',
          width: 180
        },
        {
          title: '驱动电机最高转速',
          key: 'qddjzgzs',
          width: 180
        },
        {
          title: '驱动电机额定转矩',
          key: 'qddjedzj',
          width: 180
        },
        {
          title: '驱动电机峰值转矩',
          key: 'qddjfzzj',
          width: 180
        },
        {
          title: '驱动电机最大输出转矩',
          key: 'qddjzdsczj',
          width: 180
        },
        {
          title: '整车质保期',
          key: 'zczbq',
          width: 110
        },
        {
          title: '准载人数',
          key: 'zzrs',
          width: 110
        },
        {
          title: '整车质量',
          key: 'zczl',
          width: 110
        },
        {
          title: '整备质量',
          key: 'zbzl',
          width: 110
        },
        {
          title: '纯电工况法续驶里程',
          key: 'cdgkfxslc',
          width: 110
        },
        {
          title: '匀速法续驶里程',
          key: 'ysfxslc',
          width: 80
        },
        {
          title: '最高车速',
          key: 'zgcs',
          width: 80
        },
        {
          title: '能量回收装置',
          key: 'nlhszz',
          width: 80
        },
        {
          title: '新能源车辆类型',
          key: 'xnycllx',
          width: 80
        },
        {
          title: '车载充电机额定输入电压',
          key: 'czcdjedsrdy',
          width: 80
        },
        {
          title: '车载充电机额定输入电流',
          key: 'czcdjedsrdl',
          width: 80
        },
        {
          title: '车载充电机额定输入频率',
          key: 'czcdjedsrpl',
          width: 80
        },
        {
          title: '车载充电机输出电压',
          key: 'czcdjscdy',
          width: 80
        },
        {
          title: '车载充电机输出电流',
          key: 'czcdjscdl',
          width: 80
        },
        {
          title: '车载充电机输出功率',
          key: 'czcdjscgl',
          width: 80
        },
        {
          title: '车载储能装置生产企业',
          key: 'czcnzzscqy',
          width: 80
        },
        {
          title: '储能装置成箱个数',
          key: 'cnzzcxgs',
          width: 80
        },
        {
          title: '每箱电池包个数',
          key: 'mxdcbgs',
          width: 80
        },
        {
          title: '每包电池单体个数',
          key: 'mbdcdtgs',
          width: 80
        },
        {
          title: '总电池单体串数',
          key: 'zdcdtcs',
          width: 80
        },
        {
          title: '总电池单体并数',
          key: 'zdcdtbs',
          width: 80
        },
        {
          title: '探针总个数',
          key: 'tzzgs',
          width: 80
        },
        {
          title: '每单体电池探针个数',
          key: 'mdtdctzgs',
          width: 80
        },
        {
          title: '车载储能装置类型',
          key: 'czcnzzlx',
          width: 80
        },
        {
          title: '车载储能装置总成质量',
          key: 'czcnzzzczl',
          width: 80
        },
        {
          title: '车载储能装置总成标称容量',
          key: 'czcnzzzcbcrl',
          width: 80
        },
        {
          title: '车载储能装置额定总能量',
          key: 'czcnzzedznl',
          width: 80
        },
        {
          title: '车载储能装置额定电压',
          key: 'czcnzzeddy',
          width: 80
        },
        {
          title: '车载储能装置总成额定输出电流',
          key: 'czcnzzzcedscdl',
          width: 80
        },
        {
          title: '车载储能装置冷却方式',
          key: 'czcnzzlqfs',
          width: 80
        },
        {
          title: '车载储能装置加热方式',
          key: 'czcnzzjrfs',
          width: 80
        },
        {
          title: '车载储能装置单体型号',
          key: 'czcnzzdtxh',
          width: 80
        },
        {
          title: '车载储能装置单体标称电压',
          key: 'czcnzzdtbcdy',
          width: 80
        },
        {
          title: '车载储能装置单体外形',
          key: 'czcnzzdtwx',
          width: 80
        },
        {
          title: '车载储能装置系统数',
          key: 'czcnzzxts',
          width: 80
        },
        {
          title: '燃油类型',
          key: 'rylx',
          width: 80
        },
        {
          title: '燃油标号',
          key: 'rybh',
          width: 80
        },
        {
          title: '油箱容量',
          key: 'yxrl',
          width: 80
        },
        {
          title: '最大输出功率',
          key: 'zdscgl',
          width: 80
        },
        {
          title: '额定功率',
          key: 'edgl',
          width: 80
        },
        {
          title: '最大输出转矩',
          key: 'zdsczj',
          width: 80
        },
        {
          title: '成箱后的储能装置型号',
          key: 'cxhdcnzzxh',
          width: 80
        },
        {
          title: '动汽车驱动电机型号',
          key: 'dqcqddjxh',
          width: 80
        },
        {
          title: '驱动电机控制器型号',
          key: 'qddjkzqxh',
          width: 80
        },
        {
          title: '驱动电机控制器生产企业',
          key: 'qddjkzqscqy',
          width: 80
        },
        {
          title: '电动汽车整车控制器型号',
          key: 'ddqczckzqxh',
          width: 80
        },
        {
          title: '电动汽车整车控制器生产企业',
          key: 'ddqczckzqscqy',
          width: 80
        },
        {
          title: '储能装置总成标称电压',
          key: 'cnzzzcbcdy',
          width: 80
        },
        {
          title: '车载能源管理系统型号硬件',
          key: 'cznyglxtxhyj',
          width: 80
        },
        {
          title: '车载能源管理系统型号软件',
          key: 'cznyglxtxhrj',
          width: 80
        },
        {
          title: '车载能源管理系统生产企业',
          key: 'cznyglxtscqy',
          width: 80
        },
        {
          title: '电动汽车车载充电机型号',
          key: 'ddqcczcdjxh',
          width: 80
        },
        {
          title: '电动汽车车载充电机生产企业',
          key: 'ddqcczcdjscqy',
          width: 80
        },
        {
          title: '新能源汽车车载实时监控装置型号硬件',
          key: 'xnyqcczssjkzzxhyj',
          width: 80
        },
        {
          title: '新能源汽车车载实时监控装置型号软件',
          key: 'xnyqcczssjkzzxhrj',
          width: 80
        },
        {
          title: '新能源汽车车载实时监控装置生产企业',
          key: 'xnyqcczssjkzzscqy',
          width: 80
        },
        {
          title: '操作人',
          key: 'czr',
          width: 80
        },
        {
          title: '更新时间',
          key: 'gxsj',
          width: 150,
          render: (h, params) => {
            let gx = params.row.gxsj;
            let gxm = gx.substring(0, 4) + '-' + gx.substring(4, 6) + '-' + gx.substring(6, 8) + ' ' + gx.substring(8, 10) + ':' + gx.substring(10, 12) + ':' + gx.substring(12, 14)
            return h('span', {
            }, gxm)
          }
        },
        {
          title: '操作',
          fixed: 'right',
          width: 140,
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
                    this.updateCllx(params)
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
                  title: '确定删除吗？',
                  transfer: true
                },
                on: {
                  'on-ok': () => {
                    if (this.queryBeforeDeleteCllx(params)) {
                      this.deleteCllx(params)// 调用删除方法
                    }
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
      cllxarr: [],
      updatedata: {},
      formLeft: {
        cllx: '',
        cdxslc: '',
        gdwcdb: '',
        tybjyz: '',
        czcnzzlxznl: '',
        czcnzzlxlqfs: '',
        eddy: '',
        qddjxingh: '',
        qddjazsl: '',
        qddjbzxswz: '',
        qddjlqfs: '',
        qddjeddy: '',
        qddjzdgzdl: '',
        qddjedgl: '',
        qddjfzgl: '',
        qddjedzs: '',
        qddjzgzs: '',
        qddjedzj: '',
        qddjfzzj: '',
        qddjzdsczj: '',
        zczbq: '',
        zzrs: '',
        zczl: '',
        zbzl: '',
        cdgkfxslc: '',
        ysfxslc: '',
        zgcs: '',
        nlhszz: '',
        xnycllx: '',
        czcdjedsrdy: '',
        czcdjedsrdl: '',
        czcdjedsrpl: '',
        czcdjscdy: '',
        czcdjscdl: '',
        czcdjscgl: '',
        czcnzzscqy: '',
        cnzzcxgs: '',
        mxdcbgs: '',
        mbdcdtgs: '',
        zdcdtcs: '',
        zdcdtbs: '',
        tzzgs: '',
        mdtdctzgs: '',
        czcnzzlx: '',
        czcnzzzczl: '',
        czcnzzzcbcrl: '',
        czcnzzedznl: '',
        czcnzzeddy: '',
        czcnzzzcedscdl: '',
        czcnzzlqfs: '',
        czcnzzjrfs: '',
        czcnzzdtxh: '',
        czcnzzdtbcdy: '',
        czcnzzdtwx: '',
        czcnzzxts: '',
        rylx: '',
        rybh: '',
        yxrl: '',
        zdscgl: '',
        edgl: '',
        zdsczj: '',
        cxhdcnzzxh: '',
        dqcqddjxh: '',
        qddjkzqxh: '',
        qddjkzqscqy: '',
        ddqczckzqxh: '',
        ddqczckzqscqy: '',
        cnzzzcbcdy: '',
        cznyglxtxhyj: '',
        cznyglxtxhrj: '',
        cznyglxtscqy: '',
        ddqcczcdjxh: '',
        ddqcczcdjscqy: '',
        xnyqcczssjkzzxhyj: '',
        xnyqcczssjkzzxhrj: '',
        xnyqcczssjkzzscqy: ''
      },
      formRight: {
        cllx: '',
        cdxslc: '',
        gdwcdb: '',
        tybjyz: '',
        czcnzzlxznl: '',
        czcnzzlxlqfs: '',
        eddy: '',
        qddjxingh: '',
        qddjazsl: '',
        qddjbzxswz: '',
        qddjlqfs: '',
        qddjeddy: '',
        qddjzdgzdl: '',
        qddjedgl: '',
        qddjfzgl: '',
        qddjedzs: '',
        qddjzgzs: '',
        qddjedzj: '',
        qddjfzzj: '',
        qddjzdsczj: '',
        zczbq: '',
        zzrs: '',
        zczl: '',
        zbzl: '',
        cdgkfxslc: '',
        ysfxslc: '',
        zgcs: '',
        nlhszz: '',
        xnycllx: '',
        czcdjedsrdy: '',
        czcdjedsrdl: '',
        czcdjedsrpl: '',
        czcdjscdy: '',
        czcdjscdl: '',
        czcdjscgl: '',
        czcnzzscqy: '',
        cnzzcxgs: '',
        mxdcbgs: '',
        mbdcdtgs: '',
        zdcdtcs: '',
        zdcdtbs: '',
        tzzgs: '',
        mdtdctzgs: '',
        czcnzzlx: '',
        czcnzzzczl: '',
        czcnzzzcbcrl: '',
        czcnzzedznl: '',
        czcnzzeddy: '',
        czcnzzzcedscdl: '',
        czcnzzlqfs: '',
        czcnzzjrfs: '',
        czcnzzdtxh: '',
        czcnzzdtbcdy: '',
        czcnzzdtwx: '',
        czcnzzxts: '',
        rylx: '',
        rybh: '',
        yxrl: '',
        zdscgl: '',
        edgl: '',
        zdsczj: '',
        cxhdcnzzxh: '',
        dqcqddjxh: '',
        qddjkzqxh: '',
        qddjkzqscqy: '',
        ddqczckzqxh: '',
        ddqczckzqscqy: '',
        cnzzzcbcdy: '',
        cznyglxtxhyj: '',
        cznyglxtxhrj: '',
        cznyglxtscqy: '',
        ddqcczcdjxh: '',
        ddqcczcdjscqy: '',
        xnyqcczssjkzzxhyj: '',
        xnyqcczssjkzzxhrj: '',
        xnyqcczssjkzzscqy: ''
      },
      form: {
        height: 0,
        dataFrom: [],
        total: 0,
        cllx: '',
        cllxarr: [],
        page: 1,
        pageSize: '',
        order: '',
        sort: ''
      },
      ruleInline: {
        cllx: [
          { required: true, message: '不能为空', trigger: 'change' },
          { type: 'string', max: 50, message: '不能超过50位', trigger: 'blur' }
        ],
        cdxslc: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        gdwcdb: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        tybjyz: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcnzzlxznl: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcnzzlxlqfs: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        eddy: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        qddjxingh: [
          { type: 'string', max: 50, message: '不能超过50位', trigger: 'blur' }
        ],
        qddjazsl: [
          { type: 'string', max: 5, message: '不能超过5位', trigger: 'blur' }
        ],
        qddjbzxswz: [
          { type: 'string', max: 50, message: '不能超过50位', trigger: 'blur' }
        ],
        qddjlqfs: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        qddjeddy: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        qddjzdgzdl: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        qddjedgl: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        qddjfzgl: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        qddjedzs: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        qddjzgzs: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        qddjedzj: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        qddjfzzj: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        qddjzdsczj: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        zczbq: [
          { type: 'string', max: 5, message: '不能超过5位', trigger: 'blur' }
        ],
        zzrs: [
          { type: 'string', max: 5, message: '不能超过5位', trigger: 'blur' }
        ],
        zczl: [
          { type: 'string', max: 5, message: '不能超过5位', trigger: 'blur' }
        ],
        zbzl: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        cdgkfxslc: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        ysfxslc: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        zgcs: [
          { type: 'string', max: 3, message: '不能超过3位', trigger: 'blur' }
        ],
        nlhszz: [
          { type: 'string', max: 20, message: '不能超过20位', trigger: 'blur' }
        ],
        xnycllx: [
          { type: 'string', max: 20, message: '不能超过20位', trigger: 'blur' }
        ],
        czcdjedsrdy: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcdjedsrdl: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcdjedsrpl: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcdjscdy: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcdjscdl: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcdjscgl: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcnzzscqy: [
          { type: 'string', max: 20, message: '不能超过20位', trigger: 'blur' }
        ],
        cnzzcxgs: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        mxdcbgs: [
          { type: 'string', max: 5, message: '不能超过5位', trigger: 'blur' }
        ],
        mbdcdtgs: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        zdcdtcs: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        zdcdtbs: [
          { type: 'string', max: 20, message: '不能超过20位', trigger: 'blur' }
        ],
        tzzgs: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        mdtdctzgs: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcnzzlx: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcnzzzczl: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcnzzzcbcrl: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcnzzedznl: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcnzzeddy: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcnzzzcedscdl: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcnzzlqfs: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcnzzjrfs: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcnzzdtxh: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcnzzdtbcdy: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcnzzdtwx: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        czcnzzxts: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        rylx: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        rybh: [
          { type: 'string', max: 50, message: '不能超过50位', trigger: 'blur' }
        ],
        yxrl: [
          { type: 'string', max: 5, message: '不能超过5位', trigger: 'blur' }
        ],
        zdscgl: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        edgl: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        zdsczj: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        cxhdcnzzxh: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        dqcqddjxh: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        qddjkzqxh: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        qddjkzqscqy: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        ddqczckzqxh: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        ddqczckzqscqy: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        cnzzzcbcdy: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        cznyglxtxhyj: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        cznyglxtxhrj: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        cznyglxtscqy: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        ddqcczcdjxh: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        ddqcczcdjscqy: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        xnyqcczssjkzzxhyj: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        xnyqcczssjkzzxhrj: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
        xnyqcczssjkzzscqy: [
          { type: 'string', max: 10, message: '不能超过10位', trigger: 'blur' }
        ],
      }
    }
  },
  created () {
    Page.props.pageSize.default = 10;
    Page.props.current.default = 1;
    this.selectCllx();
  },
  methods: {
    selectCllx (page) {
      this.$Loading.start();
      let cllx = this.form.cllx === undefined || null ? '' : this.form.cllx
      let current = page === undefined || null || '' ? 1 : page
      Page.props.current.default = current
      let pagesized = Page.props.pageSize.default === undefined ? 1 : Page.props.pageSize.default
      let sqlStartIndex = (current - 1) * pagesized
      let sqlNumber = pagesized
      let sortField = this.sortField
      let sortType = this.sortType
      selectFromCarType(cllx, sqlStartIndex, sqlNumber, sortField, sortType).then(res => {
        this.form.dataFrom = res.data.datas.rows;
        this.form.total = res.data.datas.count;
        this.form.cllxarr = res.data.datas.cllx;
        this.$Loading.finish();
      })
      error: () => {
        this.$Loading.error();
      }
    },
    changePage (page) {
      this.selectCllx(page)
    },

    changePageSize (page) {
      Page.props.pageSize.default = page;
      this.selectCllx()
    },
    confirmAdd (name) {
      if (this.form.cllxarr.indexOf(this.formLeft.cllx) >= 0) {
        this.$Message.info('该车辆类型已存在');
      } else {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Loading.start();
            addToCarType(this.formLeft).then(res => {
              if (res.data.result) {
                this.$Message.info('添加成功');
              } else {
                this.$Message.info('添加失败');
              }
              this.addFrom = false;
              this.$Loading.finish();
              this.selectCllx(this.$refs.pageEntity.currentPage);
            })
          } else {

          }
        })
      }
    },
    confirmEdit (name) {
      this.$Loading.start();
      updateCarTypeByCllx(this.formRight).then(res => {
        if (res.data.result) {
          this.$Message.info('修改成功');
        } else {
          this.$Message.info('修改失败');
        }
        this.loading = false;
        this.editFrom = false;
        this.$Loading.finish();
        this.selectCllx(this.$refs.pageEntity.currentPage);
      })
    },
    cancleAdd (formName) {
      this.$refs[formName].resetFields();
      this.addFrom = false;
    },
    cancleEdit () {
      this.formRight = this.updatedata;
      this.editFrom = false;
    },
    handleCar (val) {
      this.formLeft.cllx = val;
    },
    serchCllx () {
      this.$Loading.start();
      let pag = this.form.page;
      let cllx = this.form.cllx === undefined || null ? '' : this.form.cllx;
      let current = pag === undefined || null ? 1 : pag;
      let pagesized = Page.data().currentPageSize === undefined ? Page.props.pageSize.default : Page.data().currentPageSize;
      let sqlStartIndex = (current - 1) * pagesized;
      let sqlNumber = pagesized;
      let sortField = this.sortField;
      let sortType = this.sortType;
      selectFromCarType(cllx, sqlStartIndex, sqlNumber, sortField, sortType).then(res => {
        this.form.dataFrom = res.data.datas.rows;
        this.form.total = res.data.datas.count;
        this.form.cllxarr = res.data.datas.cllx;
        this.$Loading.finish();
      })
      error: () => {
        this.$Loading.error();
      }
    },
    addCllx () {
      this.addFrom = true;
    },
    updateCllx (data) {
      this.editFrom = true;
      this.formRight = Object.assign({}, data.row);
      // this.updatedata =  data.row;
    },
    deleteCllx (data) {
      this.$Loading.start();
      deleteFromCarTypeByCllx(data.row.cllx).then(res => {
        if (res.data.result) {
          this.$Message.info('删除成功');
        } else {
          this.$Message.info('删除失败');
        }
        this.selectCllx(1);
        this.$refs.pageEntity.currentPage = 1;
        this.$Loading.finish();
      })
    },
    queryBeforeDeleteCllx (data) {
      queryBeforeDeleteFromSfjhqcbhByCllx(data.row.cllx).then(res => {
        if (res.data.result) {
          return true
        } else {
          this.$Message.warning('该车型已绑定车辆,请先处理')
          return false
        }
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
      this.selectCllx();
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
</style>
