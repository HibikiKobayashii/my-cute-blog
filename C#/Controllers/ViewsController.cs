// C#/Controllers/ViewsController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PusherServer;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System;

[Route("api/[controller]")]
[ApiController]
public class ViewsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;
    private const string ADMIN_EMAIL = "osomatsu287@gmail.com";

    public ViewsController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    // POST /api/views/{slug}
    [HttpPost("{slug}")]
    public async Task<IActionResult> RecordView(string slug, [FromBody] ViewRequest? request)
    {
        if (request?.UserId == ADMIN_EMAIL)
        {
            return Ok(new { message = "Admin view not recorded." });
        }

        if (string.IsNullOrEmpty(slug))
        {
            return BadRequest("Article slug is required.");
        }

        var newView = new View { ArticleSlug = slug };
        _context.Views.Add(newView);
        await _context.SaveChangesAsync();

        var pusherOptions = new PusherOptions { Cluster = _configuration["Pusher:Cluster"], Encrypted = true };
        var pusher = new Pusher(
            _configuration["Pusher:AppId"],
            _configuration["Pusher:AppKey"],
            _configuration["Pusher:Secret"],
            pusherOptions
        );

        await pusher.TriggerAsync("analytics-channel", "new-view", new { articleSlug = slug });
        return Ok(new { message = "View recorded successfully." });
    }

    // GET /api/views
    [HttpGet]
    public async Task<IActionResult> GetViewCounts()
    {
        var viewCounts = await _context.Views
            .GroupBy(v => v.ArticleSlug)
            .Select(g => new { ArticleSlug = g.Key, ViewCount = g.Count() })
            .OrderByDescending(result => result.ViewCount)
            .ToListAsync();
        return Ok(viewCounts);
    }
    
    // GET /api/views/daily/{slug}
    // ▼▼▼ このメソッドの処理を修正しました ▼▼▼
    [HttpGet("daily/{slug}")]
    public async Task<IActionResult> GetDailyViewCounts(string slug)
    {
        if (string.IsNullOrEmpty(slug))
        {
            return BadRequest("Article slug is required.");
        }

        // 1. まず、該当するデータを全てデータベースから取得する
        var allViewsForSlug = await _context.Views
            .Where(v => v.ArticleSlug == slug)
            .ToListAsync();

        // 2. C#のメモリ上で、日付の変換と集計を行う
        var dailyCounts = allViewsForSlug
            .GroupBy(v => v.ViewedAt.Date) // 日付でグループ化
            .Select(g => new {
                Date = g.Key.ToString("yyyy-MM-dd"), // 文字列への変換
                Views = g.Count()                   // カウント
            })
            .OrderBy(result => result.Date)
            .ToList();

        return Ok(dailyCounts);
    }

    // DELETE /api/views/{slug}
    [HttpDelete("{slug}")]
    public async Task<IActionResult> DeleteViews(string slug)
    {
        if (string.IsNullOrEmpty(slug))
        {
            return BadRequest("Article slug is required.");
        }

        var viewsToDelete = await _context.Views.Where(v => v.ArticleSlug == slug).ToListAsync();
        if (viewsToDelete.Any())
        {
            _context.Views.RemoveRange(viewsToDelete);
            await _context.SaveChangesAsync();
        }

        return Ok(new { message = $"Views for {slug} have been reset." });
    }
}

public class ViewRequest
{
    public string? UserId { get; set; }
}