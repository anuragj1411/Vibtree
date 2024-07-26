using Microsoft.EntityFrameworkCore;
using System.Data;
using Vibtree_Backend.Models;

namespace Vibtree_Backend.DBContext
{
    public class UserDBContext : DbContext
    {
        public UserDBContext(DbContextOptions<UserDBContext> options) : base(options) { }

        public DbSet<User> mstUser { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<User>().HasKey(am => new
            {
                am.UserID
            });
        }
        public override int SaveChanges()
        {
            ChangeTracker.DetectChanges();
            return base.SaveChanges();
        }
    }
}
