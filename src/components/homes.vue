<template>
  <!--书写组件的内容-->
  <div id="home" class=" tab">
    <!-- <el-row class="tableTop">
      <el-button size="mini" type='primary' icon="el-icon-plus">新增</el-button>
      <el-button size="mini" icon="el-icon-edit" type='primary'>修改</el-button>
      <el-button size="mini" class="iconDelete" type='primary' icon="el-icon-delete">删除</el-button>
    </el-row> -->
    <!-- 
      * search-reset -- 清空搜索框内容
      * selection-reset -- 删除选中框回调
      * size-reset -- 默认展示页数
      * current-reset -- 当前页数
      * search-reset -- 搜索框情况改变回调
      * current-row-change -- 点击行单机
      * row-update -- 修改数据
      * row-save -- 新增数据
     -->
    <avue-crud ref="crud" :data="data" :option="option4" @search-reset="searchReset1" @selection-change="selectionChange"
      :page="page" @size-change="sizeChange" @current-change="currentChange" @refresh-change="refreshChange"
      @search-change="searchChange1" @current-row-change="handleCurrentRowChange" @sort-change="sortChange" @row-update="rowUpdate"
      @row-save="rowSave" :table-loading="loading">
      <!-- 自定义 -->
      <template slot="search">
        <el-row class="botton">
          <el-button type="primary" icon="el-icon-plus" size="mini" @click.stop="handleAdd()">新增</el-button>
          <el-button size="mini" icon="el-icon-edit" type='primary' @click.stop="clickeEdit()">修改</el-button>
          <el-button size="mini" class="iconDelete" type='primary' icon="el-icon-delete">删除</el-button>
        </el-row>
        <el-form-item label="名称" class="menuRight">
          <el-input v-model="search.slot" placeholder="自定义搜索" clearable size="mini" />
        </el-form-item>
      </template>
      <template slot-scope="scope" slot="menu">
        <el-button type="primary" icon="el-icon-edit" size="mini" plain @click.stop="handleEdit(scope.row,scope.index)">编辑</el-button>
        <el-button type="primary" icon="el-icon-delete" size="mini" plain @click.stop="delectVal(scope.row,scope.index)">删除</el-button>
        <el-button type="primary" size="mini" plain @click.stop="powerVal(scope.row,scope.index)"><i class="iconfont">&#xe608;</i>权限</el-button>
      </template>
    </avue-crud>
    <!-- 权限框架 
    * default-checked-keys - 默认选中的权限功能
    * default-expanded-keys - 默认展开的功能,都是以:node-key选中的标准为主题 
    -->
    <el-dialog title="分配权限" :visible.sync="dialogVisible" :close-on-click-modal='closeOnClick' :lock-scroll='closeOnClick'
      width="50%" :center='center' @open='openContent' @close='closeContent' :modal='closeOnClick'>
      <span>
        <el-tree show-checkbox ref="tree" @check-change="handleCheckChange" :data="data2" node-key="id"
          :default-expanded-keys="[1,2,3,9]" :default-checked-keys="[5,8,9]" :props="defaultProps">
        </el-tree>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="getCheckedKeys">更 新</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  /*负责导出组件*/
  export default {
    name: 'home',
    data() {
      return {
        data2: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 1123,
              label: '三级 1-1-2'
            }, {
              id: 1430,
              label: '三级 1-1-2'
            }, {
              id: 1540,
              label: '三级 1-1-2'
            }, {
              id: 1650,
              label: '三级 1-1-2'
            }, {
              id: 1076,
              label: '三级 1-1-2'
            }, {
              id: 5410,
              label: '三级 1-1-2'
            }, {
              id: 1087,
              label: '三级 1-1-2'
            }, {
              id: 1320,
              label: '三级 1-1-2'
            }, {
              id: 3210,
              label: '三级 1-1-2'
            }, {
              id: 15410,
              label: '三级 1-1-2'
            }, {
              id: 12510,
              label: '三级 1-1-2'
            }, {
              id: 7610,
              label: '三级 1-1-2'
            }, {
              id: 7810,
              label: '三级 1-1-2'
            }, {
              id: 9810,
              label: '三级 1-1-2',
              disabled: true
            }, {
              id: 9710,
              label: '三级 1-1-2'
            }, {
              id: 9610,
              label: '三级 1-1-2'
            }, {
              id: 1950,
              label: '三级 1-1-2'
            }, {
              id: 9510,
              label: '三级 1-1-2'
            }, {
              id: 1930,
              label: '三级 1-1-2'
            }, {
              id: 130,
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
        },
        dialogVisible: false,
        loading: false,
        center: true,
        scrollLock: false,
        closeOnClick: false,
        search: {
          slot: ''
        },
        page: {
          pageSizes: [10, 20, 30, 40], //默认可以调节展示的页数
          currentPage: 1, //当前页数
          total: 11, //总条数
          pageSize: 10 //默认展示多少条数据
        },
        data: [{
            sortable: true,
            name: '张三',
            sex: '1'
          },
          {
            name: '李四',
            sex: '1'
          },
          {
            name: '李四',
            sex: '2'
          },
          {
            name: '李四',
            sex: '3'
          },
          {
            name: '李四',
            sex: '1'
          }
        ],
        clickValue: '',
        option4: {
          menuWidth: 320,
          selection: true,
          page: false,
          delBtn: false,
          editBtn: false,
          refreshBtn: false,
          highlightCurrentRow: true, //行选中
          align: 'center',
          menuAlign: 'center',
          column: [{
            label: '姓名',
            prop: 'name',
            rules: [{
              required: true,
              message: "请输入姓名",
              trigger: "blur"
            }]
          }, {
            label: '性别',
            prop: 'sex',
            rules: [{
              required: true,
              message: "请输入性别",
              trigger: "blur"
            }]
          }]
        },
      }
    },
    created() {},
    computed: {},
    methods: {
      getCheckedKeys() {
        // 通过keys获取权限选中节点信息
        // 权限节点更新
        this.dialogVisible = false;
        this.$http.get('https://jsonplaceholder.typicode.com/todos/1').then(response => {
          console.log(response);
        })
      },
      handleCheckChange(data, checked, indeterminate) {
        // 权限选中事件
        console.log(data, checked, indeterminate);
      },
      powerVal() {
        // 权限框架
        this.dialogVisible = true
      },
      sortChange(val) {
        this.$message.success('排序' + JSON.stringify(val));
      },
      handleAdd() {
        // 新增按钮
        this.$refs.crud.rowAdd();
      },
      handleCurrentRowChange(row) {
        // 行单点选中
        this.clickValue = row;
      },
      clickeEdit() {
        if (!this.clickValue) {
          this.$message.warning('请先选择行,再进行数据修改!');
          console.log('数据修改');
          return
        }
        console.log(this.clickValue);
        this.$refs.crud.rowEdit(this.clickValue, this.clickValue);
      },
      searchChange1(params) {
        this.$message.success('搜索数据' + JSON.stringify(Object.assign(params, this.search)));
      },
      searchReset1() {
        this.search = {};
        this.$message.success('清空回调')
      },
      refreshChange({
        page,
        searchForm
      }) {
        // 
        this.$message({
          message: `当前的返回的分页对象${JSON.stringify(page)} 搜索表单对象${JSON.stringify(searchForm)}`,
          type: 'success',
        });
      },
      rowSave(form, done) {
        // 新增数据
        this.$message.success('新增数据' + JSON.stringify(form));
        done();
      },
      rowUpdate(form, index, done) {
        // 确定修改
        this.$message.success('编辑数据' + JSON.stringify(form) + '数据序号' + index);
        done();
      },
      handleEdit(row, index) {
        // 行内点击修改
        console.log(row);
        console.log(index);
        this.$refs.crud.rowEdit(row, index);
      },
      getList() {
        // 翻页数据
        this.setCurrent();
        if (this.page.currentPage === 1) {
          this.data = this.data
        } else if (this.page.currentPage == 2) {
          this.data = this.data.splice(0, 3);
        }
      },
      setCurrent() {
        // 清理选中行
        this.clickValue = "";
        this.$refs.crud.setCurrentRow();
      },
      delectVal(row, index) {
        console.log(row);
        console.log(index);
        this.$confirm(`是否确认删除此行数据?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      selectionChange(list) {
        // 删除选中框
        console.log(list);
        this.$message.success('选中的数据' + JSON.stringify(list));
      },
      deleteList() {

      },
      toggleSelection(val) {
        this.$refs.crud.toggleSelection(val);
      },
      sizeChange(val) {
        // 选择展示默认展示多少条数据
        this.page.currentPage = 1
        this.page.pageSize = val
        this.getList()
        this.$message.success('行数' + val)
      },
      currentChange(val) {
        this.page.currentPage = val
        this.getList()
        this.$message.success('页码' + val)
      },
      openContent() {
        // 打开模态框
        console.log('打开了');
      },
      closeContent() {
        console.log('打开了');
      }
    }
  }

</script>
