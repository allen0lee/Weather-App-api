const ml = require('machine_learning');
const fs = require('fs');

function isWash(dataTobeVarified, callback) {
  fs.readFile(process.cwd() + '/lib/dtTraining.csv', (err, weatherData) => {
      if (err) throw err;

      const weatherArr = weatherData.toString().split('\n');
      let data = [];
      let result = [];
      weatherArr.forEach(dailyData=>{
        dailyArr = dailyData.split(', ');
        data.push([dailyArr[0], dailyArr[1], dailyArr[2]]);
        result.push(dailyArr[3])
      })
      // console.log(data);
      const dt = new ml.DecisionTree({
          data : data,
          result : result
      });
      dt.build();

      // console.log("Classify : ", dt.classify([humidity, cloud, windSpeed]));
      // console.log("Classify : ", dt.classify([80, 50, 15]));
      // dt.prune(1.0); // 1.0 : mingain.
      // dt.print();

      const varifiedData = dataTobeVarified.map(dailyData=>{
        const result = dt.classify(dailyData);
        if (result["no"]) {
          return false;
        } else {
          return true;
        }
      })
      // console.log(varifiedData);
      // return varifiedData;
      callback(varifiedData);
  })
}

module.exports = isWash;
