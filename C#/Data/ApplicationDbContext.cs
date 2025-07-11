using Microsoft.EntityFrameworkCore;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    // この行で、Viewモデルをデータベースのテーブルとして扱えるようにします
    public DbSet<View> Views { get; set; }
     public DbSet<Like> Likes { get; set; } // ← この行を追加
}