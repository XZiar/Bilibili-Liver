function main()
{
	queryURL(ROOMID,function(ret)
	{
		$(".room-down #the_ret").val(JSON.stringify(ret));
		$(".room-down a").attr('href', ret.urls[0]).show(); 
	});
}

$(".room-down").remove();
var ctxt = "<div class='room-down main-section float-right' style='padding: 5px 20px 5px 20px;margin: 5px 20px 5px 20px;'>"
	+ "<div class='room-info-row'><h2 class='section-title'>Bilibili-Liver</h2></div>"
	+ "<div class='room-info-row'><a href='' target='_blank' ><div class='live-tag v-top'>下载</div></a>"
	+ "<div class='live-tag v-top' id='liveFav'>收藏</div></div>"
	+ "<input type='hidden' id='the_ret' /></div>";
$(".info-ctnr").append(ctxt);
$(".room-down a").hide();

var obj = $(".room-down #the_ret");

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse)
{
	if (request.action == "getRdata")
	{
		sendResponse(JSON.parse(obj.val()));
	}
}); 

$("#liveFav").click(function()
{
	var ret = JSON.parse(obj.val());
	chrome.runtime.sendMessage(
	{
		action: "addFav",
		rid: ret.rid,
		data: 
		{
			title: $(".room-title").attr("title"),
			url: window.location.href,
			links: ret.urls
		}
	}, function()
	{
		alert("ok");
	});
});

chrome.runtime.sendMessage( {action: "getFunc"}, function(func)
{
	$("<script>").text(func + "\n(" + main + ")();").appendTo("body");
});