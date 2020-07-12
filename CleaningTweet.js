const importData = process.argv[2]
const fs=require('fs')
let dataCsv = fs.readFileSync(`${importData}`, 'utf-8')


let splitEnter = dataCsv.split('\r\n')
let arr = []
let text = []
let hapusAkun = []
let splitting = []
let textResult = []
let result = []

//Filter data dari CSV
for(let i=0; i<splitEnter.length; i++){
    text.push(splitEnter[i].split('\n'))
}
for(let i=0; i<text.length; i++){
    splitting.push(text[i][0].split(','))
}
for(let i=0; i<splitting.length; i++){
    textResult.push(splitting[i][2])
}

//Filter Simbol-Simbol dengan ReGex
for(let i=0; i<textResult.length-1; i++){
    for(let j=0; j<textResult[i].length; j++){
        arr.push(textResult[i].match(/[a-z,0-9,@,/,;,:]+/gi))
    }
}

//Filter Akun dan ReTweet
for(let i=0; i<arr.length-1; i++){
    for(let j=0; j<arr[i].length; j++){
        if(arr[i][j][0] == '@'){
            continue;
        } else if(arr[i][j] == 'RT'){
            continue;
        } else {
            result.push(arr[i][j])
        }
    }
    hapusAkun.push(result.join(' '))
    result = []
}

//Function Cek Duplikat Data
let duplikat = (a) => a.filter((el, i, self) => self.indexOf(el) === i)
let Result = duplikat(hapusAkun)

//Function Save Data After Cleaning
function save(dataWrite){
    fs.writeFileSync('Cleaning.csv',dataWrite.join('\r\n'),'utf-8');
    return `Sukses Cleaning Data Twitter by Adiet Alimudin @Diezzy`
  }

console.log(save(Result));