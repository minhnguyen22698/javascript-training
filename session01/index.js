
////Exercise 1 
//1: Convert number into String 
function formatString(str) {
    let dollarUSLocale = Intl.NumberFormat('en-US');
    return dollarUSLocale.format(str)
}

//2: Format money in shorten
function formatShortenString(numb) {
    let newNumb = Math.floor(numb);
    const arrChar = ['', 'K', 'M', 'B', 'T'];//Array character
    let charIndex = 0;
    while (newNumb >= 1000) {
        newNumb /= 1000;
        charIndex++;
    }

    //Check return number if contain dot('.') we 2 two number after dot('.')
    if (newNumb.toString().includes('.')) {
        newNumb = Math.floor(newNumb*100)/100
    }
    //Add character with charIndex
    newNumb += arrChar[charIndex];
    return newNumb;
}
// console.log(formatShortenString(1342222));
// console.log(formatShortenString(1000000000));
// console.log(formatShortenString(100000));
// console.log(formatShortenString(1123400000));

//3: Count how many words appear in a string
function countUpperCase(str) {
    var count = 1;
    for (let i = 0; i < str.length; i++) {
        if (str[i] == str[i].toUpperCase()) {
            count++;
        }
    };
    return count
}
// console.log('Words in string is: '+countUpperCase('oneTwoThree'))

//4: Get the Extension of file
function getFileExtend(file) {
    return file.split('.').pop() //Separate with dot('.') character then get the last elements
}
// console.log(getFileExtend('txt.html'))

////Exercise 2
//1: The factorial of a number

function calcFactorial(numb) {
    if (numb === 0) {
        return 1;
    } else {
        return numb * calcFactorial(numb - 1);
    }
}
// console.log(calcFactorial(6))

//2: Get integer between min, max
function getRandIntegerNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
// console.log(getRandIntegerNumber(2,10))

//3: Get random elements from an arrays
function getRandElements(arr) {
    var index = Math.round(Math.random() * (arr.length - 1));
    console.log(index)
    return arr[index];
}
// var array=['a','b','c','d','e','f']
// console.log(getRandElements(array))

//4: Find which elements in the second array are missing from the first array
function findElementsMissing(arr1, arr2) {
    var missingArray = arr2.filter(item =>
        arr1.indexOf(item) == -1
    )
    return missingArray;
}
var arr = [7, 2, 5, 3, 5, 3];
var brr = [7, 2, 5, 4, 6, 3, 5, 3, 9];
console.log(findElementsMissing(arr, brr))

