export default ({ app, store }, inject) => {
  inject('business', () => {
    let business_name = store.getters["business/business"].name
    if (!business_name) return []

    let business = {...app.$auth.user[business_name]}
    business.name = business_name
    
    return business
  })
}