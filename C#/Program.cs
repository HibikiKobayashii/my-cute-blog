using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// CORSサービスを追加
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "https://www.c1nom3.com")
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});

// データベース接続設定
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? "Data Source=app.db";
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlite(connectionString));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// ▼▼▼ この一行を追加して、バックグラウンドサービスを登録します ▼▼▼
builder.Services.AddHostedService<YouTubePollingService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();