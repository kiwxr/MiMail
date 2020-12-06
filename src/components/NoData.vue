<template>
    <div id="no-data">
        <img src="https://cdn.cnbj1.fds.api.mi-img.com/staticsfile/cart/cart-empty.png" alt="">
        <p>什么都没有</p>
    </div>
</template>

<script>
    export default {
        name: "NoData"
    }
</script>

<style scoped>
    #no-data{
        text-align: center;
        font-size: 20px;
        color: #999999;
        margin: 50px 0;
        img{
            width: 240px;
            height: 184px;
            margin-bottom: 30px;
        }
    }
</style>