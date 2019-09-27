<template>
  <div class="user-manage">
    <!-- 搜索 -->
    <div class="filter-container">
      <div class="filter-label">
        用户名:
        <el-input
          size="mini"
          v-model="listQuery.username"
          style="width: 200px; margin-bottom:10px"
          class="filter-item"
        ></el-input>
      </div>
      <div class="filter-label">
        余额范围:
        <el-input
          type="number"
          v-model="listQuery.min_team_balance"
          placeholder="最小团队余额"
          size="mini"
          style="width: 105px;"
          class="filter-item"
        ></el-input>-
        <el-input
          type="number"
          v-model="listQuery.max_team_balance"
          placeholder="最大团队余额"
          size="mini"
          style="width: 105px;"
          class="filter-item"
        ></el-input>
      </div>
      <div class="filter-label">
        奖金组范围:
        <el-input
          type="number"
          v-model="peize[0]"
          placeholder="最小奖金组"
          size="mini"
          style="width: 105px;"
          class="filter-item"
        ></el-input>-
        <el-input
          type="number"
          v-model="peize[1]"
          placeholder="最大奖金组"
          size="mini"
          style="width: 105px;"
          class="filter-item"
        ></el-input>
      </div>
      <br />
      <div class="filter-label">
        时间:
        <el-date-picker
          style="margin-bottom:20px"
          size="mini"
          v-model="gameTime"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        ></el-date-picker>
      </div>
      <div class="bmn-search-button">
        <el-button @click="searchGame" :loading="searchLoading" class="btn">搜 索</el-button>
      </div>
    </div>
    <el-breadcrumb v-if="showBreadcrumb" separator="/" style="margin-bottom:10px;">
      <el-breadcrumb-item @click.native="searchGame">{{userDetail.username}}</el-breadcrumb-item>
      <el-breadcrumb-item
        @click.native="handleBreadcrumb(item, index)"
        v-for="(item, index) in breadcrumbList"
        :key="index"
      >{{item.username}}</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="custom-table">
      <el-table
        :data="list"
        v-loading="listLoading"
        sum-text="本页变动"
        :summary-method="getSummaries"
        show-summary
        style="width: 100%"
      >
        <el-table-column align="center" label="用户名">
          <template slot-scope="scope">
            <div @click="handleNextLink(scope.row)" class="next-link">
              <span>{{ scope.row.username }}</span>
              <i
                style="margin-left:2px;font-size:12px"
                class="fa fa-caret-right"
                aria-hidden="true"
              ></i>
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="奖金组">
          <template slot-scope="scope">
            <span>{{ scope.row.prize_group }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="团队人数">
          <template slot-scope="scope">
            <span>{{ scope.row.total_members }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="注册日期">
          <template slot-scope="scope">
            <span>{{ scope.row.register_at }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="最新登录">
          <template slot-scope="scope">
            <span>{{ scope.row.last_login_time }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="团队余额">
          <template slot-scope="scope">
            <span>{{ scope.row.team_balance }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleTransfer(scope.row)" size="mini">转账</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <p style="overflow:hidden">
      <span style="float:left">数据来源: 包网统计中心</span>
    </p>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="listQuery.page"
        :page-sizes="[10,20,30, 50]"
        :page-size="listQuery.page_size"
        layout="total, sizes, prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 转账dialog -->
    <el-dialog title="转账操作" :visible.sync="dialogTransferVisible">
      <el-form
        :model="transferForm"
        :rules="transferRules"
        ref="transferForm"
        label-width="80px"
        class="transfer-form"
      >
        <el-form-item label="账户余额">
          <span style="font-size: 16px;color: red;">{{userDetail.balance}}</span> 元
        </el-form-item>
        <el-form-item label="收款账号">
          <el-input style="width:250px" disabled v-model="userName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="转账金额" prop="amount">
          <el-input-number
            class="custom-amount"
            v-model="transferForm.amount"
            style="width:200px"
            controls-position="right"
            :max="Number(userDetail.balance)"
          ></el-input-number>&nbsp;&nbsp;&nbsp;元
        </el-form-item>
        <el-form-item label="资金密码" prop="fund_password">
          <el-input
            maxlength="18"
            placeholder="请输入资金密码"
            type="password"
            v-model="transferForm.fund_password"
            style="width:250px"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="安全验证" prop="bank_card_id">
          <el-select
            style="width:300px"
            v-model="transferForm.bank_card_id"
            placeholder=" 请选择要验证的银行卡，以完成身份核实"
          >
            <el-option
              v-for="(item, index) in cardList"
              :key="index"
              :label="`${item.owner_name} ${item.card_num} [${item.bank_name}]`"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label prop="bank_card_number">
          <el-input
            style="width:250px"
            v-model="transferForm.bank_card_number"
            placeholder="请输入完整卡号"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTransferVisible = false">取 消</el-button>
        <el-button type="primary" @click="transfer">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
const validateCardNumber = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请填写银行卡号'));
  } else if (value.length !== 16 && value.length !== 19) {
    callback(new Error('银行卡卡号由16位或19位数字组成'));
  } else {
    callback();
  }
};
const validateFundPassword = (rule, value, callback) => {
  if (!/([0-9]+[a-zA-Z]+|[a-zA-Z]+[0-9]+)[0-9a-zA-Z]*/.test(value)) {
    callback(new Error('资金密码必须同时包含字母和数字'));
  }
  callback();
};
export default {
  data() {
    return {
      list: [],
      cardList: [],
      total: undefined,
      listLoading: false,
      searchLoading: false,
      showBreadcrumb: false,
      breadcrumbList: [],
      dialogTransferVisible: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      userName: '', //收款账号
      // 转账表单
      transferForm: {
        user_id: '',
        amount: '',
        fund_password: '',
        bank_card_id: '',
        bank_card_number: ''
      },
      peize: [],
      gameTime: [],
      listQuery: {
        page_size: 10,
        page: 1,
        time_condtions: [],
        price_group_condtions: [],
        min_team_balance: '',
        max_team_balance: '',
        parent_id: ''
      },
      transferRules: {
        amount: [
          { required: true, message: '请输入转账金额', trigger: 'change' }
        ],
        fund_password: [
          { required: true, message: '请输入资金密码', trigger: 'blur' },
          {
            min: 6,
            max: 18,
            message: '资金密码长度应在 6-18 之间,',
            trigger: 'blur'
          },
          { validator: validateFundPassword, trigger: 'blur' }
        ],
        bank_card_id: [
          { required: true, message: '请选择银行卡', trigger: 'change' }
        ],
        bank_card_number: [
          { required: true, validator: validateCardNumber, trigger: 'blur' }
        ]
      }
    };
  },
  computed: {
    ...mapGetters(['userDetail'])
  },
  watch: {
    gameTime: {
      handler(newName) {
        if (newName && newName.length) {
          const time_condtions = [];
          time_condtions.push([
            'created_at',
            '>=',
            this.Utils.formatTime(newName[0], 'YYYY-MM-DD HH:MM:SS')
          ]);
          time_condtions.push([
            'created_at',
            '<=',
            this.Utils.formatTime(newName[1], 'YYYY-MM-DD HH:MM:SS')
          ]);
          this.listQuery.time_condtions = JSON.stringify(time_condtions);
        } else {
          this.listQuery.time_condtions = [];
        }
      },
      immediate: true
    },
    peize: {
      handler(newName) {
        if (newName && newName.length === 2) {
          const price_group_condtions = [];
          price_group_condtions.push(['prize_group', '>=', newName[0]]);
          price_group_condtions.push(['prize_group', '<=', newName[1]]);
          this.listQuery.price_group_condtions = JSON.stringify(
            price_group_condtions
          );
        } else {
          this.listQuery.price_group_condtions = [];
        }
      },
      immediate: true
    }
  },
  created() {
    this.getList();
    this.getCardList();
  },
  methods: {
    getList() {
      for (var propName in this.listQuery) {
        if (this.listQuery[propName] == '' || this.listQuery[propName] == []) {
          delete this.listQuery[propName];
        }
      }
      this.listLoading = true;
      this.searchLoading = true;
      this.Api.getTeamManagement(this.listQuery).then(res => {
        const { success, data } = res;
        this.listLoading = false;
        this.searchLoading = false;
        if (success) {
          this.list = data.data;
          this.total = data.total;
        }
      });
    },
    getCardList() {
      this.Api.getCardList().then(res => {
        const { success, data } = res;
        if (success) {
          this.cardList = data;
        }
      });
    },
    searchGame() {
      this.listQuery.page = 1;
      this.listQuery.parent_id = '';
      this.showBreadcrumb = false;
      this.breadcrumbList = [];
      this.getList();
    },
    handleNextLink(row) {
      this.listQuery.page = 1;
      this.listQuery.parent_id = row.id;
      this.showBreadcrumb = true;
      this.breadcrumbList.push(row);
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.page_size = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleBreadcrumb(item, index) {
      this.listQuery.page = 1;
      this.breadcrumbList = this.breadcrumbList.slice(0, index + 1);
      this.listQuery.parent_id = item.id;
      this.getList();
    },
    //初始化转账数据
    restTransferForm(data) {
      this.$refs['transferForm'] && this.$refs['transferForm'].clearValidate();
      this.userName = data.username;
      this.transferForm = {
        user_id: data.id,
        amount: '',
        fund_password: '',
        bank_card_id: '',
        bank_card_number: ''
      };
    },
    // 转账
    handleTransfer(row) {
      this.dialogTransferVisible = true;
      this.restTransferForm(row);
    },
    transfer() {
      this.$refs['transferForm'].validate(valid => {
        if (valid) {
          this.Api.transferToChild(this.transferForm).then(({ success }) => {
            if (success) {
              this.$alert('转账成功！', '提示', {
                confirmButtonText: '确定'
              }).then(() => {
                this.dialogTransferVisible = false;
              });
            }
          });
        }
      });
    },
    //本页小结
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '小结';
          return;
        }
        if (index === 1) {
          sums[index] = '本页变动';
          return;
        }
        if (index === 5) {
          const values = data.map(item => {
            return Number(item['team_balance']);
          });
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] =
            sums[index] > 0
              ? `+${sums[index].toFixed(3)}`
              : `${sums[index].toFixed(3)}`;
        }
      });

      return sums;
    }
  }
};
</script>


<style lang="scss" scoped>
@import "../../../assets/css/var.scss";
.bmn-search-button {
  display: inline-block;
  box-sizing: border-box;
  cursor: pointer;
  width: 80px;
  height: 36px;
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.15),
    inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4);
  border-style: solid;
  border-width: 1px;
  border-image-slice: 1;
  border-radius: 3px;
  text-align: center;
  line-height: 34px;
  color: white;
  margin-right: 8px;
  /deep/ {
    .el-button {
      border: 0;
      border-radius: 0;
    }
  }
  .btn {
    width: 80px;
    height: 100%;
    background: $primary-color;
    box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.15),
      inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4);
    border-width: 1px;
    color: white;
    padding: 0;
  }
}
.filter-container {
  .filter-label {
    display: inline-block;
    margin-right: 40px;
  }
}
.line-center {
  height: 45px;
  line-height: 45px;
  font-size: 13px;
  text-align: center;
  border-left: 1px solid #cfcfcf;
  border-right: 1px solid #cfcfcf;
}
.next-link {
  text-decoration: underline;
  cursor: pointer;
}
.el-breadcrumb {
  cursor: pointer;
}
.transfer-form {
  width: 340px;
  margin: 0 auto;
}
.user-manage {
  /deep/ {
    .el-input-number.is-controls-right .el-input-number__decrease,
    .el-input-number.is-controls-right .el-input-number__increase {
      display: none;
    }
    .el-input-number.is-controls-right .el-input__inner {
      padding-right: 15px;
    }
    /deep/ {
    .el-button--primary {
        background-color: $primary-color;
        border-color: $primary-color;
      }
      .el-button--primary:focus,
      .el-button--primary:hover {
        background: $primary-color;
        border-color: $primary-color;
        color: #fff;
      }
    }
  }
}
</style>
