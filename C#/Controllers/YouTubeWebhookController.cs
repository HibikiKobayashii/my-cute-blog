using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration; // IConfigurationのために追加
using PusherServer; // Pusherライブラリ
using System.IO;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq; // XMLを扱うために追加

[Route("api/[controller]")]
[ApiController]
public class YouTubeWebhookController : ControllerBase
{
    private readonly IConfiguration _configuration;

    public YouTubeWebhookController(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    // PubSubHubbubからの最初の確認リクエストを処理する
    [HttpGet]
    public IActionResult HandleSubscription([FromQuery(Name = "hub.challenge")] string challenge)
    {
        if (string.IsNullOrEmpty(challenge))
        {
            return BadRequest("No challenge token found.");
        }
        return Content(challenge, "text/plain");
    }

    // 新しい動画や配信が投稿されたときの通知を受け取る
    [HttpPost]
    public async Task<IActionResult> ReceiveNotification()
    {
        using var reader = new StreamReader(Request.Body, Encoding.UTF8);
        var content = await reader.ReadToEndAsync();

        try
        {
            // 受け取ったXMLデータを解析
            var doc = XDocument.Parse(content);
            XNamespace yt = "http://www.youtube.com/xml/schemas/2015";
            
            // ライブ配信が開始されたかどうかの大まかな判定
            // (より厳密な判定には、動画IDを取得してYouTube Data APIで確認する必要があります)
            var isLive = content.Contains("yt:channelId"); // 簡単な判定

            if (isLive)
            {
                // ▼▼▼ Pusherでフロントエンドに通知を送る処理 ▼▼▼
                var pusherOptions = new PusherOptions
                {
                    Cluster = _configuration["Pusher:Cluster"],
                    Encrypted = true
                };
                var pusher = new Pusher(
                    _configuration["Pusher:AppId"],
                    _configuration["Pusher:AppKey"],
                    _configuration["Pusher:Secret"],
                    pusherOptions
                );

                // 'youtube-channel' というチャンネルに 'live-started' というイベントを送信
                await pusher.TriggerAsync(
                    "youtube-channel",
                    "live-started",
                    new { message = "Live stream has started!" }
                );

                System.Console.WriteLine("YouTubeライブ開始を検知し、Pusher通知を送信しました。");
            }
        }
        catch (System.Exception ex)
        {
            System.Console.WriteLine($"XML解析またはPusher通知でエラー: {ex.Message}");
        }

        return Ok();
    }
}