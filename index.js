// 작성자 : 오탁근
// email : takgeun92@gmail.com
// write day : 2022_05_29
// content : naver webtoon

const http = require('http');
const express = require('express');
const app = express();

const fs = require('fs');

const axios = require('axios');
const cheerio = require('cheerio');

const iconv = require('iconv-lite');
const {syncBuiltinESMExports} = require('module');

const sleep = (ms) => {
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

app.get('/axios', (req, res) => {
    let getUrlVal = "https://comic.naver.com/webtoon/weekday";
    axios.get(getUrlVal, {responseType:"arraybuffer"}).then(async(response) => {
        // console.log(response.data); // 뭔가가 나오긴 했다.
        const htmlContent = response.data;
        let htmlCMD = iconv.decode(response.data, "UTF-8").toString();

        const $ = cheerio.load(htmlCMD);
        // #content > div.list_area.daily_all
        let webtoonData = $('div.list_area.daily_all > div > div > h4').text();
        // console.log(webtoonData.trim());        // 월요 웹툰화요 웹툰 ...
        // ,를 기준으로 자르면 될 것 같다.
        let webtoonDataSplit = webtoonData.split('웹툰');
        // console.log(webtoonDataSplit);           // ['월요 ', '화요 ', ...]
        // console.log(webtoonDataSplit[0]);
        for(var i=0;i<7;i++) {
            if(webtoonDataSplit[i] == '월요 ') {
                // #content > div.list_area.daily_all > div:nth-child(1) > div > ul > li:nth-child(1) > a
                // #content > div.list_area.daily_all > div:nth-child(1) > div > ul > li:nth-child(1) > div > a
                // let mondayWebtoon = $('#content > div.list_area.daily_all > div:nth-child(1) > div > ul > li:nth-child(2) > a').text();
                let MondayData = $('#content > div.list_area.daily_all > div:nth-child(1) > div > ul > li:nth-child(n+1) > div > a > img');
                // let mondayWebtoonReplace = mondayWebtoon.replace(/(\r\n|\n|\r|\t)/gm, "");       // 이건 웹툰 제목 뽑을려고 시도했던 것
                // console.log(MondayData);
                for(var j=0;j<MondayData.length;j++) {
                    let imgUrl = MondayData[j].attribs.src;
                    // console.log(imgUrl);     // 정상 추출 확인 완료
                    axios.get(imgUrl, {responseType: 'arraybuffer'}).then((imgRes) => {
                        // console.log(imgRes.data);        // 뭔가 버퍼가 주루룩 나온다.
                        fs.writeFile("./download/monday/" + j + ".jpg", imgRes.data, (err, data1) => {
                            console.log("다운로드 완료 " + j);
                        });
                    });
                    await sleep(100);
                }
            } else if (webtoonDataSplit[i] == '화요 ') {
                let thuesdayData = $('#content > div.list_area.daily_all > div:nth-child(2) > div > ul > li:nth-child(n+1) > div > a > img');
                for(var j=0;j<thuesdayData.length;j++) {
                    let imgUrl = thuesdayData[j].attribs.src;
                    // console.log(imgUrl);     // 정상 추출 확인 완료
                    axios.get(imgUrl, {responseType: 'arraybuffer'}).then((imgRes) => {
                        // console.log(imgRes.data);        // 뭔가 버퍼가 주루룩 나온다.
                        fs.writeFile("./download/thuesday/" + j + ".jpg", imgRes.data, (err, data1) => {
                            console.log("다운로드 완료 " + j);
                        });
                    });
                    await sleep(100);
                }
            } else if (webtoonDataSplit[i] == '수요 ') {
                let wednesdayData = $('#content > div.list_area.daily_all > div:nth-child(3) > div > ul > li:nth-child(n+1) > div > a > img');
                for(var j=0;j<wednesdayData.length;j++) {
                    let imgUrl = wednesdayData[j].attribs.src;
                    // console.log(imgUrl);     // 정상 추출 확인 완료
                    axios.get(imgUrl, {responseType: 'arraybuffer'}).then((imgRes) => {
                        // console.log(imgRes.data);        // 뭔가 버퍼가 주루룩 나온다.
                        fs.writeFile("./download/wednesday/" + j + ".jpg", imgRes.data, (err, data1) => {
                            console.log("다운로드 완료 " + j);
                        });
                    });
                    await sleep(100);
                }
            } else if (webtoonDataSplit[i] == '목요 ') {
                let thursdayData = $('#content > div.list_area.daily_all > div:nth-child(4) > div > ul > li:nth-child(n+1) > div > a > img');
                for(var j=0;j<thursdayData.length;j++) {
                    let imgUrl = thursdayData[j].attribs.src;
                    // console.log(imgUrl);     // 정상 추출 확인 완료
                    axios.get(imgUrl, {responseType: 'arraybuffer'}).then((imgRes) => {
                        // console.log(imgRes.data);        // 뭔가 버퍼가 주루룩 나온다.
                        fs.writeFile("./download/thursday/" + j + ".jpg", imgRes.data, (err, data1) => {
                            console.log("다운로드 완료 " + j);
                        });
                    });
                    await sleep(100);
                }
            } else if (webtoonDataSplit[i] == '금요 ') {
                let fridayData = $('#content > div.list_area.daily_all > div:nth-child(5) > div > ul > li:nth-child(n+1) > div > a > img');
                for(var j=0;j<fridayData.length;j++) {
                    let imgUrl = fridayData[j].attribs.src;
                    // console.log(imgUrl);     // 정상 추출 확인 완료
                    axios.get(imgUrl, {responseType: 'arraybuffer'}).then((imgRes) => {
                        // console.log(imgRes.data);        // 뭔가 버퍼가 주루룩 나온다.
                        fs.writeFile("./download/friday/" + j + ".jpg", imgRes.data, (err, data1) => {
                            console.log("다운로드 완료 " + j);
                        });
                    });
                    await sleep(100);
                }
            } else if (webtoonDataSplit[i] == '토요 ') {
                let saturdayData = $('#content > div.list_area.daily_all > div:nth-child(6) > div > ul > li:nth-child(n+1) > div > a > img');
                for(var j=0;j<saturdayData.length;j++) {
                    let imgUrl = saturdayData[j].attribs.src;
                    // console.log(imgUrl);     // 정상 추출 확인 완료
                    axios.get(imgUrl, {responseType: 'arraybuffer'}).then((imgRes) => {
                        // console.log(imgRes.data);        // 뭔가 버퍼가 주루룩 나온다.
                        fs.writeFile("./download/saturday/" + j + ".jpg", imgRes.data, (err, data1) => {
                            console.log("다운로드 완료 " + j);
                        });
                    });
                    await sleep(100);
                }
            } else if (webtoonDataSplit[i] == '일요 ') {
                let sundayData = $('#content > div.list_area.daily_all > div:nth-child(7) > div > ul > li:nth-child(n+1) > div > a > img');
                for(var j=0;j<sundayData.length;j++) {
                    let imgUrl = sundayData[j].attribs.src;
                    // console.log(imgUrl);     // 정상 추출 확인 완료
                    axios.get(imgUrl, {responseType: 'arraybuffer'}).then((imgRes) => {
                        // console.log(imgRes.data);        // 뭔가 버퍼가 주루룩 나온다.
                        fs.writeFile("./download/sunday/" + j + ".jpg", imgRes.data, (err, data1) => {
                            console.log("다운로드 완료 " + j);
                        });
                    });
                    await sleep(100);
                }
            }
        }
    });
    res.end();
})



const server = http.createServer(app);
server.listen(3000, ()=>{
    console.log('run on server - http://localhost:3000');
});