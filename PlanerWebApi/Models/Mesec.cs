using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace PlanerWebApi.Models
{
    [Table("Mesec")]
    public class Mesec
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Column("Naziv")]
        [MaxLength(10)]
        [Required]
        [DataType("nvarchar(10)")]
        public string Naziv { get; set; }

        public virtual List<Dan> Dani { get; set; }

        [JsonIgnore]
        public Planer Planer { get; set; }
    }
}