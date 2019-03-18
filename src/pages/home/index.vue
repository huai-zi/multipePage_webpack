<template>
  <div id='newPages'>
    <avue-crud :data="data" :option="option" :page="page" @on-load="onLoad"></avue-crud>
    <a href="index.html">回到首页</a>
  </div>
</template>

<script>
  export default {
    name: 'tables',
    data() {
      return {
        page: {
          pageSize: 20
        },
        data: [],
        option: {
          align: 'center',
          menuAlign: 'center',
          column: [{
              label: '姓名',
              prop: 'name'
            },
            {
              label: '性别',
              prop: 'sex'
            }
          ]
        }
      }
    },
    methods: {
      onLoad(page) {
        // this.$message.success('分页信息:' + JSON.stringify(page))
        this.page.total = 40
        //模拟分页
        if (page.currentPage === 1) {
          this.data = [{
            name: '张三',
            sex: '男'
          }]
        } else if (page.currentPage == 2) {
          this.data = [{
            name: '李四',
            sex: '女'
          }]
        }
      }
    },
    mounted(){
    }
  }

</script>
<style lang="less" scoped>
  a {
    font-size: 30px;
  }

</style>
