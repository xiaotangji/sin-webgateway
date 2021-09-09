<template>
  <div class="content">
    <div class="toolPanel">
    <div  class="search-con search-con-top">
      <Select v-model="params.searchKey" class="search-col" @on-change="handleChange">
        <Option v-for="item in params.columns" :key="`search-col-${item.key}`" :value="item.value">{{ item.key }}</Option>
      </Select>
      <Select v-model="params.searchValue" class="search-input" filterable allow-create clearable   @on-create="handleCreate">
        <Option v-for="item in params.inputarr" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
<!--      <DatePicker-->
<!--        :open="params.open"-->
<!--        :value="params.value3"-->
<!--        confirm-->
<!--        type="datetimerange"-->
<!--        @on-change="handleChange1"-->
<!--        @on-clear="handleClear"-->
<!--        @on-ok="handleOk">-->
<!--        <a href="javascript:void(0)" @click="handleClick">-->
<!--          <Icon type="ios-calendar-outline" size="18"></Icon>-->
<!--          <template v-if="params.value3.length === 0 ">请选择时间区间</template>-->
<!--          <template v-else>{{ params.value3[0] + ' 至 ' + params.value3[0] }}</template>-->
<!--        </a>-->
<!--      </DatePicker>-->
      <DatePicker :value="params.time" @on-change="handleChange1" type="datetimerange" format="yyyy-MM-dd HH:mm:ss" placeholder="请选择开始时间 至 结束时间" style="width: 300px"></DatePicker>
      <Button type="primary" @click="query" :disabled="params.kaishi_disabled_Flag || !(params.searchValue != '' && params.time.join('').trim() != '')" style="margin-left: 15px">开始</Button>
      <Button type="primary"  :disabled="params.zanting_disabled_Flag" v-if="params.status" @click="play_pause_Click" style="margin-left: 15px">暂停</Button>
      <Button type="primary"  :disabled="params.jixu_disabled_Flag" v-if="!params.status" @click="play_pause_Click" style="margin-left: 15px">继续</Button>
      <Button type="primary" @click="speedUpDown" :disabled="params.kuaijin_disabled_Flag" style="margin-left: 15px">快进</Button>
      <Button type="primary" @click="quxiao" :disabled="params.quxiao_disabled_Flag" style="margin-left: 15px">取消</Button>
      <span style="padding-left: 10px">{{params.msg}}</span>
    </div>
  </div>
    <div id="topDiv">
      <div id="mainMap">
        <card style="z-index: 2;width: 30%;background: rgba(37, 30, 30, 0.7);color: blanchedalmond">
          <p slot="title">
            <Icon type="ios-film-outline"></Icon>
            车辆信息
          </p>
          <p v-for="(value,key) in randomInfoList" :key="key">
            {{ key + ':'+ value }}
          </p>
        </card>
      </div>
      <div id="chartDiv">
        <div ref = "topDiv" id="chartOfV"></div>
        <div ref = "downDiv" id="chartOfT"></div>
      </div>
    </div>
    <div id="tableDiv">
      <Tabs type="card" value="dynamic">
        <TabPane label="动态数据" name="dynamic">
          <Tabs value="zc">
            <TabPane label="整车数据" name="zc">
              <div class="tableBox">
                <table>
                  <tr>
                    <td>车辆状态</td>
                    <td>{{ canDataObj.clztzw }}</td>
                    <td>充电状态</td>
                    <td>{{ canDataObj.cdztzw }}</td>
                  </tr>
                  <tr>
                    <td>运行模式</td>
                    <td>{{ canDataObj.yxmszw }}</td>
                    <td>车速(km/h)</td>
                    <td>{{ canDataObj.cs }}</td>
                  </tr>
                  <tr>
                    <td>累计里程(km)</td>
                    <td>{{ canDataObj.ljxc }}</td>
                    <td>总电压(V)</td>
                    <td>{{ canDataObj.zdy }}</td>
                  </tr>
                  <tr>
                    <td>总电流(A)</td>
                    <td>{{ canDataObj.zdl }}</td>
                    <td>SOC</td>
                    <td>{{ canDataObj.SOC}}</td>
                  </tr>
                  <tr>
                    <td>DC/DC状态</td>
                    <td>{{ canDataObj.DC_DCzw}}</td>
                    <td>档位</td>
                    <td>{{ canDataObj.dwzw }}</td>
                  </tr>
                  <tr>
                    <td>有无驱动力</td>
                    <td>{{ canDataObj.dw_qd != undefined ? (canDataObj.dw_qd > 0 ? '有' : '无') : '' }}</td>
                    <td>有无制动力</td>
                    <td>{{ canDataObj.dw_zd != undefined ? (canDataObj.dw_zd > 0 ? '有' : '无') : '' }}</td>
                  </tr>
                  <tr>
                    <td>绝缘电阻(kΩ)</td>
                    <td>{{ canDataObj.jydz }}</td>
                    <td>加速踏板行程值</td>
                    <td>{{ canDataObj.jstb }}</td>
                  </tr>
                  <tr>
                    <td>制动踏板行程值</td>
                    <td>{{ canDataObj.zdtb }}</td>
                  </tr>
                </table>
              </div>
            </TabPane>
            <TabPane label="驱动电机数据" name="qddj">
              <div class="tableBox">
                <table>
                  <tr>
                    <td style="width: 50%">驱动电机个数</td>
                    <td style="width: 50%">{{canDataObj.qddjgs}}</td>
                  </tr>
                  <div style="width: 200%" v-for="(qddjsj,index) in canDataObj.qddjzcxxlb" :key="index">
                    <tr>
                      <td rowspan="8">驱动电机总成信息列表1</td>
                      <td>驱动电机序号</td>
                      <td>{{qddjsj.qddjxh}}</td>
                    </tr>
                    <tr>
                      <td>驱动电机状态</td>
                      <td>{{qddjsj.qddjztzw}}</td>
                    </tr>
                    <tr>
                      <td>驱动电机控制器温度</td>
                      <td>{{qddjsj.qddjkzqwd}}</td>
                    </tr>
                    <tr>
                      <td>驱动电机转速</td>
                      <td>{{qddjsj.qddjzs}}</td>
                    </tr>
                    <tr>
                      <td>驱动电机转矩</td>
                      <td>{{qddjsj.qddjzj}}</td>
                    </tr>
                    <tr>
                      <td>驱动电机温度</td>
                      <td>{{qddjsj.qddjwd}}</td>
                    </tr>
                    <tr>
                      <td>电机控制器输入电压</td>
                      <td>{{qddjsj.djkzqsrdy}}</td>
                    </tr>
                    <tr>
                      <td>电机控制器直流母线电流</td>
                      <td>{{qddjsj.djkzqzlmxdl}}</td>
                    </tr>
                  </div>
                </table>
              </div>
            </TabPane>
            <TabPane label="燃料电池数据" name="rldc">
              <div class="tableBox">
                <table>
                  <tr>
                    <td>燃料电池电压(V)</td>
                    <td>{{ canDataObj.rldcdy }}</td>
                    <td>燃料电池电流(A)</td>
                    <td>{{ canDataObj.rldcdl }}</td>
                  </tr>
                  <tr>
                    <td>燃料消耗率(kg/km)</td>
                    <td>{{ canDataObj.rlxhl }}</td>
                    <td>燃料电池温度探针总数</td>
                    <td>{{ canDataObj.rldcwdtzzs}}</td>
                  </tr>
                  <tr>
                    <td>探针温度值(℃)</td>
                    <td>{{ [...canDataObj.tzwdzs]}}</td>
                    <td>氢温度中最高温度(℃)</td>
                    <td>{{ canDataObj.qxtzzgwd}}</td>
                  </tr>
                  <tr>
                    <td>氢气最高浓度传感器代号</td>
                    <td>{{ canDataObj.qxtzzgwdtzdh}}</td>
                    <td>氢气最高浓度(mg/kg)</td>
                    <td>{{ canDataObj.qqzgnd}}</td>
                  </tr>
                  <tr>
                    <td>氢气最高浓度传感器代号</td>
                    <td>{{ canDataObj.qqzgndcgqdh}}</td>
                    <td>氢气最高压力</td>
                    <td>{{ canDataObj.qqzgyl }}</td>
                  </tr>
                  <tr>
                    <td>氢气最高压力传感器代号</td>
                    <td>{{ canDataObj.qqzgylcgqdh }}</td>
                    <td>高压DC/DC状态</td>
                    <td>{{ canDataObj.gydcdcztzw }}</td>
                  </tr>
                </table>
              </div>
            </TabPane>
            <TabPane label="发动机数据" name="fdj">
              <div class="tableBox">
                <table>
                  <tr>
                    <td>发动机状态</td>
                    <td>{{ canDataObj.fdjztzw }}</td>
                    <td>曲轴转速(r/min)</td>
                    <td>{{ canDataObj.qzzs }}</td>
                  </tr>
                  <tr>
                    <td>燃料消耗率(L/km)</td>
                    <td>{{ canDataObj.rlxhlfdj }}</td>
                  </tr>
                </table>
              </div>
            </TabPane>
            <TabPane label="车辆位置" name="clwz">
              <div class="tableBox">
                <table>
                  <tr>
                    <td>定位状态</td>
                    <td>{{ canDataObj.dwzt0zw }}</td>
                    <td>经度</td>
                    <td>{{ canDataObj.jd }}</td>
                  </tr>
                  <tr>
                    <td>纬度</td>
                    <td>{{ canDataObj.wd }}</td>
                  </tr>
                </table>
              </div>
            </TabPane>
            <TabPane label="极值数据" name="jz">
              <div class="tableBox">
                <table>
                  <tr>
                    <td>最高电压电池子系统号</td>
                    <td>{{ canDataObj.zgdydczxth }}</td>
                    <td>最高电压电池单体代号</td>
                    <td>{{ canDataObj.zgdydcdtdh }}</td>
                  </tr>
                  <tr>
                    <td>电池单体电压最高值</td>
                    <td>{{ canDataObj.dcdtdyzgz }}</td>
                    <td>最低电压电池子系统号</td>
                    <td>{{ canDataObj.zddydcdtdh }}</td>
                  </tr>
                  <tr>
                    <td>最低电压电池单体代号</td>
                    <td>{{ canDataObj.zddydcdtdh }}</td>
                    <td>电池单体电压最低值</td>
                    <td>{{ canDataObj.dcdtdyzdz }}</td>
                  </tr>
                  <tr>
                    <td>最高溫度子系统号</td>
                    <td>{{ canDataObj.zgwdzxth }}</td>
                    <td>最高温度探针序号</td>
                    <td>{{ canDataObj.zgwdtzxh}}</td>
                  </tr>
                  <tr>
                    <td>最高温度值</td>
                    <td>{{ canDataObj.zgwdz}}</td>
                    <td>最低温度子系统号</td>
                    <td>{{ canDataObj.zdwdzxth }}</td>
                  </tr>
                  <tr>
                    <td>最低温度探针序号</td>
                    <td>{{ canDataObj.zdwdtzxh }}</td>
                    <td>最低温度值</td>
                    <td>{{ canDataObj.zdwdz }}</td>
                  </tr>
                </table>
              </div>
            </TabPane>
            <TabPane label="报警数据" name="bj">
              <div class="tableBox">
                <table>
                  <tr>
                    <td>最高报警等级</td>
                    <td>{{ canDataObj.zgbjdj }}</td>
                    <td>温度差异报警</td>
                    <td>{{ canDataObj.wdcybj }}</td>
                  </tr>
                  <tr>
                    <td>电池高温报警</td>
                    <td>{{ canDataObj.dcgwbj }}</td>
                    <td>车载储能装置类型过压报警</td>
                    <td>{{ canDataObj.czcnzzlxgybj }}</td>
                  </tr>
                  <tr>
                    <td>车载储能装置类型欠压报警</td>
                    <td>{{ canDataObj.czcnzzlxqybj }}</td>
                    <td>soc低报警</td>
                    <td>{{ canDataObj.socdbj }}</td>
                  </tr>
                  <tr>
                    <td>单体电池过压报警</td>
                    <td>{{ canDataObj.dtdcgybj }}</td>
                    <td>单体电池欠压报警</td>
                    <td>{{ canDataObj.dtdcqybj}}</td>
                  </tr>
                  <tr>
                    <td>soc过高报警</td>
                    <td>{{ canDataObj.socggbj}}</td>
                    <td>soc跳变报警</td>
                    <td>{{ canDataObj.soctbbj }}</td>
                  </tr>
                  <tr>
                    <td>可充电储能系统不匹配报警</td>
                    <td>{{ canDataObj.kcdcnxtbppbj }}</td>
                    <td>电池单体一致性差报警</td>
                    <td>{{ canDataObj.dcdtyzxcbj }}</td>
                  </tr>
                  <tr>
                    <td>绝缘报警</td>
                    <td>{{ canDataObj.jybj}}</td>
                    <td>DC-DC温度报警</td>
                    <td>{{ canDataObj.dcdcwdbj }}</td>
                  </tr>
                  <tr>
                    <td>制动系统报警</td>
                    <td>{{ canDataObj.zdxtbj }}</td>
                    <td>DC-DC状态报警</td>
                    <td>{{ canDataObj.dcdcztbj }}</td>
                  </tr>
                  <tr>
                    <td>驱动电机控制器温度报警</td>
                    <td>{{ canDataObj.qddjkzqwdbj}}</td>
                    <td>高压互锁状态报警</td>
                    <td>{{ canDataObj.gyhsztbj }}</td>
                  </tr>
                  <tr>
                    <td>驱动电机温度报警</td>
                    <td>{{ canDataObj.qddjwdbj }}</td>
                    <td>车载储能装置类型过充</td>
                    <td>{{ canDataObj.czcnzzlxgc }}</td>
                  </tr>
                </table>
              </div>
            </TabPane>
            <TabPane label="登入登出" name="drdc">
              <div class="tableBox">
                <table>
                  <tr>
                    <td>可充电储能系统编码</td>
                    <td>{{ drxx.kcdcnxtbm }}</td>
                    <td>可充电储能系统编码长度</td>
                    <td>{{ drxx.kcdcnxtbmcd }}</td>
                  </tr>
                  <tr>
                    <td>可充电储能系统数</td>
                    <td>{{ drxx.kcdcnxts || '--'}}</td>
                    <td>iccid</td>
                    <td>{{ drxx.iccid }}</td>
                  </tr>
                  <tr>
                    <td>登入流水号</td>
                    <td>{{ drxx.drlsh }}</td>
                    <td>登出流水号</td>
                    <td>{{ drxx.dclsh || '--' }}</td>
                  </tr>
                </table>
              </div>
            </TabPane>
            <TabPane label="用户自定义" name="yhzdy">
              <div class="tableBox">
                <table>
                  <tr>
                    <td>累计充电量（kWh）</td>
                    <td>{{ canDataObj.zgbjdj }}</td>
                    <td>瞬时氢燃料消耗率（kg/s）</td>
                    <td>{{ canDataObj.wdcybj }}</td>
                  </tr>
                </table>
              </div>
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane label="静态数据" name="static">
          <Tabs>
            <TabPane label="基本信息" name="jb">
              <div class="tableBox">
                <table>
                  <tr>
                    <td>车载种类</td>
                    <td>{{ staticDataObj.cllx || '--' }}</td>
                    <td>整车质保期</td>
                    <td>{{ staticDataObj.zczbq || '--' }}</td>
                  </tr>
                  <tr>
                    <td>准载人数</td>
                    <td>{{ staticDataObj.zzrs || '--' }}</td>
                    <td>整车质量</td>
                    <td>{{ staticDataObj.zczl || '--' }}</td>
                  </tr>
                  <tr>
                    <td>整备质量</td>
                    <td>{{ staticDataObj.zbzl || '--' }}</td>
                    <td>纯电工况法续驶里程</td>
                    <td>{{ staticDataObj.cdgkfxslc || '--' }}</td>
                  </tr>
                  <tr>
                    <td>匀速法续驶里程</td>
                    <td>{{ staticDataObj.ysfxslc || '--' }}</td>
                    <td>最高车速</td>
                    <td>{{ staticDataObj.zgcs || '--' }}</td>
                  </tr>
                  <tr>
                    <td>能量回收装置</td>
                    <td>{{ staticDataObj.nlhszz || '--' }}</td>
                    <td>新能源车辆类型</td>
                    <td>{{ staticDataObj.xnycllx || '--' }}</td>
                  </tr>
                </table>
              </div>
            </TabPane>
            <TabPane label="车载电机信息" name="czdj">
              <div class="tableBox">
                <table>
                  <tr>
                    <td>车载充电机额定输入电压</td>
                    <td>{{ staticDataObj.czcdjedsrdy || '--' }}</td>
                    <td>车载充电机额定输入电流</td>
                    <td>{{ staticDataObj.czcdjedsrdl || '--' }}</td>
                  </tr>
                  <tr>
                    <td>车载充电机额定输入频率</td>
                    <td>{{ staticDataObj.czcdjedsrpl || '--' }}</td>
                    <td>车载充电机输出电压</td>
                    <td>{{ staticDataObj.czcdjscdy || '--' }}</td>
                  </tr>
                  <tr>
                    <td>车载充电机输出电流</td>
                    <td>{{ staticDataObj.czcdjscdl || '--' }}</td>
                    <td>车载充电机输出功率</td>
                    <td>{{ staticDataObj.czcdjscgl || '--' }}</td>
                  </tr>
                </table>
              </div>
            </TabPane>
            <TabPane label="驱动电机信息" name="qddj">
              <div class="tableBox">
                <table>
                  <tr>
                    <td>驱动电机类型</td>
                    <td>{{ staticDataObj.qddjxingh || '--' }}</td>
                    <td>驱动电机安装数量</td>
                    <td>{{ staticDataObj.qddjazsl || '--' }}</td>
                  </tr>
                  <tr>
                    <td>驱动电机布置型式</td>
                    <td>{{ staticDataObj.qddjbzxswz || '--' }}</td>
                    <td>驱动电机冷却方式</td>
                    <td>{{ staticDataObj.qddjlqfs || '--' }}</td>
                  </tr>
                  <tr>
                    <td>驱动电机额定电压</td>
                    <td>{{ staticDataObj.qddjeddy || '--' }}</td>
                    <td>驱动电机最大工作电流</td>
                    <td>{{ staticDataObj.qddjzdgzdl || '--' }}</td>
                  </tr>
                  <tr>
                    <td>驱动电机额定功率</td>
                    <td>{{ staticDataObj.qddjedgl || '--' }}</td>
                    <td>驱动电机峰值功率</td>
                    <td>{{ staticDataObj.qddjfzgl || '--' }}</td>
                  </tr>
                  <tr>
                    <td>驱动电机额定转速</td>
                    <td>{{ staticDataObj.qddjedzs || '--' }}</td>
                    <td>驱动电机最高转速</td>
                    <td>{{ staticDataObj.qddjzgzs || '--' }}</td>
                  </tr>
                  <tr>
                    <td>驱动电机额定转矩</td>
                    <td>{{ staticDataObj.qddjedzj || '--' }}</td>
                    <td>驱动电机峰值转矩</td>
                    <td>{{ staticDataObj.qddjfzzj || '--' }}</td>
                  </tr>
                  <tr>
                    <td>驱动电机最大输出转矩</td>
                    <td>{{ staticDataObj.qddjzdsczj || '--' }}</td>
                  </tr>
                </table>
              </div>
            </TabPane>
            <TabPane label="车载储能装置信息" name="czcnzz">
              <div class="tableBox">
                <table>
                  <tr>
                    <td>车载储能装置生产企业</td>
                    <td>{{ staticDataObj.czcnzzscqy || '--' }}</td>
                    <td>储能装置成箱个数</td>
                    <td>{{ staticDataObj.cnzzcxgs || '--' }}</td>
                  </tr>
                  <tr>
                    <td>每箱电池包个数</td>
                    <td>{{ staticDataObj.mxdcbgs || '--' }}</td>
                    <td>每包电池单体个数</td>
                    <td>{{ staticDataObj.mbdcdtgs || '--' }}</td>
                  </tr>
                  <tr>
                    <td>总电池单体串数</td>
                    <td>{{ staticDataObj.zdcdtcs || '--' }}</td>
                    <td>总电池单体并数</td>
                    <td>{{ staticDataObj.zdcdtbs || '--' }}</td>
                  </tr>
                  <tr>
                    <td>探针总个数</td>
                    <td>{{ staticDataObj.tzzgs || '--' }}</td>
                    <td>每单体电池探针个数</td>
                    <td>{{ staticDataObj.mdtdctzgs || '--' }}</td>
                  </tr>
                  <tr>
                    <td>车载储能装置类型</td>
                    <td>{{ staticDataObj.czcnzzlx || '--' }}</td>
                    <td>车载储能装置总成质量</td>
                    <td>{{ staticDataObj.czcnzzzczl || '--' }}</td>
                  </tr>
                  <tr>
                    <td>车载储能装置总成标称容量</td>
                    <td>{{ staticDataObj.czcnzzzcbcrl || '--' }}</td>
                    <td>车载储能装置额定总能量</td>
                    <td>{{ staticDataObj.czcnzzedznl || '--' }}</td>
                  </tr>
                  <tr>
                    <td>车载储能装置额定电压</td>
                    <td>{{ staticDataObj.czcnzzeddy || '--' }}</td>
                    <td>车载储能装置总成额定输出电流</td>
                    <td>{{ staticDataObj.czcnzzzcedscdl || '--' }}</td>
                  </tr>
                  <tr>
                    <td>车载储能装置冷却方式</td>
                    <td>{{ staticDataObj.czcnzzlqfs || '--' }}</td>
                    <td>车载储能装置加热方式</td>
                    <td>{{ staticDataObj.czcnzzjrfs || '--' }}</td>
                  </tr>
                  <tr>
                    <td>车载储能装置单体型号</td>
                    <td>{{ staticDataObj.czcnzzdtxh || '--' }}</td>
                    <td>车载储能装置单体标称电压</td>
                    <td>{{ staticDataObj.czcnzzdtbcdy || '--' }}</td>
                  </tr>
                  <tr>
                    <td>车载储能装置单体外形</td>
                    <td>{{ staticDataObj.czcnzzdtwx || '--' }}</td>
                    <td>车载储能装置单体外形尺寸</td>
                    <td>{{ staticDataObj.czcnzzdtwxcc || '--' }}</td>
                  </tr>
                  <tr>
                    <td>车载储能装置系统数</td>
                    <td>{{ staticDataObj.czcnzzxts || '--' }}</td>
                  </tr>
                </table>
              </div>
            </TabPane>
            <TabPane label="燃油部分信息" name="rybf">
              <div class="tableBox">
                <table>
                  <tr>
                    <td>发动机编号</td>
                    <td>{{ staticDataObj.fdjbh || '--' }}</td>
                    <td>燃油类型</td>
                    <td>{{ staticDataObj.rylx || '--' }}</td>
                  </tr>
                  <tr>
                    <td>燃油标号</td>
                    <td>{{ staticDataObj.rybh || '--' }}</td>
                    <td>油箱容量</td>
                    <td>{{ staticDataObj.yxrl || '--' }}</td>
                  </tr>
                  <tr>
                    <td>最大输出功率</td>
                    <td>{{ staticDataObj.zdscgl || '--' }}</td>
                    <td>额定功率</td>
                    <td>{{ staticDataObj.edgl || '--' }}</td>
                  </tr>
                  <tr>
                    <td>最大输出扭矩</td>
                    <td>{{ staticDataObj.zdsczj || '--' }}</td>
                  </tr>
                </table>
              </div>
            </TabPane>
            <TabPane label="视同十三个参数信息" name="stssgcs">
              <div class="tableBox">
                <table>
                  <tr>
                    <td>成箱后的储能装置型号</td>
                    <td>{{ staticDataObj.cxhdcnzzxh || '--' }}</td>
                    <td>动汽车驱动电机型号</td>
                    <td>{{ staticDataObj.dqcqddjxh || '--' }}</td>
                  </tr>
                  <tr>
                    <td>驱动电机控制器型号</td>
                    <td>{{ staticDataObj.qddjkzqxh || '--' }}</td>
                    <td>驱动电机控制器生产企业</td>
                    <td>{{ staticDataObj.qddjkzqscqy || '--' }}</td>
                  </tr>
                  <tr>
                    <td>电动汽车整车控制器型号</td>
                    <td>{{ staticDataObj.ddqczckzqxh || '--' }}</td>
                    <td>电动汽车整车控制器生产企业</td>
                    <td>{{ staticDataObj.ddqczckzqscqy || '--' }}</td>
                  </tr>
                  <tr>
                    <td>储能装置总成标称电压</td>
                    <td>{{ staticDataObj.cnzzzcbcdy || '--' }}</td>
                    <td>车载能源管理系统型号硬件</td>
                    <td>{{ staticDataObj.cznyglxtxhyj || '--' }}</td>
                  </tr>
                  <tr>
                    <td>车载能源管理系统型号软件</td>
                    <td>{{ staticDataObj.cznyglxtxhrj || '--' }}</td>
                    <td>车载能源管理系统生产企业</td>
                    <td>{{ staticDataObj.cznyglxtscqy || '--' }}</td>
                  </tr>
                  <tr>
                    <td>电动汽车车载充电机型号</td>
                    <td>{{ staticDataObj.ddqcczcdjxh || '--' }}</td>
                    <td>电动汽车车载充电机生产企业</td>
                    <td>{{ staticDataObj.ddqcczcdjscqy || '--' }}</td>
                  </tr>
                  <tr>
                    <td>新能源汽车车载实时监控装置型号硬件</td>
                    <td>{{ staticDataObj.xnyqcczssjkzzxhyj || '--' }}</td>
                    <td>新能源汽车车载实时监控装置型号软件</td>
                    <td>{{ staticDataObj.xnyqcczssjkzzxhrj || '--' }}</td>
                  </tr>
                  <tr>
                    <td>新能源汽车车载实时监控装置生产企业</td>
                    <td>{{ staticDataObj.xnyqcczssjkzzscqy || '--' }}</td>
                  </tr>
                </table>
              </div>
            </TabPane>
          </Tabs>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
import $ from 'jquery'
import echarts from 'echarts'
import AMapLoader from '@amap/amap-jsapi-loader'
import {
  getHistoryCan,
  selectStaticDataBySearchValue,
  getNewOneCldrFromCldrBySearchValue
} from '@/api/vehicle'
import { selectAllSfjhQcbh, selectFromSfjhQcbhBysearchValue } from '@/api/sfjhqcbh'
import { hexToDataview, decodeProtocal } from '@/libs/decode.js'
import { wgs84_to_gcj02 } from '@/libs/mapTransformToGaode.js'
let map = null;
let dianya_Option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    name: '电压/V',
    // axisLine: {
    //   show: true,
    //   lineStyle: {
    //     color: '#5470C6'
    //   }
    // },
    type: 'value'
  },
  series: [{
    itemStyle: {
      color: new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [
          { offset: 0, color: '#00cdbe' },
          { offset: 0.5, color: '#00cdbe' },
          { offset: 1, color: '#00cdbe' }
        ]
      )
    },
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'bar'
  }]
};
let wendu_Option = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  // 工具栏 text格式视图模式,刷新,下载为图片
  toolbox: {
    feature: {
      dataView: { show: true, readOnly: false },
      restore: { show: true },
      saveAsImage: { show: true }
    }
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    name: '温度/℃',
    // axisLine: {
    //   show: true,
    //   lineStyle: {
    //     color: '#91CC75'
    //   }
    // },
    type: 'value'
  },
  series: [{
    // 渐变色
    itemStyle: {
      color: new echarts.graphic.LinearGradient(
        0, 0, 0, 1,
        [
          { offset: 0, color: '#af98e0' },
          { offset: 0.5, color: '#af98e0' },
          { offset: 1, color: '#af98e0' }
        ]
      )
    },
    data: [120, 200, 150, 80, 70, 110, 130],
    type: 'bar'
  }]
}
// let traffic = new AMap.TileLayer.Traffic({
//   'autoRefresh': true, //  是否自动刷新，默认为false
//   'interval': 180 //  刷新间隔，默认180s
// });
// let satellite = new AMap.TileLayer.Satellite();
// let roadNet = new AMap.TileLayer.RoadNet();
export default {
  name: 'vehicleTraceReview_page',
  data () {
    return {
      // 平台所有的sfjhqcbh
      allSfjhQcbh: [],
      // 所有的历史can数据
      allHistoryCanData: [],
      canDataObj: {},
      staticDataObj: {},
      countIndex: 0,
      // 可充电储能装置电压数据  对象数组
      kcdcnzzdysj: [],
      // 可充电储能装置温度数据  对象数组
      kcdcnzzwdsj: [],
      //  登入信息
      drxx: {},
      car_blue64_img_url: require('@/assets/images/jiantou_64.png'),
      dianya_topChart: null,
      wendu_downChart: null,
      timer: null,
      marker: null,
      params: {
        // 页面查询参数对应的下拉选项
        inputarr: [],
        // 控制播放 true为播放,false为暂停
        status: true,
        speedarr: [0.5, 1, 2, 4, 8, 16],
        speed: 1,
        columns: [
          { 'key': 'VIN', 'value': 'qcsbh' },
          { 'key': '车牌号', 'value': 'cphm' },
          { 'key': '自编号', 'value': 'qcbh' },
          { 'key': '设备号', 'value': 'tboxbh' }],
        searchKey: 'qcbh',
        searchValue: '',
        // open: false,
        // value3: [],
        time: [],
        cacheMsg: '',
        msg: '',
        // true为禁用按钮
        kaishi_disabled_Flag: false,
        zanting_disabled_Flag: true,
        jixu_disabled_Flag: false,
        kuaijin_disabled_Flag: true,
        quxiao_disabled_Flag: true,
      },
      randomInfoList: {
        车牌号: '--',
        终端ID: '--',
        VIN号: '--',
        车辆类型: '',
        总里程: '--',
        SOC: '--',
        经度: '--',
        纬度: '--',
        时间: '--',
        速度: '--',
        状态: '--'
      }
    }
  },
  mounted () {
    this.initMap()
    this.marker = new AMap.Marker({
      icon: this.car_blue64_img_url
      // offset: new AMap.Pixel(-5, -5),
    })
    this.selectAllSfjhQcbh()
    // this.getCarInfoAndSelectCurrentCanBySecond()
    // let dianya_topDiv = document.getElementById('chartOfV');
    let dianya_topDiv = this.$refs.topDiv
    this.dianya_topChart = echarts.init(dianya_topDiv)
    // let wendu_downDiv = document.getElementById('chartOfT');
    let wendu_downDiv = this.$refs.downDiv
    this.wendu_downChart = echarts.init(wendu_downDiv)
    window.onresize = () => {
      this.dianya_topChart && this.dianya_topChart.resize()
      this.wendu_downChart && this.wendu_downChart.resize()
    }
  },
  methods: {
    // handleClick () {
    //   this.params.open = !this.params.open;
    // },
    handleChange1 (date) {
      this.params.time = date;
    },
    // handleClear () {
    //   this.params.open = false;
    // },
    // handleOk () {
    //   this.params.open = false
    // },
    query () {
      this.countIndex = 0
      let paramsArr = [this.params.searchKey, this.params.searchValue, this.params.time[0], this.params.time[1]]
      this.selectFromSfjhQcbh()
      this.getNewOneCldr()
      this.selectStaticData()
      getHistoryCan(...paramsArr).then(res => {
        if (res.data.result) {
          this.allHistoryCanData = res.data.datas
          this.kaishi()
          this.setTimeoutRun()
        } else {
          this.$Message.error('数据异常')
        }
      }).catch(err => {
        console.log(err)
        this.$Message.error(err)
      })
    },
    setTimeoutRun () {
      if (!this.allHistoryCanData.length > 0) {
        this.$Message.error('数据有误')
        return
      }
      if (this.params.status) {
        if (this.countIndex >= this.allHistoryCanData.length) {
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.wancheng()
          return
        }
        let dataviewWithSjcjsj = this.allHistoryCanData[this.countIndex++]
        // let sjcjsj = dataviewWithSjcjsj['sjcjsj']
        // let mlbs = dataviewWithSjcjsj['xxt'].substring(0, 1)
        let dataview = hexToDataview(dataviewWithSjcjsj['xxt'].substring(2))
        let canDataObj;
        try {
          canDataObj = decodeProtocal(dataview)
          console.log(canDataObj)
        } catch (e) {
          this.quxiao()
          console.log(e.name + ':' + e.message)
          this.$Message.error('can数据有误')
          return
        }
        this.canDataObj = canDataObj
        this.randomInfoList.总里程 = canDataObj.ljxc || '--'
        this.randomInfoList.SOC = canDataObj.SOC || '--'
        this.randomInfoList.经度 = canDataObj.jd || '--'
        this.randomInfoList.纬度 = canDataObj.wd || '--'
        this.randomInfoList.时间 = canDataObj.sjcjsj || '--'
        this.randomInfoList.速度 = canDataObj.cs + 'km/h' || '--'
        this.randomInfoList.状态 = canDataObj.clztzw || '--'
        // 可充电储能装置电压数据 x轴 坐标 category
        let kcdcnzzdyXaxis = []
        for (let i = 0; i < canDataObj.kcdcnzxtdyxxlb[0].dtdcdys.length; i++) {
          kcdcnzzdyXaxis.push('电压' + (i + 1))
        }
        // 可充电储能装置温度数据 x轴 坐标 category
        let kcdcnzzwdXaxis = []
        for (let i = 0; i < canDataObj.kcdcnzxtwdxxlb[0].kcdcnzxtgwdtzjcddwdzs.length; i++) {
          kcdcnzzwdXaxis.push('温度' + (i + 1))
        }
        dianya_Option.xAxis.data = kcdcnzzdyXaxis
        dianya_Option.series[0].data = canDataObj.kcdcnzxtdyxxlb[0].dtdcdys
        this.dianya_topChart.setOption(dianya_Option)
        wendu_Option.xAxis.data = kcdcnzzwdXaxis
        wendu_Option.series[0].data = canDataObj.kcdcnzxtwdxxlb[0].kcdcnzxtgwdtzjcddwdzs
        this.wendu_downChart.setOption(wendu_Option)
        let point1 = wgs84_to_gcj02(canDataObj.wd, canDataObj.jd)
        let point = [point1[1], point1[0]]
        this.marker.setPosition(new AMap.LngLat(point[0], point[1]))
        map.add(this.marker)
      }
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(this.setTimeoutRun, (1000 / this.params.speed))
    },
    kaishi () {
      this.params.kaishi_disabled_Flag = true
      this.params.zanting_disabled_Flag = false
      this.params.kuaijin_disabled_Flag = false
      this.params.quxiao_disabled_Flag = false
      this.params.msg = '播放中...'
    },
    quxiao () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.params.kaishi_disabled_Flag = false
      this.params.zanting_disabled_Flag = true
      this.params.kuaijin_disabled_Flag = true
      this.params.quxiao_disabled_Flag = true
      this.params.msg = ''
      this.params.time = []
      this.params.searchValue = ''
    },
    wancheng () {
      if (this.timer) {
        clearTimeout(this.timer)
      }
      this.params.kaishi_disabled_Flag = false
      this.params.zanting_disabled_Flag = true
      this.params.kuaijin_disabled_Flag = true
      this.params.quxiao_disabled_Flag = true
      this.params.msg = '播放完成'
      // 重置播放的索引 和 播放速度
      this.countIndex = 0
      this.params.speed = 1
    },
    speedUpDown () {
      let index = this.params.speedarr.indexOf(this.params.speed)
      index++
      index = index >= this.params.speedarr.length ? 0 : index
      this.params.speed = this.params.speedarr[index]
      this.params.msg = this.params.speed === 1 ? '播放中...' : 'X' + this.params.speed
    },
    play_pause_Click () {
      if (this.params.status) {
        this.params.cacheMsg = this.params.msg
        this.params.msg = '暂停播放'
      } else {
        this.params.msg = this.params.cacheMsg
      }
      this.params.status = !this.params.status
      this.params.kuaijin_disabled_Flag = !this.params.kuaijin_disabled_Flag
    },
    handleCreate (value) {
      this.params.searchValue = value
    },
    handleChange () {
      if (this.params.searchKey) {
        let inputarr = this.allSfjhQcbh.map(x => x[this.params.searchKey]).filter(x => x !== void 0)
        inputarr = [...new Set(inputarr)].sort((a, b) => a && b ? a.localeCompare(b) : 0)
        let inputArr = inputarr.map(x => ({
          label: x,
          value: x
        }))
        this.params.inputarr = inputArr
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
    getNewOneCldr () {
      getNewOneCldrFromCldrBySearchValue(this.params.searchKey, this.params.searchValue).then(res => {
        if (res.data.result) {
          this.drxx = res.data.datas;
          console.log(this.drxx)
        } else {
          this.$Message.error('获取最近登入信息有误')
        }
      }).catch(e => {
        console.log(err.name + ':' + err.message)
        this.$Message.error('获取最近登入信息有误')
      })
    },
    selectStaticData () {
      selectStaticDataBySearchValue(this.params.searchKey, this.params.searchValue, 0, 1, '', '').then(res => {
        if (res.data.result) {
          this.staticDataObj = res.data.datas[0]
        } else {
          this.$Message.error('获取静态数据有误')
        }
      }).catch(e => {
        console.log(err.name + ':' + err.message)
        this.$Message.error('获取静态数据有误')
      })
    },
    selectFromSfjhQcbh () {
      selectFromSfjhQcbhBysearchValue(this.params.searchKey, this.params.searchValue).then(res => {
        if (res.data.result) {
          this.randomInfoList.车牌号 = res.data.datas.cphm || '--'
          this.randomInfoList.VIN号 = res.data.datas.qcsbh || '--'
          this.randomInfoList.终端ID = res.data.datas.tboxbh || '--'
          this.randomInfoList.车辆类型 = res.data.datas.cllx || '--'
        } else {
          this.$Message.error('获取车辆信息有误')
        }
      }).catch(e => {
        console.log(err.name + ':' + err.message)
        this.$Message.error('获取车辆信息有误')
      })
    },
    initMap () {
      AMapLoader.load({
        key: '5e1c78a575c1372cb12d3e7e1e68275b', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '1.4.15', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: ['AMap.Scale'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
          // 是否加载 AMapUI，缺省不加载
          version: '1.1', // AMapUI 缺省 1.1
          plugins: [] // 需要加载的 AMapUI ui插件
        },
        Loca: {
          // 是否加载 Loca， 缺省不加载
          version: '1.3.2' // Loca 版本，缺省 1.3.2
        }
      }).then((AMap) => {
        map = new AMap.Map('mainMap', {
          resizeEnable: true,
          center: [120.610843, 31.32962],
          zoom: 11,
          features: ['bg', 'road', 'building', 'point']
        })
        AMap.plugin(['AMap.Scale', 'AMap.StationSearch', 'AMap.MouseTool'], () => {
          // 异步加载插件
          var scale = new AMap.Scale()
          map.addControl(scale)
          var stationSearch = new AMap.StationSearch()
          map.addControl(stationSearch)
        })
        // var layer = new Loca.LinkLayer({
        //   map: map,
        //   fitView: true
        // })
        //
        // layer.setData(city_line, {
        //   lnglat: 'line'
        // })
        // layer.setOptions({
        //   style: {
        //     borderWidth: 1.5,
        //     opacity: 0.8,
        //     color: '#D1E87D'
        //   }
        // })
        // layer.render()
      })
    },
    // 关闭信息窗体
    closeInfoWindow () {
      map.clearInfoWindow()
    },
    // 构建自定义信息窗体
    createInfoWindow (title, content) {
      var info = document.createElement('div')
      info.className = 'custom-info input-card content-window-card'
      // 可以通过下面的方式修改自定义窗体的宽高
      // info.style.width = '400px';
      // 定义顶部标题
      var top = document.createElement('div')
      var titleD = document.createElement('div')
      var closeX = document.createElement('img')
      top.className = 'info-top'
      titleD.innerHTML = title
      closeX.src = 'https://webapi.amap.com/images/close2.gif'
      closeX.onclick = this.closeInfoWindow
      top.appendChild(titleD)
      top.appendChild(closeX)
      info.appendChild(top)
      // 定义中部内容
      var middle = document.createElement('div')
      middle.className = 'info-middle'
      middle.style.backgroundColor = 'white'
      middle.style.display = 'flex'
      middle.innerHTML = content
      info.appendChild(middle)
      // 定义底部内容
      var bottom = document.createElement('div')
      bottom.className = 'info-bottom'
      bottom.style.position = 'relative'
      bottom.style.top = '0px'
      bottom.style.margin = '0 auto'
      var sharp = document.createElement('img')
      sharp.src = 'https://webapi.amap.com/images/sharp.png'
      bottom.appendChild(sharp)
      info.appendChild(bottom)
      return info
    }
  },
  beforeDestroy () {
    if (this.timer) {
      clearTimeout(this.timer)
    }
  },
  // 集合keep-alive组件使用
  activated () {
    console.log('activated钩子函数vehicleTrace')
  }
}
</script>

<style scoped>
  .content {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  #topDiv {
    height: 55%;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .search-con .search-col{
    display: inline-block;
    width: 120px;
  }
  .search-con .search-input{
    display: inline-block;
    width: 200px;
  }
  #mainMap {
    height: 100%;
    width: 50%;
  }
  #chartDiv {
    height: 100%;
    width: 50%;
    display: flex;
    flex-direction: column;
  }
  #chartOfV {
    width: 100%;
    flex: 1;
    height: 50%;
  }
  #chartOfT {
    width: 100%;
    flex: 1;
    height: 50%;
  }
  #tableDiv {
    width: 100%;
    height: 40%;
  }
  .tableBox{
    overflow-y: scroll;
    height: 230px;
  }
  table{
    display: table;
    text-indent: initial;
    width: 100%;
    border-collapse: collapse;
    background-color: #67494900;
    border-spacing: 0;
  }
  tbody {
    display: table-row-group;
    vertical-align: middle;
    border-color: inherit;
  }
  tr{
    border-bottom: 1px solid rgb(204, 204, 204);
    line-height: 30px;
    display: table-row;
    vertical-align: inherit;
    border-color: inherit;
  }
  td{
    border: 1px solid #ddd;
    padding-left: 8px;
  }
  table tr > td:nth-child(odd){
    width:20%
  }
  /*高德弹出窗口*/
  .content-window-card {
    position: relative;
    box-shadow: none;
    bottom: 0;
    left: 0;
    width: auto;
    padding: 0;
  }

  .content-window-card p {
    height: 2rem;
  }

  .custom-info {
    border: solid 1px silver;
  }

  div.info-top {
    position: relative;
    background: none repeat scroll 0 0 #F9F9F9;
    border-bottom: 1px solid #CCC;
    border-radius: 5px 5px 0 0;
  }

  div.info-top div {
    display: inline-block;
    color: #333333;
    font-size: 20px;
    font-weight: bold;
    line-height: 20px;
    padding: 0 10px;
  }

  div.info-top img {
    position: absolute;
    top: 10px;
    right: 10px;
    transition-duration: 0.25s;
  }

  div.info-top img:hover {
    box-shadow: 0px 0px 5px #000;
  }

  div.info-middle {
    font-size: 12px;
    padding: 10px 6px;
    line-height: 20px;
  }

  div.info-bottom {
    height: 0px;
    width: 100%;
    clear: both;
    text-align: center;
  }

  div.info-bottom img {
    position: relative;
    z-index: 104;
  }

  span {
    margin-left: 5px;
    font-size: 11px;
  }

  .info-middle img {
    float: left;
    margin-right: 6px;
  }
</style>
