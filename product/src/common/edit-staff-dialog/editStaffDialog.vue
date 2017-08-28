<template>
  <div class="edit-staff-work">
    <el-dialog
      title="员工排班"
      :visible.sync="editStaffIsShowChild"
      size="small"
      :close-on-press-escape="false"
      :before-close="handleClose"
      custom-class="edit-staff">
      <el-form
        label-width="80px">
        <el-row type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="门店: ">
              <el-input v-model="editStaffData.storeName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="工号: ">
              <el-input v-model="editStaffData.employeeNo" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row type="flex" justify="space-between">
          <el-col :span="11">
            <el-form-item label="姓名: ">
              <el-input v-model="editStaffData.realName" disabled></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="11">
            <el-form-item label="联系方式: ">
              <el-input v-model="editStaffData.phone" disabled></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <div class="hz-calendar">
            <div class="calendar-select">
              <div class="box-year">
                <i class="el-icon-d-arrow-left" @click="prevMonth"></i>
                <span v-text="tmpYear"></span>
                <i>-</i>
                <span v-text="tmpMonth"></span>
                <i class="el-icon-d-arrow-right" @click="nextMonth"></i>
              </div>
            </div>
            <div class="calendar-week">
              <div class="calendar-data-item">星期天</div>
              <div class="calendar-data-item">星期一</div>
              <div class="calendar-data-item">星期二</div>
              <div class="calendar-data-item">星期三</div>
              <div class="calendar-data-item">星期四</div>
              <div class="calendar-data-item">星期五</div>
              <div class="calendar-data-item">星期六</div>
            </div>
            <div class="calendar-day">
              <div class="calendar-data-item"
                   v-for="($item, $index) in calendarData"
                   :key="$index"
                   :class="{prevMonthDay: $item.prevMonth, nextMonthDay: $item.nextMonth}"
                   @click="handleSelectDate($item)">
                <div class="calendar-day-txt">
                  <p v-text="$item.value"></p>
                  <p>
                    <span>{{$item.timeBegin?$item.timeBegin:''}}</span>
                    <span>{{$item.timeBegin?' : ':''}}</span>
                    <span>{{$item.timeEnd?$item.timeEnd:''}}</span>
                  </p>
                </div>

              </div>
            </div>
            <div class="edit-calendar-win" v-show="editCalendarShow">
              <el-row>
                <p style="font-size: 26px;line-height: 24px;text-align: center;padding: 10px 0;margin-bottom: 20px;">{{initSelectDate}}</p>
              </el-row>
              <el-form>
                <el-form-item>
                  <el-time-select
                    v-model="dateField.timeBegin"
                    :picker-options="initSelectStartDate"
                    placeholder="选择时间">
                  </el-time-select>
                  <el-time-select
                    v-model="dateField.timeEnd"
                    :picker-options="initSelectEndDate"
                    placeholder="选择时间">
                  </el-time-select>
                </el-form-item>
                <el-form-item>
                  <el-row style="text-align: center">
                    <el-button type="info" @click="submit_editCalendar">确定</el-button>
                    <el-button type="info" @click="editCalendarShow = false">取消</el-button>
                  </el-row>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-row>
        <el-row type="flex" class="row-bg" justify="center">
          <el-button @click="handleClose">取消</el-button>
        </el-row>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
  import apiTable from '@/api/table'
  export default {
    name: 'hz-calendar',
    data () {
      let now = new Date()
      return {
        editStaffIsShowChild: false,
        // 编辑提交日期字段
        dateField: {
          employeeId: '',
          workDay: '',
          timeBegin: '',
          timeEnd: '',
          id: ''
        },
        selectDate: {},
        selectStartDate: {
          start: '08:30',
          step: '00:15',
          end: '18:30'
        },
        selectEndDate: {
          start: '10:00',
          step: '00:10',
          end: '18:30'
        },
        editCalendarShow: false,
        year: now.getFullYear(),
        tmpYear: now.getFullYear(),
        tmpMonth: now.getMonth() + 1,
        disposeTime: {},
        schedulingListData: {}
      }
    },
    props: ['editStaffIsShow', 'editStaffData'],
    computed: {
      calendarData () {
        // 获取当月的天数 new Date(年， 月， 日)
        let calendarData = new Date(this.tmpYear, this.tmpMonth, 0).getDate()
        // 当月的日期 currentDayArr
        let currentDayArr = []
        currentDayArr = Array.from({length: calendarData}, (n, i) => {
          let handleDate = {
            currentMonth: true,
            value: ((i + 1) < 10 ? '0' : '') + (i + 1)
          }
          if (this.schedulingListData.length > 0) {
            this.schedulingListData.forEach(function ($item, $index) {
              let hasDate = $item.workDay
              if (hasDate.slice(hasDate.lastIndexOf('-') + 1, hasDate.length) === ((i + 1) < 10 ? '0' : '') + (i + 1)) {
                handleDate = Object.assign({}, {
                  currentMonth: true,
                  value: ((i + 1) < 10 ? '0' : '') + (i + 1),
                  id: $item.id,
                  employeeId: $item.employeeId,
                  timeBegin: $item.timeBegin,
                  timeEnd: $item.timeEnd,
                  workDay: $item.workDay
                })
              }
            })
          }
          return handleDate
        })
        // 获取当月1号是星期几，为了确定在1号前需要插多少天
        let startDay = new Date(this.tmpYear, this.tmpMonth - 1, 1).getDay()
        // 确认上个月一共多少天
        let prevMonthDay = new Date(this.tmpYear, this.tmpMonth - 1, 0).getDate()
        // 在第一个天前插入上个月日期 + currentDayArr + 在最后一天后插入下个月日期
        for (let i = 0, len = startDay; i < len; i++) {
          currentDayArr = [{prevMonth: true, value: prevMonthDay - i}].concat(currentDayArr)
        }
        for (let i = currentDayArr.length, item = 1; i < 42; i++, item++) {
          currentDayArr[currentDayArr.length] = {nextMonth: true, value: item}
        }
        return currentDayArr
      },
      initSelectDate () {
        let weeks = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        if (this.selectDate.id) {
          let date = new Date(this.selectDate.workDay)
          let month = date.getMonth() + 1
          let day = date.getDate()
          let week = date.getDay()
          this.dateField.employeeId = this.selectDate.employeeId
          this.dateField.id = this.selectDate.id
          this.dateField.workDay = this.selectDate.workDay
          this.dateField.timeBegin = this.selectDate.timeBegin
          this.dateField.timeEnd = this.selectDate.timeEnd
          return month + '/' + day + ' ' + weeks[week]
        }
      },
      initSelectStartDate () {
        return this.selectStartDate
      },
      initSelectEndDate () {
        return this.selectEndDate
      }
    },
    methods: {
      handleSelectDate ($item) {
        this.editCalendarShow = true
        this.selectDate = $item
      },
      handleClose () {
        this.editStaffIsShowChild = false
      },
      edit_table ($month, $employeeId) {
        apiTable.data_editStaffTable({
          month: $month,
          employeeId: $employeeId || this.editStaffData.employeeNo
        }).then((response) => {
          if (response.data.code === 1) {
            this.schedulingListData = response.data.dat
          }
        })
      },
      submit_editCalendar (item) {
        let date = this.dateField.workDay.substring(-1, this.dateField.workDay.indexOf('-') + 3)
        apiTable.edit_systemStaffDate(this.dateField).then((response) => {
          if (response.data.code === 1) {
            swal('编辑成功！')
            this.editCalendarShow = false
            this.edit_table(date)
          } else {
            swal(response.msg)
          }
        })
      },
      prevMonth () {
        this.tmpMonth--
        if (this.tmpMonth === 0) {
          this.tmpMonth = 12
          this.tmpYear--
        }
        let mouth = this.tmpMonth < 10 ? ('0' + this.tmpMonth) : this.tmpMonth
        let data = this.tmpYear + '-' + mouth
        this.edit_table(data)
      },
      nextMonth () {
        this.tmpMonth++
        if (this.tmpMonth === 13) {
          this.tmpMonth = 1
          this.tmpYear++
        }
        let mouth = this.tmpMonth < 10 ? ('0' + this.tmpMonth) : this.tmpMonth
        let data = this.tmpYear + '-' + mouth
        this.edit_table(data)
      }
    },
    watch: {
      editStaffIsShow ($val) {
        this.$emit('update:editStaffIsShow', $val)
        this.editStaffIsShowChild = $val
      },
      editStaffIsShowChild () {
        this.$emit('update:editStaffIsShow', this.editStaffIsShowChild)
      },
      editStaffData () {
        if (this.editStaffData.schedulingList) {
          console.log(this.editStaffData.schedulingList)
          let date = this.editStaffData.schedulingList[0].workDay.substring(-1, this.editStaffData.schedulingList[0].workDay.indexOf('-') + 3)
          let employeeNo = this.editStaffData.employeeNo
          this.edit_table(date, employeeNo)
        }
      }
    }
  }
</script>

<style lang="scss" type="text/scss" rel="stylesheet/scss">
  .edit-staff-work{
    .el-input__inner{
      color: #48576a !important;
    }
  }
  .hz-calendar {
    color: #fff;
    width: 100%;
    background: #fff;
    border-radius: 5px;
    position: relative;
    .calendar-select {
      margin-top: 20px;
      color: #000;
      text-align: center;
      span {
        font-size: 22px;
        cursor: pointer;
        &:hover {
          background: #ddd;
        }
      }
      i{
        font-size: 24px;
        cursor: pointer;
        padding: 0 10px;
      }
    }
    .calendar-week {
      display: flex;
      padding: 10px;
      justify-content: space-around;
      border-bottom: 1px #000 solid;
      .calendar-data-item {
        width: 50px;
        height: 30px;
        text-align: center;
        line-height: 30px;
        display: inline-block;
        color: #666;
      }
    }
    .calendar-day {
      padding: 10px;
      .calendar-data-item {
        width: 95px;
        height: 60px;
        position: relative;
        text-align: center;
        float: left;
        display: block;
        color: #000;
        cursor: pointer;
        box-sizing: border-box;
        .calendar-day-txt{
          width: 100%;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          p{
            &:first-child{
              font-size: 16px;
              padding: 5px 0;
            }
          }
        }
        &:nth-child(odd){
          background: #eee;
        }
        &:nth-child(even){
          background: #f8f8f8;
        }
        &:hover {
          background: #777;
          color: #fff !important;
        }

        &.prevMonthDay,
        &.nextMonthDay {
          color: #777;
          visibility: hidden;
        }

      }
    }
    .edit-calendar-win {
      width: 400px;
      padding: 20px 10px;
      background: rgba(41, 41, 41, 0.9);
      position: absolute;
      border-radius: 5px;
      border: 1px #fff solid;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }

  }
</style>
