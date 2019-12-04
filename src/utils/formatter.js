export default {
    formateTime(time) {
        if(!time) return '';
        let date = new Date(time)
        let month = date.getMonth()+1 >= 10 ? (date.getMonth()+1) : '0' + (date.getMonth()+1)
        return `${date.getFullYear()}-${month}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
    }
}