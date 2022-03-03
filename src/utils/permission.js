/*
 * @Author: your name
 * @Date: 2022-02-16 17:15:14
 * @LastEditTime: 2022-02-23 11:00:30
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /inspect-demo/src/utils/permission.js
 */
// eslint-disable-next-line space-before-function-paren
export default function (userCode) {
    if (userCode === 'admin') {
        return {
            menu: [
                {
                    name: '数据库切换',
                    url: '/main/db',
                    include: ['/main/dbdetail']
                }
            ],
            actions: {
                '/inspection/airepository': [
                    {
                        code: 'enabled'
                    },
                    {
                        code: 'disabled'
                    }
                ],
                '/inspection/plan': [
                    {
                        code: 'add'
                    },
                    {
                        code: 'enabled'
                    },
                    {
                        code: 'disabled'
                    },
                    {
                        code: 'addTemplate'
                    },
                    {
                        code: 'editTemplate'
                    },
                    {
                        code: 'deleteTemplate'
                    }
                ],
                '/inspection/plandetail': [
                    {
                        code: 'edit'
                    }
                ],
                '/inspection/detail': [
                    {
                        code: 'inspection'
                    },
                    {
                        code: 'createReport'
                    }
                ],
                '/inspection/report': [
                    {
                        code: 'detail'
                    },
                    {
                        code: 'download'
                    },
                    {
                        code: 'add'
                    },
                    {
                        code: 'addRule'
                    },
                    {
                        code: 'editRule'
                    }
                ],
                '/inspection/reportdetail': [
                    {
                        code: 'confirm'
                    },
                    {
                        code: 'download'
                    }
                ],
                '/database/server': [
                    {
                        code: 'add'
                    },
                    {
                        code: 'edit'
                    },
                    {
                        code: 'delete'
                    },
                    {
                        code: 'addServer'
                    },
                    {
                        code: 'editServer'
                    },
                    {
                        code: 'deleteServer'
                    }
                ],
                '/database/list': [
                    {
                        code: 'add'
                    }
                ],
                '/database/detail': [
                    {
                        code: 'start'
                    },
                    {
                        code: 'delete'
                    },
                    {
                        code: 'listen'
                    },
                    {
                        code: 'file'
                    },
                    {
                        code: 'selfStart'
                    },
                    {
                        code: 'editAlias'
                    },
                    {
                        code: 'editPassword'
                    },
                    {
                        code: 'editServerIp'
                    },
                    {
                        code: 'databaseEnabled'
                    },
                    {
                        code: 'databaseDisabled'
                    },
                    {
                        code: 'addTablespace'
                    },
                    {
                        code: 'backup'
                    },
                    {
                        code: 'kill'
                    },
                    {
                        code: 'locked'
                    },
                    {
                        code: 'editAccountPassword'
                    },
                    {
                        code: 'clearLog'
                    }
                ],
                '/database/backups': [
                    {
                        code: 'backupSetting'
                    }
                ],
                '/database/backupstrategy': [
                    {
                        code: 'add'
                    },
                    {
                        code: 'edit'
                    },
                    {
                        code: 'delete'
                    }
                ],
                '/database/deploy': [
                    {
                        code: 'createSoftware'
                    },
                    {
                        code: 'createPatch'
                    },
                    {
                        code: 'redeploySoftware'
                    }
                ]
            }
        }
    } else {
        return {
            menu: [
                {
                    name: '智能巡检',
                    children: [
                        {
                            name: 'AI知识库',
                            class: 'main-aizsk',
                            url: '/inspection/airepository'
                        },
                        {
                            name: '巡检中心',
                            class: 'main-xszx',
                            children: [
                                {
                                    name: '巡检计划',
                                    url: '/inspection/plan',
                                    include: [
                                        '/inspection/plandetail',
                                        '/inspection/planadd'
                                    ]
                                },
                                {
                                    name: '巡检数据中心',
                                    url: '/inspection/datacenter',
                                    include: ['/inspection/detail']
                                },
                                {
                                    name: '巡检报告',
                                    url: '/inspection/report',
                                    include: ['/inspection/reportdetail']
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '性能监测',
                    url: '/main/performance',
                    include: [
                        '/main/performance/database',
                        '/main/performance/databaseLoad',
                        '/main/performance/databaseMemory',
                        '/main/performance/databaseIO',
                        '/main/performance/databaseSql',
                        '/main/performance/databaseCPU',
                        '/main/performance/databaseWait',
                        '/main/performance/locked',
                        '/main/performance/meeting',
                        '/main/performance/log',
                        '/main/performance/sysLoad',
                        '/main/performance/CPU',
                        '/main/performance/memory',
                        '/main/performance/network',
                        '/main/performance/disk',
                        '/main/performance/TCP',
                        '/main/performance/CPUProcess',
                        '/main/performance/memoryProcess',
                        '/main/performance/IOProcess'
                    ]
                },
                {
                    name: '日常运维',
                    children: [
                        {
                            name: '服务器管理',
                            url: '/database/server',
                            class: 'main-fwqgl'
                        },
                        {
                            name: '数据库运维',
                            class: 'main-sjkyw',
                            children: [
                                {
                                    name: '常规运维',
                                    url: '/database/list',
                                    include: ['/database/detail', '/database/create']
                                }
                            ]
                        }
                    ]
                },
                {
                    name: '告警中心',
                    children: [
                        {
                            name: '巡检告警',
                            class: 'main-xjgj',
                            url: '/inspection/alarmcenter'
                        }
                    ]
                }
            ],
            actions: {
                '/inspection/airepository': [
                    {
                        code: 'enabled'
                    },
                    {
                        code: 'disabled'
                    }
                ],
                '/inspection/plan': [
                    {
                        code: 'add'
                    },
                    {
                        code: 'enabled'
                    },
                    {
                        code: 'disabled'
                    },
                    {
                        code: 'addTemplate'
                    },
                    {
                        code: 'editTemplate'
                    },
                    {
                        code: 'deleteTemplate'
                    }
                ],
                '/inspection/plandetail': [
                    {
                        code: 'edit'
                    }
                ],
                '/inspection/detail': [
                    {
                        code: 'inspection'
                    },
                    {
                        code: 'createReport'
                    }
                ],
                '/inspection/report': [
                    {
                        code: 'detail'
                    },
                    {
                        code: 'download'
                    },
                    {
                        code: 'add'
                    },
                    {
                        code: 'addRule'
                    },
                    {
                        code: 'editRule'
                    }
                ],
                '/inspection/reportdetail': [
                    {
                        code: 'confirm'
                    },
                    {
                        code: 'download'
                    }
                ],
                '/database/server': [
                    {
                        code: 'add'
                    },
                    {
                        code: 'edit'
                    },
                    {
                        code: 'delete'
                    },
                    {
                        code: 'addServer'
                    },
                    {
                        code: 'editServer'
                    },
                    {
                        code: 'deleteServer'
                    }
                ],
                '/database/list': [
                    {
                        code: 'add'
                    }
                ],
                '/database/detail': [
                    {
                        code: 'editAlias'
                    },
                    {
                        code: 'editPassword'
                    },
                    {
                        code: 'editServerIp'
                    }
                ],
                '/database/backups': [
                    {
                        code: 'backupSetting'
                    }
                ],
                '/database/backupstrategy': [
                    {
                        code: 'add'
                    },
                    {
                        code: 'edit'
                    },
                    {
                        code: 'delete'
                    }
                ],
                '/database/deploy': [
                    {
                        code: 'createSoftware'
                    },
                    {
                        code: 'createPatch'
                    },
                    {
                        code: 'redeploySoftware'
                    }
                ]
            }
        }
    }
}
