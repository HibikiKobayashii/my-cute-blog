using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using PusherServer;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

public class YouTubePollingService : BackgroundService
{
    private readonly IConfiguration _configuration;
    private bool _isCurrentlyLive = false;

    public YouTubePollingService(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            try
            {
                var youtubeService = new YouTubeService(new BaseClientService.Initializer()
                {
                    ApiKey = _configuration["YouTube:ApiKey"],
                    ApplicationName = "MyCuteBlog"
                });

                var channelId = "UCD57aTH6T9TSbNmHEfaoUAw"; // あなたのチャンネルID
                var searchRequest = youtubeService.Search.List("snippet");
                searchRequest.ChannelId = channelId;
                searchRequest.EventType = SearchResource.ListRequest.EventTypeEnum.Live;
                searchRequest.Type = "video";

                var searchResponse = await searchRequest.ExecuteAsync();

                bool isNowLive = searchResponse.Items.Any();

                if (isNowLive != _isCurrentlyLive)
                {
                    _isCurrentlyLive = isNowLive;
                    await NotifyFrontend(isNowLive);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"YouTube APIのチェック中にエラー: {ex.Message}");
            }

            // 5分おきにチェックする
            await Task.Delay(TimeSpan.FromMinutes(5), stoppingToken);
        }
    }

    private async Task NotifyFrontend(bool isLive)
    {
        var pusherOptions = new PusherOptions { Cluster = _configuration["Pusher:Cluster"], Encrypted = true };
        var pusher = new Pusher(
            _configuration["Pusher:AppId"],
            _configuration["Pusher:AppKey"],
            _configuration["Pusher:Secret"],
            pusherOptions
        );

        var eventName = isLive ? "live-started" : "live-ended";
        await pusher.TriggerAsync("youtube-channel", eventName, new { isLive });
        Console.WriteLine($"Pusherに {eventName} イベントを送信しました。");
    }
}