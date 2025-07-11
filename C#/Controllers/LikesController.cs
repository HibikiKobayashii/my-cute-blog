using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

[Route("api/[controller]")]
[ApiController]
public class LikesController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public LikesController(ApplicationDbContext context)
    {
        _context = context;
    }

    // POST /api/likes/{slug} - いいねを追加/削除する
    [HttpPost("{slug}")]
    public async Task<IActionResult> ToggleLike(string slug, [FromBody] LikeRequest request)
    {
        if (string.IsNullOrEmpty(slug) || string.IsNullOrEmpty(request.UserId))
        {
            return BadRequest();
        }

        var existingLike = await _context.Likes
            .FirstOrDefaultAsync(l => l.ArticleSlug == slug && l.UserId == request.UserId);

        if (existingLike != null)
        {
            _context.Likes.Remove(existingLike);
        }
        else
        {
            var newLike = new Like { ArticleSlug = slug, UserId = request.UserId };
            _context.Likes.Add(newLike);
        }

        await _context.SaveChangesAsync();
        return Ok();
    }

    // GET /api/likes - 記事ごとの総いいね数を取得
    [HttpGet]
    public async Task<IActionResult> GetLikeCounts()
    {
        var likeCounts = await _context.Likes
            .GroupBy(l => l.ArticleSlug)
            .Select(g => new { ArticleSlug = g.Key, LikeCount = g.Count() })
            .ToListAsync();
            
        return Ok(likeCounts ?? new()); 
    }
    
    // GET /api/likes/{slug}/status?userId=... - 特定ユーザーのいいね状態を取得
    [HttpGet("{slug}/status")]
    public async Task<IActionResult> GetLikeStatus(string slug, [FromQuery] string userId)
    {
        if (string.IsNullOrEmpty(slug) || string.IsNullOrEmpty(userId))
        {
            return BadRequest();
        }

        bool isLiked = await _context.Likes
            .AnyAsync(l => l.ArticleSlug == slug && l.UserId == userId);

        return Ok(new { isLiked });
    }

    // GET /api/likes/user/{userId} - 特定ユーザーがいいねした記事一覧を取得
    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetLikedArticlesByUser(string userId)
    {
        if (string.IsNullOrEmpty(userId))
        {
            return BadRequest();
        }

        var likedArticleSlugs = await _context.Likes
            .Where(l => l.UserId == userId)
            .Select(l => l.ArticleSlug)
            .Distinct()
            .ToListAsync();

        return Ok(likedArticleSlugs);
    }
}

// ▼▼▼ この行に public を付け直しました ▼▼▼
public class LikeRequest
{
    public string UserId { get; set; } = string.Empty;
}