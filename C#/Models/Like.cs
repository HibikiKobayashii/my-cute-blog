using System;
using System.ComponentModel.DataAnnotations;

public class Like
{
    [Key]
    public int Id { get; set; }

    [Required]
    public string ArticleSlug { get; set; } = string.Empty;

    // どのユーザーがいいねしたかを識別するためのID
    // ログインしているユーザーのメールアドレスなどを想定
    [Required]
    public string UserId { get; set; } = string.Empty; 

    [Required]
    public DateTime LikedAt { get; set; } = DateTime.UtcNow;
}