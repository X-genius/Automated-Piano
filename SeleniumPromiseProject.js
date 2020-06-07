//Step 1 : To add inbuilt java File Like chrome , selenium , fs
require("chromedriver");
var key = require("selenium-webdriver");
var fs = require("fs");

//step 2 : For Inputs
var credentialFiles = process.argv[2];
//var notes;

//Step 3 : for Building Browser and open in full screen
var bld = new key.Builder();
var driver = bld.forBrowser("chrome").build();
driver.manage().window().maximize();

//step 4 : The input is read in form of language in json file
var FileWillBeReadPromise = fs.promises.readFile(credentialFiles, "utf-8");

//step 5 : Playing then catch game in promises

FileWillBeReadPromise.then(function (data) {
    //step 6 : In this tech use for credential file data
    var credentials = JSON.parse(data);
    var url = credentials.url;
   // notes = credentials.notes;
    var urlWillBeOpen = driver.get(url);
    return urlWillBeOpen;
}).then(function () {// In this technique we use time for any particular process use some waiting time for perform the action
    var waitForEveryonePromise = driver.manage().setTimeouts({
        implicit: 10000,
        pageLoad: 10000
    })
    return waitForEveryonePromise;
}).then(function () {
    var PianoKeys = driver.findElement(key.By.css(".piano-wrapper"));
    return PianoKeys;
}).then(function () {
    var Piano = driver.findElements(key.By.css("ul.piano li.key >span.white-key"));
    return Piano;
}).then(function (element) {

    let fElemP = element[0].click();
    for (let i = 1; i < element.length; i++) {
        fElemP = fElemP.then(function () {
            return delayedClick(element[i]);
        })
    }
}).catch(function (err) {
    console.log(err.message);
})

function delayedClick(element) {
    return new Promise(function (resolve, reject) {
        let fTime = Date.now() + 1000;
        while (Date.now() < fTime) {

        }
        let eClickPromise = element.click();
        eClickPromise.then(function () {
            resolve();
        }).catch(function (err) {
            reject(err)
        })
    })
}