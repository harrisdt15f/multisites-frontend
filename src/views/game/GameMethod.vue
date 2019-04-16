<template>
    <section>
        <div class="w" id="J-page-container-main">
            <div class="main-left">
                <div id="J-panel-cont-types" class="play-section">
                    <div class="play-select play-select-status-a play-select-status-b clearfix">

                        <ul class="play-select-title" id="J-panel-gameTypes">
                            <li class="normal-play">普通玩法 :</li>
                            <li data-index="0" class="gametypes-menu-wuxing">
                                <div class="title">五星
                                    <span title="直选单式"></span>
                                </div>
                                <div class="content clearfix">
                                    <div class="sj"></div>
                                    <dl>
                                        <dd class="types-node types-node-zhixuan">直选</dd>
                                        <dd class="types-item" data-id="68">直选复式</dd>
                                        <dd class="types-item" data-id="7">直选单式</dd>
                                        <dd class="types-item" data-id="15">直选组合</dd>
                                    </dl>
                                    <dl>
                                        <dd class="types-node types-node-zuxuan">组选</dd>
                                        <dd class="types-item" data-id="32">组选120</dd>
                                        <dd class="types-item" data-id="31">组选60</dd>
                                        <dd class="types-item" data-id="30">组选30</dd>
                                        <dd class="types-item" data-id="29">组选20</dd>
                                        <dd class="types-item" data-id="28">组选10</dd>
                                        <dd class="types-item" data-id="27">组选5</dd>
                                    </dl>
                                </div>
                            </li>
                            <li data-index="1" class="gametypes-menu-sixing">
                                <div class="title">
                                    四星<span title="直选复式"></span>
                                </div>
                                <div class="content clearfix">
                                    <div class="sj"></div>
                                    <dl>
                                        <dd class="types-node types-node-zhixuan">直选</dd>
                                        <dd class="types-item" data-id="67">直选复式</dd>
                                        <dd class="types-item" data-id="6">直选单式</dd>
                                        <dd class="types-item" data-id="79">直选组合</dd>
                                    </dl>
                                </div>
                            </li>
                        </ul>
                        <a id="J-menu-status-control" class="menu-control menu-control-current" href="#"><span class="text-up">展开全部</span><span class="text-down">收起全部</span></a>
                    </div>
                    <div id="J-gametypes-panel-cont" class="gametypes-menu-panel">
                        <ul class="gametypes-menu-ul" id="J-gametyes-menu-panel">
                            <li class="gametypes-sort gametypes-menu-wuxing">
                                <div class="content clearfix">
                                    <dl>
                                        <dd class="types-node types-node-zhixuan">直选</dd>
                                        <dd class="types-item" isdf="undefined" data-id="68">直选复式</dd>
                                        <dd class="types-item" isdf="undefined" data-id="7">直选单式</dd>
                                        <dd class="types-item" isdf="undefined" data-id="15">直选组合</dd>
                                    </dl>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="method-current-prize">
                        单注奖金:
                        <span id="J-method-prize" class="prize-num">0.<i>72</i></span>
                        元
                    <span class="button-method-rule">选号规则</span>
                    </div>
                </div>
                <div id="J-panel-cont-balls" class="number-section clearfix">
                    <textarea id="J-textarea-historys-balls-data">
                        190416036=97841,190416035=04512,190416034=38113,190416033=05904,190416032=12487,190416031=50186,190416030=79569,190416029=05990,190416028=20728,190416027=24685
                    </textarea>
                </div>
                <div class="statics-cont">
                    <div id="J-balls-statistics-panel" class="panel-trace-cont clearfix">
                        <ul class="bet-statistics clearfix">
                            <li>
                                资金模式
                                <span id="J-bet-statics-tab-moneyunit">
                                        <span class="bet-statics-tab-moneyunit">
                                            <span class="item" data-value="1">元</span><span data-value="0.1" class="item current">角</span><span data-value="0.01" class="item">分</span>
                                        </span>
                                    <span>
                                        <span class="bet-statics-moneyunit-cont panel-current"></span>
                                        <span class="bet-statics-moneyunit-cont"></span>
                                        <span class="bet-statics-moneyunit-cont"></span>
                                    </span>
                                </span>
                            </li>
                            <li class="bet-statics-multiple-cell">
                                <span class="front-text">投注倍数</span>
                                <span id="J-bet-statics-multiple-reduce" class="bet-statics-multiple-control bet-statics-multiple-reduce"></span>
                                <div class="choose-model select-game-statics-multiple">
                                    <div class="choose-list">
                                        <div class="choose-list-cont">
                                            <a data-value="1" href="#" class="choose-item-current">1</a>
<!--                                            <a data-value="5" href="#">5</a><a data-value="10" href="#">10</a>-->
<!--                                            <a data-value="50" href="#">50</a><a data-value="100" href="#">100</a>-->
<!--                                            <a data-value="200" href="#">200</a>-->
                                        </div>
                                    </div>
                                    <span class="choose-scroll" onselectstart="return false;"></span>
                                    <span class="info" style="display:none;">
                                        <input data-realvalue="1" class="choose-input" type="text" value="1">
                                    </span><i></i>
                                </div>
                                <select id="J-balls-statistics-multiple"  style="display:none;">
                                    <option value="1">1</option>
<!--                                    <option value="5">5</option>-->
<!--                                    <option value="10">10</option>-->
<!--                                    <option value="50">50</option>-->
<!--                                    <option value="100">100</option>-->
<!--                                    <option value="200">200</option>-->
                                 </select>
                                <span id="J-bet-statics-multiple-add" class="bet-statics-multiple-control bet-statics-multiple-add"></span>
                                <span id="J-balls-statistics-multiple-text" class="game-statistics-multiple-text">1</span>
                            </li>
                        </ul>
                        <ul class="bet-statics-money-nums">
                            <li class="choose-bet">已选<em id="J-balls-statistics-lotteryNum">0</em>注, </li>
                            <li class="total-money">共<em id="J-balls-statistics-amount" class="bignum">0.00</em>元&nbsp;&nbsp;</li>
                            <li class="total-money panel-text-user-balance">
                                可用余额<em id="J-balls-statistics-balance">49,242.59</em>元&nbsp;&nbsp;
                                <a id="J-button-bet-allin" href="#" class="btn btn-bet-allin btn-bet-allin-disable">ALL IN</a>
                            </li>
                        </ul>
                        <div class="bet-statics-money-nums">最高盈利&nbsp;&nbsp;<em id="J-balls-statistics-maxProfiet" class="bignum">0.00</em>元</div>
                        <div class="bet-rebate-cont">
                            <div class="row row-a">投注奖金组-返点</div>
                            <div class="row">
                                <select id="J-select-rebate">
                                    <option value="1800">1800 - 0.00%</option>
                                    <option selected="selected" value="1800">1801 - 0.00%</option>
                                </select>
                            </div>
                        </div>
                        <ul class="bet-button-line">
                            <li class="choose-btn choose-btn-submit-fast">
                                <input type="button" value="直接投注" id="J-add-fastorder" class="disable">
                            </li>
                            <li class="choose-btn">
                                <input type="button" value="添加至购彩篮" id="J-add-order" class="disable">
                            </li>

                        </ul>
                    </div>            </div>

                <div class="play-footer clearfix">
                    <div id="J-trace-status-trace" class="play-footer-inner clearfix">
                        <div class="panel-section">
                            <div class="panel-section-inner">
                                <div class="pannel-title">

                                    购彩篮
                                </div>
                                <div class="panel-select">
                                    <div class="panel-select-title clearfix" style="position:relative;">
                                        <span class="name">玩法</span>
                                        <span class="number">号码</span>
                                        <span class="bet">注</span>
                                        <span class="multiple">倍</span>
                                        <span class="price">金额</span>
                                        <a href="#" class="btn-order-clear close" title="清空" id="J-button-clearall" style="width: 48px;line-height: 24px;height: 23px;padding: 0;">清空</a>
                                    </div>
                                    <div class="panel-order-list-cont" id="J-panel-order-list-cont">
                                        <ul id="J-balls-order-container" class="order-container"></ul>
                                    </div>
                                </div>
                                <!--
                                <div class="chase-site">
                                    <a href="javascript:void(0)" class="chase-site-btn" id="J-trace-switch" style="display:none;"><i></i>设置追号</a>
                                    <span class="chase-site-content" id="J-trace-num-tip-panel">共追号 <span id="J-trace-num-text">10</span> 期 <a href="#" id="J-chase-site-trace-delete" class="chase-site-trace-delete delete">取消追号</a></span>
                                </div>
                                -->
                            </div>
                        </div>
                        <div id="J-trace-panel" class="panel-trace">

                            <div class="trace-wd-title">
                                追号设置
                                <input id="J-trace-button-title-clear" type="button" class="btn trace-button-title-clear" value="清除追号并关闭窗口">
                            </div>
                            <div class="pop-bd">
                                <div class="chase-tab" id="J-trace-cont-body">
                                    <div class="chase-tab-title clearfix">
                                        <ul class="clearfix">
                                            <li class="chase-tab-t current">利润</li>
                                            <li class="chase-tab-t " style="border-left:0;">同倍</li>
                                            <li class="chase-tab-t " style="border-left:0;">翻倍</li>
                                        </ul>
                                        <div class="chase-stop" id="J-trace-iswinstop-panel" style="display:none;">
                                            <label for="J-trace-iswinstop" class="label"><input type="checkbox" class="checkbox" id="J-trace-iswinstop">累计盈利</label>
                                            &gt;
                                            &nbsp;<input type="text" value="1000" class="input" disabled="disabled" id="J-trace-iswinstop-money" style="width:30px;text-align:center;padding:0 4px;">&nbsp;元时停止追号
                                            <i id="J-trace-iswinstop-hover" class="icon-question">
                                                玩法提示
                                                <div class="chase-stop-tip" id="chase-stop-tip-2">
                                                    当追号计划中，累计盈利金额（已获奖金扣除已投本金）大于设定值时，即停止继续追号。<br>
                                                    如果您不考虑追号的盈利情况，<a id="J-chase-stop-switch-2" href="#">点这里</a>。
                                                </div>
                                            </i>
                                        </div>
                                    </div>
                                    <div class="chase-tab-content chase-tab-content-current">
                                        <div class="trace-title-param">
                                            <label class="param">
                                                最低收益率:
                                                <input id="J-trace-lirunlv-num" class="input w-1" type="text" value="50"> %
                                            </label>
                                            <label class="param">
                                                追号期数:
                                                <input id="J-trace-lirunlv-times" class="input w-1" type="text" value="10">
                                            </label>
                                            <div class="trace-button-cont">
                                                <input type="button" class="btn trace-button-detail" value="生成追号计划">
                                            </div>
                                        </div>
                                        <div class="chase-table-container">
                                            <table id="J-trace-table-lirunlv" class="chase-table">
                                                <tbody data-type="lirunlv" id="J-trace-table-lirunlv-body"></tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="chase-tab-content">
                                        <div class="trace-title-param">
                                            <label class="param">
                                                起始倍数:
                                                <input id="J-trace-tongbei-multiple" class="input w-1" type="text" value="1">
                                            </label>
                                            <label class="param">
                                                追号期数:
                                                <input id="J-trace-tongbei-times" class="input w-1" type="text" value="10">
                                            </label>
                                            <div class="trace-button-cont">
                                                <input type="button" class="btn trace-button-detail" value="生成追号计划">
                                            </div>
                                        </div>
                                        <div class="chase-table-container">
                                            <table class="chase-table" id="J-trace-table">
                                                <tbody id="J-trace-table-tongbei-body" data-type="tongbei"></tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="chase-tab-content">
                                        <div class="trace-title-param">
                                            <label class="param">
                                                起始倍数:
                                                <input id="J-trace-fanbei-multiple" class="input w-1" type="text" value="1">
                                            </label>
                                            <label class="param">
                                                隔
                                                <input id="J-trace-fanbei-jump" class="input w-1" type="text" value="2">
                                            </label>
                                            <label class="param">
                                                期 倍x
                                                <input id="J-trace-fanbei-num" class="input w-1" type="text" value="2">
                                            </label>
                                            <label class="param">
                                                期数:
                                                <input id="J-trace-fanbei-times" class="input w-1" type="text" value="10">
                                            </label>
                                            <div class="trace-button-cont">
                                                <input type="button" class="btn trace-button-detail" value="生成追号计划">
                                            </div>
                                        </div>

                                        <div class="chase-table-container">
                                            <table class="chase-table" id="J-trace-table">
                                                <tbody id="J-trace-table-fanbei-body" data-type="fanbei"></tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="chase-tab-content">
                                        <div class="chase-select-high">
                                            <div class="title">基本参数</div>
                                            <ul class="base-parameter">
                                                <li>
                                                    起始期号：
                                                    <div class="choose-model chase-trace-startNumber-select">
                                                        <div class="choose-list" style="visibility: visible;">
                                                            <div class="choose-list-cont">
                                                                <a data-value="190416038" href="#" class="choose-item-current">190416038(当前期)</a>
                                                                <a data-value="190416039" href="#">190416039</a><a data-value="190416040" href="#">190416040</a>
                                                                <a data-value="190416041" href="#">190416041</a><a data-value="190416042" href="#">190416042</a>
                                                            </div>
                                                        </div>
                                                        <span class="choose-scroll" onselectstart="return false;"></span>
                                                        <span class="info">
                                                            <input data-realvalue="190416038" class="choose-input choose-input-disabled" disabled="disabled" type="text" value="190416038(当前期)"></span><i></i></div><select id="J-traceStartNumber" >
                                                    <option value="190416038">190416038(当前期)</option>
                                                    <option value="190416039">190416039</option>
                                                    <option value="190416040">190416040</option>
                                                    <option value="190416041">190416041</option>
                                                </select>
                                                </li>
                                                <li>
                                                    追号期数：
                                                    <input id="J-trace-advanced-times" type="text" class="input" value="10">&nbsp;&nbsp;期（最多可以追<span id="J-trace-number-max">59</span>期）
                                                </li>
                                                <li>
                                                    起始倍数：
                                                    <input id="J-trace-advance-multiple" type="text" class="input" value="1">&nbsp;&nbsp;倍
                                                </li>
                                            </ul>

                                            <div class="title">高级参数</div>
                                            <div id="J-trace-advanced-type-panel" class="high-parameter">
                                                <ul class="tab-title clearfix">
                                                    <li class="current">翻倍追号</li>
                                                    <li>盈利金额追号</li>
                                                    <li>盈利率追号</li>
                                                </ul>
                                                <ul class="tab-content">
                                                    <li class="panel-current">
                                                        <p data-type="a">
                                                            <input class="trace-advanced-type-switch" type="radio" name="trace-advanced-type1" checked="checked">
                                                            每隔&nbsp;<input id="J-trace-advanced-fanbei-a-jiange" type="text" class="input" value="2">&nbsp;期
                                                            倍数x<input id="J-trace-advanced-fanbei-a-multiple" type="text" class="input trace-input-multiple" value="2">
                                                        </p>
                                                        <p data-type="b">
                                                            <input class="trace-advanced-type-switch" type="radio" name="trace-advanced-type1">
                                                            前&nbsp;<input id="J-trace-advanced-fanbei-b-num" type="text" class="input" value="5" disabled="disabled">&nbsp;期
                                                            倍数=起始倍数，之后倍数=<input id="J-trace-advanced-fanbei-b-multiple" type="text" class="input trace-input-multiple" value="2" disabled="disabled">
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p data-type="a">
                                                            <input class="trace-advanced-type-switch" type="radio" name="trace-advanced-type2" checked="checked">
                                                            预期盈利金额≥&nbsp;<input id="J-trace-advanced-yingli-a-money" type="text" class="input" value="100">&nbsp;元
                                                        </p>
                                                        <p data-type="b">
                                                            <input class="trace-advanced-type-switch" type="radio" name="trace-advanced-type2">
                                                            前&nbsp;<input id="J-trace-advanced-yingli-b-num" type="text" class="input" value="2" disabled="disabled">&nbsp;期
                                                            预期盈利金额≥&nbsp;<input id="J-trace-advanced-yingli-b-money1" type="text" class="input" value="100" disabled="disabled">&nbsp;元，之后≥&nbsp;<input id="J-trace-advanced-yingli-b-money2" type="text" class="input" value="50" disabled="disabled">&nbsp;元
                                                        </p>
                                                    </li>
                                                    <li>
                                                        <p data-type="a">
                                                            <input class="trace-advanced-type-switch" type="radio" name="trace-advanced-type3" checked="checked">
                                                            预期盈利率≥&nbsp;<input id="J-trace-advanced-yinglilv-a" type="text" class="input" value="10">&nbsp;%
                                                        </p>
                                                        <p data-type="b">
                                                            <input class="trace-advanced-type-switch" type="radio" name="trace-advanced-type3">
                                                            前&nbsp;<input id="J-trace-advanced-yinglilv-b-num" type="text" class="input" value="5" disabled="disabled">&nbsp;期
                                                            预期盈利率≥&nbsp;<input id="J-trace-advanced-yingli-b-yinglilv1" type="text" class="input" value="30" disabled="disabled">&nbsp;%，之后≥&nbsp;<input id="J-trace-advanced-yingli-b-yinglilv2" disabled="disabled" type="text" class="input" value="10">&nbsp;%
                                                        </p>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div class="chase-table-container">
                                            <table id="J-trace-table-advanced" class="chase-table">
                                                <tbody id="J-trace-table-advanced-body">
                                                <tr>
                                                    <th style="width:125px;" class="text-center">序号</th>
                                                    <th><label class="label"><input type="checkbox" class="checkbox">追号期次</label>
                                                    </th><th>倍数</th>
                                                    <th>金额</th>
                                                    <th>预计开奖时间</th>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div id="J-trace-info-panel" class="trace-info-panel clearfix">
                                        <div class="chase-stop" id="J-trace-iswintimesstop-panel">
                                            <label class="label"><input type="checkbox" class="checkbox" id="J-trace-iswintimesstop" checked="checked">中奖后停止追号</label><input type="text" value="1" disabled="disabled" class="input" id="J-trace-iswintimesstop-times">&nbsp;
                                            &nbsp;&nbsp;
                                            <input id="J-button-trace-clear" type="button" class="btn trace-button-clear-trace" value="清除追号">
                                            <i id="J-trace-iswintimesstop-hover" class="icon-question" >
                                                玩法提示
                                                <div class="chase-stop-tip" id="chase-stop-tip-1">
                                                    当追号计划中，一个方案内的任意注单中奖时，即停止继续追号。<br>
                                                    如果您希望考虑追号的实际盈利，<a id="J-chase-stop-switch-1" href="#">点这里</a>。
                                                </div>
                                            </i>
                                        </div>
                                        <ul class="bet-statistics">
                                            <li>共追号 <span id="J-trace-statistics-times">0</span> 期，<em><span id="J-trace-statistics-lotterys-num">0</span> </em>注，</li>
                                            <li>金额 <strong class="price"><dfn>¥</dfn><span id="J-trace-statistics-amount">0.00</span></strong> 元</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
<!--                            <div class="pop-btn">-->
<!--                                <a href="javascript:void(0);" class="btn btn-important" id="J-button-trace-confirm">保存追号方案</a>-->
<!--                                <a href="javascript:void(0);" class="btn btn-normal closeBtn" style="">取 消</a>-->
<!--                            </div>-->
                        </div>
                    </div>
                    <div class="bet-statics-commit clearfix">
                        <div class="bet-statistics">
                            <em id="J-gameOrder-lotterys-num">0</em>
                            <span class="row-small">投注总额</span>
                            <em id="J-gameOrder-amount">0.00</em>
                            <span>元</span>
                            <span class="bet-statics-text-small panel-text-user-balance">可用余额 <em id="J-user-amount-num">49,242.59</em>元</span>
                        </div>
                        <div class="btn-bet-bg" id="J-btn-bet">
                            <a id="J-submit-order" class="btn-bet btn-bet-disable" href="javascript:void(0)">
                                确认投注
                                <span class="btn-bet-text">
                            <span id="J-button-btn-time">00:17:06</span>
                        </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div class="list-full-history" id="J-list-history-panel">
                    <div class="title clearfix">
                        <ul>
                            <li class="current">我的投注</li>
                            <li>我的追号</li>
                        </ul>
                    </div>
                    <div class="content panel-current">
                        <table width="100%">
                            <thead>
                            <tr>
                                <th><div class="th-line">游戏</div></th>
                                <th><div class="th-line">玩法</div></th>
                                <th><div class="th-line">期号</div></th>
                                <th width="150"><div class="th-line">开奖号</div></th>
                                <th><div class="th-line">投注内容</div></th>
                                <th><div class="th-line">投注金额</div></th>
                                <th width="120"><div class="th-line">奖金</div></th>
                                <th><div class="th-line">奖金组-返点</div></th>
                                <th><div class="th-line">状态</div></th>
                                <th><div class="th-line">操作</div></th>
                            </tr>
                            </thead>
                            <tbody id="J-tbody-historys-bets">
                                <tr class="row-data-49383596 row-status-2">
                                    <td><span class="cls-gamename">重庆时时彩</span></td><td><span class="cls-method">五星直选单式</span></td>
                                    <td><span class="cls-number">190415040</span></td>
                                    <td><span class="cls-prizeballs">35443</span></td>
                                    <td><span class="cls-balls">11111|2222...</span></td>
                                    <td><span class="cls-money">0.10</span></td>
                                    <td><span class="cls-prize">0.00</span></td>
                                    <td><span class="cls-commission">1800-0.00%</span></td>
                                    <td><span class="cls-status">未中奖</span></td>
                                    <td><a target="_blank" href="https://chunqiucp5.com/projects/view/49383596">详情</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="content">
                        <table width="100%">
                            <thead>
                            <tr>
                                <th><div class="th-line">游戏</div></th>
                                <th><div class="th-line">玩法</div></th>
                                <th><div class="th-line">起始奖期</div></th>
                                <th><div class="th-line">追号进度</div></th>
                                <th><div class="th-line">总追号金额</div></th>
                                <th><div class="th-line">已中奖金额</div></th>
                                <th><div class="th-line">追中即停</div></th>
                                <th><div class="th-line">状态</div></th>
                                <th><div class="th-line">操作</div></th>
                            </tr>
                            </thead>
                            <tbody id="J-tbody-historys-traces">
                                <tr class="row-data-369489">
                                    <td><span class="cls-gamename">重庆时时彩</span></td><td><span class="cls-method">后二大小单双</span></td>
                                    <td><span class="cls-startnumber">190108088</span></td><td><span class="cls-progress">2/10</span></td>
                                    <td><span class="cls-amount">0.20</span></td>
                                    <td><span class="cls-balls">0.07</span></td>
                                    <td><span class="cls-iswinstop">是</span></td>
                                    <td><span class="cls-status">系统终止</span></td>
                                    <td><a target="_blank" href="https://chunqiucp5.com/traces/view/369489">详情</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row-more">
                        <a href="https://chunqiucp5.com/projects" target="_blank">更多游戏记录...</a>
                    </div>
                </div>
            </div>
            <div class="main-right j-hide">
                <div class="list-historys" id="J-list-historys">
                    <div class="record">历史开奖记录</div>
                    <div class="cont" id="J-minitrend-cont">
                        <table width="100%" class="bet-table-trend" id="J-minitrend-trendtable-58">
                            <thead>
                                 <tr><th><span class="number">奖期</span></th><th><span class="balls">开奖</span></th><th><span>大小</span></th><th><span>单双</span></th></tr>
                            </thead>
                            <tbody>
                                <tr class="first">
                                    <td><span class="number">0416036 期</span></td><td><span class="balls"><i class="">9</i><i class="">7</i><i class="">8</i><i class="curr">4</i><i class="curr">1</i></span></td><td>小小</td><td>双单</td></tr><tr class=""><td><span class="number">0416035 期</span></td>
                                    <td><span class="balls"><i class="">0</i><i class="">4</i><i class="">5</i><i class="curr">1</i><i class="curr">2</i></span></td>
                                    <td>小小</td><td>单双</td></tr><tr class=""><td><span class="number">0416034 期</span></td><td><span class="balls"><i class="">3</i><i class="">8</i><i class="">1</i><i class="curr">1</i><i class="curr">3</i></span></td><td>小小</td><td>单单</td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="more"><a target="_blank" href="https://chunqiucp5.com/user-trends/trend-view/1">查看完整走势</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
<!--    <div class="bet-type-crow">-->
<!--        <ul id="crowd-menu">-->
<!--            <li v-for="(_group, _index) in allMethods" :key="_index"  @click="selectGroup(_group.sign, _index)" v-bind:class="{'on':_group.sign == selectedGroup}">-->
<!--                <a href="javascript:;">-->
<!--                    <span class="bet-type-crow-name">{{_group.name}}</span>-->
<!--                    <span class="bet-type-group-name"></span>-->
<!--                </a>-->
<!--            </li>-->
<!--        </ul>-->
<!--        <div v-if="currentLottery.hasrx" class="bet-type-optional" id="rx"><span></span></div>-->
<!--    </div>-->
<!--    <div id="crowd-menu2" v-if="selectedGroup" >-->
<!--        <div  class="bet-type-group" v-if="selectedGroup">-->
<!--            <div class="bet-type-group-list"  v-for="(row, _rowIndex) in allMethods[selectedGroupIndex]['rows']" :key="_rowIndex">-->
<!--                <div class="group-name">{{row.name}}</div>-->
<!--                <ul>-->
<!--                    <li v-for="(method, mkey) in row.methods" :key="mkey" v-bind:class="{'on':method.method_id == selectedMethodId}" @click="selectMethod(method.method_id)">-->
<!--                        <a href="javascript:;" class="btn-red"> {{method.method_name}}</a>-->
<!--                    </li>-->
<!--                </ul>-->
<!--            </div>-->
<!--        </div>-->
<!--    </div>-->
    </section>
</template>
<script>
import methods from "../../lib//config/method"

export default {
    name: 'game-method',
    template: '#game-method',
    components: {
    },
computed: {
    currentLottery: function () {
        return this.$store.state.currentLottery;
    },

    allMethods: function () {
        return this.$store.state.allMethods;
    },

    defaultGroup: function () {
        return this.$store.state.defaultGroup;
    },

    defaultMethod: function () {
        return this.$store.state.defaultMethod;
    },

},
watch: {
    // 如果路由有变化，会再次执行该方法
    '$store.state.defaultGroup': {
        handler() {
            this.selectGroup(this.defaultGroup, 0);
            this.selectMethod(this.defaultMethod);
        },
        deep: true
    }
},
data() {
    return {
        loading: false,
        selectedGroup: '',
        selectedGroupIndex: '',
        selectedMethodId: '',

    };
},
mounted() {
},
created () {
},

destroyed: function () {

},

methods: {
    // 选中玩法组
    selectGroup(groupSign, _index) {
        this.selectedGroup      = groupSign;
        this.selectedGroupIndex = _index;
        this.selectedMethodId   = "";
        this.$store.commit("currentMethod", {});
        this.selectMethod(this.allMethods[_index]['rows'][0]['methods'][0]['method_id']);
    },

    // 选中玩法
    selectMethod(methodId) {
        this.$store.commit("currentMethod", methods[this.currentLottery.series_id][methodId]);
        this.selectedMethodId = methodId;
    },
}
};
</script>

<style scoped>
</style>