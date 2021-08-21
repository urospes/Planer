using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System;
using System.Text.Json.Serialization;

namespace PlanerWebApi.Models
{
    [Table("Obaveza")]
    public class Obaveza
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Column("Naziv")]
        [MaxLength(30)]
        [Required]
        [DataType("nvarchar(30)")]
        public string Naziv { get; set; }

        [Column("Opis")]
        [Required]
        [DataType("nvarchar(max)")]
        public string Opis { get; set; }

        [Column("Tip")]
        [Required]
        [DataType("nvarchar(max)")]
        public string Tip { get; set; }

        [Column("Bitna")]
        [DataType("bit")]
        public bool Bitna { get; set; }

        [Column("VremeOd")]
        [Required]
        [DataType("datetime2(7)")]
        public DateTime VremeOd { get; set; }

        [Column("VremeDo")]
        [Required]
        [DataType("datetime2(7)")]
        public DateTime VremeDo { get; set; }

        [JsonIgnore]
        public Dan Dan { get; set; }
    }
}