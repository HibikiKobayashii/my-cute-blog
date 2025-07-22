using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using PusherServer;
using System.Threading.Tasks;
// ▼▼▼ この2行を追加してください ▼▼▼
using Microsoft.EntityFrameworkCore;
using System.Linq;

[Route("api/[controller]")]
[ApiController]
public class ViewsController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private readonly IConfiguration _configuration;

    public ViewsController(ApplicationDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    // POST /api/views/{slug}
    [HttpPost("{slug}")]
    public async Task<IActionResult> RecordView(string slug)
    {
        if (string.IsNullOrEmpty(slug))
        {
            return BadRequest("Article slug is required.");
        }

        var newView = new View { ArticleSlug = slug };
        _context.Views.Add(newView);
        await _context.SaveChangesAsync();

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

        await pusher.TriggerAsync(
            "analytics-channel",
            "new-view",
            new { articleSlug = slug }
        );

        return Ok(new { message = "View recorded successfully." });
    }

    // GET /api/views - 閲覧数を集計して取得するAPI
    [HttpGet]
    public async Task<IActionResult> GetViewCounts()
    {
        var viewCounts = await _context.Views
            .GroupBy(v => v.ArticleSlug)
            .Select(g => new {
                ArticleSlug = g.Key,
                ViewCount = g.Count()
            })
            .OrderByDescending(result => result.ViewCount)
            .ToListAsync(); // ← この行が正しく動作するようになります

        return Ok(viewCounts);
    }
}