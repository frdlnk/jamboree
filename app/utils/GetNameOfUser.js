export default (user) => {
    let space = user.name.indexOf(" ")
    return user.name.slice(0, space)
  }