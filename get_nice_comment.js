var page = require('webpage').create();

// パラメータを取得
var system = require('system');
var args = system.args;
var user = args[1];

// ページにアクセス
page.open('http://qiita.com/'+user, function(status){
	page.includeJs('http://code.jquery.com/jquery-1.9.1.min.js', function() {
		if ( status !== 'success' ) {
			console.log('Unable to access website!');
		}else {
			console.log('Qiitaで投稿した記事のタグとそれに対するイイね数一覧');
			console.log('============================================');
			try{

				var res = page.evaluate(function() {
					var allTagList = {};
					$("article").each(function () {
						var articleElm = $(this);
						articleElm.find(".TagList .TagList__item").each(function () {

							var tagName = $(this).find("a").text();
							if(!allTagList[tagName]){
								allTagList[tagName] = {"iine":0,"comment":0};
							}

			    		// TODO:ここ効率悪い
			    		articleElm.find(".ItemLink__status li").each(function () {
			    			// $(this).find(".fa-like").remove();
			    			if($(this).find(".fa-like")[0]){
			    				allTagList[tagName]["iine"] += Number($(this).text().trim());
			    			}else if($(this).find(".fa-comment-o")[0]){
			    				allTagList[tagName]["comment"] += Number($(this).text().trim());
			    			}
			    			
			    		}); 

			    	}); 
					}); 
					return allTagList;
				});

				// 出力
				for (key in res) {
					console.log(key + "：いいね->" + res[key]["iine"] + "、コメント->" + res[key]["comment"]);
				}

			}catch(e){
				console.log(e);
				phantom.exit();
			}


		}
		console.log('============================================');
		console.log('あーせいこうしたんごー');
		phantom.exit();
	});
});



