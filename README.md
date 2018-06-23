HTML Tempalte to host your code documentation
=========

[Demo](https://me.xurple.xyz/code-docs)

## Installation
1. Install npm
2. Install browser-sync
```
npm install -g browser-sync
```
3. Start the template by 
```
browser-sync start --server
```

## Adding new Program and Language
Refer to the file js/dummyData.js
There you can add new object
```
"3rd Largest Number":{
	"Java Program":{
		type:"java",
		code:"java-3.txt"
	},
	"C Program":{
		type:"c",
		code:"c-3.txt"
	}
}
```
- Key : Name of the Program
- Type : Type of formatting to use
- Code : file name of the code file

Put the code file in the directory called codes