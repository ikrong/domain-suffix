const DomainSuffix = require("./dist/index").domainSuffix;

DomainSuffix.config({
	"fakedomainsuffix": 1,
})

let parse = (str) => {
	console.log(`正在解析  ${str}`);
	let result = DomainSuffix.parse(str)
	if (result) {
		let {
			suffix,
			domain
		} = result
		console.log(`解析结果	${suffix}	${domain}`);
	} else {
		console.log(`解析结果	无`);
	}
	console.log("");
}


parse("http://www.baidu.com")
parse("http://www.baidu.com.cn")
parse("http://www.baidu.org.cn")
parse("http://百度.中国")
parse("http://百度.中国")
parse("http://org.bd")
parse("http://news.www.baidu.org.bd")
parse("http://www.ck")
parse("http://cn")
parse("http://fake.domain_s")
parse("http://fake.fakedomainsuffix")
parse("http://blog.csdn.net/daffegeg/article/details/4855")