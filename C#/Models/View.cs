using System;
using System.ComponentModel.DataAnnotations;

public class View
{
    [Key]
    public int Id { get; set; }

    [Required]
    // ▼▼▼ 初期値 = string.Empty を追加 ▼▼▼
    public string ArticleSlug { get; set; } = string.Empty;

    [Required]
    public DateTime ViewedAt { get; set; } = DateTime.UtcNow;
}