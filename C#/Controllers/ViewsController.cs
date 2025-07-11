using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore; // DbContextとLINQのために追加
using PusherServer;
using System;
using System.Linq; // LINQのために追加
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class ViewsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public ViewsController(ApplicationDbContext context)
    {
        _context = context;
    }

    // POST /api/views/{slug} - 閲覧を記録するAPI
    [HttpPost("{slug}")]
    public async Task<IActionResult> RecordView(string slug)
    {
        if (string.IsNullOrEmpty(slug))
        {
            return BadRequest("Article slug is required.");
        }

        // 1. データベースに閲覧記録を追加
        var newView = new View { ArticleSlug = slug };
        _context.Views.Add(newView);
        await _context.SaveChangesAsync();

        // 2. Pusherにリアルタイム通知を送信
        var options = new PusherOptions
        {
            Cluster = Environment.GetEnvironmentVariable("NEXT_PUBLIC_PUSHER_CLUSTER"),
            Encrypted = true
        };
        var pusher = new Pusher(
            Environment.GetEnvironmentVariable("PUSHER_APP_ID"),
            Environment.GetEnvironmentVariable("NEXT_PUBLIC_PUSHER_KEY"),
            Environment.GetEnvironmentVariable("PUSHER_SECRET"),
            options
        );
        await pusher.TriggerAsync(
            "analytics-channel",
            "new-view",
            new { articleSlug = slug, message = $"New view on {slug}" }
        );

        return Ok(new { message = "View recorded successfully." });
    }

    // ▼▼▼ ここから新しいメソッドを追加 ▼▼▼

    // GET /api/views - 閲覧数を集計して取得するAPI
    [HttpGet]
    public async Task<IActionResult> GetViewCounts()
    {
        var viewCounts = await _context.Views
            .GroupBy(v => v.ArticleSlug) // 記事のスラッグでグループ化
            .Select(g => new { // 新しいオブジェクトを作成
                ArticleSlug = g.Key,       // 記事のスラッグ
                ViewCount = g.Count()      // グループ内の件数（＝閲覧数）
            })
            .OrderByDescending(result => result.ViewCount) // 閲覧数の多い順に並び替え
            .ToListAsync(); // リストとして取得

        return Ok(viewCounts);
    }
}