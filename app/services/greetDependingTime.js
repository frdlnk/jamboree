export default (setGreet, name) => {
    let d = new Date();
    let hours = d.getHours();
    if (hours >= 0 && hours < 12) {
        setGreet(`Good morning, ${name}`)
    }

    if (hours >= 12 && hours < 18) {
        setGreet(`Good afternoon, ${name}`)
    }

    if (hours >= 18 && hours < 21) {
        setGreet(`Good Evening, ${name}`)
    }

    if (hours >= 21 && hours < 24) {
        setGreet(`Good Night, ${name}`)
    }
}