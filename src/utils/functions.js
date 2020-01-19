// 计算文件大小函数(保留两位小数),Size为字节大小
// size：初始文件大小
//Math.pow(x,y) //返回 x 的 y 次幂的值
//NumberObject.toFixed(num) //可把 Number 四舍五入为指定小数位数的数字
function getfilesize(size) {
    if (!size)
        return "";
    const num = 1024.00; //byte

    if (size < num)
        return size + "B";
    if (size < Math.pow(num, 2))
        return (size / num).toFixed(2) + "K"; //kb
    if (size < Math.pow(num, 3))
        return (size / Math.pow(num, 2)).toFixed(2) + "M"; //M
    if (size < Math.pow(num, 4))
        return (size / Math.pow(num, 3)).toFixed(2) + "G"; //G
    return (size / Math.pow(num, 4)).toFixed(2) + "T"; //T
}

const utils = {
    getfilesize
}
export default utils;
