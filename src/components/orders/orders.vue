<template>
    <div>
        <div id="container" style="width:100%; height:500px"></div>
    </div>
</template>

<script>
export default {
    mounted() {
        // 创建地图实例
        var map = new BMap.Map('container');
        // 设置中点
        var point = new BMap.Point(114.31,30.52);
        // 初始化地图
        map.centerAndZoom(point, 14);
        // 添加控件
        map.addControl(new BMap.MapTypeControl());
        // 允许缩放
        map.enableScrollWheelZoom(true);
        // 允许双击被缩放
        map.enableDoubleClickZoom(true);
        // 设置标记
        var marker = new BMap.Marker(point);
        map.addOverlay(marker);
    }
}
</script>

<style>

</style>
