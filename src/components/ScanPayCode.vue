<template>
    <div id="scan">
        <div class="mask"></div>
        <div class="item-wrap">
            <div class="img-scan"></div>
            <div class="img-pay">
                <div class="title">微信支付<em @click="close"></em></div>
                <div class="qrcode"><img :src="img" alt=""></div>
                <div class="tip">
                    <p>请使用 <span class="theme-color">微信</span>扫一扫</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ScanPayCode",
        props:{
            img:''
        },
        methods:{
            close(){
                this.$emit('close')
            }
        }
    }
</script>

<style scoped lang="less">
    @import "~assets/css/minixs.less";
    #scan{
        z-index: 11;
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        .mask{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            opacity: .6;
            background-color: #000000;
        }
        .item-wrap{
            position: fixed;
            width: 670px;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            display: flex;
            align-items: center;
            .img-scan{
                .backImg(296px,485px,'//mk.stu.126.net/res/module-order/pay/pay-wechat/phone_bg.png?1f104b91f9d8975894fc8e4091b677d9');
            }
            .img-pay{
                width: 370px;
                height: 440px;
                display: inline-block;
                background-color: #ffffff;
                .title{
                    position: relative;
                    height: 60px;
                    line-height: 60px;
                    color: #333333;
                    font-size: 20px;
                    padding: 0 18px;
                    background-color: #f5f5f5;
                    em{
                        position: absolute;
                        top: 23.5px;
                        right: 20px;
                        .backImg(13px,13px,'~assets/icon-close.png');
                        cursor: pointer;
                    }
                }
                .qrcode{
                    text-align: center;
                    padding: 44px 0 26px;
                    img{
                        width: 237px;
                        height: 240px;
                    }
                }
                .tip{
                    text-align: center;
                    font-size: 14px;
                    color: #333333;
                }
            }
        }
    }
</style>