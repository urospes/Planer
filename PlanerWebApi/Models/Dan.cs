using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;
using System;
using System.Text.Json.Serialization;

namespace PlanerWebApi.Models
{
    [Table("Dan")]
    public class Dan
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Column("Datum")]
        [DataType("datetime2(7)")]
        public DateTime Datum { get; set; }

        public virtual List<Obaveza> Obaveze {get; set;}

        [JsonIgnore]
        public Mesec Mesec { get; set; }
    }
}