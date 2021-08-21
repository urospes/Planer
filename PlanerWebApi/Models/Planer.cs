using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace PlanerWebApi.Models
{
    [Table("Planer")]
    public class Planer
    {
        [Key]
        [Column("Id")]
        public int Id { get; set; }

        [Column("Vlasnik")]
        [MaxLength(30)]
        [DataType("nvarchar(30)")]
        public string Vlasnik { get; set; }
        
        public virtual List<Mesec> Meseci {get; set;}
    }
}