using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ▼▼▼ 1. CORSサービスを追加 ▼▼▼
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // Next.jsのURLを許可
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

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// ▼▼▼ 2. CORS設定を有効化 ▼▼▼
app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();