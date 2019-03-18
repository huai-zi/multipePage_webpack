<template>
  <!--书写组件的内容-->
  <div id="tables" class="tab">
    <el-row>
      <el-col :span='8' class="keyword">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText">
        </el-input>
        <el-tree class="filter-tree" :data="treeData" :props="defaultProps" default-expand-all :filter-node-method="filterNode"
          ref="tree2" @node-click='nodeClick'>
        </el-tree>
      </el-col>
      <el-col :span='16'>
        <avue-crud :data="data" :option="option"></avue-crud>

      </el-col>
    </el-row>
  </div>
</template>
<script>
  import '@/assets/css/tree.less'
  export default {
    data() {
      return {
        obj: {},
        filterText: '',
        data: [{
          name: '张三',
          sex: '男'
        }, {
          name: '李四',
          sex: '女'
        }, {
          name: '王五',
          sex: '女'
        }, {
          name: '赵六',
          sex: '男'
        }],
        option: {
          page: false,
          align: 'center',
          menuAlign: 'center',
          column: [{
            label: '姓名',
            prop: 'name'
          }, {
            label: '性别',
            prop: 'sex'
          }]
        },
        treeData: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      nodeClick(data) {
        console.log(data);
        this.$message.success('点击回调')
      },
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree2.filter(val);
      }
    },
  }

</script>
