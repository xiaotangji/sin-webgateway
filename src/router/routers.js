import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  /*{
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }

    ]
  },*/
  {
    path: '/',
    name: '_home',
    redirect: '/operatingStatus/systemStatus',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/operatingStatus/systemStatus',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/gateway/operatingStatus/systemStatus.vue')
      }
    ]
  },
  {
    path: '',
    name: 'doc',
    meta: {
      hideInMenu: true,
      title: '文档',
      href: 'https://lison16.github.io/iview-admin-doc/#/',
      icon: 'ios-book'
    }
  },
  {
    path: '/operatingStatus',
    name: 'operatingStatus',
    meta: {
      hideInMenu: false,
      icon: 'md-stats',
      title: '运行状态',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'systemStatus',
        name: 'systemStatus',
        meta: {
          icon: 'md-crop',
          title: '系统状态'
        },
        component: () => import('@/view/gateway/operatingStatus/systemStatus.vue')
      },
      {
        path: 'operationMonitoring',
        name: 'operationMonitoring',
        meta: {
          icon: 'ios-videocam',
          title: '运行监控'
        },
        component: () => import('@/view/gateway/operatingStatus/OperationMonitoring.vue')
      },
    ]
  },
  {
    path: '/networkConfiguration',
    name: 'networkConfiguration',
    meta: {
      hideInMenu: false,
      icon: 'md-git-network',
      title: '网络配置',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'networkInterface',
        name: 'networkInterface',
        meta: {
          icon: 'ios-git-pull-request',
          title: '网络接口'
        },
        /*component: () => import('@/view/borderCompute/yunService.vue')*/
      },
      {
        path: '/ethernet',
        name: 'ethernet',
        meta: {
          icon: ' iconfont iot-yitaiwang',
          title: '以太网'
        },
        component: parentView,
        children:[
          {
            path: 'ethernetOne',
            name: 'ethernetOne',
            meta: {
              icon: 'ios-git-pull-request',
              title: '以太网1'
            },
            component: () => import('@/view/gateway/networkConfiguration/EthernetOne.vue')
          },
          {
            path: 'ethernetTwo',
            name: 'ethernetTwo',
            meta: {
              icon: 'ios-git-pull-request',
              title: '以太网2'
            },
            component: () => import('@/view/gateway/networkConfiguration/EthernetTwo.vue')
          }
        ]
      },{
        path: 'WLAN',
        name: 'WLAN',
        meta: {
          icon: ' iconfont iot-erjijindu-WALNicon',
          title: 'WLAN'
        },
        component: () => import('@/view/gateway/networkConfiguration/WLAN.vue')
      },
      {
        path: 'internetService',
        name: 'internetService',
        meta: {
          icon: ' iconfont iot-wangluofuwu',
          showAlways: true,
          title: '网络服务'
        },
        component: parentView,
        children: [
          {
            path: 'DHCPService',
            name: 'DHCPService',
            meta: {
              icon: ' iconfont iot-DHCPfuwu',
              title: 'DHCP服务'
            },
            component: () => import('@/view/gateway/networkConfiguration/internetService/DHCPService.vue')
          },
        ]
        /*component: () => import('@/view/borderCompute/yunService.vue')*/
      },
      {
        path: 'routing',
        name: 'routing',
        meta: {
          icon: ' iconfont iot-luyou',
          showAlways: true,
          title: '路由'
        },
        component: parentView,
        children: [
          {
            path: 'RoutingStatus',
            name: 'RoutingStatus',
            meta: {
              icon: ' iconfont iot-luyou-status',
              title: '路由状态'
            },
            component: () => import('@/view/gateway/networkConfiguration/routing/RoutingStatus.vue')
          },
          {
            path: 'StaticRouting',
            name: 'StaticRouting',
            meta: {
              icon: ' iconfont iot-jingtailuyou',
              title: '静态路由'
            },
            component: () => import('@/view/gateway/networkConfiguration/routing/StaticRouting.vue')
          },
        ]
      },
      {
        path: 'firewall',
        name: 'firewall',
        meta: {
          icon: ' iconfont iot-fanghuoqiang',
          showAlways: true,
          title: '防火墙'
        },
        component: parentView,
        children: [
          {
            path: 'accessControllList',
            name: 'accessControllList',
            meta: {
              icon: ' iconfont iot-fangwenkongzhiliebiaoacl',
              title: '访问控制列表'
            },
            component: () => import('@/view/gateway/networkConfiguration/firewall/AccessControllList.vue')
          },
          {
            path: 'netWorkAddressTranslate',
            name: 'netWorkAddressTranslate',
            meta: {
              icon: ' iconfont iot-wangluo_wangluodizhizhuanhuanNAT',
              title: '网络地址转换'
            },
            component: () => import('@/view/gateway/networkConfiguration/firewall/NetWorkAddressTranslate.vue')
          },
        ]
      },
    ]
  },
  {
    path: '/dataCollection',
    name: 'dataCollection',
    meta: {
      hideInMenu: false,
      icon: 'ios-create',
      title: '数据采集',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'equipmentList',
        name: 'equipmentList',
        meta: {
          icon: 'ios-bookmarks',
          title: '设备列表'
        },
        component: () => import('@/view/borderCompute/equipmentList.vue')
      },
      {
        path: 'connectorConfig',
        name: 'connectorConfig',
        meta: {
          icon: 'ios-git-compare',
          title: '连接器'
        },
        component: () => import('@/view/borderCompute/connectorConfig.vue')
      },
      {
        path: 'modbusVariableList',
        name: 'modbusVariableList',
        meta: {
          icon: 'ios-settings',
          title: 'modbus参数配置',
          hideInMenu: true
        },
        component: () => import('@/view/borderCompute/protocolVariable/modbusVariableList.vue')
      },
      {
        path: 'mitsubishiVariableList',
        name: 'mitsubishiVariableList',
        meta: {
          icon: 'ios-settings',
          title: 'mitsubishi参数配置',
          hideInMenu: true
        },
        component: () => import('@/view/borderCompute/protocolVariable/mitsubishiVariableList.vue')
      },
      {
        path: 'mqttVariableList',
        name: 'mqttVariableList',
        meta: {
          icon: 'ios-settings',
          title: 'mqtt参数配置',
          hideInMenu: true
        },
        component: () => import('@/view/borderCompute/protocolVariable/mqttVariableList.vue')
      },
      {
        path: 'opcuaVariableList',
        name: 'opcuaVariableList',
        meta: {
          icon: 'ios-settings',
          title: 'opcua参数配置',
          hideInMenu: true
        },
        component: () => import('@/view/borderCompute/protocolVariable/opcuaVariableList.vue')
      },
      {
        path: 'bleVariableList',
        name: 'bleVariableList',
        meta: {
          icon: 'ios-settings',
          title: 'ble参数配置',
          hideInMenu: true
        },
        component: () => import('@/view/borderCompute/protocolVariable/bleVariableList.vue')
      },
      {
        path: 'odbcVariableList',
        name: 'odbcVariableList',
        meta: {
          icon: 'ios-settings',
          title: 'odbc参数配置',
          hideInMenu: true
        },
        component: () => import('@/view/borderCompute/protocolVariable/odbcVariableList.vue')
      },
      {
        path: 'serialVariableList',
        name: 'serialVariableList',
        meta: {
          icon: 'ios-settings',
          title: 'serial参数配置',
          hideInMenu: true
        },
        component: () => import('@/view/borderCompute/protocolVariable/serialVariableList.vue')
      },
      {
        path: 'requestVariableList',
        name: 'requestVariableList',
        meta: {
          icon: 'ios-settings',
          title: 'request参数配置',
          hideInMenu: true
        },
        component: () => import('@/view/borderCompute/protocolVariable/requestVariableList.vue')
      },
      {
        path: 'bacnetVariableList',
        name: 'bacnetVariableList',
        meta: {
          icon: 'ios-settings',
          title: 'bacnet参数配置',
          hideInMenu: true
        },
        component: () => import('@/view/borderCompute/protocolVariable/bacnetVariableList.vue')
      },
      {
        path: 'rtuVariableList',
        name: 'rtuVariableList',
        meta: {
          icon: 'ios-settings',
          title: 'rtu参数配置',
          hideInMenu: true
        },
        component: () => import('@/view/borderCompute/protocolVariable/rtuVariableList.vue')
      },
      {
        path: 'collectionGroup',
        name: 'collectionGroup',
        meta: {
          icon: 'ios-grid',
          title: '采集分组'
        },
        /*component: () => import('@/view/borderCompute/yunService.vue')*/
      },
      {
        path: 'yunService',
        name: 'yunService',
        meta: {
          icon: 'md-funnel',
          title: '云服务'
        },
        component: () => import('@/view/borderCompute/yunService.vue')
      },
    ]
  },
  {
    path: '/edgeCompute',
    name: 'edgeCompute',
    meta: {
      hideInMenu: false,
      icon: 'md-menu',
      title: '边缘计算',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'edgeComputingEngine',
        name: 'edgeComputingEngine',
        meta: {
          icon: 'logo-codepen',
          title: '边缘计算引擎'
        },
        /*component: () => import('@/view/borderCompute/yunService.vue')*/
      },
      {
        path: 'dockerManagement',
        name: 'dockerManagement',
        meta: {
          icon: 'ios-navigate',
          title: 'docker管理'
        },
        component: () => import('@/view/borderCompute/dockerManagement.vue')
      },
      {
        path: 'parameterSetting',
        name: 'parameterSetting',
        meta: {
          icon: 'ios-hammer',
          title: '参数设置'
        },
        component: () => import('@/view/borderCompute/parameterSetting.vue')
      },
      {
        path: 'groupManage',
        name: 'groupManage',
        meta: {
          icon: 'ios-list-box-outline',
          title: '分组管理'
        },
        component: () => import('@/view/borderCompute/groupManage.vue')
      },
      {
        path: 'warningAlarm',
        name: 'warningAlarm',
        meta: {
          //access: ['super_admin','admin'],
          icon: 'ios-warning',
          showAlways: true,
          title: '告警'
        },
        component: parentView,
        children: [
          {
            path: 'alarmStrategy',
            name: 'alarmStrategy',
            meta: {
              icon: 'ios-warning-outline',
              title: '告警策略'
            },
            component: () => import('@/view/borderCompute/warningConfig/alarmStrategy.vue')
          }
        ]
      }
    ]
  },
  {
    path: '/systemManagement',
    name: 'systemManagement',
    meta: {
      hideInMenu: false,
      icon: 'logo-windows',
      title: '系统管理',
      showAlways: true
    },
    component: Main,
    children: [
      {
        path: 'systemTime',
        name: 'systemTime',
        meta: {
          icon: 'ios-stopwatch',
          title: '时间同步'
        },
        component: () => import('@/view/systemManagement/systemTime.vue')
      },
      {
        path: 'systemLog',
        name: 'systemLog',
        meta: {
          icon: 'md-list-box',
          title: '系统日志'
        },
        component: parentView,
        children: [
          {
            path: 'logList',
            name: 'logList',
            meta: {
              icon: 'md-grid',
              title: '日志列表'
            },
            component: () => import('@/view/systemManagement/systemLog/logList.vue')
          },
          {
            path: 'logConfig',
            name: 'logConfig',
            meta: {
              icon: 'md-settings',
              title: '日志配置'
            },
            component: () => import('@/view/systemManagement/systemLog/logConfig.vue')
          },
        ]
      },

      {
        path: 'configurationManagement',
        name: 'configurationManagement',
        meta: {
          icon: 'ios-construct',
          title: '配置管理'
        },
        /*component: () => import('@/view/borderCompute/yunService.vue')*/
      },
      {
        path: 'componentSettings',
        name: 'componentSettings',
        meta: {
          icon: 'md-settings',
          title: '组件设置'
        },
        /*component: () => import('@/view/borderCompute/yunService.vue')*/
      },
      {
        path: 'userManagement',
        name: 'userManagement',
        meta: {
          icon: 'ios-restaurant',
          title: '用户管理'
        },
        component: () => import('@/view/systemManagement/userManagement.vue')
      },
      {
        path: 'restart',
        name: 'restart',
        meta: {
          icon: 'ios-refresh-circle-outline',
          title: '重启'
        },
        component: () => import('@/view/systemManagement/restart.vue')
      },
      {
        path: 'firmwareUpgrade',
        name: 'firmwareUpgrade',
        meta: {
          icon: 'md-arrow-up',
          title: '固件升级'
        },
        /*component: () => import('@/view/borderCompute/yunService.vue')*/
      }
    ]
  },

  {
    path: '/join',
    name: 'join',
    component: Main,
    meta: {
      hideInMenu: true,
      hideInBread: true
    },
    children: [
      {
        path: 'join_page',
        name: 'join_page',
        meta: {
          icon: '_qq',
          title: 'QQ群'
        },
        component: () => import('@/view/join-page.vue')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  {
    path: '/components',
    name: 'components',
    meta: {
      hideInMenu: true,
      icon: 'logo-buffer',
      title: '组件'
    },
    component: Main,
    children: [
      {
        path: 'tree_select_page',
        name: 'tree_select_page',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '树状下拉选择器'
        },
        component: () => import('@/view/components/tree-select/index.vue')
      },
      {
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '数字渐变'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'drag_list_page',
        name: 'drag_list_page',
        meta: {
          icon: 'ios-infinite',
          title: '拖拽列表'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      },
      {
        path: 'drag_drawer_page',
        name: 'drag_drawer_page',
        meta: {
          icon: 'md-list',
          title: '可拖拽抽屉'
        },
        component: () => import('@/view/components/drag-drawer')
      },
      {
        path: 'org_tree_page',
        name: 'org_tree_page',
        meta: {
          icon: 'ios-people',
          title: '组织结构树'
        },
        component: () => import('@/view/components/org-tree')
      },
      {
        path: 'tree_table_page',
        name: 'tree_table_page',
        meta: {
          icon: 'md-git-branch',
          title: '树状表格'
        },
        component: () => import('@/view/components/tree-table/index.vue')
      },
      {
        path: 'cropper_page',
        name: 'cropper_page',
        meta: {
          icon: 'md-crop',
          title: '图片裁剪'
        },
        component: () => import('@/view/components/cropper/cropper.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () => import('@/view/components/tables/tables.vue')
      },
      {
        path: 'split_pane_page',
        name: 'split_pane_page',
        meta: {
          icon: 'md-pause',
          title: '分割窗口'
        },
        component: () => import('@/view/components/split-pane/split-pane.vue')
      },
      {
        path: 'markdown_page',
        name: 'markdown_page',
        meta: {
          icon: 'logo-markdown',
          title: 'Markdown编辑器'
        },
        component: () => import('@/view/components/markdown/markdown.vue')
      },
      {
        path: 'editor_page',
        name: 'editor_page',
        meta: {
          icon: 'ios-create',
          title: '富文本编辑器'
        },
        component: () => import('@/view/components/editor/editor.vue')
      },
      {
        path: 'icons_page',
        name: 'icons_page',
        meta: {
          icon: '_bear',
          title: '自定义图标'
        },
        component: () => import('@/view/components/icons/icons.vue')
      }
    ]
  },
  {
    path: '/update',
    name: 'update',
    meta: {
      hideInMenu: true,
      icon: 'md-cloud-upload',
      title: '数据上传'
    },
    component: Main,
    children: [
      {
        path: 'update_table_page',
        name: 'update_table_page',
        meta: {
          icon: 'ios-document',
          title: '上传Csv'
        },
        component: () => import('@/view/update/update-table.vue')
      },
      {
        path: 'update_paste_page',
        name: 'update_paste_page',
        meta: {
          icon: 'md-clipboard',
          title: '粘贴表格数据'
        },
        component: () => import('@/view/update/update-paste.vue')
      }
    ]
  },
  {
    path: '/excel',
    name: 'excel',
    meta: {
      hideInMenu: true,
      icon: 'ios-stats',
      title: 'EXCEL导入导出'
    },
    component: Main,
    children: [
      {
        path: 'upload-excel',
        name: 'upload-excel',
        meta: {
          icon: 'md-add',
          title: '导入EXCEL'
        },
        component: () => import('@/view/excel/upload-excel.vue')
      },
      {
        path: 'export-excel',
        name: 'export-excel',
        meta: {
          icon: 'md-download',
          title: '导出EXCEL'
        },
        component: () => import('@/view/excel/export-excel.vue')
      }
    ]
  },
  {
    path: '/tools_methods',
    name: 'tools_methods',
    meta: {
      hideInMenu: true,
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'tools_methods_page',
        name: 'tools_methods_page',
        meta: {
          icon: 'ios-hammer',
          title: '工具方法',
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/tools-methods/tools-methods.vue')
      }
    ]
  },
  {
    path: '/i18n',
    name: 'i18n',
    meta: {
      hideInMenu: true,
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'i18n_page',
        name: 'i18n_page',
        meta: {
          icon: 'md-planet',
          title: 'i18n - {{ i18n_page }}'
        },
        component: () => import('@/view/i18n/i18n-page.vue')
      }
    ]
  },
  {
    path: '/error_store',
    name: 'error_store',
    meta: {
      hideInMenu: true,
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'error_store_page',
        name: 'error_store_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/error-store/error-store.vue')
      }
    ]
  },
  {
    path: '/error_logger',
    name: 'error_logger',
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'error_logger_page',
        name: 'error_logger_page',
        meta: {
          icon: 'ios-bug',
          title: '错误收集'
        },
        component: () => import('@/view/single-page/error-logger.vue')
      }
    ]
  },
  {
    path: '/vehicleMonitor',
    name: 'vehicleMonitor',
    meta: {
      hideInMenu: true,
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'vehicleMonitor_page',
        name: 'vehicleMonitor_page',
        meta: {
          icon: 'ios-desktop',
          title: '车辆监控'
        },
        component: () => import('@/view/vehicleMonitor/vehicleMonitor.vue')
      }
    ]
  },
  {
    path: '/vehicleTrace',
    name: 'vehicleTrace',
    meta: {
      hideInMenu: true,
      notCache: true,
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'vehicleTrace_page',
        name: 'vehicleTrace_page',
        meta: {
          icon: 'md-trending-up',
          notCache: true,
          title: '车辆追踪'
        },
        component: () => import('@/view/vehicleTrace/vehicleTrace.vue')
      }
    ]
  },
  {
    path: '/vehicleTraceReview',
    name: 'vehicleTraceReview',
    meta: {
      hideInBread: true,
      hideInMenu: true,
    },
    component: Main,
    children: [
      {
        path: 'vehicleTraceReview_page',
        name: 'vehicleTraceReview_page',
        meta: {
          icon: 'md-trending-up',
          // notCache: true,
          title: '追踪回放'
        },
        component: () => import('@/view/vehicleTraceReview/vehicleTraceReview.vue')
      }
    ]
  },
  {
    path: '/paramManage',
    name: 'paramManage',
    component: Main,
    meta: {
      hideInMenu: true,
      hideInBread: true
    },
    children: [
      {
        path: 'paramManage_page',
        name: 'paramManage_page',
        meta: {
          icon: 'ios-bookmarks',
          title: '参数管理',
        },
        component: () => import('@/view/paramManage.vue')
      }
    ]
  },
  {
    path: '/programManage',
    name: 'programManage',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true,
    },
    children: [
      {
        path: 'programManage_page',
        name: 'programManage_page',
        meta: {
          icon: 'ios-bookmarks',
          title: '程序管理'
        },
        component: () => import('@/view/programManage.vue')
      }
    ]
  },
  {
    path: '/directive',
    name: 'directive',
    meta: {
      hideInMenu: true,
      hideInBread: true
    },
    component: Main,
    children: [
      {
        path: 'directive_page',
        name: 'directive_page',
        meta: {
          icon: 'ios-navigate',
          title: '指令'
        },
        component: () => import('@/view/directive/directive.vue')
      }
    ]
  },
  {
    path: '/multilevel',
    name: 'multilevel',
    meta: {
      hideInMenu: true,
      icon: 'md-menu',
      title: '多级菜单'
    },
    component: Main,
    children: [
      {
        path: 'level_2_1',
        name: 'level_2_1',
        meta: {
          icon: 'md-funnel',
          title: '二级-1'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
      {
        path: 'level_2_2',
        name: 'level_2_2',
        meta: {
          access: ['super_admin','admin'],
          icon: 'md-funnel',
          showAlways: true,
          title: '二级-2'
        },
        component: parentView,
        children: [
          {
            path: 'level_2_2_1',
            name: 'level_2_2_1',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
          },
          {
            path: 'level_2_2_2',
            name: 'level_2_2_2',
            meta: {
              icon: 'md-funnel',
              title: '三级'
            },
            component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
          }
        ]
      },
      {
        path: 'level_2_3',
        name: 'level_2_3',
        meta: {
          icon: 'md-funnel',
          title: '二级-3'
        },
        component: () => import('@/view/multilevel/level-2-3.vue')
      }
    ]
  },
  {
    path: '/argu',
    name: 'argu',
    meta: {
      hideInMenu: true
    },
    component: Main,
    children: [
      {
        path: 'params/:id',
        name: 'params',
        meta: {
          icon: 'md-flower',
          title: route => `{{ params }}-${route.params.id}`,
          notCache: true,
          beforeCloseName: 'before_close_normal'
        },
        component: () => import('@/view/argu-page/params.vue')
      },
      {
        path: 'query',
        name: 'query',
        meta: {
          icon: 'md-flower',
          title: route => `{{ query }}-${route.query.id}`,
          notCache: true
        },
        component: () => import('@/view/argu-page/query.vue')
      }
    ]
  },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  }
]
