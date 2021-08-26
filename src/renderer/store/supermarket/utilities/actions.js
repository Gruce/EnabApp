export default {
    changeColor({commit}, data){
        commit('setColor', data)
    },

    getColor({commit}){
        let color = this.$auth.$storage.getLocalStorage('background-color')
        if (color)
            commit('setColor', color)
        else
            commit('setColor', "#4776E6")
    },

    setColor({commit}, color){
        console.log("action set color")
        commit('setColor', color)
        this.$auth.$storage.setLocalStorage('background-color', color)
    }

}