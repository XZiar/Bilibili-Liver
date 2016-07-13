function resolve(ret)
{
	var obj = $("#vlist");
	obj.html("");
	obj.append("<tr><td width='15%'>" + ret.rid + "</td><td>" + ret.urls[0] + "</td>"
		+ "<td width='15%'><button class='down' data-url='" + ret.urls[0] + "'>下载</button></td></tr>");
}
$(document).ready(function()
{
	$("body").on("click", ".down", function()
	{
		window.open($(this).data("url"));
	});

	chrome.tabs.query(
	{
		active: true,
		currentWindow: true
	},
	function(tabs)
	{
		var curtab = tabs[0];
  		chrome.tabs.sendMessage(curtab.id,
  		{ action: "getRdata" },
  		resolve);
	});

	var obj = $("#favlist");
	obj.html("");
	chrome.runtime.sendMessage( {action: "readFav"}, function(favs)
	{
		$.each(favs, function(key, val)
		{
			var ctxt = "<tr><td>" + val.title + "</td><td width='15%'>" + key + "</td>"
				+ "<td width='15%'><button class='down' data-url='" + val.url + "'>进入</button></td>"
				+ "<td width='15%'><button class='down' data-url='" + val.links[0] + "'>下载</button></td></tr>";
			obj.append(ctxt);
		});
	});
});