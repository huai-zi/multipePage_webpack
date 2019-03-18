<template>
  <div id="create">
    <!-- 顶部栏 start-->
    <el-tabs type="border-card">
      <!-- 内容区域 -->
      <el-col :span="12" class="h_100" id="h_100">
        <h4>{{chartsTitle}}
        </h4>
        <div class="resource_right_bgc" id="resource_right_bgc"></div>
      </el-col>

      <!-- 水环境分布图 gis地图放置区域 start-->
      <el-col :span="12" class="h_100 ">
        <h4>{{gisTitle}}</h4>
        <div class="resource_right_bgc">
          <div id="WaterQualityMap">

          </div>
        </div>
      </el-col>
      <!-- 水环境分布图 gis地图放置区域 end-->
    </el-tabs>
    <!-- 顶部栏 end-->
  </div>
</template>
<script>
  import '@/assets/css/column.less'
  export default {
    name: 'create',
    data() {
      return {
        gisTitle: '123',
        chartsTitle: '123',
      }
    }
  };

</script>
