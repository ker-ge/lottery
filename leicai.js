// 乐彩网 https://www.17500.cn/
const axios = require('axios');
const fs = require('fs'); // 文件操作
const getNewLotteryUrl = 'https://www.17500.cn/ajax/awards.html';//获取最新的彩票开奖数据
const reference = {"ssq": "双色球", "3d": "福彩3D", "7lc": "七乐彩", "dlt": "大乐透", "pl3": "排列三", "pl5": "排列五", "7xc": "七星彩", "kl8": "快乐8"};

// 第一步、获取彩票最新开奖数据
function getNewLottery() {
    return new Promise((resolve, reject) => {
        axios.post(getNewLotteryUrl).then(result => {
            if (result && result.data) {
                resolve(result.data);
            } else resolve('');
        }).catch(err => {
            console.log(err);
            reject(null);
        });
    });
}
// 第二步、处理彩票最新开奖数据
function prodNewLottery(dataObj) {
    return new Promise((resolve, reject) => {
        let resData = [];
        for (const key in dataObj) {
            dataObj[key]['name'] = reference[key];
            resData.push(dataObj[key]);
        }
        resolve(resData);
    });
}
// 第三步、保存数据或发送通知
function saveNewLottery(dataObj) {
    return new Promise((resolve, reject) => {
        // 发送邮件

        // 通知微信
        
        // 发送短信
        
        // 保存文件
        fs.writeFile('data/caipiao_leicai.json', JSON.stringify(dataObj, null, '\t'), (error) => {
            if (error) { return new Error(error); }
        });
        resolve(true);
    });
}

// 主程序入口
function main() {
    getNewLottery()
        .then(prodNewLottery)
        .then(saveNewLottery)
        .then(result => {
            console.log('全部完成工作');
        });
}

main();