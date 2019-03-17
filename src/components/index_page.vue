<template>
  <div id="page" class='tables'>
    <el-container>
      <el-header class="text-left">
        <el-row :gutter="20">
          <el-col :xs='4' class="page_header move-down-appear text-left">
            <!-- banner图片展示 -->
            <span class="banner_img" ref='banner_img'><img src="../assets/l_top.png" alt=""></span>
            <div class="pull-right goOut">
              <el-tooltip class="item" effect="dark" content="搜索" placement="bottom">
                <i class="el-icon-search m-r-20"></i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="微信" placement="bottom">
                <i class="iconfont m-r-20">&#xe637;</i>
              </el-tooltip>
              <el-tooltip class="item" @click.native='themeSwith' effect="dark" content="主题换色" placement="bottom">
                <i class="iconfont m-r-20">&#xeb6e;</i>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="通知" placement="bottom">
                <el-badge :value="4" :max="10" class="item">
                  <i class="el-icon-bell m-r-20"></i>
                </el-badge>
              </el-tooltip>
              <el-dropdown>
                <span class="el-dropdown-link">
                  <i class="iconfont">&#xe652;</i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>个人信息</el-dropdown-item>
                  <el-dropdown-item divided @click.native='goOut'>退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <!--左侧标签栏-->

      <el-container style='margin-top: 60px;'>
        <el-aside width="200px" v-scroll_height="61" ref='aside'>
          <el-row class="tac" onselectstart='return false'>
            <div class="clik_scole">
              <el-radio-group v-model="isCollapse">

                <span class="p-l-10">
                  <el-tooltip class="item" v-show='!cursor_back' effect="light" placement="right" content="展开菜单栏"
                    @click.native='zk'>
                    <el-radio-button class="right_click" :label="false" style='margin-left: -8px;'>
                      <i class="iconfont icon-zhankai" style='font-size: 15px;'></i>
                    </el-radio-button>

                  </el-tooltip>
                  <span v-show='cursor_back' style='display: inline-block;' class="m-t-10">菜单栏</span>
                </span>
                <el-tooltip class="item f_right" v-show='cursor_back' effect="light" content="缩小菜单栏" placement="right"
                  @click.native='sx'>
                  <el-radio-button :label="true" class="left_click" style='margin-left: 84px;'>
                    <i class="el-icon-back cursor"></i>
                  </el-radio-button>
                </el-tooltip>

              </el-radio-group>
            </div>
            <span class='search_index'>
              <el-input placeholder="菜单搜索" v-model="input2" @keyup.enter.native='menuSearch'>
              </el-input>
              <i class='el-icon-search search' @click='menuSearch'></i>
            </span>
            <el-col :span="24">
              <!--默认选中,default-active可以使用getters的方法,counts和state方法一致-->
              <el-menu :default-active="tabIndex" unique-opened class="el-menu-vertical-demo" :collapse="isCollapse"
                router>
                <NavMenu :navMenus="leftMenus"></NavMenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <!--内容显示-->
        <el-main class="content-body" ref='content'>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <!-- 主题切换 -->
    <el-dialog title="主题切换" width="50%" :visible.sync="dialogVisible" :modal='!dialogVisible'>
      <span>
        <el-radio-group @change='themeChange' v-model="radio2">
          <el-radio :label="6">深黑</el-radio>
          <el-radio :label="9">白色</el-radio>
        </el-radio-group>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import '@/assets/css/index.less'
  import menu from '../assets/json/menu.json'
  import img from '@/assets/imgs.json';
  import NavMenu from './menu.vue';
  import * as util from '@/util';
  export default {
    name: "App",
    data() {
      return {
        isCollapse: false,
        cursor_back: true,
        active: '',
        input2: '', //菜单搜索
        editableTabs2: [{
          title: '首页',
          name: 'hz',
          content: '首页'
        }],
        tabIndex: 'home',
        leftMenus: '',
        dialogVisible: false,
        radio2: 6,
      }
    },
    methods: {
      themeChange() {
        // 确认主题
        if (this.radio2 === 9) util.setTheme('tables_bs')
        else util.setTheme('tables');

      },
      themeSwith() {
        // 主题模态框打开
        this.dialogVisible = true;
        console.log(this.radio2);
      },
      sx() {
        // 关闭菜单
        this.isCollapse = true;
        this.cursor_back = false;
        this.$refs.aside.$el.style.width = '64px';
        this.$refs.content.$el.style.width = 'calc(100% - 64px)'
        this.$refs.content.$el.style.marginLeft = '64px'
      },
      zk() {
        // 展开菜单
        this.isCollapse = false;
        this.cursor_back = true
        this.$refs.aside.$el.style.width = '200px';
        this.$refs.content.$el.style.width = 'calc(100% - 200px)'
        this.$refs.content.$el.style.marginLeft = '200px';
      },
      getIndex(e) {

      },
      addTabs(e, targetName) {

      },
      goOut() {
        // 退出登陆
        this.$confirm("是否退出系统, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          this.$router.push('/login');
          this.$message({
            type: 'success',
            message: '退出成功!'
          });
        });
      },
      tabFocu(e) {
        //选中按钮时触发
        this.fuModify(e.name);
        this.modify(e.name);
        if (e.name === 'hz') {
          this.$router.push({
            path: '/indexPage/homes'
          });
        } else {
          this.$router.push({
            path: e.name
          });
        }

      },
      menuSearch() {
        //菜单栏搜索
        console.log(this.input2);
        this.input2 = '';
      }
    },
    components: {
      NavMenu: NavMenu
    },
    computed: {},
    mounted() {
      this.leftMenus = menu;
      this.tabIndex = this.$route.name;
    },
    created() {

      console.log(`%c 槐子(email:huaizio@163.com) %c`,
        "background:#41b883 ;text-align:center; padding: 1px; border-radius: 3px ;  color: #fff",
        "background:transparent")
    }
  };

</script>
