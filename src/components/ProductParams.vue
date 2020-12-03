<template>
    <div class="nav-bar" :class="{'is_fixed':isFixed}">
        <div class="container">
            <div class="product-title">
                {{title}}
            </div>
            <div class="product-params">
                <a href="javascript:;">概述</a><span>|</span>
                <a href="javascript:;">参数</a><span>|</span>
                <a href="javascript:;">用户评价</a><span></span>
                <slot name="buy"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ProductParams",
        props:{
            title:{
                type:String,
                default: '小米8'
            }
        },
        data(){
            return{
                isFixed: false,
            }
        },
        mounted() {
            window.addEventListener('scroll',this.initHeight)
        },
        methods:{
            initHeight(){
                //计算高度
                let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                this.isFixed = scrollTop > 152? true:false
            },
        },
        destroyed() {
            window.removeEventListener('scroll',this.initHeight,false)
        }
    }
</script>

<style scoped lang="less">
    .nav-bar{
        height: 70px;
        line-height: 70px;
        border: 1px solid #e5e5e5;
        background-color: white;
        z-index: 10;
        &.is_fixed{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            box-shadow: 0 1px 3px #cccccc;
        }
        .container{
            display: flex;
            justify-content: space-between;
            .product-title{
                font-size: 18px;
                color: #333333;
                font-weight: bold;
            }
            .product-params{
                font-size: 14px;
                color: #666666;
                a{
                    color: #666666;
                }
                span{
                    margin: 0 10px;
                }
            }
        }
    }
</style>