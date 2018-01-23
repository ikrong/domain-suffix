import { SuffixList } from "./suffix";
import * as Punycode from "punycode"

export class DomainSuffix {
	private suffixList;

	/**
	 * 可配置
	 */
	config(list: any) {
		this.loadSuffixList(list);
	}

	private loadSuffixList(list?: any) {
		this.suffixList = Object.assign(SuffixList, list);
	}

	/**
	 * 解析
	 * @param url 解析链接
	 */
	parse(url: string) {
		if (!this.suffixList) {
			this.loadSuffixList();
		}
		if (url) {
			// 正则匹配找出链接中的主机
			let urls = /(([a-z\u00a1-\uffff0-9-]*)\.)+([a-zA-Z\u4e00-\u9faf]{2,})/i.exec(url);
			if (urls) {
				// 重置为小写
				let host = urls[0].toLocaleLowerCase();
				host = this.punyDecode(host);
				let suffix, domain;
				let parts = host.split(".");
				if (this.suffixList[host]) {
					suffix = host;
				} else {
					for (let i = parts.length; i > 0; i--) {
						let _domain = parts.join(".");
						let _suffix = parts.slice(1 - i).join(".")
						let _star_suffix = "*." + parts.slice(2 - i).join(".")
						let _exp_suffix = `!${_suffix}`;
						if (this.suffixList[_exp_suffix]) {
							[suffix, domain] = [_suffix.split(".").slice(1).join("."), _domain];
							break;
						}
						if (this.suffixList[_star_suffix]) {
							[suffix, domain] = [parts.slice(1 - i).join("."), _domain];
							break;
						}
						if (this.suffixList[_suffix]) {
							[suffix, domain] = [_suffix, _domain];
							break;
						}
					}
				}
				if (suffix || domain) {
					if (suffix != domain) {
						return { suffix, domain };
					}
				}
			}
		}
	}

	/**解析puny编码 */
	private punyDecode(url: string) {
		let oriUrl = [];
		url.split(".").map(item => {
			if (item.match(/^xn--/)) {
				item = item.replace(/^xn--/, "");
				oriUrl.push(Punycode.decode(item));
			} else {
				oriUrl.push(item);
			}
		})
		return oriUrl.join(".")
	}

	/**puny编码 */
	private punyEncode(url: string) {
		let punyUrl = [];
		url.split(".").map(item => {
			if (item.match(/[\u00a1-\uffff]/)) {
				punyUrl.push("xn--" + Punycode.encode(item));
			} else {
				punyUrl.push(item);
			}
		})
		return punyUrl.join(".");
	}
}
