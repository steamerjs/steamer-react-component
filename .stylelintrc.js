module.exports = {
    "extends": "stylelint-config-standard",
    "processors": ["stylelint-processor-html"],
    "rules": {
        "color-hex-length": null, // 不限制长度
        "color-hex-case": null, // 不限制大小写
        "comment-whitespace-inside": null, // 不限制注释里面的空格
        "indentation": 4,
        "comment-empty-line-before": null,
        "declaration-empty-line-before": [ "always", {
            except: [
                "first-nested",
            ],
            ignore: [
                "after-declaration",
                "after-comment",
                "inside-single-line-block",
            ],
        }],
        "rule-nested-empty-line-before": null,
        "no-eol-whitespace": [true, {
            ignore: ["empty-lines"] // 允许有空格的空行
        }],
        "no-empty-source": null,
        "media-feature-name-no-unknown": null,
        "max-empty-lines": 2, // 最多允许连续两个空行
        "rule-non-nested-empty-line-before": null,
        "shorthand-property-no-redundant-values": null // 允许margin等属性的“不简写”
    }
}
