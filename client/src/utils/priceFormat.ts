export default (num: number) => {

    if (!num) {
        return 'N/A'
    } else {
        (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');  // 12,345.67
    }
    

}