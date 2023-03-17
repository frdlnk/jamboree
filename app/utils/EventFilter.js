export default (user, array ,category, param = "Country") => {
     if(param == "Country") return array.filter(e => e.category == category && e.country == user.country).reverse()
     if(param == "City") return array.filter(e => e.category == category && e.location.includes(user.location)).reverse()
}