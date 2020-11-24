<template>
    <transition name="slide">
        <div id="model" v-show="showModel">
            <div class="mask"></div>
            <div class="model-dialog">
                <div class="model-header">
                    <span>{{title}}</span>
                    <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
                </div>
                <div class="model-body">
                    <slot name="body"></slot>
                </div>
                <div class="model-footer">
                    <div class="btn-group" v-if="btnType==1">
                        <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
                    </div>
                    <div class="btn-group" v-if="btnType==2">
                        <a href="javascript:;" class="btn" @click="$emit('cancel')">{{cancelText}}</a>
                    </div>
                    <div class="btn-group" v-if="btnType==3">
                        <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
                        <a href="javascript:;" class="btn" @click="$emit('cancel')">{{cancelText}}</a>
                    </div>
                </div>
            </div>
        </div>
    </transition>

</template>

<script>
    export default {
        name: "Model",
        props:{
            //弹框类型：small, middle large form
            modelType:{
                type:String,
                default:'form'
            },
            title:String,
            //按钮类型： 1确定 2取消 3确定取消
            btnType:String,
            sureText:{
                type:String,
                default: "确定"
            },
            cancelText:{
                type:String,
                default: "取消"
            },
            showModel:Boolean,
        }
    }

</script>

<style scoped lang="less">
    #model{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 20;
        transition: top .65s;
        &.slide-enter-active{
            top:0;
        }
        &.slide-leave-active{
            top:-100%;
        }
        &.slide-enter{
            top:-100%;
        }
        &.slide-leave{
            top:0;
        }
        .mask{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: #000000;
            opacity: 0.5;
        }
        .model-dialog{
            position: absolute;
            top:50%;
            left:50%;
            width: 660px;
            height: auto;
            background-color: white;
            transform: translate(-50%,-50%);
            .model-header{
                height: 60px;
                background-color: #F5F5F5;
                padding: 0 25px;
                line-height: 60px;
                font-size: 16px;
                .icon-close{
                    display: block;
                    position: absolute;
                    top: 23px;
                    right: 25px;
                    width: 14px;
                    height: 14px;
                    background: url("~assets/icon-close.png") no-repeat center;
                    background-size: contain;
                    &:hover{
                        transform: scale(1.5);
                        transition: transform 1s;
                    }
                }
            }
            .model-body{
                padding:42px 40px 54px;
                font-size: 14px;
            }
            .model-footer{
                height: 82px;
                line-height: 82px;
                text-align: center;
                background-color: #F5F5F5;
            }
        }
    }
</style>