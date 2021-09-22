export default {
    staffs: state => {
        return state.staffs
    },

    staff: (state, getters) => id => {
        if (id)
            return {...getters.staffs.find(x => x.id == id)}
        else
            return {name: ''}
    }

}