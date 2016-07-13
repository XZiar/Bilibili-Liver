function queryURL(rid, callback)
{
	$.get("http://live.bilibili.com/api/playurl?player=1&quality=0&cid=" + rid, "",
		function(data)
		{
			var urls = new Array();
			$(data).find("url").each(function(i)
			{
				var url = $(this).text();
				urls.push(url);
			});
			callback(
			{
				rid: rid,
				urls: urls
			});
		},
	"xml");
}

function readFav(callback)
{
	chrome.storage.local.get("favs", function(items)
	{
		var newfavs = {};
		callback(items.favs || {});
	});
}

function saveFav(data, callback)
{
	chrome.storage.local.set( {"favs": data}, callback);
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	console.log(request);
	switch(request.action)
	{
	case "readFav":
		readFav(sendResponse);
		return true;
	case "addFav":
		readFav(function(favs)
		{
			favs[request.rid] = request.data;
			saveFav(favs, sendResponse);
		});
		return true;
	case "getFunc":
		sendResponse("" + queryURL);
		return;
	}
});


