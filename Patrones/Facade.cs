using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace Visual_Code_C
{
    public class Facade
    {
        public static void Main(string[] args)
        {
            Console.Write("Digite la identificación del empleado para obtener su ingreso total (Num del 1 al 4): ");
            var idEmpleado = Console.ReadLine();
            int idEmp;
            if (int.TryParse(idEmpleado, out idEmp))
            {
                if (idEmp < 0 || idEmp > 4)
                    Console.Write("La identificación debe ser un numero entre 1 y 4\n\n");
                else
                {
                    var empleadoFacade = new EmpleadoFacade();
                    var salario = empleadoFacade.ObtenerTotalIngresosEmpleado(idEmpleado);
                    Console.Write("Los ingresos totales del empleado con identificación {0}, son: {1}\n\n", idEmpleado, salario);
                }
            }
            else
                Console.Write("La identificación debe ser un dato numerico\n\n");
        }
    }
    
    public class EmpleadoFacade
    {
        public double ObtenerTotalIngresosEmpleado(string idEmpleado)
        {
            var nomina = new Nomina();
            var beneficio = new Beneficio();
            var incentivo = new Incentivo();
 
            Empleado empleado = nomina.ObtenerSalarioEmpleado(idEmpleado);
            var totalBeneficios = beneficio.ObtenerBeneficiosEmpleado(idEmpleado).Sum(c => c.Valor);
            var totalIncentivos = incentivo.ObtenerIncentivosEmpleado(idEmpleado).Sum(c => c.Valor);
            Console.WriteLine("Información del Empleado: {0}", empleado.Nombre);
 
            return empleado.Salario + totalBeneficios + totalIncentivos;
        }
    }    
    public class Empleado
    {
        public string Id { get; set; }
        public string Nombre { get; set; }
        public double Salario { get; set; }
    }
    
    public class Nomina
    {
        public Empleado ObtenerSalarioEmpleado(string idEmpleado)
        {
            var empleados = new List<Empleado>()
            {
                new Empleado() {Id = "1", Nombre = "Luis García", Salario = 1500000},
                new Empleado() {Id = "2", Nombre = "Maria Martinez", Salario = 2000000},
                new Empleado() {Id = "3", Nombre = "Carlos Gomez", Salario = 3000000},
                new Empleado() {Id = "4", Nombre = "Alberto Alvarez", Salario = 4000000},
            };
 
            return empleados.First(c => c.Id.Equals(idEmpleado));
        }
    }
    
    public class Beneficio
    {
        public string Nombre { get; set; }
        public double Valor { get; set; }
        
        public List<Beneficio> ObtenerBeneficiosEmpleado(string idEmpleado)
        {
            return new List<Beneficio>()
            {
                new Beneficio {Nombre = "Prima extralegal 1", Valor = 2000000},
                new Beneficio {Nombre = "Prima extralegal 2", Valor = 1000000},
                new Beneficio {Nombre = "Subsidio para hijos", Valor = 500000}
            };
        }
    }
    
    public class Incentivo
    {
        public string Concepto { get; set; }
        public double Valor { get; set; }
        
        public List<Incentivo> ObtenerIncentivosEmpleado(string idEmpleado)
        {
            return new List<Incentivo>()
            {
                new Incentivo {Concepto = "Bono por cumplimiento", Valor = 200000},
                new Incentivo {Concepto = "Bono por felicitaciones del cliente", Valor = 200000}
            };
        }
    }
}
