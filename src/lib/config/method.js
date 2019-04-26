const digitalCodesTpl   = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const digitalPosTpl     = ['全', '大', '小', '奇', '偶', '清']
const digitalZxhzTpl    = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27]
const digitalZuhzTpl    = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26]

const digitalZxhz2Tpl   = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
const digitalZuhz2Tpl   = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17]
const digitalDxdsTpl    = ['大', '小', '单', '双']
const digitalLhhTpl     = ['龙', '虎', '和'];

const lottoCodesTpl     = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']
const pk10CodesTpl      = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10']

// lhc 六合彩
const lhcCodesTpl = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49]
const lhcPosTpl = {
    'red': ['红大', '红小', '红单', '红双', '红合单', '红合双'],
    'green': ['绿大', '绿小', '绿单', '绿双', '绿合单', '绿合双'],
    'blue': ['蓝大', '蓝小', '蓝单', '蓝双', '蓝合单', '蓝合双'],
    'sub': ['大', '小', '单', '双', '鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
}


export default {
    'ssc': {

        'ZX5': {
            'name': '直选复式',
            'method': 'ZX5',
            'desc': '从万位、千位、百位、十位、个位各选一个号码组成一注。',
            'help': '从万位、千位、百位、十位、个位中选择一个5位数号码组成一注，所选号码与开奖号码全部相同，且顺序一致，即为中奖。',
            'example': '投注方案：13456 <br> 开奖号码：13456，即中五星直选。',
            'type': 'multi',
            'layout': {
                '万位': digitalCodesTpl,
                '千位': digitalCodesTpl,
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'ZX5_S': {
            'name': '直选单式',
            'method': 'ZX5_S',
            'desc': '手动输入号码，至少输入1个五位数号码组成一注。',
            'help': '手动输入一个5位数号码组成一注，所选号码的万位、千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：23456<br>开奖号码：23456，即中五星直选。',
            'type': 'text',
            'number': 5,
            'b64': 5
        },
        'ZH5': {
            'name': '五星组合',
            'type': 'multi',
            'method': 'ZH5',
            'desc': '从万位、千位、百位、十位、个位各选一个号码组成五注。',
            'help': '从万位、千位、百位、十位、个位中至少各选一个号码组成1-5星的组合，共五注，所选号码的个位与开奖号码全部相同，则中1个5等奖；所选号码的个位、十位与开奖号码相同，则中1个5等奖以及1个4等奖，依此类推，最高可中5个奖。',
            'example': '投注方案：购买4+5+6+7+8，该票共10元，由以下5注：45678(五星)、5678(四星)、678(三星)、78(二星)、8(一星)构成。<br>开奖号码：45678，即可中五星、四星、三星、二星、一星各1注',
            'layout': {
                '万位': digitalCodesTpl,
                '千位': digitalCodesTpl,
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'WXZU120': {
            'name': '组选120',
            'method': 'WXZU120',
            'desc': '从0-9中任意选择5个号码组成一注',
            'help': '从0-9中任意选择5个号码组成一注，所选号码与开奖号码的万位、千位、百位、十位、个位相同，顺序不限，即为中奖。\t',
            'example': '投注方案：10568<br>开奖号码：10568（顺序不限），即可中五星组选120。',
            'type': 'multi',
            'layout': {
                '组选120': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'WXZU60': {
            'name': '组选60',
            'method': 'WXZU60',
            'desc': '选择1个二重号码和三个单号号码组成一注',
            'help': '选择1个二重号码和三个单号号码组成一注，所选的单号号码与开奖号码相同，且所选二重号码在开奖号码中出现了2次，即为中奖。\t',
            'example': '投注方案：二重号：8；单号：016<br>开奖号码：01688（顺序不限），即可中五星组选60。',
            'type': 'multi',
            'layout': {
                '二重号': digitalCodesTpl,
                '单　号': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'WXZU30': {
            'name': '组选30',
            'method': 'WXZU30',
            'desc': '选择2个二重号和1个单号号码组成一注',
            'help': '选择2个二重号和1个单号号码组成一注，所选的单号号码与开奖号码相同，且所选的2个二重号码分别在开奖号码中出现了2次，即为中奖',
            'example': '投注方案：二重号：68；单号：0<br>开奖号码：06688（顺序不限），即可中五星组选30。',
            'type': 'multi',
            'layout': {
                '二重号': digitalCodesTpl,
                '单　号': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'WXZU20': {
            'name': '组选20',
            'method': 'WXZU20',
            'desc': '选择1个三重号码和两个单号号码组成一注',
            'help': '选择1个三重号码和两个单号号码组成一注，所选的单号号码与开奖号码相同，且所选三重号码在开奖号码中出现了3次，即为中奖。\t',
            'example': '投注方案：三重号：8；单号：01<br>开奖号码：01888（顺序不限），即可中五星组选20。',
            'type': 'multi',
            'layout': {
                '三重号': digitalCodesTpl,
                '单　号': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'WXZU10': {
            'name': '组选10',
            'method': 'WXZU10',
            'desc': '选择1个三重号码和1个二重号码组成一注',
            'help': '选择1个三重号码和1个二重号码，所选三重号码在开奖号码中出现3次，并且所选二重号码在开奖号码中出现了2次，即为中奖。',
            'example': '投注方案：三重号：8；二重号：1<br>开奖号码：11888（顺序不限），即可中五星组选10。',
            'type': 'multi',
            'layout': {
                '三重号': digitalCodesTpl,
                '二重号': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'WXZU5': {
            'name': '组选5',
            'method': 'WXZU5',
            'desc': '选择1个四重号码和1个单号号码组成一注\t',
            'help': '选择1个四重号码和1个单号号码组成一注所选的单号号码与开奖号码相同，且所选四重号码在开奖号码中出现了4次，即为中奖。',
            'example': '投注方案：四重号：8；单号：1<br>开奖号码：18888（顺序不限），即可中五星组选5。',
            'type': 'multi',
            'layout': {
                '四重号': digitalCodesTpl,
                '单　号': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'YFFS': {
            'name': '一帆风顺',
            'method': 'YFFS',
            'desc': '从0-9中任意选择1个以上号码。',
            'help': '从0-9中任意选择1个号码组成一注，只要开奖号码的万位、千位、百位、十位、个位中包含所选号码，即为中奖。',
            'example': '投注方案：8<br>开奖号码：至少出现1个8，即中一帆风顺。',
            'type': 'multi',
            'layout': {
                '一帆风顺': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'HSCS': {
            'name': '好事成双',
            'method': 'HSCS',
            'desc': '从0-9中任意选择1个以上的二重号码。',
            'help': '从0-9中任意选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现2次，即为中奖。',
            'example': '投注方案：8<br>开奖号码：至少出现2个8，即中好事成双。',
            'type': 'multi',
            'layout': {
                '好事成双': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'SXBX': {
            'name': '三星报喜',
            'method': 'SXBX',
            'desc': '从0-9中任意选择1个以上的三重号码。',
            'help': '从0-9中任意选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现3次，即为中奖。',
            'example': '投注方案：8<br>开奖号码：至少出现3个8，即中三星报喜。',
            'type': 'multi',
            'layout': {
                '三星报喜': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'SJFC': {
            'name': '四季发财',
            'method': 'SJFC',
            'desc': '从0-9中任意选择1个以上的四重号码。',
            'help': '从0-9中任意选择1个号码组成一注，只要所选号码在开奖号码的万位、千位、百位、十位、个位中出现4次，即为中奖。',
            'example': '投注方案：8<br>开奖号码：至少出现4个8，即中四季发财。',
            'type': 'multi',
            'layout': {
                '四季发财': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'ZX4': {
            'name': '直选复式',
            'method': 'ZX4',
            'desc': '从千位、百位、十位、个位各选一个号码组成一注。',
            'help': '从千位、百位、十位、个位中选择一个4位数号码组成一注，所选号码与开奖号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：3456<br>开奖号码：3456，即中四星直选。',
            'type': 'multi',
            'layout': {
                '千位': digitalCodesTpl,
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'ZX4_S': {
            'name': '直选单式',
            'method': 'ZX4_S',
            'desc': '手动输入号码，至少输入1个四位数号码组成一注。',
            'help': '手动输入一个4位数号码组成一注，所选号码的千位、百位、十位、个位与开奖号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：3456<br>开奖号码：3456，即中四星直选。',
            'type': 'text',
            'number': 4,
            'b64': 4
        },
        'ZH4': {
            'name': '四星组合',
            'method': 'ZH4',
            'desc': '从千位、百位、十位、个位各选一个号码组成四注。',
            'help': '从千位、百位、十位、个位中至少各选一个号码组成1-4星的组合，共四注，所选号码的个位与开奖号码相同，则中1个4等奖；<br>所选号码的个位、十位与开奖号码相同，则中1个4等奖以及1个3等奖，依此类推，最高可中4个奖。',
            'example': '投注方案：购买5+6+7+8，该票共8元，由以下4注：5678(四星)、678(三星)、78(二星)、8(一星)构成。<br>开奖号码：5678，即可中四星、三星、二星、一星各1注',
            'type': 'multi',
            'layout': {
                '千位': digitalCodesTpl,
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'SXZU24': {
            'name': '组选24',
            'method': 'SXZU24',
            'desc': '从0-9中选择4个号码组成一注。',
            'help': '从0-9中任意选择4个号码组成一注，所选号码与开奖号码的千位、百位、十位、个位相同，且顺序不限，即为中奖。',
            'example': '投注方案：0568<br>开奖号码：0568（顺序不限），即可中四星组选24。',
            'type': 'multi',
            'layout': {
                '组选24': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'SXZU12': {
            'name': '组选12',
            'method': 'SXZU12',
            'desc': '从“二重号”选择一个号码，“单号”中选择两个号码组成一注。',
            'help': '选择1个二重号码和2个单号号码组成一注，所选号码与开奖号码的千位、百位、十位、个位相同，且所选二重号码在开奖号码中出现了2次，即为中奖。',
            'example': '投注方案：二重号：8；单号：06<br>开奖号码：0688（顺序不限），即可中四星组选12。',
            'type': 'multi',
            'layout': {
                '二重号': digitalCodesTpl,
                '单　号': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'SXZU6': {
            'name': '组选6',
            'method': 'SXZU6',
            'desc': '从“二重号”中选择两个号码组成一注。',
            'help': '选择2个二重号码组成一注，所选的2个二重号码在开奖号码的千位、百位、十位、个位中分别出现了2次，即为中奖。',
            'example': '投注方案：二重号：28<br>开奖号码：2288（顺序不限），即可中四星组选6。',
            'type': 'multi',
            'layout': {
                '二重号': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'SXZU4': {
            'name': '组选4',
            'method': 'SXZU4',
            'desc': '从“三重号”中选择一个号码，“单号”中选择一个号码组成一注。',
            'help': '选择1个三重号码和1个单号号码组成一注，所选号码与开奖号码的千位、百位、十位、个位相同，且所选三重号码在开奖号码中出现了3次，即为中奖。',
            'example': '投注方案：三重号：8；单号：2<br>开奖号码：8828（顺序不限），即可中四星组选4。',
            'type': 'multi',
            'layout': {
                '三重号': digitalCodesTpl,
                '单　号': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        // 前三配置
        'QZX3': {
            'name': '直选复式',
            'method': 'QZX3',
            'desc': '从万位、千位、百位各选一个号码组成一注。',
            'help': '从万位、千位、百位中选择一个3位数号码组成一注，所选号码与开奖号码后3位相同，且顺序一致，即为中奖。',
            'example': '投注方案：345<br>开奖号码：前三位 345，即中前三直选。',
            'type': 'multi',
            'layout': {
                '万位': digitalCodesTpl,
                '千位': digitalCodesTpl,
                '百位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'QZX3_S': {
            'name': '直选单式',
            'method': 'QZX3_S',
            'desc': '手动输入号码，至少输入1个三位数号码组成一注。',
            'help': '手动输入一个3位数号码组成一注，所选号码与开奖号码的万位、千位、百位相同，且顺序一致，即为中奖。',
            'example': '投注方案：345<br>开奖号码：前三位 345，即中前三直选。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },
        'QZH3': {
            'name': '前三组合',
            'method': 'QZH3',
            'desc': '从万位、千位、百位各选一个号码组成三注。',
            'help': '从万位、千位、百位中至少各选择一个号码组成1-3星的组合共三注，当百位号码与开奖号码相同，则中1个3等奖；<br>如果百位与千位号码与开奖号码相同，则中1个3等奖以及1个2等奖，依此类推，最高可中3个奖。',
            'example': '投注方案：购买：6+7+8，该票共6元，由以上3注：678(三星)、78(二星)、8(一星)构成<br>开奖号码：前三位 678，即可中三星、二星、一星各1注。',
            'type': 'multi',
            'layout': {
                '万位': digitalCodesTpl,
                '千位': digitalCodesTpl,
                '百位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'QZXHZ': {
            'name': '直选和值',
            'method': 'QZXHZ',
            'desc': '从0-27中任意选择1个或1个以上号码。',
            'help': '所选数值等于开奖号码的万位、千位、百位三个数字相加之和，即为中奖。',
            'example': '投注方案：和值 1<br>开奖号码：前三位 001、010、100，即中前三直选。',
            'type': 'multi',
            'layout': {
                '和值': digitalZxhzTpl
            },
            'buttons': []
        },
        'QZXKD': {
            'name': '直选跨度',
            'method': 'QZXKD',
            'desc': '从0-9中选择1个号码。',
            'help': '所选数值等于开奖号码的前3位最大与最小数字相减之差，即为中奖。',
            'example': '投注方案：跨度8<br>开奖号码：前三位0,8,X，其中X不等于9；或者前三位1,9,X，其中X不等于0，即可中前三直选。',
            'type': 'multi',
            'layout': {
                '跨度': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QZU3': {
            'name': '组三复式',
            'method': 'QZU3',
            'desc': '从0-9中任意选择2个或2个以上号码。',
            'help': '从0-9中选择2个数字组成两注，所选号码与开奖号码的万位、千位、百位相同，且顺序不限，即为中奖。',
            'example': '投注方案：588<br>开奖号码：前三位588（顺序不限），即可中前三组选三。',
            'type': 'multi',
            'layout': {
                '组三': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'QZU3_S': {
            'name': '组三单式',
            'method': 'QZU3_S',
            'desc': '手动输入号码，至少输入1个三位数号码（三个数字当中必须有二个数字相同）。',
            'help': '手动输入一个3位数号码组成一注，三个数字当中必须有两个数字相同，所选号码与开奖号码的万位、千位、百位相同，且顺序不限，即为中奖。',
            'example': '投注方案：588<br>开奖号码：前三位588（顺序不限），即可中前三组选三。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },
        'QZU6': {
            'name': '组六复式',
            'method': 'QZU6',
            'desc': '从0-9中任意选择3个或3个以上号码。',
            'help': '从0-9中任意选择3个号码组成一注，所选号码与开奖号码的万位、千位、百位相同，顺序不限，即为中奖。',
            'example': '投注方案：258<br>开奖号码：前三位 852（顺序不限），即中前三组选六。',
            'type': 'multi',
            'layout': {
                '组六': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'QZU6_S': {
            'name': '组六单式',
            'method': 'QZU6_S',
            'desc': '手动输入号码，至少输入1个三位数号（三个数字全不相同）。',
            'help': '手动输入一个3位数号码组成一注，所选号码与开奖号码的万位、千位、百位相同，顺序不限，即为中奖。',
            'example': '投注方案：123<br>开奖号码：前三位 312（顺序不限），即中前三组选六。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },
        'QHHZX': {
            'name': '混合组选',
            'method': 'QHHZX',
            'desc': '手动输入号码，至少输入1个三位数号码。',
            'help': '手动输入一个3位数号码组成一注（不含豹子号），开奖号码的万位、千位、百位符合前三组三或组六均为中奖。',
            'example': '投注方案：001 和 123<br>开奖号码：前三位 010（顺序不限）即中前三组选三，或者前三位 312（顺序不限）即中前三组选六。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'QZUHZ': {
            'name': '组选和值',
            'method': 'QZUHZ',
            'desc': '从1-26中任意选择1个以上号码。',
            'help': '所选数值等于开奖号码万位、千位、百位三个数字相加之和(非豹子号)，即为中奖。',
            'example': '投注方案：和值3<br>开奖号码：前三位 003（顺序不限）即中前三组选三，或者前三位 012（顺序不限）即中前三组选六。',
            'type': 'multi',
            'layout': {
                '和值': digitalZuhzTpl
            },
            'buttons': []
        },

        'QZU3BD': {
            'name': '组选包胆',
            'method': 'QZU3BD',
            'desc': '从0-9中任选1个号码。',
            'help': '从0-9中任意选择1个包胆号码，开奖号码的万位、千位、百位中任意1位只要和所选包胆号码相同(不含豹子号)，即为中奖。',
            'example': '投注方案：包胆3<br>开奖号码：前三位 3XX 或者 33X，即中前三组选三，或者前三位 3XY，即中前三组选六。',
            'type': 'multi',
            'layout': {
                '包胆': digitalCodesTpl
            },
            'buttons': [],
            'limitSelectedCount': [
                1
            ]
        },

        'QHZWS': {
            'name': '和值尾数',
            'method': 'QHZWS',
            'desc': '从0-9中选择1个号码。',
            'help': '所选数值等于开奖号码的万位、千位、百位三个数字相加之和的尾数，即为中奖。',
            'example': '投注方案：和值尾数 8开奖号码：前三位 936，和值尾数为8，即中和值尾数。',
            'type': 'multi',
            'layout': {
                '和值尾数': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QTS3': {
            'name': '特殊号',
            'method': 'QTS3',
            'desc': '选择一个号码形态。',
            'help': '所选的号码特殊属性和开奖号码前3位的属性一致，即为中奖。<br>其中：1.顺子号的万、千、百位不分顺序；<br>2.对子号指的是开奖号码的前三位当中，任意2位数字相同的三位数号码。',
            'example': '投注方案：豹子顺子对子<br>开奖号码：前三位 888，即中豹子；前三位 678，即中顺子；前三位 558，即中对子。',
            'type': 'multi',
            'btnStr': true,
            'lengthen': true,
            'layout': {
                '特殊号': [
                    '豹子',
                    '顺子',
                    '对子'
                ]
            },
            'buttons': []
        },

        // 中三
        'ZZX3': {
            'name': '直选复式',
            'method': 'ZZX3',
            'desc': '从千、百、十位中各选一个号码组成一注。',
            'help': '从千、百、十位中选择一个3位数号码组成一注，所选号码与开奖号码中间3位相同，且顺序一致，即为中奖。',
            'example': '投注方案：345<br>开奖号码：中三位 345，即中 中三直选。',
            'type': 'multi',
            'layout': {
                '千位': digitalCodesTpl,
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'ZZX3_S': {
            'name': '直选单式',
            'method': 'ZZX3_S',
            'desc': '手动输入号码，至少输入1个三位数号码组成一注。',
            'help': '手动输入一个3位数号码组成一注，所选号码与开奖号码的千、百、十位相同，且顺序一致，即为中奖。',
            'example': '投注方案：345<br>开奖号码：中间三位 345，即中 中三直选。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'ZZH3': {
            'name': '中三组合',
            'method': 'ZZH3',
            'desc': '从千、百、十位中各选一个号码组成三注。',
            'help': '从千、百、十位中至少各选择一个号码组成1-3星的组合共三注，当十位号码与开奖号码相同，则中1个3等奖；<br>如果百位与十位号码与开奖号码相同，则中1个3等奖以及1个2等奖，依此类推，最高可中3个奖。',
            'example': '投注方案：购买：6+7+8，该票共6元，由以上3注：678(三星)、78(二星)、8(一星)构成<br>开奖号码：中间三位 678，即可中三星、二星、一星各1注。',
            'type': 'multi',
            'layout': {
                '千位': digitalCodesTpl,
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'ZZXHZ': {
            'name': '直选和值',
            'method': 'ZZXHZ',
            'desc': '从0-27中任意选择1个或1个以上号码。',
            'help': '所选数值等于开奖号码的千、百、十位中三个数字相加之和，即为中奖。',
            'example': '投注方案：和值 1<br>开奖号码：中三位 001、010、100，即中中三直选。',
            'type': 'multi',
            'layout': {
                '和值': digitalZxhzTpl
            },
            'buttons': []
        },

        'ZZXKD': {
            'name': '直选跨度',
            'method': 'ZZXKD',
            'desc': '从0-9中选择1个号码。',
            'help': '所选数值等于开奖号码的中3位最大与最小数字相减之差，即为中奖。',
            'example': '投注方案：跨度8<br>开奖号码：中三位0,8,X，其中X不等于9；或者中三位1,9,X，其中X不等于0，即可中 中三直选。',
            'type': 'multi',
            'layout': {
                '跨度': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'ZZU3': {
            'name': '组三复式',
            'method': 'ZZU3',
            'desc': '从0-9中任意选择2个或2个以上号码。',
            'help': '从0-9中选择2个数字组成两注，所选号码与开奖号码的千、百、十位相同，且顺序不限，即为中奖。',
            'example': '投注方案：588<br>开奖号码：中间三位588（顺序不限），即可中 中三组选三。',
            'type': 'multi',
            'layout': {
                '组三': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'ZZU3_S': {
            'name': '组三单式',
            'method': 'ZZU3_S',
            'desc': '手动输入号码，至少输入1个三位数号码（三个数字当中必须有二个数字相同）。',
            'help': '手动输入一个3位数号码组成一注，三个数字当中必须有两个数字相同，所选号码与开奖号码的千位、百位、十位相同，且顺序不限，即为中奖。',
            'example': '投注方案：588<br>开奖号码：中间三位588（顺序不限），即可中 中三组选三。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'ZZU6': {
            'name': '组六复式',
            'method': 'ZZU6',
            'desc': '从0-9中任意选择3个或3个以上号码。',
            'help': '从0-9中任意选择3个号码组成一注，所选号码与开奖号码的千、百、十位相同，顺序不限，即为中奖。',
            'example': '投注方案：258<br>开奖号码：中间三位 852（顺序不限），即中 中三组选六。',
            'type': 'multi',
            'layout': {
                '组六': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'ZZU6_S': {
            'name': '组六单式',
            'method': 'ZZU6_S',
            'desc': '手动输入号码，至少输入1个三位数号（三个数字全不相同）。',
            'help': '手动输入一个3位数号码组成一注，所选号码与开奖号码的千、百、十位相同，顺序不限，即为中奖。',
            'example': '投注方案：123<br>开奖号码：中间三位 312（顺序不限），即中 中三组选六。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'ZHHZX': {
            'name': '混合组选',
            'method': 'ZHHZX',
            'desc': '手动输入号码，至少输入1个三位数号码。',
            'help': '手动输入一个3位数号码组成一注（不含豹子号），开奖号码的千、百、十位符合中三组三或组六均为中奖。',
            'example': '投注方案：001 和 123<br>开奖号码：中间三位 010（顺序不限）即中 中三组选三，或者中三位 312（顺序不限）即中 中三组选六。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'ZZUHZ': {
            'name': '组选和值',
            'method': 'ZZUHZ',
            'desc': '从1-26中任意选择1个以上号码。',
            'help': '所选数值等于开奖号码千、百、十位三个数字相加之和(非豹子号)，即为中奖。',
            'example': '投注方案：和值3<br>开奖号码：中间三位 003（顺序不限）即中 中三组选三，或者中间三位 012（顺序不限）即中 中三组选六。',
            'type': 'multi',
            'layout': {
                '和值': digitalZuhzTpl
            },
            'buttons': []
        },

        'ZZU3BD': {
            'name': '组选包胆',
            'method': 'ZZU3BD',
            'desc': '从0-9中任选1个号码。',
            'help': '从0-9中任意选择1个包胆号码，开奖号码的千、百、十位中任意1位只要和所选包胆号码相同(不含豹子号)，即为中奖。',
            'example': '投注方案：包胆3<br>开奖号码：中三位 3XX 或者 33X，即中 中三组选三，或者中三位 3XY，即中 中三组选六。',
            'type': 'multi',
            'layout': {
                '包胆': digitalCodesTpl
            },
            'buttons': [],
            'limitSelectedCount': [
                1
            ]
        },

        'ZHZWS': {
            'name': '和值尾数',
            'method': 'ZHZWS',
            'desc': '从0-9中选择1个号码。',
            'help': '所选数值等于开奖号码的千、百、十位三个数字相加之和的尾数，即为中奖。',
            'example': '投注方案：和值尾数 8开奖号码：中间三位 936，和值尾数为8，即中和值尾数。',
            'type': 'multi',
            'layout': {
                '和值尾数': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'ZTS3': {
            'name': '特殊号',
            'method': 'ZTS3',
            'desc': '选择一个号码形态。',
            'help': '所选的号码特殊属性和开奖号码中间3位的属性一致，即为中奖。<br>其中：1.顺子号的千、百、十位不分顺序；<br>2.对子号指的是开奖号码的中间三位当中，任意2位数字相同的三位数号码。',
            'example': '投注方案：豹子顺子对子<br>开奖号码：中间三位 888，即中豹子；中间三位 678，即中顺子；中间三位 558，即中对子。',
            'type': 'multi',
            'btnStr': true,
            'lengthen': true,
            'layout': {
                '特殊号': [
                    '豹子',
                    '顺子',
                    '对子'
                ]
            },
            'buttons': []
        },

        // 后三
        'HZX3': {
            'name': '直选复式',
            'method': 'HZX3',
            'desc': '从百位、十位、个位各选一个号码组成一注。',
            'help': '从百位、十位、个位中选择一个3位数号码组成一注，所选号码与开奖号码后3位相同，且顺序一致，即为中奖。',
            'example': '投注方案：345<br>开奖号码：345，即中后三直选。',
            'type': 'multi',
            'layout': {
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl,
        },

        'HZX3_S': {
            'name': '直选单式',
            'method': 'HZX3_S',
            'desc': '手动输入号码，至少输入1个三位数号码组成一注。',
            'help': '手动输入一个3位数号码组成一注，所选号码与开奖号码的百位、十位、个位相同，且顺序一致，即为中奖。',
            'example': '投注方案：345<br>开奖号码：345，即中后三直选。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'HZH3': {
            'name': '后三组合',
            'method': 'HZH3',
            'desc': '从百位、十位、个位各选一个号码组成三柱。',
            'help': '从百位、十位、个位中至少各选择一个号码组成1-3星的组合共三注，当个位号码与开奖号码相同，则中1个3等奖；如果个位与十位号码与开奖号码相同，则中1个3等奖以及1个2等奖，依此类推，最高可中3个奖。',
            'example': '购买6+7+8，该票共6元，由一下3注：678（三星）、78（二星）、8（一星）构成<br>开奖号码：后三位 678，即中三星、二星、一星各一注。',
            'type': 'multi',
            'layout': {
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'HZXHZ': {
            'name': '直选和值',
            'method': 'HZXHZ',
            'desc': '从0-27中任意选择1个或1个以上号码。',
            'help': '所选数值等于开奖号码的百位、十位、个位三个数字相加之和，即为中奖。',
            'example': '投注方案：和值1<br>开奖号码：后三位001，010，100，即中后三直选。',
            'type': 'multi',
            'layout': {
                '和值': digitalZxhzTpl
            },
            'buttons': []
        },

        'HZXKD': {
            'name': '直选跨度',
            'method': 'HZXKD',
            'desc': '从0-9中选择1个以上号码。',
            'help': '所选数值等于开奖号码的后3位最大与最小数字相减之差，即为中奖。',
            'example': '投注方案：跨度8<br>开奖号码：后三位0,8,X，其中X不等于9；或者后三位1,9,X，其中X不等于0，即可中后三直选。',
            'type': 'multi',
            'layout': {
                '跨度': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'HZU3': {
            'name': '组三复式',
            'method': 'HZU3',
            'desc': '从0-9中任意选择2个或2个以上号码。',
            'help': '从0-9中选择2个数字组成两注，所选号码与开奖号码的百位、十位、个位相同，且顺序不限，即为中奖。',
            'example': '投注方案：588<br>开奖号码：后三位588（顺序不限），即可中后三组选三。',
            'type': 'multi',
            'layout': {
                '组三': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'HZU3_S': {
            'name': '组三单式',
            'method': 'HZU3_S',
            'desc': '手动输入号码，至少输入1个三位数号码（三个数字中必须有二个数字相同）。',
            'help': '手动输入一个3位数号码组成一注，三个数字中必须有二个数字相同，输入号码与开奖号码的百位、十位、个位相同，顺序不限，即为中奖。',
            'example': '投注方案：001<br>开奖号码：后三位 010（顺序不限），即中后三组选三。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'HZU6': {
            'name': '组六复式',
            'method': 'HZU6',
            'desc': '从0-9中任意选择3个或3个以上号码。',
            'help': '从0-9中任意选择3个号码组成一注，所选号码与开奖号码的百位、十位、个位相同，顺序不限，即为中奖。',
            'example': '投注方案：258<br>开奖号码：后三位 852（顺序不限），即中后三组选六。',
            'type': 'multi',
            'layout': {
                '组六': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'HZU6_S': {
            'name': '组六单式',
            'method': 'HZU6_S',
            'desc': '手动输入号码，至少输入1个三位数号码（三个数字完全不相同）。',
            'help': '手动输入一个3位数号码组成一注，所选号码与开奖号码的百位、十位、个位相同，且顺序不限，即为中奖。',
            'example': '投注方案：123<br>开奖号码：后三位 321（顺序不限），即中后三组选六。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'HHHZX': {
            'name': '混合组选',
            'method': 'HHHZX',
            'desc': '手动输入号码，至少输入1个三位数号码。',
            'help': '手动输入一个3位数号码组成一注（不含豹子号），开奖号码的百位、十位、个位符合后三组三或者组六均为中奖。',
            'example': '投注方案：001 和 123<br>开奖号码：后三位 010（顺序不限）即中后三组选三，或者后三位 312（顺序不限）即中后三组选六。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'HZUHZ': {
            'name': '组选和值',
            'method': 'HZUHZ',
            'desc': '从1-26中选择1个号码。',
            'help': '所选数值等于开奖号码百位、十位、个位三个数字相加之和(非豹子号)，即为中奖。',
            'example': '投注方案：和值3<br>开奖号码：后三位 003（顺序不限）即中后三组选三，或者后三位 012（顺序不限）即中后三组选六。',
            'type': 'multi',
            'layout': {
                '和值': digitalZuhzTpl
            },
            'buttons': []
        },

        'HZU3BD': {
            'name': '组选包胆',
            'method': 'HZU3BD',
            'desc': '从0-9中选择1个号码。',
            'help': '从0-9中任意选择1个包胆号码，开奖号码的百位、十位、个位中任意1位与所选包胆号码相同(不含豹子号)，即为中奖。',
            'example': '投注方案：包胆3<br>开奖号码：后三位 3XX 或者 33X，即中后三组选三，后三位 3XY，即中后三组选六。',
            'type': 'multi',
            'layout': {
                '包胆': digitalCodesTpl
            },
            'buttons': [],
            'limitSelectedCount': [
                1
            ]
        },

        'HHZWS': {
            'name': '和值尾数',
            'method': 'HHZWS',
            'desc': '从0-9中选择1个号码。',
            'help': '所选数值等于开奖号码的百位、十位、个位三个数字相加之和的尾数，即为中奖。',
            'example': '投注方案：和值尾数 8<br>开奖号码：后三位 936，和值尾数为8，即中和值尾数。',
            'type': 'multi',
            'layout': {
                '和值尾数': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'HTS3': {
            'name': '特殊号',
            'method': 'HTS3',
            'desc': '选择一个号码形态。',
            'help': '所选的号码特殊属性和开奖号码后3位的属性一致，即为中奖。其中：1.顺子号的个、十、百位不分顺序；2.对子号指的是开奖号码的后三位当中，任意2位数字相同的三位数号码。',
            'example': '投注方案：豹子顺子对子<br>开奖号码：后三位 888，即中豹子；后三位 678，即中顺子；后三位 558，即中对子。',
            'type': 'multi',
            'btnStr': true,
            'lengthen': true,
            'layout': {
                '特殊号': [
                    '豹子',
                    '顺子',
                    '对子'
                ]
            },
            'buttons': []
        },

        // 二星
        'QZX2': {
            'name': '直选复式',
            'method': 'QZX2',
            'desc': '从万位、千位中至少各选1个号码组成一注。',
            'help': '从万位、千位中选择一个2位数号码组成一注，所选号码与开奖号码的前2位相同，且顺序一致，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 58，即中前二直选。',
            'type': 'multi',
            'layout': {
                '万位': digitalCodesTpl,
                '千位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QZX2_S': {
            'name': '直选单式',
            'method': 'QZX2_S',
            'desc': '手动输入号码，至少输入1个二位数号码组成一注。',
            'help': '手动输入一个2位数号码组成一注，输入号码的万位、千位与开奖号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 58，即中前二直选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'QZX2HZ': {
            'name': '直选和值',
            'method': 'QZX2HZ',
            'desc': '从0-18中任意选择1个或1个以上的和值号码。',
            'help': '所选数值等于开奖号码的万位、千位二个数字相加之和，即为中奖。',
            'example': '投注方案：和值1<br>开奖号码：前二位 01，10，即中前二直选。',
            'type': 'multi',
            'layout': {
                '和值': digitalZxhz2Tpl
            },
            'buttons': []
        },

        'QZX2KD': {
            'name': '直选跨度',
            'method': 'QZX2KD',
            'desc': '从0-9中任意选择1个号码组成一注。',
            'help': '所选数值等于开奖号码的前2位最大与最小数字相减之差，即为中奖。',
            'example': '投注方案：跨度9<br>开奖号码：前二位 90或09，即中前二直选。',
            'type': 'multi',
            'layout': {
                '跨度': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QZU2': {
            'name': '组选复式',
            'method': 'QZU2',
            'desc': '从0-9中任意选择2个或2个以上号码。',
            'help': '从0-9中选2个号码组成一注，所选号码与开奖号码的万位、千位相同，顺序不限，即中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 85 或者 58（顺序不限，不含对子号），即中前二组选。',
            'type': 'multi',
            'layout': {
                '组选': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QZU2_S': {
            'name': '组选单式',
            'method': 'QZU2_S',
            'desc': '手动输入号码，至少输入1个二位数号码组成一注。',
            'help': '手动输入一个2位数号码组成一注，输入号码的万位、千位与开奖号码相同，顺序不限，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 85 或者 58（顺序不限，不含对子号），即中前二组选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'QZU2HZ': {
            'name': '组选和值',
            'method': 'QZU2HZ',
            'desc': '从1-17中任意选择1个或者1个以上号码。',
            'help': '所选数值等于开奖号码的万位、千位二个数字相加之和（不含对子号），即为中奖。',
            'example': '投注方案：和值 1<br>开奖号码：前二位 10 或者 01（顺序不限，不含对子号），即中前二组选。',
            'type': 'multi',
            'layout': {
                '和值': digitalZuhz2Tpl
            },
            'buttons': []
        },

        'QZU2BD': {
            'name': '组选包胆',
            'method': 'QZU2BD',
            'desc': '从0-9中任意选择1个包胆号码。',
            'help': '从0-9中任意选择1个包胆号码，开奖号码的万位，千位中任意1位包含所选的包胆号码相同（不含对子号），即为中奖。',
            'example': '投注方案：包胆 8 <br>开奖号码：前二位 8X，且X不等于8，即中前二组选。',
            'type': 'multi',
            'layout': {
                '包胆': digitalCodesTpl
            },
            'buttons': [],
            'limitSelectedCount': [
                1
            ]
        },

        'HZX2': {
            'name': '直选复式',
            'method': 'HZX2',
            'desc': '从十位、个位中至少各选1个号码组成一注。',
            'help': '从十位、个位中选择一个2位数号码组成一注，所选号码与开奖号码的后2位相同，且顺序一致，即为中奖。',
            'example': '投注方案：58<br>开奖号码：后二位 58，即中后二直选。',
            'type': 'multi',
            'layout': {
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'HZX2_S': {
            'name': '直选单式',
            'method': 'HZX2_S',
            'desc': '手动输入号码，至少输入1个二位数号码组成一注。',
            'help': '手动输入一个2位数号码组成一注，输入号码的十位、个位与开奖号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：58<br>开奖号码：后二位 58，即中后二直选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'HZX2HZ': {
            'name': '直选和值',
            'method': 'HZX2HZ',
            'desc': '从0-18中任意选择1个或1个以上的和值号码。',
            'help': '所选数值等于开奖号码的十位、个位二个数字相加之和，即为中奖。',
            'example': '投注方案：和值1<br>开奖号码：后二位 01，10，即中后二直选。',
            'type': 'multi',
            'layout': {
                '和值': digitalZxhz2Tpl
            },
            'buttons': []
        },

        'HZX2KD': {
            'name': '直选跨度',
            'method': 'HZX2KD',
            'desc': '从0-9中任意选择1个号码组成一注。',
            'help': '所选数值等于开奖号码的后2位最大与最小数字相减之差，即为中奖。',
            'example': '投注方案：跨度9<br>开奖号码：后二位 90或09，即中后二直选。',
            'type': 'multi',
            'layout': {
                '跨度': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'HZU2': {
            'name': '组选复式',
            'method': 'HZU2',
            'desc': '从0-9中任意选择2个或2个以上号码。',
            'help': '从0-9中选2个号码组成一注，所选号码与开奖号码的十位、个位相同（不含对子号），顺序不限，即中奖。',
            'example': '投注方案：58<br>开奖号码：后二位 85 或者 58（顺序不限，不含对子号），即中后二组选。',
            'type': 'multi',
            'layout': {
                '组选': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'HZU2_S': {
            'name': '组选单式',
            'method': 'HZU2_S',
            'desc': '手动输入号码，至少输入1个二位数号码组成一注。',
            'help': '手动输入一个2位数号码组成一注，输入号码的十位、个位与开奖号码相同（不含对子号），顺序不限，即为中奖。',
            'example': '投注方案：58<br>开奖号码：后二位 85 或者 58（顺序不限，不含对子号），即中后二组选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'HZU2HZ': {
            'name': '组选和值',
            'method': 'HZU2HZ',
            'desc': '从1-17中任意选择1个或者1个以上号码。',
            'help': '所选数值等于开奖号码的十位、个位二个数字相加之和（不含对子号），即为中奖。',
            'example': '投注方案：和值 1<br>开奖号码：后二位 10 或者 01（顺序不限，不含对子号），即中后二组选。',
            'type': 'multi',
            'layout': {
                '和值': digitalZuhz2Tpl
            },
            'buttons': []
        },

        'HZU2BD': {
            'name': '组选包胆',
            'method': 'HZU2BD',
            'desc': '从0-9中任意选择1个包胆号码。',
            'help': '从0-9中任意选择1个包胆号码，开奖号码的十位，个位中任意1位包含所选的包胆号码相同（不含对子号），即为中奖。',
            'example': '投注方案：包胆 8 <br>开奖号码：后二位 8X，且X不等于8，即中后二组选。',
            'type': 'multi',
            'layout': {
                '包胆': digitalCodesTpl
            },
            'buttons': [],
            'limitSelectedCount': [
                1
            ]
        },

        'DWD': {
            'name': '定位胆',
            'method': 'DWD',
            'desc': '在万位、千位、百位、十位、个位任意位置上任意选择1个或1个以上号码。',
            'help': '从万位、千位、百位、十位、个位任意位置上至少选择1个以上号码，所选号码与相同位置上的开奖号码一致，即为中奖。',
            'example': '投注方案：万位 1<br>开奖号码：万位 1，即中定位胆万位。',
            'type': 'multi',
            'layout': {
                '万位': digitalCodesTpl,
                '千位': digitalCodesTpl,
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'HBDW31': {
            'name': '后三一码',
            'method': 'HBDW31',
            'desc': '从0-9中任意选择1个以上号码。',
            'help': '从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的百位、十位、个位中包含所选号码，即为中奖。',
            'example': '投注方案：1<br>开奖号码：后三位至少出现1个1，即中后三一码不定位。',
            'type': 'multi',
            'layout': {
                '不定位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QBDW31': {
            'name': '前三一码',
            'method': 'QBDW31',
            'desc': '从0-9中任意选择1个以上号码。',
            'help': '从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。',
            'example': '投注方案：1<br>开奖号码：前三位，至少出现1个1，即中前三一码不定位。',
            'type': 'multi',
            'layout': {
                '不定位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'HBDW32': {
            'name': '后三二码',
            'method': 'HBDW32',
            'desc': '从0-9中任意选择2个以上号码。',
            'help': '从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的百位、十位、个位中同时包含所选的2个号码，即为中奖。',
            'example': '投注方案：12<br>开奖号码：后三位，至少出现1和2各1个，即中后三二码不定位。',
            'type': 'multi',
            'layout': {
                '不定位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QBDW32': {
            'name': '前三二码',
            'method': 'QBDW32',
            'desc': '从0-9中任意选择2个以上号码。',
            'help': '从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位中同时包含所选的2个号码，即为中奖。',
            'example': '投注方案：12<br>开奖号码：前三位，至少出现1和2各1个，即中前三二码不定位。',
            'type': 'multi',
            'layout': {
                '不定位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'BDW41': {
            'name': '四星一码',
            'method': 'BDW41',
            'desc': '从0-9中任意选择1个以上号码。',
            'help': '从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的千位、百位、十位、个位中包含所选号码，即为中奖。',
            'example': '投注方案：1<br>开奖号码：后四位，至少出现1个1，即中四星一码不定位。',
            'type': 'multi',
            'layout': {
                '不定位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'BDW42': {
            'name': '四星二码',
            'method': 'BDW42',
            'desc': '从0-9中任意选择2个以上号码。',
            'help': '从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的千位、百位、十位、个位中同时包含所选的2个号码，即为中奖。',
            'example': '投注方案：12<br>开奖号码：后四位，至少出现1和2各一个，即中四星二码不定位。',
            'type': 'multi',
            'layout': {
                '不定位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'BDW52': {
            'name': '五星二码',
            'method': 'BDW52',
            'desc': '从0-9中任意选择2个以上号码。',
            'help': '从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位、十位、个位中同时包含所选的2个号码，即为中奖。',
            'example': '投注方案：12<br>开奖号码：至少出现1和2各一个，即中五星二码不定位。',
            'type': 'multi',
            'layout': {
                '不定位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'BDW53': {
            'name': '五星三码',
            'method': 'BDW53',
            'desc': '从0-9中任意选择3个以上号码。',
            'help': '从0-9中选择3个号码，每注由3个不同的号码组成，开奖号码的万位、千位、百位、十位、个位中同时包含所选的3个号码，即为中奖。',
            'example': '投注方案：123<br>开奖号码：至少出现1、2、3各1个，即中五星三码不定位。',
            'type': 'multi',
            'layout': {
                '不定位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'Q2DXDS': {
            'name': '前二大小单双',
            'method': 'Q2DXDS',
            'desc': '从万位、千位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对万位、千位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：小双<br>开奖号码：万位与千位“小双”，即中前二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '万位': digitalDxdsTpl,
                '千位': digitalDxdsTpl
            },
            'buttons': [
                '清'
            ]
        },
        'H2DXDS': {
            'name': '后二大小单双',
            'method': 'H2DXDS',
            'desc': '从十位、个位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对十位和个位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：大单<br>开奖号码：十位与个位“小双”，即中后二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '十位': digitalDxdsTpl,
                '个位': digitalDxdsTpl
            },
            'buttons': [
                '清'
            ]
        },

        'Q3DXDS': {
            'name': '前三大小单双',
            'method': 'Q3DXDS',
            'desc': '从万位、千位、百位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对万位、千位和百位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：小双小<br>开奖号码：万位、千位、百位“小双小”，即中前三大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '万位': digitalDxdsTpl,
                '千位': digitalDxdsTpl,
                '百位': digitalDxdsTpl
            },
            'buttons': [
                '清'
            ]
        },

        'H3DXDS': {
            'name': '后三大小单双',
            'method': 'H3DXDS',
            'desc': '从百位、十位、个位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对百位、十位和个位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：大单大<br>开奖号码：百位、十位、个位“大单大”，即中后三大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '百位': digitalDxdsTpl,
                '十位': digitalDxdsTpl,
                '个位': digitalDxdsTpl
            },
            'buttons': [
                '清'
            ]
        },

        'LHWQ': {
            'name': '万千',
            'method': 'LHWQ',
            'desc': '从万位、千位中的“龙/虎/和”中至少各选一个组成一注。',
            'help': '对万位、千位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：小双<br>开奖号码：万位与千位“小双”，即中前二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '万/千': digitalLhhTpl
            },
            'buttons': []
        },
        'LHWB': {
            'name': '万百',
            'method': 'LHWB',
            'desc': '从万位、千位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对万位、千位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：小双<br>开奖号码：万位与千位“小双”，即中前二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '万/百': digitalLhhTpl
            },
            'buttons': []
        },
        'LHWS': {
            'name': '万十',
            'method': 'LHWS',
            'desc': '从万位、千位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对万位、千位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：小双<br>开奖号码：万位与千位“小双”，即中前二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '万/十': digitalLhhTpl
            },
            'buttons': []
        },
        'LHWG': {
            'name': '万个',
            'method': 'LHWG',
            'desc': '从万位、千位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对万位、千位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：小双<br>开奖号码：万位与千位“小双”，即中前二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '万/个': digitalLhhTpl
            },
            'buttons': []
        },
        'LHQB': {
            'name': '千百',
            'method': 'LHQB',
            'desc': '从万位、千位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对万位、千位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：小双<br>开奖号码：万位与千位“小双”，即中前二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '千/百': digitalLhhTpl
            },
            'buttons': []
        },
        'LHQS': {
            'name': '千十',
            'method': 'LHQS',
            'desc': '从万位、千位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对万位、千位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：小双<br>开奖号码：万位与千位“小双”，即中前二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '千/十': digitalLhhTpl
            },
            'buttons': []
        },
        'LHQG': {
            'name': '千个',
            'method': 'LHQG',
            'desc': '从万位、千位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对万位、千位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：小双<br>开奖号码：万位与千位“小双”，即中前二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '千/个': digitalLhhTpl
            },
            'buttons': []
        },
        'LHBS': {
            'name': '百十',
            'method': 'LHGS',
            'desc': '从万位、千位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对万位、千位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：小双<br>开奖号码：万位与千位“小双”，即中前二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '百/十': digitalLhhTpl
            },
            'buttons': []
        },
        'LHBG': {
            'name': '百个',
            'method': 'LHBG',
            'desc': '从万位、千位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对万位、千位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：小双<br>开奖号码：万位与千位“小双”，即中前二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '百/个': digitalLhhTpl
            },
            'buttons': []
        },
        'RZX2': {
            'name': '直选复式',
            'method': 'RZX2',
            'desc': '从万位、千位、百位、十位、个位中至少两位上各选1个号码组成一注。',
            'help': '从万位、千位、百位、十位、个位中至少两位上各选1个号码组成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：万位5，百位8<br>开奖号码：51812，即中任二直选。',
            'type': 'multi',
            'layout': {
                '万位': digitalCodesTpl,
                '千位': digitalCodesTpl,
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl,
            'pc': []
        },
        'RZX2_S': {
            'name': '直选单式',
            'method': 'RZX2_S',
            'desc': '从万位、千位、百位、十位、个位中至少选择两个位置,至少手动输入一个两位数的号码构成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择两个位置,至少手动输入一个两位数的号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：位置选择万位、百位，输入号码58<br>开奖号码：51812，即中任二直选(单式)。',
            'type': 'text',
            'pc': [
                's',
                'g'
            ]
        },
        'RZXHZ2': {
            'name': '直选和值',
            'method': 'RZXHZ2',
            'desc': '从万位、千位、百位、十位、个位中至少选择两个位置,至少选择一个和值号码构成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择两个位置,至少选择一个和值号码构成一注，所选号码与开奖号码的和值相同，即为中奖。',
            'example': '投注方案：位置选择万位、百位，选择和值号码13<br>开奖号码：51812，即中任二直选(单式)。',
            'type': 'multi',
            'layout': {
                '和值': digitalZxhz2Tpl
            },
            'buttons': [],
            'pc': [
                's',
                'g'
            ]
        },
        'RZU2': {
            'name': '组选复式',
            'method': 'RZU2',
            'desc': '从万位、千位、百位、十位、个位中至少选择两个位置,号码区至少选择两个号码构成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择两个位置,号码区至少选择两个号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序不限，即为中奖。',
            'example': '投注方案：位置选择万位、百位，选择号码85<br>开奖号码：51812或者81512，即中任二组选。',
            'type': 'multi',
            'layout': {
                '组三': digitalCodesTpl
            },
            'buttons': digitalPosTpl,
            'pc': [
                's',
                'g'
            ]
        },
        'RZU2_S': {
            'name': '组选单式',
            'method': 'RZU2_S',
            'desc': '从万位、千位、百位、十位、个位中至少选择两个位置,至少手动输入一个两位数的号码构成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择两个位置,至少手动输入一个两位数的号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序不限，即为中奖。',
            'example': '投注方案：位置选择万位、百位，输入号码85<br>开奖号码：51812或者81512，即中任二组选(单式)。',
            'type': 'text',
            'pc': [
                's',
                'g'
            ]
        },
        'RZUHZ2': {
            'name': '组选和值',
            'method': 'RZUHZ2',
            'desc': '从万位、千位、百位、十位、个位中至少选择两个位置,至少选择一个和值号码构成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择两个位置,至少选择一个和值号码构成一注，所选号码与开奖号码的和值相同，即为中奖。',
            'example': '投注方案：位置选择万位、百位，选择和值号码13<br>开奖号码：51812，即中任二组选和值。',
            'type': 'multi',
            'layout': {
                '和值': digitalZuhz2Tpl
            },
            'buttons': [],
            'pc': [
                's',
                'g'
            ]
        },
        'RZX3': {
            'name': '直选复式',
            'method': 'RZX3',
            'desc': '从万位、千位、百位、十位、个位中至少三位上各选1个号码组成一注。',
            'help': '从万位、千位、百位、十位、个位中至少三位上各选1个号码组成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：万位5，百8,个位2<br>开奖号码：51812，即中任三直选。',
            'type': 'multi',
            'layout': {
                '万位': digitalCodesTpl,
                '千位': digitalCodesTpl,
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl,
            'pc': []
        },
        'RZX3_S': {
            'name': '直选单式',
            'method': 'RZX3_S',
            'desc': '从万位、千位、百位、十位、个位中至少选择三个位置,至少手动输入一个三位数的号码构成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择三个位置,至少手动输入一个三位数的号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：位置选择万位、百位,个位，输入号码582<br>开奖号码：51812，即中任三直选(单式)。',
            'type': 'text',
            'pc': [
                'b',
                's',
                'g'
            ],
            'b64': 3
        },
        'RZXHZ': {
            'name': '直选和值',
            'method': 'RZXHZ',
            'desc': '从万位、千位、百位、十位、个位中至少选择三个位置,至少选择一个和值号码构成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择三个位置,至少选择一个和值号码构成一注，所选号码与开奖号码的和值相同，即为中奖。',
            'example': '投注方案：位置选择万位、百位、个位，选择和值号码15<br>开奖号码：51812，即中任二直选(单式)。',
            'type': 'multi',
            'layout': {
                '和值': digitalZxhzTpl
            },
            'buttons': [],
            'pc': [
                'b',
                's',
                'g'
            ]
        },
        'RZUS': {
            'name': '组三复式',
            'method': 'RZUS',
            'desc': '从万位、千位、百位、十位、个位中至少选择三个位置,号码区至少选择两个号码构成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择三个位置,号码区至少选择两个号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序不限，即为中奖。',
            'example': '投注方案：选择位置万位、十位、个位,选择号码12<br>开奖号码：11812，即中任三组三。',
            'type': 'multi',
            'layout': {
                '组三': digitalCodesTpl
            },
            'buttons': digitalPosTpl,
            'pc': [
                'b',
                's',
                'g'
            ]
        },
        'RZUS_S': {
            'name': '组三单式',
            'method': 'RZUS_S',
            'desc': '从万位、千位、百位、十位、个位中至少选择三个位置,手动至少输入两个号码构成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择三个位置,手动至少输入两个号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序不限，即为中奖。',
            'example': '投注方案：选择位置万位、十位、个位,输入号码12<br>开奖号码：11812，即中任三组三(单式)。',
            'type': 'text',
            'pc': [
                'b',
                's',
                'g'
            ]
        },
        'RZUL': {
            'name': '组六复式',
            'method': 'RZUL',
            'desc': '从万位、千位、百位、十位、个位中至少选择三个位置,号码区至少选择三个号码构成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择三个位置,号码区至少选择三个号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序不限，即为中奖。',
            'example': '投注方案：选择位置万位、十位、个位,选择号码512<br>开奖号码：51812，即中任三组六。',
            'type': 'multi',
            'layout': {
                '组六': digitalCodesTpl
            },
            'buttons': digitalPosTpl,
            'pc': [
                'b',
                's',
                'g'
            ]
        },
        'RZUL_S': {
            'name': '组六单式',
            'method': 'RZUL_S',
            'desc': '从万位、千位、百位、十位、个位中至少选择三个位置,手动至少输入三个号码构成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择三个位置,手动至少输入三个号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序不限，即为中奖。',
            'example': '投注方案：选择位置万位、十位、个位,输入号码512<br>开奖号码：51812，即中任三组六(单式)。',
            'type': 'text',
            'pc': [
                'b',
                's',
                'g'
            ]
        },
        'RHHZX': {
            'name': '混合组选',
            'method': 'RHHZX',
            'desc': '从万位、千位、百位、十位、个位中至少选择三个位置,手动至少输入三个号码构成一注(不包含豹子号)。',
            'help': '从万位、千位、百位、十位、个位中至少选择三个位置,手动至少输入三个号码构成一注(不包含豹子号)，所选号码与开奖号码的指定位置上的号码相同，且顺序不限，即为中奖。',
            'example': '投注方案：勾选位置千位、百位、个位，分别投注(0,0,1)，以及(1,2,3),开奖号码：*00*1，顺序不限，即中任三组三；或者(2)*21*3，顺序不限，即中任三组六。',
            'type': 'text',
            'pc': [
                'b',
                's',
                'g'
            ],
            'b64': 3
        },
        'RZUHZ': {
            'name': '组选和值',
            'method': 'RZUHZ',
            'desc': '从万位、千位、百位、十位、个位中至少选择三个位置,至少选择一个和值号码构成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择两个位置,至少选择一个和值号码构成一注，所选号码与开奖号码的和值(不包含豹子号)相同，即为中奖。',
            'example': '投注方案：选择位置万位、十位、个位,选择和值号码8<br>开奖号码：51812，即中任三组选和值。',
            'type': 'multi',
            'layout': {
                '和值': digitalZuhzTpl
            },
            'buttons': [],
            'pc': [
                'b',
                's',
                'g'
            ]
        },
        'RZX4': {
            'name': '直选复式',
            'method': 'RZX4',
            'desc': '从万位、千位、百位、十位、个位中至少四位上各选1个号码组成一注。',
            'help': '从万位、千位、百位、十位、个位中至少四位上各选1个号码组成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：万位5，千位1,百位8,十位1<br>开奖号码：51812，即中任四直选。',
            'type': 'multi',
            'layout': {
                '万位': digitalCodesTpl,
                '千位': digitalCodesTpl,
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl,
            'pc': []
        },
        'RZX4_S': {
            'name': '直选单式',
            'method': 'RZX4_S',
            'desc': '从万位、千位、百位、十位、个位中至少选择四个位置,至少手动输入一个四位数的号码构成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择四个位置,至少手动输入一个四位数的号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：选择万位、千位、百位、十位，输入号码5181<br>开奖号码：51812，即中任四直选(单式)。',
            'type': 'text',
            'pc': [
                'q',
                'b',
                's',
                'g'
            ],
            'b64': 4
        },
        'RSXZU24': {
            'name': '组选24',
            'method': 'RSXZU24',
            'desc': '从万位、千位、百位、十位、个位中至少选择四个位置,号码区至少选择四个号码构成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择四个位置,号码区至少选择四个号码构成一注，所选号码与开奖号码的指定位置上的号码相同，且顺序不限，即为中奖。',
            'example': '投注方案：位置选择千位、百位、十位、个位,号码选择0568<br>开奖号码：10568(指定位置号码顺序不限)，即可中任四组选24。',
            'type': 'multi',
            'layout': {
                '组选24': digitalCodesTpl
            },
            'buttons': digitalPosTpl,
            'pc': [
                'q',
                'b',
                's',
                'g'
            ]
        },
        'RSXZU12': {
            'name': '组选12',
            'method': 'RSXZU12',
            'desc': '从万位、千位、百位、十位、个位中至少选择四个位置,从“二重号”和“单号”中各选择两个号码组成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择四个位置，然后选择1个二重号码和2个单号号码组成一注，所选4个位置的开奖号码中包含与所选号码，且所选二重号码在所选4个位置的开奖号码中出现了2次，即为中奖。',
            'example': '投注方案：位置选择千位、百位、十位、个位,二重号：8；单号：06<br>开奖号码：10688(指定位置号码顺序不限)，即可中任四组选12。',
            'type': 'multi',
            'layout': {
                '二重号': digitalCodesTpl,
                '单　号': digitalCodesTpl
            },
            'buttons': digitalPosTpl,
            'pc': [
                'q',
                'b',
                's',
                'g'
            ]
        },
        'RSXZU6': {
            'name': '组选6',
            'method': 'RSXZU6',
            'desc': '从万位、千位、百位、十位、个位中至少选择四个位置,从“二重号”中选择两个号码组成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择四个位置，从“二重号”中选择两个号码组成一注，所选号码与开奖号码的指定位置上的号码相同，且二重号在指定位置中分别出现了2次，即为中奖。',
            'example': '投注方案：位置选择千位、百位、十位、个位,二重号：28<br>开奖号码：12288(指定位置号码顺序不限)，即可中任四组选6。',
            'type': 'multi',
            'layout': {
                '二重号': digitalCodesTpl
            },
            'buttons': digitalPosTpl,
            'pc': [
                'q',
                'b',
                's',
                'g'
            ]
        },
        'RSXZU4': {
            'name': '组选4',
            'method': 'RSXZU4',
            'desc': '从万位、千位、百位、十位、个位中至少选择四个位置,从“三重号”和“单号”中各选择一个号码组成一注。',
            'help': '从万位、千位、百位、十位、个位中至少选择四个位置，从“三重号”和”单号”中各选择一个号码组成一注，所选号码与开奖号码的指定位置上的号码相同，且三重号号码在指定位置中出现了3次，即为中奖。',
            'example': '投注方案：位置选择千位、百位、十位、个位,三重号：8；单号：2<br>开奖号码：18828(指定位置号码顺序不限)，即可中任四组选4。',
            'type': 'multi',
            'layout': {
                '三重号': digitalCodesTpl,
                '单　号': digitalCodesTpl
            },
            'buttons': digitalPosTpl,
            'pc': [
                'q',
                'b',
                's',
                'g'
            ]
        }
    },
    'k3': {
        // 和值大小单双
        'KSHZDXDS': {
            'name': '大小单双',
            'method': 'KSHZDXDS',
            'desc': '选择1个或者多个结果，如果开奖号码的和值与所选结果符合即中奖',
            'help': '选择1个或者多个结果，如果开奖号码的和值与所选结果符合即中奖',
            'example': '投注方案：大<br>开奖号码：开奖号码和值为大，即中和值大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '和值': digitalDxdsTpl
            },
            'buttons': []
        },
        // 和值
        'KSHZ': {
            'name': '和值',
            'method': 'KSHZ',
            'desc': '是指对三个号码的和值进行投注,和值从3到18',
            'help': '是指对三个号码的和值进行投注,和值从3到18,开奖三个号码的和值等于购买的号码则中奖',
            'example': '购买号码:5<br>开奖号码:113, 即中奖.',
            'type': 'multi',
            'layout': {
                '和值号': [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18 ]
            },
            'buttons': []
        },
        // 三不同
        'SBTH': {
            'name': '三不同号',
            'method': 'SBTH',
            'desc': '是指对三个各不相同的号码进行投注',
            'help': '是指对三个各不相同的号码进行投注,开奖号三个号码完全不同,并且在购买号码中则中奖',
            'example': '购买号码:123<br>开奖号码:123',
            'type': 'multi',
            'layout': {
                '号码': [
                    '123','124','125','126','134',
                    '135','136','145','146','156',
                    '234','235','236','245','246',
                    '256','345','346','356','456'
                ]
            },
            'buttons': []
        },
        // 三同号
        'STH': {
            'name': '三同号',
            'method': 'STH',
            'desc': '是指从所有相同的三个号码(111、222、…、666)中任意选择一组号码进行投注',
            'help': '是指从所有相同的三个号码(111、222、…、666)中任意选择一组号码进行投注,开奖号码与购买号完全相同则中奖',
            'example': '购买号码:111<br>开奖号码:111',
            'type': 'multi',
            'lengthen': true,
            'layout': {
                '号码': [
                    111,
                    222,
                    333,
                    444,
                    555,
                    666
                ]
            },
            'buttons': []
        },
        // 三连号
        'SLH': {
            'name': '三连号',
            'method': 'SLH',
            'desc': '是指从所有相连的三个号码(123、234、345、456)中任意选择一组号码进行投注',
            'help': '是指从所有相连的三个号码(123、234、345、456)中任意选择一组号码进行投注,开奖号码与购买号完全相同则中奖',
            'example': '购买号码:123<br>开奖号码:123',
            'type': 'multi',
            'lengthen': true,
            'layout': {
                '号码': [
                    123,
                    234,
                    345,
                    456
                ]
            },
            'buttons': []
        },
        // 二不同号
        'EBTH': {
            'name': '二不同号',
            'method': 'EBTH',
            'desc': '是指对三个号码中两个指定的不同号码和一个任意相同号码进行投注.',
            'help': '是指对三个号码中两个指定的不同号码和一个任意相同号码进行投注,开奖号码中有两个号码不同,第三个号与两个号中任意一个相同,顺序不限.',
            'example': '购买号码:12<br>开奖号码:112/122即为中奖.',
            'type': 'multi',
            'btnStr': true,
            'lengthen': true,
            'layout': {
                '号码': [
                    '12','13','14','15','16',
                    '23','24','25','26','34',
                    '35','36','45','46','56',
                ]
            },
            'buttons': []
        },
        // 二同号
        'ETH': {
            'name': '二同号',
            'method': 'ETH',
            'desc': '是指对三个号码中两个指定的相同号码和一个任意号码进行投注',
            'help': '是指对三个号码中两个指定的相同号码和一个任意号码进行投注,开奖号码中有两个号码相同,与购买号码一样,顺序不限',
            'example': '购买号码:112<br>开奖号码:112',
            'type': 'multi',
            'btnStr': true,
            'lengthen': true,
            'layout': {
                '号码': [
                    '112','113','114','115','116',
                    '221','223','224','225','226',
                    '331','332','334','335','336',
                    '441','442','443','445','446',
                    '551','552','553','554','556',
                    '661','662','663','664','665',
                ]
            },
            'buttons': []
        },
        // 单挑一骰
        'DTYS': {
            'name': '单挑一骰',
            'method': 'DTYS',
            'desc': '选中一个或多个骰号,如果开奖号码包含该号则中奖.',
            'help': '选中一个或多个骰号,如果开奖号码包含该号则中奖.',
            'example': '购买号码:1<br>开奖号码:123',
            'type': 'multi',
            'layout': {
                '号码': [ 6,5,4,3,2,1 ]
            },
            'buttons': []
        },
    },
    'lotto': {
        'LTQ3ZX3': {
            'name': '前三直选复式',
            'method': 'LTQ3ZX3',
            'desc': '从第一位、第二位、第三位中至少各选择1个号码。',
            'help': '从01-11共11个号码中选择3个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中的前3个号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：01 02 03<br>开奖号码：01 02 03 * *，即中前三直选。',
            'type': 'multi',
            'layout': {
                '第一位': lottoCodesTpl,
                '第二位': lottoCodesTpl,
                '第三位': lottoCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'LTQ3ZX3_S': {
            'name': '前三直选单式',
            'method': 'LTQ3ZX3_S',
            'desc': '手动输入号码，至少输入1个三位数号码组成一注。',
            'help': '手动输入3个号码组成一注，所输入的号码与当期顺序摇出的5个号码中的前3个号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：01 02 03<br>开奖号码：01 02 03 * *，即中前三直选。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'LTQ3ZU3': {
            'name': '前三组选复式',
            'method': 'LTQ3ZU3',
            'desc': '从01-11中任意选择3个或3个以上号码。',
            'help': '从01-11中共11个号码中选择3个号码，所选号码与当期顺序摇出的5个号码中的前3个号码相同，顺序不限，即为中奖。',
            'example': '投注方案：01 02 03<br>开奖号码：03 01 02 * *（前三顺序不限），即中前三组选。',
            'type': 'multi',
            'layout': {
                '组选': lottoCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'LTQ3ZU3_S': {
            'name': '前三组选单式',
            'method': 'LTQ3ZU3_S',
            'desc': '手动输入号码，至少输入1个三位数号码组成一注。',
            'help': '手动输入3个号码组成一注，所输入的号码与当期顺序摇出的5个号码中的前3个号码相同，顺序不限，即为中奖。',
            'example': '投注方案：01 02 03<br>开奖号码：03 01 02 * *（前三顺序不限），即中前三组选。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'LTQ3ZU3DT': {
            'name': '前三组选胆拖',
            'method': 'LTQ3ZU3DT',
            'desc': '从01-11中，选取3个及以上的号码进行投注，每注需至少包括1个胆码及2个拖码。',
            'help': '从01-11中，选取3个及以上的号码进行投注，每注需至少包括1个胆码及2个拖码。<br>所选单注号码与当期顺序摇出的5个号码中的前3个号码相同，顺序不限，即为中奖。',
            'example': '投注方案：胆码 02，拖码 01 06<br>开奖号码：02 01 06 * *（前三顺序不限），即中前三组选胆拖。',
            'type': 'multi',
            'layout': {
                '胆码': lottoCodesTpl,
                '拖码': lottoCodesTpl
            },
            'buttons': digitalPosTpl,
            'limitSelectedCount': [
                2,
                999
            ],
            'limitSelectedSomePosition': true
        },

        'LTQ2ZX2': {
            'name': '前二直选复式',
            'method': 'LTQ2ZX2',
            'desc': '从第一位、第二位中至少各选择1个号码。',
            'help': '从01-11共11个号码中选择2个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中的前2个号码相同，且顺序一致，即中奖。',
            'example': '投注方案：01 02<br>开奖号码：01 02 * * *，即中前二直选。',
            'type': 'multi',
            'layout': {
                '第一位': lottoCodesTpl,
                '第二位': lottoCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'LTQ2ZX2_S': {
            'name': '前二直选单式',
            'method': 'LTQ2ZX2_S',
            'desc': '手动输入号码，至少输入1个两位数号码组成一注。',
            'help': '手动输入2个号码组成一注，所输入的号码与当期顺序摇出的5个号码中的前2个号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：01 02<br>开奖号码：01 02 * * *，即中前二直选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'LTQ2ZU2': {
            'name': '前二组选复式',
            'method': 'LTQ2ZU2',
            'desc': '从01-11中任意选择2个或2个以上号码。',
            'help': '从01-11中共11个号码中选择2个号码，所选号码与当期顺序摇出的5个号码中的前2个号码相同，顺序不限，即为中奖。',
            'example': '投注方案：01 02<br>开奖号码：02 01 * * *，（前二顺序不限），即中前二组选。',
            'type': 'multi',
            'layout': {
                '组选': lottoCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'LTQ2ZU2_S': {
            'name': '前二组选单式',
            'method': 'LTQ2ZU2_S',
            'desc': '手动输入号码，至少输入1个两位数号码组成一注。',
            'help': '手动输入2个号码组成一注，所输入的号码与当期顺序摇出的5个号码中的前2个号码相同，顺序不限，即为中奖。',
            'example': '投注方案：01 02<br>开奖号码：02 01 * * *，（前二顺序不限），即中前二组选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'LTQ2DTZU2': {
            'name': '前二组选胆拖',
            'method': 'LTQ2DTZU2',
            'desc': '从01-11中，选取2个及以上的号码进行投注，每注需至少包括1个胆码及1个拖码。',
            'help': '从01-11中，选取2个及以上的号码进行投注，每注需至少包括1个胆码及1个拖码。<br>所选单注号码与当期顺序摇出的5个号码中的前2个号码相同，顺序不限，即为中奖。',
            'example': '投注方案：胆码 01，拖码 06<br>开奖号码：06 01 * * *，（前二顺序不限），即中前二组选胆拖。',
            'type': 'multi',
            'layout': {
                '胆码': lottoCodesTpl,
                '拖码': lottoCodesTpl
            },
            'buttons': digitalPosTpl,
            'limitSelectedCount': [
                1,
                999
            ],
            'limitSelectedSomePosition': true
        },

        'LTBDW': {
            'name': '不定位',
            'method': 'LTBDW',
            'desc': '从01-11中任意选择1个或1个以上号码。',
            'help': '从01-11中共11个号码中选择1个号码，每注由1个号码组成，只要当期顺序摇出的第一位、第二位、第三位开奖号码中包含所选号码，即为中奖。',
            'example': '投注方案：01<br>开奖号码：01 * * * *，* 01 * * *，* * 01 * *，即中前三位。',
            'type': 'multi',
            'layout': {
                '前三位': lottoCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'LTDWD': {
            'name': '定位胆',
            'method': 'LTDWD',
            'desc': '从第一位，第二位，第三位任意位置上任意选择1个或1个以上号码。',
            'help': '从第一位，第二位，第三位任意1个位置或多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致，即为中奖。',
            'example': '投注方案：第一位 01<br>开奖号码：01 * * * *，即中定位胆。',
            'type': 'multi',
            'layout': {
                '第一位': lottoCodesTpl,
                '第二位': lottoCodesTpl,
                '第三位': lottoCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'LTDDS': {
            'name': '定单双',
            'method': 'LTDDS',
            'desc': '从不同的单双组合中任意选择1个或1个以上的组合。',
            'help': '从6种单双个数组合中选择1种组合，当期开奖号码的单双个数与所选单双组合一致，即为中奖。',
            'example': '投注方案：5单0双<br>开奖号码：01 03 05 07 09五个单数，即中趣味_定单双。',
            'type': 'multi',
            'lengthen': true,
            'layout': {
                '定单双': [
                    '5单0双',
                    '4单1双',
                    '3单2双',
                    '2单3双',
                    '1单4双',
                    '0单5双'
                ]
            },
            'buttons': []
        },
        'LTCZW': {
            'name': '猜中位',
            'method': 'LTCZW',
            'desc': '从3-9中任意选择1个或1个以上数字。',
            'help': '从3-9中选择1个号码进行购买，所选号码与5个开奖号码按照大小顺序排列后的第3个号码相同，即为中奖。',
            'example': '投注方案：08<br>开奖号码：按号码大小顺序排列后04 05 08 09 11，中间数08，即中趣味_猜中位。',
            'type': 'multi',
            'layout': {
                '猜中位': [
                    '3',
                    '4',
                    '5',
                    '6',
                    '7',
                    '8',
                    '9'
                ]
            },
            'buttons': digitalPosTpl
        },
        'LTRX1': {
            'name': '任选一中一',
            'method': 'LTRX1',
            'desc': '从01-11中任意选择1个或1个以上号码。',
            'help': '从01-11共11个号码中选择1个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。',
            'example': '投注方案：05<br>开奖号码：08 04 11 05 03，即中任选一中一。',
            'type': 'multi',
            'layout': {
                '选1中1': lottoCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'LTRX2': {
            'name': '任选二中二',
            'method': 'LTRX2',
            'desc': '从01-11中任意选择2个或2个以上号码。',
            'help': '从01-11共11个号码中选择2个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。',
            'example': '投注方案：05 04<br>开奖号码：08 04 11 05 03，即中任选二中二。',
            'type': 'multi',
            'layout': {
                '选2中2': lottoCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'LTRX3': {
            'name': '任选三中三',
            'method': 'LTRX3',
            'desc': '从01-11中任意选择3个或3个以上号码。',
            'help': '从01-11共11个号码中选择3个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。',
            'example': '投注方案：05 04 11<br>开奖号码：08 04 11 05 03，即中任选三中三。',
            'type': 'multi',
            'layout': {
                '选3中3': lottoCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'LTRX4': {
            'name': '任选四中四',
            'method': 'LTRX4',
            'desc': '从01-11中任意选择4个或4个以上号码。',
            'help': '从01-11共11个号码中选择4个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。',
            'example': '投注方案：05 04 08 03<br>开奖号码：08 04 11 05 03，即中任选四中四。',
            'type': 'multi',
            'layout': {
                '选4中4': lottoCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'LTRX5': {
            'name': '任选五中五',
            'method': 'LTRX5',
            'desc': '从01-11中任意选择5个或5个以上号码。',
            'help': '从01-11共11个号码中选择5个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。',
            'example': '投注方案：05 04 11 03 08<br>开奖号码：08 04 11 05 03，即中任选五中五。',
            'type': 'multi',
            'layout': {
                '选5中5': lottoCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'LTRX6': {
            'name': '任选六中五',
            'method': 'LTRX6',
            'desc': '从01-11中任意选择6个或6个以上号码。',
            'help': '从01-11共11个号码中选择6个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。',
            'example': '投注方案：05 10 04 11 03 08<br>开奖号码：08 04 11 05 03，即中任选六中五。',
            'type': 'multi',
            'layout': {
                '选6中5': lottoCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'LTRX7': {
            'name': '任选七中五',
            'method': 'LTRX7',
            'desc': '从01-11中任意选择7个或7个以上号码。',
            'help': '从01-11共11个号码中选择7个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。',
            'example': '投注方案：05 10 04 11 03 08 09<br>开奖号码：08 04 11 05 03，即中任选七中五。',
            'type': 'multi',
            'layout': {
                '选7中5': lottoCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'LTRX8': {
            'name': '任选八中五',
            'method': 'LTRX8',
            'desc': '从01-11中任意选择8个或8个以上号码。',
            'help': '从01-11共11个号码中选择8个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所选号码，即为中奖。',
            'example': '投注方案：05 10 04 11 03 08 09 01<br>开奖号码：08 04 11 05 03，即中任选八中五。',
            'type': 'multi',
            'layout': {
                '选8中5': lottoCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'LTRX1_S': {
            'name': '任选一中一',
            'method': 'LTRX1_S',
            'desc': '手动输入号码，从01-11中任意输入1个号码组成一注。',
            'help': '从01-11中手动输入1个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所输入号码，即为中奖。',
            'example': '投注方案：05<br>开奖号码：08 04 11 05 03，即中任选一中一。',
            'type': 'text'
        },
        'LTRX2_S': {
            'name': '任选二中二',
            'method': 'LTRX2_S',
            'desc': '手动输入号码，从01-11中任意输入2个号码组成一注。',
            'help': '从01-11中手动输入2个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所输入号码，即为中奖。',
            'example': '投注方案：05 04<br>开奖号码：08 04 11 05 03，即中任选二中二。',
            'type': 'text'
        },
        'LTRX3_S': {
            'name': '任选三中三',
            'method': 'LTRX3_S',
            'desc': '手动输入号码，从01-11中任意输入3个号码组成一注。',
            'help': '从01-11中手动输入3个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所输入号码，即为中奖。',
            'example': '投注方案：05 04 11<br>开奖号码：08 04 11 05 03，即中任选三中三。',
            'type': 'text'
        },

        'LTRX4_S': {
            'name': '任选四中四',
            'method': 'LTRX4_S',
            'desc': '手动输入号码，从01-11中任意输入4个号码组成一注。',
            'help': '从01-11中手动输入4个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所输入号码，即为中奖。',
            'example': '投注方案：05 04 08 03<br>开奖号码：08 04 11 05 03，即中任选四中四。',
            'type': 'text'
        },

        'LTRX5_S': {
            'name': '任选五中五',
            'method': 'LTRX5_S',
            'desc': '手动输入号码，从01-11中任意输入5个号码组成一注。',
            'help': '从01-11中手动输入5个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所输入号码，即为中奖。',
            'example': '投注方案：05 04 11 03 08<br>开奖号码：08 04 11 05 03，即中任选五中五。',
            'type': 'text'
        },

        'LTRX6_S': {
            'name': '任选六中五',
            'method': 'LTRX6_S',
            'desc': '手动输入号码，从01-11中任意输入6个号码组成一注。',
            'help': '从01-11中手动输入6个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所输入号码，即为中奖。',
            'example': '投注方案：05 10 04 11 03 08<br>开奖号码：08 04 11 05 03，即中任选六中五。',
            'type': 'text'
        },

        'LTRX7_S': {
            'name': '任选七中五',
            'method': 'LTRX7_S',
            'desc': '手动输入号码，从01-11中任意输入7个号码组成一注。',
            'help': '从01-11中手动输入7个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所输入号码，即为中奖。',
            'example': '投注方案：05 10 04 11 03 08 09<br>开奖号码：08 04 11 05 03，即中任选七中五。',
            'type': 'text'
        },

        'LTRX8_S': {
            'name': '任选八中五',
            'method': 'LTRX8_S',
            'desc': '手动输入号码，从01-11中任意输入8个号码组成一注。',
            'help': '从01-11中手动输入8个号码进行购买，只要当期顺序摇出的5个开奖号码中包含所输入号码，即为中奖。',
            'example': '投注方案：05 10 04 11 03 08 09 01<br>开奖号码：08 04 11 05 03，即中任选八中五。',
            'type': 'text'
        },

        'LTRXDT2': {
            'name': '任选二中二',
            'method': 'LTRXDT2',
            'desc': '从01-11中，选取2个及以上的号码进行投注，每注需至少包括1个胆码及1个拖码。',
            'help': '从01-11共11个号码中选择2个及以上号码进行投注，每注需至少包括1个胆码及1个拖码。只要当期顺序摇出的5个号码中包含所选单注号码，即为中奖。',
            'example': '投注方案：胆码 08，托码 06<br>开奖号码：06 08 11 09 02，即中任选二中二。',
            'type': 'multi',
            'layout': {
                '胆码': lottoCodesTpl,
                '拖码': lottoCodesTpl
            },
            'buttons': digitalPosTpl,
            'limitSelectedCount': [
                1,
                999
            ],
            'limitSelectedSomePosition': true
        },

        'LTRXDT3': {
            'name': '任选三中三',
            'method': 'LTRXDT3',
            'desc': '从01-11中，选取3个及以上的号码进行投注，每注需至少包括1个胆码及2个拖码。',
            'help': '从01-11共11个号码中选择3个及以上号码进行投注，每注需至少包括1个胆码及2个拖码。只要当期顺序摇出的5个号码中包含所选单注号码，即为中奖。',
            'example': '投注方案：胆码 08，托码 06 11<br>开奖号码：06 08 11 09 02，即中任选三中三。',
            'type': 'multi',
            'layout': {
                '胆码': lottoCodesTpl,
                '拖码': lottoCodesTpl
            },
            'buttons': digitalPosTpl,
            'limitSelectedCount': [
                2,
                999
            ],
            'limitSelectedSomePosition': true
        },
        'LTRXDT4': {
            'name': '任选四中四',
            'method': 'LTRXDT4',
            'desc': '从01-11中，选取4个及以上的号码进行投注，每注需至少包括1个胆码及3个拖码。',
            'help': '从01-11共11个号码中选择4个及以上号码进行投注，每注需至少包括1个胆码及3个拖码。只要当期顺序摇出的5个号码中包含所选单注号码，即为中奖。',
            'example': '投注方案：胆码 08，托码 06 09 11 <br>开奖号码：06 08 11 09 02，即中任选四中四。',
            'type': 'multi',
            'layout': {
                '胆码': lottoCodesTpl,
                '拖码': lottoCodesTpl
            },
            'buttons': digitalPosTpl,
            'limitSelectedCount': [
                3,
                999
            ],
            'limitSelectedSomePosition': true
        },
        'LTRXDT5': {
            'name': '任选五中五',
            'method': 'LTRXDT5',
            'desc': '从01-11中，选取5个及以上的号码进行投注，每注需至少包括1个胆码及4个拖码。',
            'help': '从01-11共11个号码中选择5个及以上号码进行投注，每注需至少包括1个胆码及4个拖码。只要当期顺序摇出的5个号码中包含所选单注号码，即为中奖。',
            'example': '投注方案：胆码 08，托码 02 06 09 11 <br>开奖号码：06 08 11 09 02，即中任选五中五。',
            'type': 'multi',
            'layout': {
                '胆码': lottoCodesTpl,
                '拖码': lottoCodesTpl
            },
            'buttons': digitalPosTpl,
            'limitSelectedCount': [
                4,
                999
            ],
            'limitSelectedSomePosition': true
        },
        'LTRXDT6': {
            'name': '任选六中五',
            'method': 'LTRXDT6',
            'desc': '从01-11中，选取6个及以上的号码进行投注，每注需至少包括1个胆码及5个拖码。',
            'help': '从01-11共11个号码中选择6个及以上号码进行投注，每注需至少包括1个胆码及5个拖码。只要当期顺序摇出的5个号码中包含所选单注号码，即为中奖。',
            'example': '投注方案：胆码 08，托码 02 05 06 09 11  <br>开奖号码：06 08 11 09 02，即中任选六中五。',
            'type': 'multi',
            'layout': {
                '胆码': lottoCodesTpl,
                '拖码': lottoCodesTpl
            },
            'buttons': digitalPosTpl,
            'limitSelectedCount': [
                5,
                999
            ],
            'limitSelectedSomePosition': true
        },
        'LTRXDT7': {
            'name': '任选七中五',
            'method': 'LTRXDT7',
            'desc': '从01-11中，选取7个及以上的号码进行投注，每注需至少包括1个胆码及6个拖码。',
            'help': '从01-11共11个号码中选择7个及以上号码进行投注，每注需至少包括1个胆码及6个拖码。只要当期顺序摇出的5个号码中包含所选单注号码，即为中奖。',
            'example': '投注方案：胆码 08，托码 01 02 05 06 09 11  <br>开奖号码：06 08 11 09 02，即中任选七中五。',
            'type': 'multi',
            'layout': {
                '胆码': lottoCodesTpl,
                '拖码': lottoCodesTpl
            },
            'buttons': digitalPosTpl,
            'limitSelectedCount': [
                6,
                999
            ],
            'limitSelectedSomePosition': true
        },
        'LTRXDT8': {
            'name': '任选八中五',
            'method': 'LTRXDT8',
            'desc': '从01-11中，选取8个及以上的号码进行投注，每注需至少包括1个胆码及7个拖码。',
            'help': '从01-11共11个号码中选择8个及以上号码进行投注，每注需至少包括1个胆码及7个拖码。只要当期顺序摇出的5个号码中包含所选单注号码，即为中奖。',
            'example': '投注方案：胆码 08，托码 01 02 03 05 06 09 11 <br>开奖号码：06 08 11 09 02，即中任选八中五。',
            'type': 'multi',
            'layout': {
                '胆码': lottoCodesTpl,
                '拖码': lottoCodesTpl
            },
            'buttons': digitalPosTpl,
            'limitSelectedCount': [
                7,
                999
            ],
            'limitSelectedSomePosition': true
        }
    },
    'p3p5': {
        'QZX3': {
            'name': '直选复式',
            'method': 'QZX3',
            'desc': '从万位、千位、百位各选一个号码组成一注。',
            'help': '从万位、千位、百位中选择一个3位数号码组成一注，所选号码与开奖号码后3位相同，且顺序一致，即为中奖。',
            'example': '投注方案：345<br>开奖号码：345，即中前三直选。',
            'type': 'multi',
            'layout': {
                '万位': digitalCodesTpl,
                '千位': digitalCodesTpl,
                '百位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'QZX3_S': {
            'name': '直选单式',
            'method': 'QZX3_S',
            'desc': '手动输入号码，至少输入1个三位数号码组成一注。',
            'help': '手动输入一个3位数号码组成一注，所选号码与开奖号码的万位、千位、百位相同，且顺序一致，即为中奖。',
            'example': '投注方案：345<br>开奖号码：345，即中前三直选。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },
        'QZXHZ': {
            'name': '直选和值',
            'method': 'QZXHZ',
            'desc': '从0-27中任意选择1个或1个以上号码。',
            'help': '所选数值等于开奖号码的万位、千位、百位三个数字相加之和，即为中奖。',
            'example': '投注方案：和值1<br>开奖号码：前三位001，010，100，即中前三直选和值。',
            'type': 'multi',
            'layout': {
                '和值': digitalZxhzTpl
            },
            'buttons': []
        },
        'QZU3': {
            'name': '组三复式',
            'method': 'QZU3',
            'desc': '从0-9中任意选择2个或2个以上号码。',
            'help': '从0-9中选择2个数字组成两注，所选号码与开奖号码的万位、千位、百位相同，且顺序不限，即为中奖。',
            'example': '投注方案：588<br>开奖号码：前三位588（顺序不限），即可中前三组选三。',
            'type': 'multi',
            'layout': {
                '组三': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'QZU3_S': {
            'name': '组三单式',
            'method': 'QZU3_S',
            'desc': '手动输入号码，至少输入1个三位数号码（三个数字中必须有二个数字相同）。',
            'help': '手动输入一个3位数号码组成一注，三个数字中必须有二个数字相同，输入号码与开奖号码的万位、千位、百位相同，顺序不限，即为中奖。',
            'example': '投注方案：001<br>开奖号码：前三位 010（顺序不限），即中前三组选三。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'QZU6': {
            'name': '组六复式',
            'method': 'QZU6',
            'desc': '从0-9中任意选择3个或3个以上号码。',
            'help': '从0-9中任意选择3个号码组成一注，所选号码与开奖号码的万位、千位、百位相同，顺序不限，即为中奖。',
            'example': '投注方案：258<br>开奖号码：前三位 852（顺序不限），即中前三组选六。',
            'type': 'multi',
            'layout': {
                '组六': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QZU6_S': {
            'name': '组六单式',
            'method': 'QZU6_S',
            'desc': '手动输入号码，至少输入1个三位数号码（三个数字完全不相同）。',
            'help': '手动输入一个3位数号码组成一注，所选号码与开奖号码的万位、千位、百位相同，且顺序不限，即为中奖。',
            'example': '投注方案：123<br>开奖号码：前三位 321（顺序不限），即中前三组选六。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'QHHZX': {
            'name': '混合组选',
            'method': 'QHHZX',
            'desc': '手动输入号码，至少输入1个三位数号码。',
            'help': '手动输入一个3位数号码组成一注（不含豹子号），开奖号码的万位、千位、百位符合后三组三或者组六均为中奖。',
            'example': '投注方案：001 和 123<br>开奖号码：前三位 010（顺序不限）即中前三组选三，或者前三位 312（顺序不限）即中前三组选六。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },
        'QZUHZ': {
            'name': '组选和值',
            'method': 'QZUHZ',
            'desc': '从1-26中选择1个号码。',
            'help': '所选数值等于开奖号码万位、千位、百位三个数字相加之和(非豹子号)，即为中奖。',
            'example': '投注方案：和值3<br>开奖号码：前三位 003（顺序不限）即中前三组选三，或者前三位 012（顺序不限）即中前三组选六。',
            'type': 'multi',
            'layout': {
                '和值': digitalZuhzTpl
            },
            'buttons': []
        },

        'QZX2': {
            'name': '(前二)直选复式',
            'method': 'QZX2',
            'desc': '从万位、千位中至少各选1个号码组成一注。',
            'help': '从万位、千位中选择一个2位数号码组成一注，所选号码与开奖号码的前2位相同，且顺序一致，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 58，即中前二直选。',
            'type': 'multi',
            'layout': {
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'QZX2_S': {
            'name': '(前二)直选单式',
            'method': 'QZX2_S',
            'desc': '手动输入号码，至少输入1个二位数号码组成一注。',
            'help': '手动输入一个2位数号码组成一注，输入号码的万位、千位与开奖号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 58，即中前二直选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'HZX2': {
            'name': '(后二)直选复式',
            'method': 'HZX2',
            'desc': '从十位、个位中至少各选1个号码组成一注。',
            'help': '从十位、个位中选择一个2位数号码组成一注，所选号码与开奖号码的后2位相同，且顺序一致，即为中奖。',
            'example': '投注方案：58<br>开奖号码：后二位 58，即中后二直选。',
            'type': 'multi',
            'layout': {
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'HZX2_S': {
            'name': '(后二)直选单式',
            'method': 'HZX2_S',
            'desc': '手动输入号码，至少输入1个二位数号码组成一注。',
            'help': '手动输入一个2位数号码组成一注，输入号码的十位、个位与开奖号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：58<br>开奖号码：后二位 58，即中后二直选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'QZU2': {
            'name': '(前二)组选复式',
            'method': 'QZU2',
            'desc': '从0-9中任意选择2个或2个以上号码。',
            'help': '从0-9中选2个号码组成一注，所选号码与开奖号码的万位、千位相同，顺序不限，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 85 或者 58（顺序不限，不含对子号），即中前二组选。',
            'type': 'multi',
            'layout': {
                '组选': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QZU2_S': {
            'name': '(前二)组选单式',
            'method': 'QZU2_S',
            'desc': '手动输入号码，至少输入1个二位数号码组成一注。',
            'help': '手动输入一个2位数号码组成一注，输入号码的万位、千位与开奖号码相同，顺序不限，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 85 或者 58（顺序不限，不含对子号），即中前二组选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'HZU2': {
            'name': '(后二)组选复式',
            'method': 'HZU2',
            'desc': '从0-9中任意选择2个或2个以上号码。',
            'help': '从0-9中选2个号码组成一注，所选号码与开奖号码的十位、个位相同（不含对子号），顺序不限，即中奖。',
            'example': '投注方案：58<br>开奖号码：后二位 85 或者 58（顺序不限，不含对子号），即中后二组选。',
            'type': 'multi',
            'layout': {
                '组选': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'HZU2_S': {
            'name': '(后二)组选单式',
            'method': 'HZU2_S',
            'desc': '手动输入号码，至少输入1个二位数号码组成一注。',
            'help': '手动输入一个2位数号码组成一注，输入号码的十位、个位与开奖号码相同（不含对子号），顺序不限，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 85 或者 58（顺序不限，不含对子号），即中前二组选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'DWD': {
            'name': '定位胆',
            'method': 'DWD',
            'desc': '在万位、千位、百位、十位、个位任意位置上任意选择1个或1个以上号码。',
            'help': '从万位、千位、百位、十位、个位任意位置上至少选择1个以上号码，所选号码与相同位置上的开奖号码一致，即为中奖。',
            'example': '投注方案：百位 1<br>开奖号码：百位 1，即中定位胆百位。',
            'type': 'multi',
            'layout': {
                '万位': digitalCodesTpl,
                '千位': digitalCodesTpl,
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QBDW31': {
            'name': '前三一码',
            'method': 'QBDW31',
            'desc': '从0-9中任意选择1个以上号码。',
            'help': '从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。',
            'example': '投注方案：1<br>开奖号码：前三位至少出现1个1，即中前三一码不定位。',
            'type': 'multi',
            'layout': {
                '一码': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'QBDW32': {
            'name': '前三二码',
            'method': 'QBDW32',
            'desc': '从0-9中任意选择2个以上号码。',
            'help': '从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位中同时包含所选的2个号码，即为中奖。',
            'example': '投注方案：12<br>开奖号码：至少出现1和2各1个，即中二码不定位。',
            'type': 'multi',
            'layout': {
                '二码': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'Q2DXDS': {
            'name': '前二大小单双',
            'method': 'Q2DXDS',
            'desc': '从万位、千位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对万位和千位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：大单<br>开奖号码：万位与千位“小双”，即中前二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '百位': digitalDxdsTpl,
                '十位': digitalDxdsTpl
            },
            'buttons': []
        },

        'H2DXDS': {
            'name': '后二大小单双',
            'method': 'H2DXDS',
            'desc': '从十位、个位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对十位和个位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：大单<br>开奖号码：十位与个位“小双”，即中后二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '十位': digitalDxdsTpl,
                '个位': digitalDxdsTpl
            },
            'buttons': []
        },
    },
    'sd': {
        'QZX3': {
            'name': '复式',
            'method': 'QZX3',
            'desc': '从万位、千位、百位各选一个号码组成一注。',
            'help': '从万位、千位、百位中选择一个3位数号码组成一注，所选号码与开奖号码后3位相同，且顺序一致，即为中奖。',
            'example': '投注方案：345<br>开奖号码：345，即中前三直选。',
            'type': 'multi',
            'layout': {
                '万位': digitalCodesTpl,
                '千位': digitalCodesTpl,
                '百位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QZX3_S': {
            'name': '单式',
            'method': 'QZX3_S',
            'desc': '手动输入号码，至少输入1个三位数号码组成一注。',
            'help': '手动输入一个3位数号码组成一注，所选号码与开奖号码的万位、千位、百位相同，且顺序一致，即为中奖。',
            'example': '投注方案：345<br>开奖号码：345，即中前三直选。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'QZXHZ': {
            'name': '直选和值',
            'method': 'QZXHZ',
            'desc': '从0-27中任意选择1个或1个以上号码。',
            'help': '所选数值等于开奖号码的万位、千位、百位三个数字相加之和，即为中奖。',
            'example': '投注方案：和值1<br>开奖号码：前三位001，010，100，即中前三直选和值。',
            'type': 'multi',
            'layout': {
                '和值': digitalZxhzTpl
            },
            'buttons': []
        },

        'QZU3': {
            'name': '组三复式',
            'method': 'QZU3',
            'desc': '从0-9中任意选择2个或2个以上号码。',
            'help': '从0-9中选择2个数字组成两注，所选号码与开奖号码的万位、千位、百位相同，且顺序不限，即为中奖。',
            'example': '投注方案：588<br>开奖号码：前三位588（顺序不限），即可中前三组选三。',
            'type': 'multi',
            'layout': {
                '组三': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QZU3_S': {
            'name': '组三单式',
            'method': 'QZU3_S',
            'desc': '手动输入号码，至少输入1个三位数号码（三个数字中必须有二个数字相同）。',
            'help': '手动输入一个3位数号码组成一注，三个数字中必须有二个数字相同，输入号码与开奖号码的万位、千位、百位相同，顺序不限，即为中奖。',
            'example': '投注方案：001<br>开奖号码：前三位 010（顺序不限），即中前三组选三。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'QZU6': {
            'name': '组六复式',
            'method': 'QZU6',
            'desc': '从0-9中任意选择3个或3个以上号码。',
            'help': '从0-9中任意选择3个号码组成一注，所选号码与开奖号码的万位、千位、百位相同，顺序不限，即为中奖。',
            'example': '投注方案：258<br>开奖号码：前三位 852（顺序不限），即中前三组选六。',
            'type': 'multi',
            'layout': {
                '组六': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QZU6_S': {
            'name': '组六单式',
            'method': 'QZU6_S',
            'desc': '手动输入号码，至少输入1个三位数号码（三个数字完全不相同）。',
            'help': '手动输入一个3位数号码组成一注，所选号码与开奖号码的万位、千位、百位相同，且顺序不限，即为中奖。',
            'example': '投注方案：123<br>开奖号码：前三位 321（顺序不限），即中前三组选六。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'QHHZX': {
            'name': '混合组选',
            'method': 'QHHZX',
            'desc': '手动输入号码，至少输入1个三位数号码。',
            'help': '手动输入一个3位数号码组成一注（不含豹子号），开奖号码的万位、千位、百位符合后三组三或者组六均为中奖。',
            'example': '投注方案：001 和 123<br>开奖号码：前三位 010（顺序不限）即中前三组选三，或者前三位 312（顺序不限）即中前三组选六。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'QZUHZ': {
            'name': '组选和值',
            'method': 'QZUHZ',
            'desc': '从1-26中选择1个号码。',
            'help': '所选数值等于开奖号码万位、千位、百位三个数字相加之和(非豹子号)，即为中奖。',
            'example': '投注方案：和值3<br>开奖号码：前三位 003（顺序不限）即中前三组选三，或者前三位 012（顺序不限）即中前三组选六。',
            'type': 'multi',
            'layout': {
                '和值': digitalZuhzTpl
            },
            'buttons': []
        },

        'QZX2': {
            'name': '(前二)直选复式',
            'method': 'QZX2',
            'desc': '从万位、千位中至少各选1个号码组成一注。',
            'help': '从万位、千位中选择一个2位数号码组成一注，所选号码与开奖号码的前2位相同，且顺序一致，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 58，即中前二直选。',
            'type': 'multi',
            'layout': {
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QZX2_S': {
            'name': '(前二)直选单式',
            'method': 'QZX2_S',
            'desc': '手动输入号码，至少输入1个二位数号码组成一注。',
            'help': '手动输入一个2位数号码组成一注，输入号码的万位、千位与开奖号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 58，即中前二直选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'HZX2': {
            'name': '(后二)直选复式',
            'method': 'HZX2',
            'desc': '从十位、个位中至少各选1个号码组成一注。',
            'help': '从十位、个位中选择一个2位数号码组成一注，所选号码与开奖号码的后2位相同，且顺序一致，即为中奖。',
            'example': '投注方案：58<br>开奖号码：后二位 58，即中后二直选。',
            'type': 'multi',
            'layout': {
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'HZX2_S': {
            'name': '(后二)直选单式',
            'method': 'HZX2_S',
            'desc': '手动输入号码，至少输入1个二位数号码组成一注。',
            'help': '手动输入一个2位数号码组成一注，输入号码的十位、个位与开奖号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：58<br>开奖号码：后二位 58，即中后二直选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'QZU2': {
            'name': '(前二)组选复式',
            'method': 'QZU2',
            'desc': '从0-9中任意选择2个或2个以上号码。',
            'help': '从0-9中选2个号码组成一注，所选号码与开奖号码的万位、千位相同，顺序不限，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 85 或者 58（顺序不限，不含对子号），即中前二组选。',
            'type': 'multi',
            'layout': {
                '组选': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QZU2_S': {
            'name': '(前二)组选单式',
            'method': 'QZU2_S',
            'desc': '手动输入号码，至少输入1个二位数号码组成一注。',
            'help': '手动输入一个2位数号码组成一注，输入号码的万位、千位与开奖号码相同，顺序不限，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 85 或者 58（顺序不限，不含对子号），即中前二组选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'HZU2': {
            'name': '(后二)组选复式',
            'method': 'HZU2',
            'desc': '从0-9中任意选择2个或2个以上号码。',
            'help': '从0-9中选2个号码组成一注，所选号码与开奖号码的十位、个位相同（不含对子号），顺序不限，即中奖。',
            'example': '投注方案：58<br>开奖号码：后二位 85 或者 58（顺序不限，不含对子号），即中后二组选。',
            'type': 'multi',
            'layout': {
                '组选': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'HZU2_S': {
            'name': '(后二)组选单式',
            'method': 'HZU2_S',
            'desc': '手动输入号码，至少输入1个二位数号码组成一注。',
            'help': '手动输入一个2位数号码组成一注，输入号码的十位、个位与开奖号码相同（不含对子号），顺序不限，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 85 或者 58（顺序不限，不含对子号），即中前二组选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'DWD': {
            'name': '定位胆',
            'method': 'DWD',
            'desc': '在百位、十位、个位任意位置上任意选择1个或1个以上号码。',
            'help': '从百位、十位、个位任意位置上至少选择1个以上号码，所选号码与相同位置上的开奖号码一致，即为中奖。',
            'example': '投注方案：百位 1<br>开奖号码：百位 1，即中定位胆百位。',
            'type': 'multi',
            'layout': {
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QBDW31': {
            'name': '前三一码',
            'method': 'QBDW31',
            'desc': '从0-9中任意选择1个以上号码。',
            'help': '从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。',
            'example': '投注方案：1<br>开奖号码：前三位至少出现1个1，即中前三一码不定位。',
            'type': 'multi',
            'layout': {
                '一码': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'QBDW32': {
            'name': '前三二码',
            'method': 'QBDW32',
            'desc': '从0-9中任意选择2个以上号码。',
            'help': '从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位中同时包含所选的2个号码，即为中奖。',
            'example': '投注方案：12<br>开奖号码：至少出现1和2各1个，即中二码不定位。',
            'type': 'multi',
            'layout': {
                '二码': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'Q2DXDS': {
            'name': '前二大小单双',
            'method': 'Q2DXDS',
            'desc': '从万位、千位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对万位和千位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：大单<br>开奖号码：万位与千位“小双”，即中前二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '百位': digitalDxdsTpl,
                '十位': digitalDxdsTpl
            },
            'buttons': []
        },

        'H2DXDS': {
            'name': '后二大小单双',
            'method': 'H2DXDS',
            'desc': '从十位、个位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对十位和个位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：大单<br>开奖号码：十位与个位“小双”，即中后二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '十位': digitalDxdsTpl,
                '个位': digitalDxdsTpl
            },
            'buttons': []
        },
    },
    'ssl': {
        'QZX3': {
            'name': '复式',
            'method': 'QZX3',
            'desc': '从万位、千位、百位各选一个号码组成一注。',
            'help': '从万位、千位、百位中选择一个3位数号码组成一注，所选号码与开奖号码后3位相同，且顺序一致，即为中奖。',
            'example': '投注方案：345<br>开奖号码：345，即中前三直选。',
            'type': 'multi',
            'layout': {
                '万位': digitalCodesTpl,
                '千位': digitalCodesTpl,
                '百位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QZX3_S': {
            'name': '单式',
            'method': 'QZX3_S',
            'desc': '手动输入号码，至少输入1个三位数号码组成一注。',
            'help': '手动输入一个3位数号码组成一注，所选号码与开奖号码的万位、千位、百位相同，且顺序一致，即为中奖。',
            'example': '投注方案：345<br>开奖号码：345，即中前三直选。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'QZXHZ': {
            'name': '直选和值',
            'method': 'QZXHZ',
            'desc': '从0-27中任意选择1个或1个以上号码。',
            'help': '所选数值等于开奖号码的万位、千位、百位三个数字相加之和，即为中奖。',
            'example': '投注方案：和值1<br>开奖号码：前三位001，010，100，即中前三直选和值。',
            'type': 'multi',
            'layout': {
                '和值': digitalZxhzTpl
            },
            'buttons': []
        },

        'QZU3': {
            'name': '组三复式',
            'method': 'QZU3',
            'desc': '从0-9中任意选择2个或2个以上号码。',
            'help': '从0-9中选择2个数字组成两注，所选号码与开奖号码的万位、千位、百位相同，且顺序不限，即为中奖。',
            'example': '投注方案：588<br>开奖号码：前三位588（顺序不限），即可中前三组选三。',
            'type': 'multi',
            'layout': {
                '组三': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QZU3_S': {
            'name': '组三单式',
            'method': 'QZU3_S',
            'desc': '手动输入号码，至少输入1个三位数号码（三个数字中必须有二个数字相同）。',
            'help': '手动输入一个3位数号码组成一注，三个数字中必须有二个数字相同，输入号码与开奖号码的万位、千位、百位相同，顺序不限，即为中奖。',
            'example': '投注方案：001<br>开奖号码：前三位 010（顺序不限），即中前三组选三。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'QZU6': {
            'name': '组六复式',
            'method': 'QZU6',
            'desc': '从0-9中任意选择3个或3个以上号码。',
            'help': '从0-9中任意选择3个号码组成一注，所选号码与开奖号码的万位、千位、百位相同，顺序不限，即为中奖。',
            'example': '投注方案：258<br>开奖号码：前三位 852（顺序不限），即中前三组选六。',
            'type': 'multi',
            'layout': {
                '组六': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QZU6_S': {
            'name': '组六单式',
            'method': 'QZU6_S',
            'desc': '手动输入号码，至少输入1个三位数号码（三个数字完全不相同）。',
            'help': '手动输入一个3位数号码组成一注，所选号码与开奖号码的万位、千位、百位相同，且顺序不限，即为中奖。',
            'example': '投注方案：123<br>开奖号码：前三位 321（顺序不限），即中前三组选六。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'QHHZX': {
            'name': '混合组选',
            'method': 'QHHZX',
            'desc': '手动输入号码，至少输入1个三位数号码。',
            'help': '手动输入一个3位数号码组成一注（不含豹子号），开奖号码的万位、千位、百位符合后三组三或者组六均为中奖。',
            'example': '投注方案：001 和 123<br>开奖号码：前三位 010（顺序不限）即中前三组选三，或者前三位 312（顺序不限）即中前三组选六。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'QZUHZ': {
            'name': '组选和值',
            'method': 'QZUHZ',
            'desc': '从1-26中选择1个号码。',
            'help': '所选数值等于开奖号码万位、千位、百位三个数字相加之和(非豹子号)，即为中奖。',
            'example': '投注方案：和值3<br>开奖号码：前三位 003（顺序不限）即中前三组选三，或者前三位 012（顺序不限）即中前三组选六。',
            'type': 'multi',
            'layout': {
                '和值': digitalZuhzTpl
            },
            'buttons': []
        },

        'QZX2': {
            'name': '(前二)直选复式',
            'method': 'QZX2',
            'desc': '从万位、千位中至少各选1个号码组成一注。',
            'help': '从万位、千位中选择一个2位数号码组成一注，所选号码与开奖号码的前2位相同，且顺序一致，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 58，即中前二直选。',
            'type': 'multi',
            'layout': {
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QZX2_S': {
            'name': '(前二)直选单式',
            'method': 'QZX2_S',
            'desc': '手动输入号码，至少输入1个二位数号码组成一注。',
            'help': '手动输入一个2位数号码组成一注，输入号码的万位、千位与开奖号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 58，即中前二直选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'HZX2': {
            'name': '(后二)直选复式',
            'method': 'HZX2',
            'desc': '从十位、个位中至少各选1个号码组成一注。',
            'help': '从十位、个位中选择一个2位数号码组成一注，所选号码与开奖号码的后2位相同，且顺序一致，即为中奖。',
            'example': '投注方案：58<br>开奖号码：后二位 58，即中后二直选。',
            'type': 'multi',
            'layout': {
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'HZX2_S': {
            'name': '(后二)直选单式',
            'method': 'HZX2_S',
            'desc': '手动输入号码，至少输入1个二位数号码组成一注。',
            'help': '手动输入一个2位数号码组成一注，输入号码的十位、个位与开奖号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：58<br>开奖号码：后二位 58，即中后二直选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'QZU2': {
            'name': '(前二)组选复式',
            'method': 'QZU2',
            'desc': '从0-9中任意选择2个或2个以上号码。',
            'help': '从0-9中选2个号码组成一注，所选号码与开奖号码的万位、千位相同，顺序不限，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 85 或者 58（顺序不限，不含对子号），即中前二组选。',
            'type': 'multi',
            'layout': {
                '组选': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QZU2_S': {
            'name': '(前二)组选单式',
            'method': 'QZU2_S',
            'desc': '手动输入号码，至少输入1个二位数号码组成一注。',
            'help': '手动输入一个2位数号码组成一注，输入号码的万位、千位与开奖号码相同，顺序不限，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 85 或者 58（顺序不限，不含对子号），即中前二组选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'HZU2': {
            'name': '(后二)组选复式',
            'method': 'HZU2',
            'desc': '从0-9中任意选择2个或2个以上号码。',
            'help': '从0-9中选2个号码组成一注，所选号码与开奖号码的十位、个位相同（不含对子号），顺序不限，即中奖。',
            'example': '投注方案：58<br>开奖号码：后二位 85 或者 58（顺序不限，不含对子号），即中后二组选。',
            'type': 'multi',
            'layout': {
                '组选': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'HZU2_S': {
            'name': '(后二)组选单式',
            'method': 'HZU2_S',
            'desc': '手动输入号码，至少输入1个二位数号码组成一注。',
            'help': '手动输入一个2位数号码组成一注，输入号码的十位、个位与开奖号码相同（不含对子号），顺序不限，即为中奖。',
            'example': '投注方案：58<br>开奖号码：前二位 85 或者 58（顺序不限，不含对子号），即中前二组选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'DWD': {
            'name': '定位胆',
            'method': 'DWD',
            'desc': '在百位、十位、个位任意位置上任意选择1个或1个以上号码。',
            'help': '从百位、十位、个位任意位置上至少选择1个以上号码，所选号码与相同位置上的开奖号码一致，即为中奖。',
            'example': '投注方案：百位 1<br>开奖号码：百位 1，即中定位胆百位。',
            'type': 'multi',
            'layout': {
                '百位': digitalCodesTpl,
                '十位': digitalCodesTpl,
                '个位': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'QBDW31': {
            'name': '前三一码',
            'method': 'QBDW31',
            'desc': '从0-9中任意选择1个以上号码。',
            'help': '从0-9中选择1个号码，每注由1个号码组成，只要开奖号码的万位、千位、百位中包含所选号码，即为中奖。',
            'example': '投注方案：1<br>开奖号码：前三位至少出现1个1，即中前三一码不定位。',
            'type': 'multi',
            'layout': {
                '一码': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },
        'QBDW32': {
            'name': '前三二码',
            'method': 'QBDW32',
            'desc': '从0-9中任意选择2个以上号码。',
            'help': '从0-9中选择2个号码，每注由2个不同的号码组成，开奖号码的万位、千位、百位中同时包含所选的2个号码，即为中奖。',
            'example': '投注方案：12<br>开奖号码：至少出现1和2各1个，即中二码不定位。',
            'type': 'multi',
            'layout': {
                '二码': digitalCodesTpl
            },
            'buttons': digitalPosTpl
        },

        'Q2DXDS': {
            'name': '前二大小单双',
            'method': 'Q2DXDS',
            'desc': '从万位、千位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对万位和千位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：大单<br>开奖号码：万位与千位“小双”，即中前二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '百位': digitalDxdsTpl,
                '十位': digitalDxdsTpl
            },
            'buttons': []
        },

        'H2DXDS': {
            'name': '后二大小单双',
            'method': 'H2DXDS',
            'desc': '从十位、个位中的“大、小、单、双”中至少各选一个组成一注。',
            'help': '对十位和个位的“大（56789）小（01234）、单（13579）双（02468）”形态进行购买，所选号码的位置、形态与开奖号码的位置、形态相同，即为中奖。',
            'example': '投注方案：大单<br>开奖号码：十位与个位“小双”，即中后二大小单双。',
            'type': 'multi',
            'btnStr': true,
            'layout': {
                '十位': digitalDxdsTpl,
                '个位': digitalDxdsTpl
            },
            'buttons': []
        },
    },
    'pk10': {
        'PKQZX1': {
            'name': '第一名复式',
            'method': 'PKQZX1',
            'desc': '从冠军中至少各选择1个号码。',
            'help': '从冠军投注的1个号码与开奖号码中的第1位数号码相同，视为中奖。',
            'example': '投注方案：01 <br>开奖号码为：01 * * * * * * * * *，即中前一直选。',
            'type': 'multi',
            'layout': {
                '冠军': pk10CodesTpl
            },
            'buttons': digitalPosTpl
        },

        'PKQZX1_S': {
            'name': '第一名单式',
            'method': 'PKQZX1_S',
            'desc': '从冠军中至少各选择1个号码。',
            'help': '从冠军投注的1个号码与开奖号码中的第1位数号码相同，视为中奖。',
            'example': '投注方案：01 <br>开奖号码为：01 * * * * * * * * *，即中前一直选。',
            'type': 'text',
            'number': 1,
            'b64': 1,
            'layout': {
                '冠军': pk10CodesTpl
            },
            'buttons': digitalPosTpl
        },

        'PKQD2': {
            'name': '第二名复式',
            'method': 'PKQD2',
            'desc': '从第二名中至少各选择1个号码。',
            'help': '从第二名投注的1个号码与开奖号码中的第2位数号码相同，视为中奖。',
            'example': '投注方案：01 <br>开奖号码为：* 01 * * * * * * * *，即中第二名复式.',
            'type': 'multi',
            'layout': {
                '亚军': pk10CodesTpl
            },
            'buttons': digitalPosTpl
        },

        'PKQD2_S': {
            'name': '第二名单式',
            'method': 'PKQD2_S',
            'desc': '从第二名中至少各选择1个号码。',
            'help': '从第二名投注的1个号码与开奖号码中的第2位数号码相同，视为中奖。',
            'example': '投注方案：01 <br>开奖号码为：* 01 * * * * * * * *，即中第二名单式.',
            'type': 'text',
            'number': 1,
            'b64': 1
        },

        'PKQZX2': {
            'name': '猜前二复式',
            'method': 'PKQZX2',
            'desc': '从冠军、亚军中至少各选择1个号码。',
            'help': '从01-10共10个号码中选择2个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中的前2个号码相同，且顺序一致，即中奖。',
            'example': '投注方案：01 02<br>开奖号码：01 02 * * * * * * * *，即中前二直选。',
            'type': 'multi',
            'layout': {
                '冠军': pk10CodesTpl,
                '亚军': pk10CodesTpl
            },
            'buttons': digitalPosTpl
        },

        'PKQZX2_S': {
            'name': '猜前二单式',
            'method': 'PKQZX2_S',
            'desc': '手动输入号码，至少输入1个两位数号码组成一注。',
            'help': '手动输入2个号码组成一注，所输入的号码与当期顺序摇出的5个号码中的前2个号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：01 02<br>开奖号码：01 02 * * * * * * * *，即中前二直选。',
            'type': 'text',
            'number': 2,
            'b64': 2
        },

        'PKQD3': {
            'name': '第三名复式',
            'method': 'PKQD3',
            'desc': '从第三名中至少各选择1个号码。',
            'help': '从第三名投注的1个号码与开奖号码中的第3位数号码相同，视为中奖。',
            'example': '投注方案：01 <br>开奖号码为：* 01 * * * * * * * *，即中第三名复式.',
            'type': 'multi',
            'layout': {
                '第三名': pk10CodesTpl
            },
            'buttons': digitalPosTpl
        },

        'PKQD3_S': {
            'name': '第三名单式',
            'method': 'PKQD3_S',
            'desc': '从第三名中至少各选择1个号码。',
            'help': '从第三名投注的1个号码与开奖号码中的第3位数号码相同，视为中奖。',
            'example': '投注方案：01 <br>开奖号码为：* * 01 * * * * * * *，即中第三名单式.',
            'type': 'text',
            'number': 1,
            'b64': 1
        },

        'PKQZX3': {
            'name': '猜前三复式',
            'method': 'PKQZX3',
            'desc': '从冠军、亚军、季军中至少各选择1个号码。',
            'help': '从01-10共10个号码中选择3个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中的前3个号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：01 02 03<br>开奖号码：01 02 03 * * * * * * *，即中前三直选。',
            'type': 'multi',
            'layout': {
                '冠军': pk10CodesTpl,
                '亚军': pk10CodesTpl,
                '季军': pk10CodesTpl
            },
            'buttons': digitalPosTpl
        },

        'PKQZX3_S': {
            'name': '猜前三单式',
            'method': 'PKQZX3_S',
            'desc': '手动输入号码，至少输入1个三位数号码组成一注。',
            'help': '手动输入3个号码组成一注，所输入的号码与当期顺序摇出的5个号码中的前3个号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：01 02 03<br>开奖号码：01 02 03 * * * * * * *，即中前三直选。',
            'type': 'text',
            'number': 3,
            'b64': 3
        },

        'PKQD4': {
            'name': '第四名复式',
            'method': 'PKQD4',
            'desc': '从第四名中至少各选择1个号码。',
            'help': '从第四名投注的1个号码与开奖号码中的第4位数号码相同，视为中奖。',
            'example': '投注方案：01 <br>开奖号码为：* * * 01 * * * * * *，即中第四名复式.',
            'type': 'multi',
            'layout': {
                '第四名': pk10CodesTpl
            },
            'buttons': digitalPosTpl
        },

        'PKQD4_S': {
            'name': '第四名单式',
            'method': 'PKQD4_S',
            'desc': '从第四名中至少各选择1个号码。',
            'help': '从第四名投注的1个号码与开奖号码中的第4位数号码相同，视为中奖。',
            'example': '投注方案：01 <br>开奖号码为：* * * 01 * * * * * *，即中第四名复式.',
            'type': 'text',
            'number': 1,
            'b64': 1
        },

        'PKQZX4': {
            'name': '猜前四复式',
            'method': 'PKQZX4',
            'desc': '从冠军、亚军、季军中至少各选择1个号码。',
            'help': '从01-10共10个号码中选择3个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中的前3个号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：01 02 03 04<br>开奖号码：01 02 03 04 * * * * * *，即中第四名单式。',
            'type': 'multi',
            'layout': {
                '冠军': pk10CodesTpl,
                '亚军': pk10CodesTpl,
                '季军': pk10CodesTpl,
                '第四名': pk10CodesTpl
            },
            'buttons': digitalPosTpl
        },

        'PKQZX4_S': {
            'name': '猜前四单式',
            'method': 'PKQZX4_S',
            'desc': '手动输入号码，至少输入1个三位数号码组成一注。',
            'help': '手动输入3个号码组成一注，所输入的号码与当期顺序摇出的5个号码中的前3个号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：01 02 03 04<br>开奖号码：01 02 03 04 * * * * * *，即中第四名单式。',
            'type': 'text',
            'number': 4,
            'b64': 4
        },

        'PKQD5': {
            'name': '第五名复式',
            'method': 'PKQD5',
            'desc': '从第五名中至少各选择1个号码。',
            'help': '从第五名投注的1个号码与开奖号码中的第5位数号码相同，视为中奖。',
            'example': '投注方案：01 <br>开奖号码为：* * * * 01 * * * * *，即中第五名复式.',
            'type': 'multi',
            'layout': {
                '第四名': pk10CodesTpl
            },
            'buttons': digitalPosTpl
        },

        'PKQD5_S': {
            'name': '第五名单式',
            'method': 'PKQD5_S',
            'desc': '从第五名中至少各选择1个号码。',
            'help': '从第五名投注的1个号码与开奖号码中的第5位数号码相同，视为中奖。',
            'example': '投注方案：01 <br>开奖号码为：* * * * 01 * * * * *，即中第五名单式.',
            'type': 'text',
            'number': 1,
            'b64': 1
        },

        'PKQZX5': {
            'name': '猜前五复式',
            'method': 'PKQZX5',
            'desc': '从冠军、亚军、季军中至少各选择1个号码。',
            'help': '从01-10共10个号码中选择3个不重复的号码组成一注，所选号码与当期顺序摇出的5个号码中的前3个号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：01 02 03 04<br>开奖号码：01 02 03 04 * * * * * *，即中第四名单式。',
            'type': 'multi',
            'layout': {
                '冠军': pk10CodesTpl,
                '亚军': pk10CodesTpl,
                '季军': pk10CodesTpl,
                '第四名': pk10CodesTpl,
                '第五名': pk10CodesTpl
            },
            'buttons': digitalPosTpl
        },

        'PKQZX5_S': {
            'name': '猜前五单式',
            'method': 'PKQZX5_S',
            'desc': '手动输入号码，至少输入1个三位数号码组成一注。',
            'help': '手动输入3个号码组成一注，所输入的号码与当期顺序摇出的5个号码中的前3个号码相同，且顺序一致，即为中奖。',
            'example': '投注方案：01 02 03 04 05<br>开奖号码：01 02 03 04 05 * * * * *，即中第四名单式。',
            'type': 'text',
            'number': 5,
            'b64': 5
        },

        'PKDWD': {
            'name': '定位胆',
            'method': 'PKDWD',
            'desc': '从冠军到第五名任意位置上任意选择1个或1个以上号码。',
            'help': '从冠军到第五名任意1个位置或多个位置上选择1个号码，所选号码与相同位置上的开奖号码一致，即为中奖。',
            'example': '投注方案：第一位 01<br>开奖号码：01 * * * * * * * * *，即中定位胆。',
            'type': 'multi',
            'layout': {
                '冠军': pk10CodesTpl,
                '亚军': pk10CodesTpl,
                '季军': pk10CodesTpl,
                '第四名': pk10CodesTpl,
                '第五名': pk10CodesTpl,
            },
            'buttons': digitalPosTpl
        }
    },
    // 六合彩
    'lhc': {
        'LHCTM': {
            'name': '特码',
            'method': 'TM',
            'desc': '从冠军中至少各选择1个号码。',
            'help': '选择1个号码与开奖号码中的第1位数号码相同，视为中奖。',
            'example': '当期开出的最后一位号码为特码。当开出特码与投注号码一致、即视为中奖（其余情况则视为不中奖）。',
            'type': 'lhc',
            'layout': {
                'codes': lhcCodesTpl
            },
            'buttons': lhcPosTpl
        },
        'LHCZT1': {
            'name': '正特1',
            'method': 'ZT1',
            'desc': '从冠军中至少各选择1个号码。',
            'help': '从冠军投注的1个号码与开奖号码中的第1位数号码相同，视为中奖。',
            'example': '当期开出之前6个号码叫正特。第一号为正特1，依次叫正特2、正特3……正特6，不以大小排序。当开出正特1与投注号码一致、即视为中奖（其余情况则视为不中奖）。',
            'type': 'lhc',
            'layout': {
                'codes': lhcCodesTpl
            },
            'buttons': lhcPosTpl
        },
        'LHCZT2': {
            'name': '正特2',
            'method': 'ZT2',
            'desc': '从冠军中至少各选择1个号码。',
            'help': '从冠军投注的1个号码与开奖号码中的第1位数号码相同，视为中奖。',
            'example': '当期开出之前6个号码叫正特。第一号为正特1，依次叫正特2、正特3……正特6，不以大小排序。当开出正特1与投注号码一致、即视为中奖（其余情况则视为不中奖）。',
            'type': 'lhc',
            'layout': {
                'codes': lhcCodesTpl
            },
            'buttons': lhcPosTpl
        },
        'LHCZT3': {
            'name': '正特3',
            'method': 'ZT3',
            'desc': '从冠军中至少各选择1个号码。',
            'help': '从冠军投注的1个号码与开奖号码中的第1位数号码相同，视为中奖。',
            'example': '当期开出之前6个号码叫正特。第一号为正特1，依次叫正特2、正特3……正特6，不以大小排序。当开出正特1与投注号码一致、即视为中奖（其余情况则视为不中奖）。',
            'type': 'lhc',
            'layout': {
                'codes': lhcCodesTpl
            },
            'buttons': lhcPosTpl
        },
        'LHCZT4': {
            'name': '正特4',
            'method': 'ZT4',
            'desc': '从冠军中至少各选择1个号码。',
            'help': '从冠军投注的1个号码与开奖号码中的第1位数号码相同，视为中奖。',
            'example': '当期开出之前6个号码叫正特。第一号为正特1，依次叫正特2、正特3……正特6，不以大小排序。当开出正特1与投注号码一致、即视为中奖（其余情况则视为不中奖）。',
            'type': 'lhc',
            'layout': {
                'codes': lhcCodesTpl
            },
            'buttons': lhcPosTpl
        },
        'LHCZT5': {
            'name': '正特5',
            'method': 'ZT5',
            'desc': '从冠军中至少各选择1个号码。',
            'help': '从冠军投注的1个号码与开奖号码中的第1位数号码相同，视为中奖。',
            'example': '当期开出之前6个号码叫正特。第一号为正特1，依次叫正特2、正特3……正特6，不以大小排序。当开出正特1与投注号码一致、即视为中奖（其余情况则视为不中奖）。',
            'type': 'lhc',
            'layout': {
                'codes': lhcCodesTpl
            },
            'buttons': lhcPosTpl
        },
        'LHCZT6': {
            'name': '正特6',
            'method': 'ZT6',
            'desc': '从冠军中至少各选择1个号码。',
            'help': '从冠军投注的1个号码与开奖号码中的第1位数号码相同，视为中奖。',
            'example': '当期开出之前6个号码叫正特。第一号为正特1，依次叫正特2、正特3……正特6，不以大小排序。当开出正特1与投注号码一致、即视为中奖（其余情况则视为不中奖）。',
            'type': 'lhc',
            'layout': {
                'codes': lhcCodesTpl
            },
            'buttons': lhcPosTpl
        }
    }
}
