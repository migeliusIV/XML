// Задание 3.6
// Напишите функцию rle, которая реализует RLE сжатие


function rle(str) {
    if (str.length === 0) return '';
    
    let result = '';
    let count = 1;
    let currentChar = str[0];
    
    for (let i = 1; i < str.length; i++) {
        if (str[i] === currentChar) {
            count++;
        } else {
            result += currentChar + (count > 1 ? count : '');
            currentChar = str[i];
            count = 1;
        }
    }
    
    result += currentChar + (count > 1 ? count : '');
    
    return result;
}

console.log(rle('AAABBBCCXYZ'));
console.log(rle('AAAABBBCCXYZDDDDEEE')); 
console.log(rle('ABCDE')); 
console.log(rle(''));
console.log(rle('WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWB'));
console.log(rle('AABBBCC'));
console.log(rle('   ')); 
console.log(rle('A')); 
