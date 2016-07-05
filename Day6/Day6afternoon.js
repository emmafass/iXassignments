// Return 'yes' if the sentence contains only unique characters, 'no' otherwise
function allUniqueCharacters(sentence) {
	var string1 = sentence.split('').sort().join('').trim();
	for(var i = 0; i < string1.length; i++) {
		for(var j = i + 1; j < string1.length; j++) {
			if (string1[i] === string1[j]) {
				return "no";
			}
		}
	}
	return "yes";
}

// One number 1-10 is missing. Return it!
function missingNum(numbers) {
	var sort_array = numbers.sort(function(a, b){return a - b});
	for(var j = 1; j <= 10; j++) {
		if (j !== sort_array[j-1]){
			return j;
		}
	}
	return "none found";
}

// Return 'yes' if array1 and array2 are rotated versions of each other, 'no' otherwise
// e.g. [1,2,3,6,7,8] and [3,6,7,8,1,2] are rotated versions of each other
function areRotatedVersions(array1, array2) {
	if (array1.length !== array2.length) {
		return "no";
	}
	var new_array = array1.concat(array1).join('');
  var new_array2 = array2.join('');
	if (new_array.includes(new_array2)) {
		return "yes";
	}
	else {
		return "no";
	}
}

// Return a string of the first n prime numbers, separated by commas
// e.g. "1,2,3,4"
function nPrimeNums(n) {
  var myString = "";
  var primeNums = 0;
  var currNum = 1;
  while(primeNums < n) {
    if (isPrime(currNum) === true) {
      myString += currNum + ",";
      primeNums++;
    }
    currNum++;
  }
  return myString.substring(0, myString.length-1);
}

function isPrime(n) {
   if (n===1) {  
    return false;  
  }  
  else if(n === 2) {  
    return true;  
  }
  else {  
    for (var x = 2; x < n; x++) {  
      if(n % x === 0) {  
        return false;  
      }  
    }  
    return true;    
  }  
} 

// Return the output of running the function f twice
// e.g. doitTwice(function f() {return 1;}) === 2
function doItTwice(f) {
  return f() + f();
}

// Return an object that has the properties: first name, last name, age, email, and favorite color
function objectFun(first, last, age, email, color) {
    var person = {
        first_name: first,
        last_name: last,
        age: age,
        email: email,
        fav_color: color
    }
    return person;
}

// Return the number of "children" obj has
function numChildren(obj) {
  return obj.children.length;
}

function greeting(name) {
    return "Hello, " + name + "!";
}

// Say hello! This function takes a function as a parameter (greet should be a function)
function sayHello(first, last, greet) {
  return greet(first + " " + last);
}