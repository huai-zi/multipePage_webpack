<template>
  <div id="create" class="theme">
    <el-tabs type="border-card">
      <!-- 左侧内容区域 -->
      <el-col :span="12" class="h_100" id="h_100">
        <h4>{{chartsTitle}}
        </h4>
        <div class="resource_right_bgc" id="resource_right_bgc"></div>
      </el-col>

      <!-- 右侧放置内容-->
      <el-col :span="12" class="h_100 ">
        <h4>{{gisTitle}}</h4>
        <div class="resource_right_bgc">

        </div>
      </el-col>
    </el-tabs>
  </div>
</template>
<script>
  import '@/assets/css/column.less'
  export default {
    name: 'create',
    data() {
      return {
        gisTitle: '信息展示',
        chartsTitle: '示意图',
      }
    }
  };

</script>
