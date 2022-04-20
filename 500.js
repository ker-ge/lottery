// 500彩票 https://kaijiang.500.com/
const axios = require('axios');
const xml2js = require('xml2js');
const fs = require('fs'); // 文件操作
const getNewLotteryUrl = 'https://kaijiang.500.com/static/info/kaijiang/xml/index.xml';//获取最新的彩票开奖数据

// 第一步、获取彩票最新开奖数据
function getNewLottery() {
    return new Promise((resolve, reject) => {
        axios.get(getNewLotteryUrl).then(result => {
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
function prodNewLottery(dataStr) {
    return new Promise((resolve, reject) => {
        xml2js.parseString(dataStr, {explicitArray : false}, function(err, json) {
            if (err) resolve('');
            resolve(json.open.lottery);
        });
    });
}
// 第三步、保存数据或发送通知
function saveNewLottery(dataObj) {
    return new Promise((resolve, reject) => {
        // 发送邮件

        // 通知微信
        
        // 发送短信
        
        // 保存文件
        fs.writeFile('data/500caipiao.json', JSON.stringify(dataObj, null, '\t'), (error) => {
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