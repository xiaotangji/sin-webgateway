<!--
<template>
  <div class="content">
    <div class="treeOfCar">
      <div  class="search-con search-con-top">
        <Select v-model="searchKey" class="search-col" @on-change="handleChange">
          <Option v-for="item in columns" :key="`search-col-${item.key}`" :value="item.value">{{ item.key }}</Option>
        </Select>
        <Input @on-change="handleChange" clearable :disabled="this.searchKey.trim()=='all'" placeholder="输入关键字搜索" class="search-input" v-model="searchValue"/>
&lt;!&ndash;        <Button @click="handleSearch" class="search-btn" type="primary"><Icon type="search"/>&nbsp;&nbsp;搜索</Button>&ndash;&gt;
      </div>
      <Tree ref="tree" :data="baseData" :render="renderContent"></Tree>
    </div>
    <div id="mapDiv"></div>
  </div>
</template>

<script>
import _ from 'lodash'
import $ from 'jquery'
import AMapLoader from '@amap/amap-jsapi-loader'
import { selectTreeOfSfjhQcbh, getCurrentCan } from '@/api/vehicle'
import { hexToDataview, decodeProtocal } from '@/libs/decode.js'
import { wgs84_to_gcj02 } from '@/libs/mapTransformToGaode.js'
let map = null;
// let traffic = new AMap.TileLayer.Traffic({
//   'autoRefresh': true, //  是否自动刷新，默认为false
//   'interval': 180 //  刷新间隔，默认180s
// });
// let satellite = new AMap.TileLayer.Satellite();
// let roadNet = new AMap.TileLayer.RoadNet();
export default {
  name: 'vehicleMonitor_page',
  data () {
    return {
      baseData: [{
        expand: false,
        title: '成都公交公司',
        value: -1,
        children: [{
          title: 'CDK6110CFCEV',
          value: -1,
          expand: false,
          // disabled: true,
          children: [{
            title: '川A00107F(190567|8927)在线',
            value: ['190563', '190563', '190563', 'CDK6110CFCEV', 'LC944G020K1LCD542']
            // disableCheckbox: true
          }, {
            title: '川A00106F(190566|8926)离线',
            value: ['190563', '190563', '190563', 'CDK6110CFCEV', 'LC944G020K1LCD542']
          }]
        }, {
          title: 'CDK6900CEFCEV',
          value: -1,
          expand: false,
          checked: false,
          children: [{
            title: '川A00108F(190568|8928)在线',
            value: ['190563', '190563', '190563', 'CDK6110CFCEV', 'LC944G020K1LCD542']
          }]
        }]
      }],
      cacheData: [],
      searchKey: 'all',
      searchValue: '',
      columns: [
        { 'key': '请选择', 'value': 'all' },
        // 公司名没传到前台,暂时无法筛选
        // { 'key': '运营公司', 'value': 'gsbh' },
        { 'key': '车型', 'value': 'cllx' },
        { 'key': 'VIN', 'value': 'qcsbh' },
        { 'key': '车牌号', 'value': 'cphm' },
        { 'key': '自编号', 'value': 'tboxbh' }],
      car_blue64_img_url: require('@/assets/images/jiantou_64.png'),
      currentQcbh: '',
      currentSfjh: '',
      currentVin: '',
      currentCphm: '',
      currentCllx: ''
    }
  },
  mounted () {
    this.initMap();
    selectTreeOfSfjhQcbh().then(res => {
      if (res.data.result) {
        this.cacheData = this.deepCopy(res.data.datas)
        console.log(this.cacheData)
        this.baseData = this.generateTree(res.data.datas)
        console.log(this.baseData)
      }
    }).catch(err => {
      this.$Message.error(err);
    })
    $(document).on('click', '#carTrace', this.jumpToCarTrace);
  },
  methods: {
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
        map = new AMap.Map('mapDiv', {
          resizeEnable: true,
          center: [120.610843, 31.32962],
          zoom: 11,
          features: ['bg', 'road', 'building', 'point']
        })
        AMap.plugin(['AMap.Scale', 'AMap.StationSearch', 'AMap.MouseTool'], () => {
          // 异步加载插件
          var scale = new AMap.Scale();
          map.addControl(scale);
          var stationSearch = new AMap.StationSearch();
          map.addControl(stationSearch);
        });
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
    generateTree (tree) {
      const result = [];
      // if (tree && tree.length > 0) {
      //   for (let i = 0; i <= tree.length; i++) {
      //     const child = [];
      //     if (tree[i].id === 0) {
      //       const id = tree[i].id;
      //       const title = tree[i].title;
      //       for (let j = 0; j <= tree.length; j++) {
      //         if (res[j].pid === tree[i].id) {
      //           const id = tree[i].id;
      //           const title = tree[i].title;
      //           child.push({ id, title });
      //         }
      //       }
      //       result.push({ id, title, child });
      //     }
      //   }
      // }
      let tmpMap = {};
      for (let i = 0; i < tree.length; i++) {
        tmpMap[tree[i]['id']] = tree[i];
      }
      for (let j = 0; j < tree.length; j++) {
        let value = tmpMap[tree[j]['pid']];
        if (value) {
          if (!value['children']) {
            value['children'] = [];
            value['children'].push(Object.assign(tree[j], { expand: true }))
          } else {
            value['children'].push(Object.assign(tree[j], { expand: true }));
          }
        } else {
          result.push(Object.assign(tree[j], { expand: true }));
        }
      }
      return result;
    },
    // deepCopy (obj) {
    //   let object;
    //   if (Object.prototype.toString.call(obj) === '[object Array]') {
    //     object = [];
    //     for (let i = 0; i < obj.length; i++) {
    //       object.push(this.deepCopy(obj[i]))
    //     }
    //     return object
    //   }
    //   if (Object.prototype.toString.call(obj) === '[object Object]') {
    //     object = {};
    //     for (let p in obj) {
    //       object[p] = obj[p]
    //     }
    //     return object
    //   }
    // },
    // 优化版的深拷贝
    deepCopy (obj) {
      let object;
      if (Object.prototype.toString.call(obj) === '[object Array]') {
        object = [];
        for (let i = 0; i < obj.length; i++) {
          object[i] = this.deepCopy(obj[i])
        }
      } else if (Object.prototype.toString.call(obj) === '[object Object]') {
        object = {};
        for (let p in obj) {
          object[p] = this.deepCopy(obj[p])
        }
      } else {
        return obj
      }
      return object
    },
    // 同时监听select和input
    handleChange: _.debounce(function (e) {
      console.log(this.searchKey)
      // input 触发时才将data里面的searchValue修改
      // if (e.target !== undefined) {
      //   this.searchValue = e.target.value
      // }
      let data = this.deepCopy(this.cacheData);
      (this.searchKey !== '') && (data = data.filter(item => ((item[this.searchKey] == null) || (item[this.searchKey] && item[this.searchKey].indexOf(this.searchValue) > -1))))
      this.baseData = this.generateTree(data)
    }, 400),
    // 跳转车辆跟踪
    jumpToCarTrace () {
      this.$router.push({
        name: 'vehicleTrace_page',
        params: {
          sfjh: this.currentSfjh,
          qcbh: this.currentQcbh,
          VIN: this.currentVin,
          cphm: this.currentCphm,
          cllx: this.currentCllx
        }
      })
    },
    // 关闭信息窗体
    closeInfoWindow () {
      map.clearInfoWindow();
    },
    // 构建自定义信息窗体
    createInfoWindow (title, content) {
      var info = document.createElement('div');
      info.className = 'custom-info input-card content-window-card';
      // 可以通过下面的方式修改自定义窗体的宽高
      info.style.width = '280px';
      // 定义顶部标题
      var top = document.createElement('div');
      var titleD = document.createElement('div');
      var closeX = document.createElement('img');
      top.className = 'info-top';
      titleD.innerHTML = title;
      closeX.src = 'https://webapi.amap.com/images/close2.gif';
      closeX.onclick = this.closeInfoWindow;
      top.appendChild(titleD);
      top.appendChild(closeX);
      info.appendChild(top);
      // 定义中部内容
      var middle = document.createElement('div');
      middle.className = 'info-middle';
      middle.style.backgroundColor = 'white';
      middle.style.display = 'flex';
      middle.innerHTML = content;
      info.appendChild(middle);
      // 定义底部内容
      var bottom = document.createElement('div');
      bottom.className = 'info-bottom';
      bottom.style.position = 'relative';
      bottom.style.top = '0px';
      bottom.style.margin = '0 auto';
      var sharp = document.createElement('img');
      sharp.src = 'https://webapi.amap.com/images/sharp.png';
      bottom.appendChild(sharp);
      info.appendChild(bottom);
      return info;
    },
    renderContent (h, { root, node, data }) {
      return h('span', {
        style: {
          display: 'inline-block',
          width: '100%'
        }
      }, [
        h('span', [
          h('Icon', {
            props: {
              type: 'ios-car'
            },
            style: {
              marginRight: '3px'
            }
          }),
          h('span', {
            class: ['ivu-tree-title'],
            style: {
              color: `${(!data.onLine && data.onLine !== 0) ? '#4b5762' : ((data.onLine === 1) ? 'green' : 'red')}`
            },
            on: {
              click: (e) => {
                console.log(data);

                if (data.tboxbh) {
                  map.clearMap();
                  this.$Loading.start();
                  getCurrentCan(data.qcbh).then(res => {
                    console.log(res)
                    if (res.data.result) {
                      this.$Loading.finish();
                      if (res.data.datas === void 0 || res.data.datas == null) {
                        this.$Message.error('can数据空')
                        return
                      }
                      let dataview = hexToDataview(res.data.datas)
                      let canDataObj;
                      try {
                        canDataObj = decodeProtocal(dataview)
                        console.log(canDataObj)
                      } catch (e) {
                        console.log(e.name + ':' + e.message)
                        this.$Message.error('can数据有误')
                        return
                      }
                      let point1 = wgs84_to_gcj02(canDataObj.wd, canDataObj.jd)
                      let point = [point1[1], point1[0]]
                      let Marker = new AMap.Marker({
                        icon: this.car_blue64_img_url,
                        position: [point[0], point[1]]
                        // offset: new AMap.Pixel(-5, -5),
                      });
                      // 实例化信息窗体
                      let 车辆状态 = data.onLine === 0 ? '离线' : canDataObj.clztzw
                      let 车速 = canDataObj.cs + 'km/h'
                      let SOC = canDataObj.SOC
                      let 挡位 = canDataObj.dwzw
                      let 发动机转速 = canDataObj.qzzs
                      let 模式 = canDataObj.yxmszw
                      // 协议中找不到对应的
                      // let 电机输入电流 = canDataObj.
                      // let 电机状态 = canDataObj.
                      let 发动机状态 = canDataObj.fdjztzw
                      let 时间 = canDataObj.sjcjsj
                      let title = '<span>' + data.cphm + ' |' + data.qcsbh + ' |' + data.tboxbh + '</span>'
                      let content = '<div style="width:50%"><div>车辆状态: ' + 车辆状态 + '</div><div>SOC: ' + SOC + '</div><div>发动机转速: ' + 发动机转速 + '</div><div>发动机状态: ' + 发动机状态 + '</div></div><div style="width:50%"><div>车速: ' + 车速 + '</div><div>挡位: ' + 挡位 + '</div><div>模式: ' + 模式 + '</div><div>时间: ' + 时间 + '</div><div><Button type="button" id="carTrace">车辆追踪</Button><div></div></div></div>'
                      let infoWindow = new AMap.InfoWindow({
                        isCustom: true,
                        content: this.createInfoWindow(title, content),
                        offset: new AMap.Pixel(35, -35)
                      });
                      infoWindow.open(map, [point[0], point[1]]);
                      map.add(Marker)
                      this.currentQcbh = data.qcbh
                      this.currentCphm = data.cphm
                      this.currentVin = data.qcsbh
                      this.currentSfjh = data.tboxbh
                      this.currentCllx = data.cllx
                    } else {
                      console.log(res.data.msg)
                      this.$Loading.error()
                      this.$Message.error(res.data.msg)
                    }
                  }).catch(err => {
                    console.log(err)
                    this.$Loading.error()
                    this.$Message.error(err)
                  })
                }
                let selected = this.$refs.tree.$el.querySelectorAll('.ivu-tree-title-selected')
                for (let i = 0; i < selected.length; i++) {
                  selected[i].className = 'ivu-tree-title';
                }
                e.path[0].className = 'ivu-tree-title  ivu-tree-title-selected';// 当前点击的元素
                // this.$refs.tree.handleSelect(node.nodeKey);
              }
            }
          }, data.title)
        ])
      ]
      )
    }
  }
}
</script>

<style>
  .content {
    height: 100%;
    width: 100%;
  }
  .treeOfCar {
    width: 250px;
    height: 100%;
    overflow-x: auto;
    display: inline-block;
  }
  #mapDiv {
    width: calc(100% - 250px);
    height: 100%;
    display: inline-block;
  }
  .search-con .search-col{
    display: inline-block;
    width: 100px;
  }
  .search-con .search-input{
    display: inline-block;
    width: 120px;
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
-->
