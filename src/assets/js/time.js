//时间戳转时间
export function timestampToTime(datetimes, state) {
  var date = new Date(datetimes),
    Y = date.getFullYear() + '-',
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
    D = date.getDate() + ' ',
    //  h = date.getHours() + ':',
    h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':',
    //  m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
    m = date.getMinutes();
  //s = date.getSeconds();
  M < 10 ? M='0'+M : M=M;
  D < 10 ? D='0'+D : D=D;
  h < 10 ? h='0'+h : h=h;
  m < 10 ? m='0'+m : m=m;
  if(state == 'all'){
    //年 月 日 时 分 秒
    return Y+M+D+h+m;
  }else{
    //年 月 日 时
    return Y+M+D;
  }

}
export function timestampToTimes(datetimes) {
  var date = new Date(datetimes),
    Y = date.getFullYear() + '-',
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
    D = date.getDate() + ' ',
    //  h = date.getHours() + ':',
    h = (date.getHours() < 10 ? '0'+(date.getHours()) : date.getHours()) + ':',
    //  m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
    m = date.getMinutes();
  //s = date.getSeconds();
  M < 10 ? M='0'+M : M=M;
  D < 10 ? D='0'+D : D=D;
  h < 10 ? h='0'+h : h=h;
  m < 10 ? m='0'+m : m=m;

  //时 分 秒
  return M+D+h+m;
}
export function fmtLength(row, column){
  const arr = row[column.property]
  if(arr === null || arr === '' || arr === undefined){
    return 0
  } else {
    return arr
  }
}

export function numFilter (value) {
  // 截取当前数据到小数点后两位
  let realVal = parseFloat(value).toFixed(2)
  return realVal
}