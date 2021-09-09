/*
 * 解析can
 */

export const decodeProtocal = (dataView) => {
  let canDataObj = {}
  if (dataView == null) {
    return canDataObj
  }
  let index = 0
  // 车辆登入
  // let year = dataView.getUint8(index);
  // index++;
  // let month = dataView.getUint8(index);
  // index++;
  // let day = dataView.getUint8(index);
  // idnex++;
  // let hour = dataView.getUint8(index);
  // index++;
  // let minute = dataView.getUint8(index);
  // index++;
  // let second = dataView.getUint8(index);
  // index++;
  // let cldrsj = (year.toString(16) <= 9 ? '0' + year.toString(16) : year.toString(16)).concat('-').concat(month.toString(16) <= 9 ? '0' + month.toString(16) : month.toString(16)).concat('-').concat(day.toString(16) <= 9 ? '0' + day.toString(16) : day.toString(16)).concat(' ').concat(hour.toString(16) <= 9 ? '0' + hour.toString(16) : hour.toString(16)).concat(':').concat(minute.toString(16) <= 9 ? '0' + minute.toString(16) : minute.toString(16)).concat(':').concat(second.toString(16) <= 9 ? '0' + second.toString(16) : second.toString(16));
  // let drlsh = dataView.getUint16(index);
  // index += 2;
  // let ICCID = '';
  // for (let i = 0; i < 20; i++) {
  //   ICCID += String.fromCharCode(dataView.getUint8(index));
  //   index++;
  // }
  // let kcdcnzxts = dataView.getUint8(index);
  // index++;
  // let kcdcnxtbmcd = dataView.getUint8(inde);
  // index++;
  // for (let i = 0; i < kcdcnzxts * kcdcnxtbmcd; i++) {
  //   index++;
  // }

  // 实时信息上报
  // 数据采集时间
  let year1 = dataView.getUint8(index)
  index++
  let month1 = dataView.getUint8(index)
  index++
  let day1 = dataView.getUint8(index)
  index++
  let hour1 = dataView.getUint8(index)
  index++
  let minute1 = dataView.getUint8(index)
  index++
  let second1 = dataView.getUint8(index)
  index++
  let sjcjsj = (year1 <= 9 ? ('0' + year1) : year1) + ('-') + (month1 <= 9 ? ('0' + month1) : month1) + ('-') + (day1 <= 9 ? ('0' + day1) : day1) + (' ') + (hour1 <= 9 ? ('0' + hour1) : hour1) + (':') + (minute1 <= 9 ? ('0' + minute1) : minute1) + (':') + (second1 <= 9 ? ('0' + second1) : second1);
  canDataObj.sjcjsj = sjcjsj
  // 整车数据
  let xxlxbz1 = dataView.getUint8(index)
  canDataObj.xxlxbz1 = xxlxbz1
  index++
  let clzt = dataView.getUint8(index)
  let clztzw = clzt === 1 ? '启动' : clzt === 2 ? '熄火' : clzt === 3 ? '其他' : clzt === 0xFE ? '异常' : clzt === 0xFF ? '无效' : '--'
  canDataObj.clztzw = clztzw
  index++
  let cdzt = dataView.getUint8(index)
  let cdztzw = cdzt === 1 ? '停车充电' : cdzt === 2 ? '行车充电' : cdzt === 3 ? '未充电' : cdzt === 4 ? '充电完成' : cdzt === 0xFE ? '异常' : cdzt === 0xFF ? '无效' : '--'
  canDataObj.cdztzw = cdztzw
  index++
  let yxms = dataView.getUint8(index)
  let yxmszw = yxms === 1 ? '纯电' : yxms === 2 ? '混动' : yxms === 3 ? '燃油' : yxms === 0xFE ? '异常' : yxms === 0xFF ? '无效' : '--'
  canDataObj.yxmszw = yxmszw
  index++
  let cs = dataView.getUint16(index)
  cs = (cs === 0xFFFE ? '异常' : cs === 0xFFFF ? '无效' : cs * 0.1)
  canDataObj.cs = cs
  index += 2
  // 累计里程
  let ljxc = dataView.getUint32(index)
  ljxc = (ljxc === 0xFFFFFFFE ? '异常' : ljxc === 0xFFFFFFFF ? '无效' : (ljxc * 0.1).toFixed(0))
  canDataObj.ljxc = ljxc
  index += 4
  // 总电压
  let zdy = dataView.getUint16(index)
  zdy = (zdy === 0xFFFE ? '异常' : zdy === 0xFFFF ? '无效' : (zdy * 0.1).toFixed(1))
  canDataObj.zdy = zdy
  index += 2
  // 总电流
  let zdl = dataView.getUint16(index)
  zdl = (zdl === 0xFFFE ? '异常' : zdl === 0xFFFF ? '无效' : (zdl * 0.1 - 1000).toFixed(1))
  canDataObj.zdl = zdl
  index += 2
  // SOC
  let SOC = dataView.getUint8(index)
  SOC = (SOC === 0xFE ? '异常' : SOC === 0xFF ? '无效' : SOC + '%')
  canDataObj.SOC = SOC
  index++
  // DC-DC状态
  let DC_DC = dataView.getUint8(index)
  let DC_DCzw = DC_DC === 1 ? '工作' : DC_DC === 2 ? '断开' : DC_DC === 0xFE ? '异常' : clzt === 0xFF ? '无效' : '--'
  canDataObj.DC_DCzw = DC_DCzw
  index++
  // 档位
  let dw = dataView.getUint8(index)
  let dw1 = getCanBitNum(dw, 0, 4)
  let dwzw = dwztObj[dw1] === undefined ? dw1 : dwztObj[dw1]
  canDataObj.dwzw = dwzw
  let dw_zd = getCanBitNum(dw, 4, 1)
  canDataObj.dw_zd = dw_zd
  let dw_qd = getCanBitNum(dw, 5, 1)
  canDataObj.dw_qd = dw_qd
  index++
  // 绝缘电阻
  let jydz = dataView.getUint16(index).toFixed(0)
  canDataObj.jydz = jydz
  index += 2
  // 加速踏板行程值
  let jstb = dataView.getUint8(index)
  jstb = (jstb === 0xFE ? '异常' : jstb === 0xFF ? '无效' : jstb + '%')
  canDataObj.jstb = jstb
  index++
  // 制动踏板
  let zdtb = dataView.getUint8(index)
  zdtb = (zdtb === 0xFE ? '异常' : zdtb === 0xFF ? '无效' : zdtb + '%')
  canDataObj.zdtb = zdtb
  index++

  // 驱动电机数据
  let xxlxbz2 = dataView.getUint8(index)
  canDataObj.xxlxbz2 = xxlxbz2
  index++
  let qddjgs = dataView.getUint8(index)
  canDataObj.qddjgs = qddjgs
  index++
  // 驱动电机总成信息列表
  let qddjzcxxlb = []
  for (let i = 0; i < qddjgs; i++) {
    // 驱动电机序号
    let qddjxh = dataView.getUint8(index)
    index++
    // 驱动电机状态
    let qddjzt = dataView.getUint8(index)
    let qddjztzw = qddjzt === 1 ? '耗电' : qddjzt === 2 ? '发电' : qddjzt === 3 ? '关闭' : qddjzt === 4 ? '准备' : qddjzt === 0xFE ? '异常' : qddjzt === 0xFF ? '无效' : '--'
    index++
    // 驱动电机控制器温度
    let qddjkzqwd = dataView.getUint8(index)
    qddjkzqwd = (qddjkzqwd === 0xFE ? '异常' : qddjkzqwd === 0xFF ? '无效' : (qddjkzqwd - 40).toFixed(0))
    index++
    // 驱动电机转速
    let qddjzs = dataView.getUint16(index)
    qddjzs = (qddjzs === 0xFFFE ? '异常' : qddjzs === 0xFFFF ? '无效' : (qddjzs - 20000).toFixed(0))
    index += 2
    // 驱动电机转矩
    let qddjzj = dataView.getUint16(index)
    qddjzj = (qddjzj === 0xFFFE ? '异常' : qddjzj === 0xFFFF ? '无效' : ((qddjzj - 20000) * 0.1).toFixed(0))
    index += 2
    // 驱动电机温度
    let qddjwd = dataView.getUint8(index)
    qddjwd = (qddjwd === 0xFE ? '异常' : qddjwd === 0xFF ? '无效' : (qddjwd - 40).toFixed(0))
    index++
    // 电机控制器输入电压
    let djkzqsrdy = dataView.getUint16(index)
    djkzqsrdy = (djkzqsrdy === 0xFFFE ? '异常' : djkzqsrdy === 0xFFFF ? '无效' : (djkzqsrdy * 0.1).toFixed(1))
    index += 2
    // 电机控制器直流母线电流
    let djkzqzlmxdl = dataView.getUint16(index)
    djkzqzlmxdl = (djkzqzlmxdl === 0xFFFE ? '异常' : djkzqzlmxdl === 0xFFFF ? '无效' : (djkzqzlmxdl * 0.1 - 1000).toFixed(0))
    index += 2
    qddjzcxxlb.push({
      qddjxh,
      qddjztzw,
      qddjkzqwd,
      qddjzs,
      qddjzj,
      qddjwd,
      djkzqsrdy,
      djkzqzlmxdl
    })
  }
  canDataObj.qddjzcxxlb = qddjzcxxlb

  // 燃料电池数据
  let xxlxbz3 = dataView.getUint8(index)
  canDataObj.xxlxbz3 = xxlxbz3
  index++
  // 燃料电池电压
  let rldcdy = dataView.getUint16(index)
  rldcdy = (rldcdy === 0xFFFE ? '异常' : rldcdy === 0xFFFF ? '无效' : (rldcdy * 0.1).toFixed(1))
  canDataObj.rldcdy = rldcdy
  index += 2
  // 燃料电池电流
  let rldcdl = dataView.getUint16(index)
  rldcdl = (rldcdl === 0xFFFE ? '异常' : rldcdl === 0xFFFF ? '无效' : (rldcdl * 0.1).toFixed(1))
  canDataObj.rldcdl = rldcdl
  index += 2
  // 燃料消耗率
  let rlxhl = dataView.getUint16(index)
  rlxhl = (rlxhl === 0xFFFE ? '异常' : rlxhl === 0xFFFF ? '无效' : (rlxhl * 0.01).toFixed(1))
  canDataObj.rlxhl = rlxhl
  index += 2
  // N个燃料电池温度探针
  let rldcwdtzzs = dataView.getUint16(index)
  rldcwdtzzs = (rldcwdtzzs === 0xFFFE ? '异常' : rldcwdtzzs === 0xFFFF ? '无效' : rldcwdtzzs)
  canDataObj.rldcwdtzzs = rldcwdtzzs
  index += 2
  // 探针温度值
  let tzwdzs = []
  if (rldcwdtzzs !== '异常' && rldcwdtzzs !== '无效') {
    for (let i = 0; i < rldcwdtzzs; i++) {
      let tzwdz = dataView.getUint8(index) - 40
      tzwdzs.push(tzwdz)
      index++
    }
  }
  canDataObj.tzwdzs = tzwdzs
  // 氢系统中最高温度
  let qxtzzgwd = dataView.getUint16(index)
  qxtzzgwd = (qxtzzgwd === 0xFFFE ? '异常' : qxtzzgwd === 0xFFFF ? '无效' : (qxtzzgwd * 0.1 - 40).toFixed(0))
  canDataObj.qxtzzgwd = qxtzzgwd
  index += 2
  // 氢系统中最高温度探针代号
  let qxtzzgwdtzdh = dataView.getUint8(index)
  qxtzzgwdtzdh = (qxtzzgwdtzdh === 0xFE ? '异常' : qxtzzgwdtzdh === 0xFF ? '无效' : qxtzzgwdtzdh)
  canDataObj.qxtzzgwdtzdh = qxtzzgwdtzdh
  index++
  // 氢气最高浓度
  let qqzgnd = dataView.getUint16(index)
  qqzgnd = (qqzgnd === 0xFFFE ? '异常' : qqzgnd === 0xFFFF ? '无效' : qqzgnd.toFixed(0))
  canDataObj.qqzgnd = qqzgnd
  index += 2
  // 氢气最高浓度传感器代号
  let qqzgndcgqdh = dataView.getUint8(index)
  qqzgndcgqdh = (qqzgndcgqdh === 0xFE ? '异常' : qqzgndcgqdh === 0xFF ? '无效' : qqzgndcgqdh)
  canDataObj.qqzgndcgqdh = qqzgndcgqdh
  index++
  // 氢气最高压力
  let qqzgyl = dataView.getUint16(index)
  canDataObj.qqzgyl = qqzgyl.toFixed(0)
  index += 2
  // 氢气最高压力传感器代号
  let qqzgylcgqdh = dataView.getUint8(index)
  qqzgylcgqdh = (qqzgylcgqdh === 0xFE ? '异常' : qqzgylcgqdh === 0xFF ? '无效' : qqzgylcgqdh)
  canDataObj.qqzgylcgqdh = qqzgylcgqdh
  index++
  // 高压DC/DC状态
  let gydcdczt = dataView.getUint8(index)
  let gydcdcztzw = gydcdczt === 1 ? '工作' : gydcdczt === 2 ? '断开' : gydcdczt === 0xFE ? '异常' : gydcdczt === 0xFF ? '无效' : '--'
  canDataObj.gydcdcztzw = gydcdcztzw
  index++

  // 发动机数据
  let xxlxbz4 = dataView.getUint8(index)
  canDataObj.xxlxbz4 = xxlxbz4
  index++
  // 发动机状态
  let fdjzt = dataView.getUint8(index)
  let fdjztzw = fdjzt === 1 ? '启动' : fdjzt === 2 ? '关闭' : fdjzt === 0xFE ? '异常' : fdjzt === 0xFF ? '无效' : '--'
  canDataObj.fdjztzw = fdjztzw
  index++
  // 曲轴转速
  let qzzs = dataView.getUint16(index)
  qzzs = (qzzs === 0xFFFE ? '异常' : qzzs === 0xFFFF ? '无效' : qzzs)
  canDataObj.qzzs = qzzs
  index += 2
  // 燃料消耗率
  let rlxhlfdj = dataView.getUint16(index)
  rlxhlfdj = (rlxhlfdj === 0xFFFE ? '异常' : rlxhlfdj === 0xFFFF ? '无效' : rlxhlfdj * 0.01)
  canDataObj.rlxhlfdj = rlxhlfdj
  index += 2

  // 车辆位置数据
  let xxlxbz5 = dataView.getUint8(index)
  canDataObj.xxlxbz5 = xxlxbz5
  index++
  // 定位状态
  let dwzt = dataView.getUint8(index)
  let dwzt0 = getCanBitNum(dwzt, 0, 1)
  let dwzt0zw = dwzt0 === 0 ? '有效定位' : '无效定位'
  canDataObj.dwzt0zw = dwzt0zw
  let dwzt1 = getCanBitNum(dwzt, 0, 1)
  let dwzt1zw = dwzt1 === 0 ? '北纬' : '南纬'
  canDataObj.dwzt1zw = dwzt1zw
  let dwzt2 = getCanBitNum(dwzt, 0, 1)
  let dwzt2zw = dwzt2 === 0 ? '东经' : '西经'
  canDataObj.dwzt2zw = dwzt2zw
  index++
  // 经度
  let jd = (dataView.getUint32(index) * 0.000001).toFixed(5)
  canDataObj.jd = jd
  index += 4
  // 纬度
  let wd = (dataView.getUint32(index) * 0.000001).toFixed(5)
  canDataObj.wd = wd
  index += 4

  // 极值数据
  let xxlxbz6 = dataView.getUint8(index)
  canDataObj.xxlxbz6 = xxlxbz6
  index++
  // 最高电压电池子系统号
  let zgdydczxth = dataView.getUint8(index)
  zgdydczxth = (zgdydczxth === 0xFE ? '异常' : zgdydczxth === 0xFF ? '无效' : zgdydczxth.toFixed(0));
  canDataObj.zgdydczxth = zgdydczxth
  index++
  // 最高电压电池单体代号
  let zgdydcdtdh = dataView.getUint8(index)
  zgdydcdtdh = (zgdydcdtdh === 0xFE ? '异常' : zgdydcdtdh === 0xFF ? '无效' : zgdydcdtdh.toFixed(0));
  canDataObj.zgdydcdtdh = zgdydcdtdh
  index++
  // 电池单体电压最高值
  let dcdtdyzgz = dataView.getUint16(index)
  dcdtdyzgz = (dcdtdyzgz === 0xFFFE ? '异常' : dcdtdyzgz === 0xFFFF ? '无效' : (dcdtdyzgz * 0.001).toFixed(1));
  canDataObj.dcdtdyzgz = dcdtdyzgz
  index += 2
  // 最低电压电池子系统号
  let zddydczxth = dataView.getUint8(index)
  zddydczxth = (zddydczxth === 0xFE ? '异常' : zddydczxth === 0xFF ? '无效' : zddydczxth.toFixed(0));
  canDataObj.zddydczxth = zddydczxth
  index++
  // 最低电压电池单体代号
  let zddydcdtdh = dataView.getUint8(index)
  zddydcdtdh = (zddydcdtdh === 0xFE ? '异常' : zddydcdtdh === 0xFF ? '无效' : zddydcdtdh.toFixed(0));
  canDataObj.zddydcdtdh = zddydcdtdh
  index++
  // 电池单体电压最低值
  let dcdtdyzdz = dataView.getUint16(index)
  dcdtdyzdz = (dcdtdyzdz === 0xFFFE ? '异常' : dcdtdyzdz === 0xFFFF ? '无效' : (dcdtdyzdz * 0.001).toFixed(1));
  canDataObj.dcdtdyzdz = dcdtdyzdz
  index += 2
  // 最高溫度子系统号
  let zgwdzxth = dataView.getUint8(index)
  zgwdzxth = (zgwdzxth === 0xFE ? '异常' : zgwdzxth === 0xFF ? '无效' : zgwdzxth.toFixed(0));
  canDataObj.zgwdzxth = zgwdzxth
  index++
  // 最高温度探针序号
  let zgwdtzxh = dataView.getUint8(index)
  zgwdtzxh = (zgwdtzxh === 0xFE ? '异常' : zgwdtzxh === 0xFF ? '无效' : zgwdtzxh.toFixed(0));
  canDataObj.zgwdtzxh = zgwdtzxh
  index++
  // 最高温度值
  let zgwdz = dataView.getUint8(index)
  zgwdz = (zgwdz === 0xFE ? '异常' : zgwdz === 0xFF ? '无效' : (zgwdz - 40).toFixed(0));
  canDataObj.zgwdz = zgwdz
  index++
  // 最低温度子系统号
  let zdwdzxth = dataView.getUint8(index)
  zdwdzxth = (zdwdzxth === 0xFE ? '异常' : zdwdzxth === 0xFF ? '无效' : zdwdzxth.toFixed(0));
  canDataObj.zdwdzxth = zdwdzxth
  index++
  // 最低温度探针序号
  let zdwdtzxh = dataView.getUint8(index)
  zdwdtzxh = (zdwdtzxh === 0xFE ? '异常' : zdwdtzxh === 0xFF ? '无效' : zdwdtzxh.toFixed(0));
  canDataObj.zdwdtzxh = zdwdtzxh
  index++
  // 最低温度值
  let zdwdz = dataView.getUint8(index)
  zdwdz = (zdwdz === 0xFE ? '异常' : zdwdz === 0xFF ? '无效' : (zdwdz - 40).toFixed(0));
  canDataObj.zdwdz = zdwdz
  index++

  // 报警数据
  let xxlxbz7 = dataView.getUint8(index)
  canDataObj.xxlxbz7 = xxlxbz7
  index++
  // 最高报警等级
  let zgbjdj = dataView.getUint8(index)
  zgbjdj = zgbjdj === 0 ? '无故障' : zgbjdj === 1 ? '一级故障' : zgbjdj === 2 ? '二级故障' : zgbjdj === 3 ? '三级故障' : zgbjdj === 0xFE ? '异常' : zgbjdj === 0xFF ? '无效' : '--'
  canDataObj.zgbjdj = zgbjdj
  index++
  // 通用报警标志
  let tybjbz1 = dataView.getUint8(index)
  index++
  // 温度差异报警
  let wdcybj = (tybjbz1 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.wdcybj = wdcybj
  // 电池高温报警
  let dcgwbj = (tybjbz1 >> 1 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.dcgwbj = dcgwbj
  // 车载储能装置类型过压报警
  let czcnzzlxgybj = (tybjbz1 >> 2 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.czcnzzlxgybj = czcnzzlxgybj
  // 车载储能装置类型欠压报警
  let czcnzzlxqybj = (tybjbz1 >> 3 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.czcnzzlxqybj = czcnzzlxqybj
  // soc低报警
  let socdbj = (tybjbz1 >> 4 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.socdbj = socdbj
  // 单体电池过压报警
  let dtdcgybj = (tybjbz1 >> 5 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.dtdcgybj = dtdcgybj
  // 单体电池欠压报警
  let dtdcqybj = (tybjbz1 >> 6 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.dtdcqybj = dtdcqybj
  // soc过高报警
  let socggbj = (tybjbz1 >> 7 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.socggbj = socggbj

  let tybjbz2 = dataView.getUint8(index)
  index++
  // soc跳变报警
  let soctbbj = (tybjbz2 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.soctbbj = soctbbj
  // 可充电储能系统不匹配报警
  let kcdcnxtbppbj = (tybjbz2 >> 1 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.kcdcnxtbppbj = kcdcnxtbppbj
  // 电池单体一致性差报警
  let dcdtyzxcbj = (tybjbz2 >> 2 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.dcdtyzxcbj = dcdtyzxcbj
  // 绝缘报警
  let jybj = (tybjbz2 >> 3 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.jybj = jybj
  // dcdc温度报警
  let dcdcwdbj = (tybjbz2 >> 4 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.dcdcwdbj = dcdcwdbj
  // 制动系统报警
  let zdxtbj = (tybjbz2 >> 5 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.zdxtbj = zdxtbj
  // dcdcztbj
  let dcdcztbj = (tybjbz2 >> 6 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.dcdcztbj = dcdcztbj
  // 驱动电机控制器温度报警
  let qddjkzqwdbj = (tybjbz2 >> 7 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.qddjkzqwdbj = qddjkzqwdbj

  let tybjbz3 = dataView.getUint8(index)
  index++
  // 高压互锁状态报警
  let gyhsztbj = (tybjbz3 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.gyhsztbj = gyhsztbj
  // 驱动电机温度报警
  let qddjwdbj = (tybjbz3 >> 1 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.qddjwdbj = qddjwdbj
  // 车载储能装置类型过充
  let czcnzzlxgc = (tybjbz3 >> 2 & 0x01) === 0 ? '正常' : '报警'
  canDataObj.czcnzzlxgc = czcnzzlxgc

  let tybjbz4 = dataView.getUint8(index)
  index++

  // 可充电储能装置故障总数N1
  let kcdcnzzgzzs = dataView.getUint8(index)
  canDataObj.kcdcnzzgzzs = kcdcnzzgzzs
  index++
  kcdcnzzgzzs = (kcdcnzzgzzs === 0xFE ? '异常' : kcdcnzzgzzs === 0xFF ? '无效' : kcdcnzzgzzs);
  if (kcdcnzzgzzs !== '异常' && kcdcnzzgzzs !== '无效') {
    for (let i = 0; i < kcdcnzzgzzs; i++) {
      let kcdcnzzgzdmlb = dataView.getUint32(index)
      index += 4
    }
  }
  // 驱动电机故障总数N2
  let qddjgzzs = dataView.getUint8(index)
  canDataObj.qddjgzzs = qddjgzzs
  index++
  qddjgzzs = (qddjgzzs === 0xFE ? '异常' : qddjgzzs === 0xFF ? '无效' : qddjgzzs);
  if (qddjgzzs !== '异常' && qddjgzzs !== '无效') {
    for (let i = 0; i < qddjgzzs; i++) {
      let qddjgzdmlb = dataView.getUint32(index)
      index += 4
    }
  }
  // 发动机故障总数N3
  let fdjgzzs = dataView.getUint8(index)
  canDataObj.fdjgzzs = fdjgzzs
  index++
  fdjgzzs = (fdjgzzs === 0xFE ? '异常' : fdjgzzs === 0xFF ? '无效' : fdjgzzs);
  if (fdjgzzs !== '异常' && fdjgzzs !== '无效') {
    for (let i = 0; i < fdjgzzs; i++) {
      let fdjgzlb = dataView.getUint32(index)
      index += 4
    }
  }
  // 其他故障总数N4
  let qtgzzs = dataView.getUint8(index)
  canDataObj.qtgzzs = qtgzzs
  index++
  qtgzzs = (qtgzzs === 0xFE ? '异常' : qtgzzs === 0xFF ? '无效' : qtgzzs);
  if (qtgzzs !== '异常' && qtgzzs !== '无效') {
    for (let i = 0; i < qtgzzs; i++) {
      let qtgzdmlb = dataView.getUint32(index)
      index += 4
    }
  }

  // 可充电储能装置电压数据
  let xxlxbz8 = dataView.getUint8(index)
  canDataObj.xxlxbz8 = xxlxbz8
  index++
  // 可充电储能子系统个数
  let kcdcnzxtgs = dataView.getUint8(index)
  canDataObj.kcdcnzxtgs = kcdcnzxtgs
  index++
  kcdcnzxtgs = (kcdcnzxtgs === 0xFE ? '异常' : kcdcnzxtgs === 0xFF ? '无效' : kcdcnzxtgs);
  let kcdcnzxtdyxxlb = []
  if (kcdcnzxtgs !== '异常' && kcdcnzxtgs !== '无效') {
    for (let i = 0; i < kcdcnzxtgs; i++) {
      // 可充电储能子系统号
      let kcdcnzxth = dataView.getUint8(index)
      index++
      // 可充电储能装置电压
      let kcdcnzzdy = dataView.getUint16(index)
      kcdcnzzdy = (kcdcnzzdy === 0xFFFE ? '异常' : kcdcnzzdy === 0xFFFF ? '无效' : kcdcnzzdy * 0.1)
      index += 2
      // 可充电储能装置电流
      let kcdcnzzdl = dataView.getUint16(index)
      kcdcnzzdl = (kcdcnzzdl === 0xFFFE ? '异常' : kcdcnzzdl === 0xFFFF ? '无效' : kcdcnzzdl * 0.1 - 1000)
      index += 2
      // 单体电池总数
      let dtdczs = dataView.getUint16(index)
      dtdczs = (dtdczs === 0xFFFE ? '异常' : dtdczs === 0xFFFF ? '无效' : dtdczs)
      index += 2
      // 本帧起始电池序号
      let bzqsdcxh = dataView.getUint16(index)
      index += 2
      // 本帧单体电池总数
      let bzdtdczs = dataView.getUint8(index)
      index++
      let dtdcdys = []
      for (let i = 0; i < bzdtdczs; i++) {
        let dtdcdy = dataView.getUint16(index)
        dtdcdy = (dtdcdy === 0xFFFE ? '异常' : dtdcdy === 0xFFFF ? '无效' : dtdcdy * 0.001)
        dtdcdys.push(dtdcdy)
        index += 2
      }
      kcdcnzxtdyxxlb.push({
        kcdcnzxth,
        kcdcnzzdy,
        kcdcnzzdl,
        dtdczs,
        bzqsdcxh,
        bzdtdczs,
        dtdcdys
      })
    }
  }
  canDataObj.kcdcnzxtdyxxlb = kcdcnzxtdyxxlb
  // 可充电储能装置温度数据
  let xxlxbz9 = dataView.getUint8(index)
  canDataObj.xxlxbz9 = xxlxbz9
  index++
  // 可充电储能子系统个数
  let kcdcnzxtgs1 = dataView.getUint8(index)
  canDataObj.kcdcnzxtgs1 = kcdcnzxtgs1
  index++
  kcdcnzxtgs1 = (kcdcnzxtgs1 === 0xFE ? '异常' : kcdcnzxtgs1 === 0xFF ? '无效' : kcdcnzxtgs1);
  let kcdcnzxtwdxxlb = []
  if (kcdcnzxtgs1 !== '异常' && kcdcnzxtgs1 !== '无效') {
    for (let i = 0; i < kcdcnzxtgs1; i++) {
      // 可充电储能子系统号
      let kcdcnzxth1 = dataView.getUint8(index)
      index++
      // 可充电储能温度探针个数
      let kcdcnwdtzgs = dataView.getUint16(index)
      kcdcnwdtzgs = (kcdcnwdtzgs === 0xFFFE ? '异常' : kcdcnwdtzgs === 0xFFFF ? '无效' : kcdcnwdtzgs)
      index += 2
      let kcdcnzxtgwdtzjcddwdzs = []
      for (let i = 0; i < kcdcnwdtzgs; i++) {
        let kcdcnzxtgwdtzjcddwdz = dataView.getUint8(index)
        kcdcnzxtgwdtzjcddwdzs.push(kcdcnzxtgwdtzjcddwdz)
        index++
      }
      kcdcnzxtwdxxlb.push({
        kcdcnzxth1,
        kcdcnwdtzgs,
        kcdcnzxtgwdtzjcddwdzs
      })
    }
  }
  canDataObj.kcdcnzxtwdxxlb = kcdcnzxtwdxxlb
  return canDataObj
}
// 转为dataview的格式
export const hexToDataview = (str) => {
  if (str == null || str === undefined || !str.length > 0) {
    return null
  }
  let arraybuff = new ArrayBuffer(str.length / 2)
  let view = new DataView(arraybuff)
  for (let i = 0; i < str.length / 2; i++) {
    view.setInt8(i, parseInt(str.substr(i * 2, 2), 16))
  }
  return view
}

let dwztObj = {
  0x00: '空挡',
  0x01: '1挡',
  0x02: '2挡',
  0x03: '3挡',
  0x04: '4挡',
  0x05: '5挡',
  0x06: '6挡',
  0x07: '7挡',
  0x08: '8挡',
  0x09: '9挡',
  0x0a: '10挡',
  0x0b: '11挡',
  0x0c: '12挡',
  0x0d: '倒挡',
  0x0e: 'D挡',
  0x0f: 'P挡'
}
const getAnd = (time) => {
  switch (time) {
    case 0:
      return 0
    case 1:
      return 1
    case 2:
      return 3
    case 3:
      return 7
    case 4:
      return 15
    case 5:
      return 31
    case 6:
      return 63
    case 7:
      return 127
    case 8:
      return 255
  }
}
const getCanBitNum = (data, index, length) => {
  if (index + length > 8) {
    throw new Error('获取can的指定位的数据时，index+length>8')
  }
  if (index === 0) {
    return data & getAnd(length)
  }
  return (data >> index) & getAnd(length)
}
