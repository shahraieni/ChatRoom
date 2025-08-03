using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Api.Entites.Configuration
{
    public class MessageConfiguration : IEntityTypeConfiguration<Message>
    {
        public void Configure(EntityTypeBuilder<Message> builder)
        {
            builder.HasKey(x => x.Id);
            builder.HasOne(x => x.Senter).WithMany(x => x.MessageSent)
               .HasForeignKey(x=>x.SenterId).OnDelete(DeleteBehavior.ClientSetNull);

            builder.HasOne(x => x.Receiver).WithMany(x => x.MessageReceived)
              .HasForeignKey(x => x.ReceiverId).OnDelete(DeleteBehavior.ClientSetNull);
        }
    }
}
