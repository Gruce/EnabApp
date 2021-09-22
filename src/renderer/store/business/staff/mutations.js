export default {
    add(state, staff){
        state.staffs.push(staff)
    },

    set_all(state, staffs){
        state.staffs = staffs
    }


}