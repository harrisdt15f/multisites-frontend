<template>
  <div
    class="chart-section chart-container-main"
    :class="{'table-trend':showTrend}"
    ref="chart-area"
  >
    <table
      class="chart-table"
      :class="{
        'table-temperature':showTemperature, 
        'table-lost-post':showLostPost,
        'table-lost':showLost
        }"
    >
      <thead class="thead">
        <tr class="title-text">
          <th rowspan="2" colspan="3" class="border-bottom border-right title-issue">期号</th>
          <th rowspan="2" colspan="3" class="border-right">开奖号码</th>
          <th colspan="12" class="border-right border-bottom">万位</th>
          <th colspan="12" class="border-right border-bottom">千位</th>
          <th colspan="12" class="border-right border-bottom">百位</th>
          <th colspan="12" class="border-right border-bottom">十位</th>
          <th colspan="12" class="border-right border-bottom">个位</th>
          <th colspan="12" class="border-bottom">号码分布</th>
        </tr>
        <tr class="title-number">
          <th class="ball-none border-bottom-header"></th>
          <th class="border-bottom-header"></th>
          <template v-for="item in 6">
            <th class="ball-none border-bottom-header border-right td-bg" :key="`${item}-l`"></th>
            <th class="ball-none border-bottom-header td-bg" :key="`${item}-r`"></th>
            <th class="border-bottom-header td-bg" v-for="num in 10" :key="`${item}-${num}`">
              <i class="ball-noraml">{{num - 1}}</i>
            </th>
          </template>
          <th class="ball-none border-bottom-header td-bg"></th>
        </tr>
      </thead>
      <tbody ref="chart-content" class="chart" :class="{'table-guides':showGuides}">
        <tr
          v-for="(item, index) in data"
          :key="item[0]"
          :class="{'border-bottom': (index+1)%5 === 0}"
        >
          <!-- 期号 开奖号码 -->
          <td class="ball-none"></td>
          <td class="issue-numbers">{{item[0]}}</td>
          <td class="ball-none border-right"></td>
          <td class="ball-none"></td>
          <td class>
            <span class="lottery-numbers">{{item[1]}}</span>
          </td>
          <td class="ball-none border-right"></td>
          <td class="ball-none"></td>
          <!-- 万位 千位 百位 个位 -->
          <template v-for="(num, index) in item.slice(2, 7)">
            <td
              v-for="(items, index0) in num"
              :class="`l-${items[3]}`"
              :key="`${item[0]}${index}${index0}`"
            >
              <i
                class="ball-noraml"
                :class="`c-${items[0]}-${items[2]}`"
              >{{items[0] == 0 ? items[1] : items[0]}}</i>
            </td>
            <td class="ball-none border-right" :key="`${item[0]}${index}border-right`"></td>
            <td class="ball-none" :key="`${item[0]}${index}ball-none`"></td>
          </template>
          <!-- 号码分布 -->
          <td v-for="(ball, index1) in item[7]" :key="`${item[0]}${index1}`">
            <i class="ball-noraml" :class="`f-${ball[2]}`">{{ball[0] == 0 ? ball[1] : ball[0]}}</i>
          </td>
          <td class="ball-none"></td>
        </tr>
      </tbody>
      <tbody ref="ball-content" class="tbody ball-content">
        <tr class="auxiliary-area">
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom border-top">出现总次数</td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom"></td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">0</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">7</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">4</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">19</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">12</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">18</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">13</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">16</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">11</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">13</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">16</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">17</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="ball-none border-bottom"></td>
        </tr>
        <tr class="auxiliary-area">
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">平均遗漏值</td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom"></td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">10</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">10</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">10</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">31</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">10</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">10</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">10</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">10</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">30</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">7</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">30</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">10</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">30</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">30</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">30</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">10</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">10</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">30</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">7</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">7</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">7</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">7</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="ball-none border-bottom"></td>
        </tr>
        <tr class="auxiliary-area">
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">最大遗漏值</td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom"></td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">18</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">13</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">14</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">22</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">12</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">30</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">12</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">10</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">12</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">19</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">8</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">19</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">12</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">16</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">11</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">21</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">19</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">18</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">7</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">14</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">25</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">13</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">11</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">9</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">17</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">24</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">18</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">29</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">14</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">10</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">17</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">16</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">15</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">21</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">29</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">8</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">9</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">11</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">12</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">20</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">12</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">14</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">18</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">24</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">10</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">22</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">16</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">11</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">8</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">7</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="ball-none border-bottom"></td>
        </tr>
        <tr class="auxiliary-area">
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">最大连出值</td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom"></td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">0</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="ball-none border-right border-bottom"></td>
          <td class="ball-none border-bottom"></td>
          <td class="border-bottom">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom">
            <i class="ball-noraml">4</i>
          </td>
          <td class="ball-none border-bottom"></td>
        </tr>
      </tbody>
      <tbody class="tbody tbody-footer-header">
        <tr class="auxiliary-area title-number">
          <td rowspan="2" colspan="3" class="border-right border-bottom">期号</td>
          <td rowspan="2" colspan="3" class="border-right border-bottom">开奖号码</td>
          <td class="ball-none border-bottom td-bg"></td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">0</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">7</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">8</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">9</i>
          </td>
          <td class="ball-none border-right border-bottom td-bg"></td>
          <td class="ball-none border-bottom td-bg"></td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">0</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">7</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">8</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">9</i>
          </td>
          <td class="ball-none border-right border-bottom td-bg"></td>
          <td class="ball-none border-bottom td-bg"></td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">0</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">7</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">8</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">9</i>
          </td>
          <td class="ball-none border-right border-bottom td-bg"></td>
          <td class="ball-none border-bottom td-bg"></td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">0</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">7</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">8</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">9</i>
          </td>
          <td class="ball-none border-right border-bottom td-bg"></td>
          <td class="ball-none border-bottom td-bg"></td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">0</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">7</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">8</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">9</i>
          </td>
          <td class="ball-none border-right border-bottom td-bg"></td>
          <td class="ball-none border-bottom td-bg"></td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">0</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">1</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">2</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">3</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">4</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">5</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">6</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">7</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">8</i>
          </td>
          <td class="border-bottom td-bg">
            <i class="ball-noraml">9</i>
          </td>
          <td class="ball-none border-bottom td-bg"></td>
        </tr>
        <tr class="auxiliary-area title-text">
          <td colspan="12" class="border-right border-bottom">万位</td>
          <td colspan="12" class="border-right border-bottom">千位</td>
          <td colspan="12" class="border-right border-bottom">百位</td>
          <td colspan="12" class="border-right border-bottom">十位</td>
          <td colspan="12" class="border-right border-bottom">个位</td>
          <td colspan="12" class="border-bottom">号码分布</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mathNum } from '@/utils'
import mock from './mock.js'

export default {
  name: 'user-trends-chart',
  data() {
    return {
      data: [],
      showTemperature: false,
      showLostPost: false,
      showTrend: true,
      showGuides: true,
      showLost: true
    }
  },
  mounted() {
    this.handleDrawing()
  },
  props: ['list'],
  methods: {
    reBuildData(data) {
      var arrMain = [],
          newArr = [],
          timesData = data['statistics'][0],
          ballData = data['data'],
          loseBar = data['omissionBarStatus'],
          loseFlag = new Array(50),
          i2 = 0,
          i3 = 0
      const tem1 = [0, 1, 2, 3, 4]
      const tem2 = [0,1,2,3,4,5,6,7,8,9]
      tem1.forEach(i => {
        arrMain[i] = []
        tem2.forEach(j => {
          arrMain[i][j] = [timesData[i*10+j], j]
        })
        arrMain[i].sort(function(a, b){
            return b[0] - a[0]
        })
        arrMain[i].forEach((v, k) => {
          //cold 1
          //hot 3
          //other 2
          if(k < 3){
              newArr[i*10+arrMain[i][k][1]] = 3
          }else if(k > 6){
              newArr[i*10+arrMain[i][k][1]] = 1
          }else{
              newArr[i*10+arrMain[i][k][1]] = 2
          }
        })
      })

      ballData.forEach((v, i) => {
        i2 = 0
        v.forEach(j => {
          i3 = 0
          if(i2 > 1 && i2 < 7){
            j.forEach(m => {
              if (m[0] == 0) {
                m[2] = newArr[(i2 - 2)*10 + i3]
              }
              //loseBar
              if(loseBar[(i2 - 2)*10 + i3] < 0){
                loseFlag[(i2 - 2)*10 + i3] = true
              }
              if(loseFlag[(i2 - 2)*10 + i3]){
                  m[3] = 1
              }else{
                  m[3] = 0
              }
              if(loseBar[(i2 - 2)*10 + i3] == i){
                  loseFlag[(i2 - 2)*10 + i3] = true
              }
              i3++
            })
          }
          i2++
        })
      })
      return data
    },
    handleDrawing() {
      this.data = this.reBuildData(mock.data).data
      let positionCount = 0,
        currentBallLeft = 0,
        currentBallTop = 0,
        chartTrendPosition = [],
        parentDom = this.$refs['chart-content']
      this.$nextTick(() => {
        for (let i = 0, current; i < this.data.length; i++) {
          current = this.data[i]
          for (let k = 0; k < current.length; k++) {
            if (k > 1 && k < 7) {
              for (let j = 0; j < current[k].length; j++) {
                if (j == 0) {
                  var currentDom = parentDom.getElementsByTagName('i')[
                      positionCount
                    ].parentNode,
                    left = parseInt(currentDom.offsetLeft),
                    top = parseInt(currentDom.offsetTop),
                    width = currentDom.offsetWidth,
                    height = currentDom.offsetHeight
                }
                //当前位置球
                positionCount++
                //当前号码
                if (current[k][j][0] == 0) {
                  //第一排渲染
                  if (typeof chartTrendPosition[k] == 'undefined') {
                    // 当前球的坐标
                    currentBallLeft = left + (j + 1) * width - width / 2
                    currentBallTop = top + height / 2
                    chartTrendPosition[k] = {}
                    chartTrendPosition[k]['top'] = currentBallTop
                    chartTrendPosition[k]['left'] = currentBallLeft
                  } else {
                    //当前球的坐标
                    currentBallLeft = left + (j + 1) * width - width / 2
                    currentBallTop = chartTrendPosition[k]['top'] + height
                    //绘制画布
                    //绘制走势图线
                    this.handleLine(
                      chartTrendPosition[k]['top'],
                      chartTrendPosition[k]['left'],
                      currentBallTop,
                      currentBallLeft
                    )
                    chartTrendPosition[k]['top'] = currentBallTop
                    chartTrendPosition[k]['left'] = currentBallLeft
                  }
                }
              }
            }
          }
          positionCount = 0
        }
      })
    },
    handleLine(Mx, My, Lx, Ly) {
      let canvas = null,
        width = 0,
        height = 0,
        maxNum = 0,
        minNum = 0,
        saveNum = [],
        lastTop = Mx,
        lastLeft = My,
        top = Lx,
        left = Ly
      setTimeout(() => {
        maxNum = Math.max.apply(Math, [left, lastLeft])
        minNum = Math.min.apply(Math, [left, lastLeft])
        if (maxNum == minNum) {
          width = 2
        } else {
          width = maxNum - minNum
        }

        height = top - lastTop

        canvas = document.createElement('canvas')
        canvas.style.position = 'absolute'
        canvas.style.left = minNum + 'px'
        canvas.style.top = lastTop + 'px'

        if (lastLeft == left) {
          canvas.style.left = minNum - width / 2 + 'px'
        }

        canvas.setAttribute('width', width)
        canvas.setAttribute('height', height)
        this.$refs['chart-area'].appendChild(canvas)

        const ctx = canvas.getContext('2d')
        //开始一个新的绘制路径
        ctx.beginPath()

        if (lastLeft > left) {
          saveNum = mathNum(width, 0, 0, height, 7.5)
        } else {
          saveNum = mathNum(0, 0, width, height, 7.5)
        }

        //定义直线的起点坐标为(10,10)
        ctx.moveTo(saveNum[0], saveNum[1])
        //定义直线的终点坐标为(50,10)
        ctx.lineTo(saveNum[2], saveNum[3])
        //线的
        ctx.lineWidth = 2
        //线条颜色
        ctx.strokeStyle = 'red'
        //沿着坐标点顺序的路径绘制直线
        ctx.stroke()
        //关闭当前的绘制路径
        ctx.closePath()
      }, 25)
    },
    handleSelectOption(optionList) {
      this.showTemperature = optionList.some(val => val === 'temperature')
      this.showLostPost = optionList.some(val => val === 'lostPost')
      this.showTrend = optionList.some(val => val === 'trend')
      this.showGuides = optionList.some(val => val === 'guides')
      this.showLost = optionList.some(val => val === 'lost')
    }
  }
}
</script>

<style lang="scss" scoped>
/* S chart-section */
.chart-section {
  font-family: DIN, "Helvetica Neue", "Hiragino Sans GB", "Microsoft Yahei",
    sans-serif, arial;
  font-size: 12px;
  position: relative;
  border: 1px solid #ccc;
  border-top: 1px solid #ccc;
  width: 1238px;
  margin: 0 auto 80px auto;
}

.chart-table {
  width: 1240px !important;
}

.chart-table .title-issue {
  cursor: pointer;
}

.chart-table thead .issue-order {
  display: inline-block;
  width: 10px;
  height: 7px;
  // background: url("../global-v4/v5/menu-big-sj.png");
}

.issue-order-desc {
  transform: rotate(180deg);
}

.chart-table {
  background-color: #fff0db;
}
.chart-table .title-text th {
  font-weight: 700;
  white-space: nowrap;
  word-wrap: break-word;
  color: #736045;
  border-bottom: 1px solid rgba(155, 155, 155, 0.28);
}
/* .chart-table .title-text th:nth-child(2){
    border-bottom: none;
    position: relative;
    top: 18px;
    left: 0px;
    background: transparent;
    border-right: none;
}
.chart-table .title-text th:nth-child(3)::before{
    content: "";
    width: 1px;
    height: 28px;
    border-right: 1px solid #e3d3bc;
    display: inline-block;
    position: absolute;
    top: 0px;
    left: -1px;
}
.chart-table .title-text th:nth-child(3){position: relative;} */
.chart-table .title-number th {
  padding-top: 10px;
}
.title-number th:nth-child(1),
.title-number th:nth-child(2),
.title-number th:nth-child(3) {
  background-image: none !important;
  display: none;
}
.title-number th:nth-child(2) label {
  display: none;
}
.title-number th.border-bottom-header {
  background-image: linear-gradient(0deg, #ffca7b 0%, #eec07a 17%, #f8ce8d 100%),
    linear-gradient(#eea05a, #e6a165);
}
.title-number td.border-bottom {
  background-image: linear-gradient(0deg, #ffca7b 0%, #eec07a 17%, #f8ce8d 100%),
    linear-gradient(#eea05a, #e6a165);
}
.title-number td:nth-child(1),
.title-number td:nth-child(2) {
  background-image: none;
}
.border-top {
  border-top: 1px solid #e6e6e6;
}

.chart-table .title-text .border-bottom-header,
.chart-table .title-number .border-bottom-header,
.chart-table thead .border-bottom,
#J-ball-content .border-bottom,
.title-text .border-bottom,
.tbody-footer-header .border-bottom,
.J-ball-content border-bottom,
.tbody-footer-header border-bottom,
#J-select-content .border-bottom {
  border-bottom: 1px solid #e3d3bc;
}

.chart-table .tbody {
  color: #5b5d74;
}

.chart-table th {
  padding: 5px 0;
  background-color: #fff0db;
  text-align: center;
  color: #666;
}

.chart-table td {
  padding: 10px 0;
  border-bottom: 1px solid #fff;
  border-top: 1px solid #fff;
  background-color: #fff;
  text-align: center;
}

.chart-table .issue-numbers,
.chart-table .lottery-numbers {
  width: auto;
}

.chart-table .lottery-numbers {
  color: #f26432;
  white-space: nowrap;
}

.chart-table .size-numbers,
.chart-table .parity-numbers {
  color: #0a94e3;
}

.chart-table .border-right {
  border-right: 1px solid rgba(155, 155, 155, 0.28);
}

.chart-table .border-left {
  border-left: 1px solid #757575;
  border-left: 1px solid rgba(155, 155, 155, 0.28);
}

.chart-table .ball-none,
.chart-table .title-number .ball-none {
  width: 4px;
}

.ball-noraml {
  display: inline-block;
  width: 16px;
  height: 16px;
  line-height: 22px;
  text-align: center;
  font-style: normal;
  color: #ffffff;
  overflow: hidden;
}

.chart-table .ball-red,
.chart-table .ball-orange,
.chart-table .ball-blue,
.chart-table .ball-green,
.chart-table .ball-purple,
.chart-table .group-current {
  background-image: url("../../assets/images/lottery/chart/un-chart.png");
  background-repeat: no-repeat;
  color: #fff;
}

.chart-table .ball-red {
  background-position: 0 0;
}

.chart-table .ball-orange {
  background-position: -20px 0;
}

.chart-table .ball-blue {
  background-position: -40px 0;
}

.chart-table .ball-green {
  background-position: -60px 0;
}

.chart-table .ball-purple {
  background-position: -80px 0;
}

.chart-table .group-current {
  display: inline-block;
  width: 18px;
  height: 12px;
  line-height: 12px;
  text-align: center;
  font-style: normal;
  background-position: -100px 0;
}

.chart-table .tbody .bg-red {
  background-color: #f53f00;
  color: #fff;
}

.chart-table .tbody .bg-blue {
  background-color: #00a2ff;
  color: #fff;
}

.chart-table .tbody .bg-blue .ball-noraml {
  color: #fff;
}

.chart-table .tbody .bg-green {
  background-color: #34bc0f;
  color: #fff;
}

.chart-table .tbody .compare {
  background-color: #7999f3;
  color: #fff;
}

.chart-table .tbody .lost {
  background-color: #8083a3;
  color: #ccc;
}

.auxiliary-area td {
  background-color: #fff0db;
  border-top: 1px solid #e6e6e6;
  color: #666;
}

.chart-table .title-number .border-bottom-header input {
  vertical-align: baseline;
}

.select-area td {
  background-color: #ccc;
}

.select-area .ico-add,
.select-area .ico-del {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-right: 4px;
  // background-image: url("un-select-area.png");
  background-repeat: no-repeat;
  vertical-align: middle;
  cursor: pointer;
}

.select-area .ico-add {
  background-position: 0 0;
}

.select-area .ico-del {
  background-position: -20px 0;
}

.chart-table .td-bg-light {
  background: #ececef;
}

.chart-table .border-right-light {
  border-right: 1px solid #d4d4d7;
}

/* E chart-section */

.other-flag {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 12px;
  text-indent: -10000px;
  overflow: hidden;
  background: #0eaa74;
}

.other-flag-odd,
.other-flag-even {
  background: #ce0b24;
}

.other-flag-up {
  border-radius: 0;
  // background: url(flag-up.png) no-repeat center center;
}

.other-flag-p {
  border-radius: 0;
  // background: url(flag-p.png) no-repeat center center;
}

.other-flag-down {
  border-radius: 0;
  // background: url(flag-down.png) no-repeat center center;
}

/** 样式名称规则直接使用号码属性拼接 //array(遗漏次数, 当前开奖号数字, 号温, 遗漏条) **/

/** 当前开奖球数字 和 冷热号数字 **/
.c-0-1,
.c-0-2,
.c-0-3 {
  background-image: url("../../assets/images/lottery/chart/un-chart.png");
  background-repeat: no-repeat;
  color: #fff !important;
  background: #fb6f79;
  border-radius: 20px;
  line-height: 16px;
  vertical-align: -2px;
}

.c-0-1,
.c-0-2,
.c-0-3 {
  background-position: 0 0;
}

.table-temperature .c-0-1 {
  background-position: -40px 0;
  background: blue;
}

.table-temperature .c-0-2 {
  background-position: -20px 0;
  background: yellow;
  color: #333 !important;
}

.table-temperature .c-0-3 {
  background-position: 0 0;
  background: #f60;
}

/** 遗漏条样式 **/
.table-lost-post .l-1 {
  background-color: #dadae5;
  border: none;
}

.table-lost-post .l-1 .ball-noraml {
  color: #b7b7b7;
}

/** 辅助线 **/
.table-guides .border-bottom {
  td {
    border-bottom: 1px solid #ccc;
  }
}

/** 遗漏数 **/
.table-lost .ball-noraml {
  color: #666;
}

/** 选球区域放置样式被覆盖 **/
.table-lost .auxiliary-area .ball-noraml,
.table-lost .select-area .ball-noraml {
  color: #b7b7b7;
}

.table-lost .select-area .ball-orange {
  color: #fff;
}

/** 号码分布样式 **/
.f-1,
.f-2,
.f-3,
.f-4,
.f-5 {
  background-image: url("../../assets/images/lottery/chart/un-chart.png");
  background-repeat: no-repeat;
  color: #fff !important;
  background: #34bc0f;
  border-radius: 20px;
  line-height: 16px;
  vertical-align: -2px;
}

/*出现单次*/
.f-1 {
  background-position: -60px 0;
}

/*出现多次*/
.f-2,
.f-3,
.f-4,
.f-5 {
  background-position: -80px 0;
  background: #d573e6;
}

/** 选球区域选球相关样式 **/
.select-area i {
  cursor: pointer;
}

/** 五星综合 **/
/** 分布 **/
.zh-0-1,
.zh-0-2,
.zhkd-1 {
  background-image: url("../../assets/images/lottery/chart/un-chart.png");
  background-repeat: no-repeat;
  color: #fff;
}

.zh-0-1 {
  background-position: -60px 0;
}

.zh-0-2 {
  background-position: -80px 0;
}

/** 跨度 **/
.zhkd-1 {
  background-position: -80px 0;
}

/** 大小比 **/
.chart-table .zhdx-0 {
  background: #7999f3;
}

.chart-table .zhdx-0 .ball-noraml {
  color: #fff;
}

/** 单双比 **/
.chart-table .zhds-0 {
  background: #7999f3;
}

.chart-table .zhds-0 .ball-noraml {
  color: #fff;
}

/** 质合比 **/
.chart-table .zhzh-0 {
  background: #7999f3;
}

.chart-table .zhzh-0 .ball-noraml {
  color: #fff;
}
.ball-content,
.tbody-footer-header {
  .ball-noraml {
    color: #666 !important;
  }
}
</style>

<style lang="scss">
/*走势图*/
.chart-section {
  canvas {
    display: none;
  }
  &.table-trend canvas {
    display: block;
  }
}
</style>


