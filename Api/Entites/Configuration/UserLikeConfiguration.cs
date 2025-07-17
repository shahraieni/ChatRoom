using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore.Metadata.Conventions;

namespace Api.Entites.Configuration
{
    public class UserLikeConfiguration : IEntityTypeConfiguration<UserLike>
    {
        public void Configure(EntityTypeBuilder<UserLike> builder)
        {
            builder.HasKey(x=> new {x.SourceUserId , x.TargetUserId });
            builder.HasOne(x=>x.SourceUser).WithMany(x=>x.SourceUserlikes).HasForeignKey(x=>x.SourceUserId);
            builder.HasOne(x => x.TargetUser).WithMany(x => x.TargetUserlikes).HasForeignKey(x => x.TargetUserId);
        }
    }
}
