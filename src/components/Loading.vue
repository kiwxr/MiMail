<template>
    <div id="loading">
        <img src="/img/loading.svg" alt="">
    </div>
</template>

<script>
    export default {
        name: "Loading"
    }
</script>

<style scoped lang="less">
    #loading{
        height: 80px;
        line-height: 80px;
        text-align: center;
        padding: 30px 0;
        img{
            height: 100%;
        }
    }
</style>