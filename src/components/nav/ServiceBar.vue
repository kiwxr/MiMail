<template>
    <div id="service">
        <div class="container">
            <ul>
                <li><span class="icon-setting"></span>预约维修服务</li>
                <li><span class="icon-setting"></span>7天无理由退货</li>
                <li><span class="icon-setting"></span>15天免费换货</li>
                <li><span class="icon-setting"></span>满99元包邮</li>
                <li><span class="icon-setting"></span>520余家售后网点</li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ServiceBar"
    }
</script>

<style scoped lang="less">
    @import "~assets/css/config.less";
    @import "~assets/css/minixs.less";
    #service{
        padding: 33px 0;
        color: @colorC;
        font-size: @fontI;
        text-align: center;
        .container {
            text-align: center;
            li {
                position: relative;
                display: inline-block;
                width: 19.9%;
                span{
                    display: inline-block;
                    width: 20px;
                    height: 20px;
                    background-color: #FF6600;
                }
                .icon-setting{
                    vertical-align: middle;
                    margin-right: 8px;
                    .backImg(20px,20px,'~assets/icon-setting.png');
                }
                &:after{
                    position: absolute;
                    right: 0;
                    content: '|';
                    color: @colorE;
                }
                &:last-child:after{
                    display: none;
                }
            }
            li:hover{
                .icon-setting{
                    .backImg(20px,20px,'~assets/icon-setting-hover.png');
                }
                color: @colorA;
            }
        }
    }
</style>