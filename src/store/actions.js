// vuex-actions
export default {
    saveUserName(context,username){
        context.commit('SaveUserName',username)
    },
    saveCartCount(context,count){
        context.commit('saveCartCount',count)
    },
}