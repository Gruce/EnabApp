export default {
    selectBusiness({state, commit}, {name, title}){
        commit('saveBusiness', {name: name, title: title});
        this.$auth.$storage.setLocalStorage('business', name)
    },

    getBusiness(){
        return this.$auth.$storage.getLocalStorage('business')
    }
}