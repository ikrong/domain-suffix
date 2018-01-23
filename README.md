#domain suffix parser

suffix data belongs to [publicsuffix.org](https://publicsuffix.org)

#examples

```js
const DomainSuffix = require("domain-suffix").domainSuffix;

let result = DomainSuffix.parse("https://www.google.com/")
if(result){
	let {suffix,domain} = result;
	console.log(suffix,domain);
}else{
	console.log("cannot parse");
}
```