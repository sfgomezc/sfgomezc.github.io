$(document).ready(function () {
  var canvas = document.getElementById('dibujo');
  var ctx = canvas.getContext('2d');

  $('a[data-toggle="pill"]').on('shown.bs.tab', function (e) {
    $("#panelInformacion").hide();
    $("#panelFormularios").show();

    // Se elimina los dibujos realizados en el CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    $("#panelFormularios form").each(function(index, form) {
      // Se resetea los formularios
      form.reset();
    });
    $("#txtPerimetro").add($("#txtArea")).html("<i>Sin calcular</i>")

    var target = $(e.target).attr("href");
    target = target.replace(/#/, "");
    figuraSelect = target;
  });

  window.calcularYDibujar = function (figura) {
    try {
      //canvas.width, canvas.height
      switch (figura) {
        case "cuadrado":
          var longitud = $("#txtLadoC").val();

          if (!longitud) {
            throw "Favor ingresa la longitud del cuadrado";
          }
          if (longitud <= 0) {
            throw "El valor de la longitud del cuadrado debe ser mayor a cero";
          }
          if (longitud >= canvas.width || longitud >= canvas.height) {
            throw "El valor de la longitud del cuadrado no debe ser superior al tamaño del CANVAS";
          }

          dibujarCuadrado(longitud);
          $("#txtPerimetro").html(getMilesNumberFormat(calcularPerimetroCuadrado(longitud)));
          $("#txtArea").html(getMilesNumberFormat(calcularAreaCuadrado(longitud)));
          break;
        case "circulo":
          var radio = $("#txtRadio").val();
          if (!radio) {
            throw "Favor ingresa el radio de la circunferencia";
          }
          if (radio <= 0) {
            throw "El valor del radio de la circunferencia debe ser mayor a cero";
          }
          if (radio * 2 >= canvas.width || radio * 2 >= canvas.height) {
            throw "El valor del radio de la circunferencia no debe ser superior al tamaño del CANVAS";
          }

          dibujarCirculo(radio);
          $("#txtPerimetro").html(getMilesNumberFormat(calcularPerimetroCircunferencia(radio)));
          $("#txtArea").html(getMilesNumberFormat(calcularAreaCircunferencia(radio)));
          break;
        case "rectangulo":
          var largo = $("#txtLargoR").val();
          var alto = $("#txtAltoR").val();

          if (!largo || !alto) {
            throw "Favor ingresa el valor del alto y largo del rectángulo";
          }
          if (largo <= 0) {
            throw "El valor del largo del rectángulo debe ser mayor a cero";
          }
          if (alto <= 0) {
            throw "El valor del alto del rectángulo debe ser mayor a cero";
          }

          if (largo >= canvas.width || largo >= canvas.height) {
            throw "El valor del largo del rectángulo no debe ser superior al tamaño del CANVAS";
          }
          if (alto >= canvas.width || alto>= canvas.height) {
            throw "El valor del alto del rectángulo no debe ser superior al tamaño del CANVAS";
          }

          dibujarRectangulo(largo, alto);
          $("#txtPerimetro").html(getMilesNumberFormat(calcularPerimetroRectangulo(largo, alto)));
          $("#txtArea").html(getMilesNumberFormat(calcularAreaRectangulo(largo, alto)));
          break;
        case "triangulo":
          var longitud = $("#txtLadoT").val();

          if (!longitud) {
            throw "Favor ingresa la longitud del triángulo";
          }
          if (longitud <= 0) {
            throw "El valor de la longitud del triángulo debe ser mayor a cero";
          }
          if (longitud >= canvas.width || longitud >= canvas.height) {
            throw "El valor de la longitud del triángulo no debe ser superior al tamaño del CANVAS";
          }

          dibujarTriangulo(longitud);
          $("#txtPerimetro").html(getMilesNumberFormat(calcularPerimetroTriangulo(longitud)));
          $("#txtArea").html(getMilesNumberFormat(calcularAreaTriangulo(longitud)));
          break;
      }
    } catch (ex) {
      alert(ex);
    }
    return false;
  };

  function dibujarCuadrado(longitud) {
    // Se elimina los dibujos realizados en el CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Se obtiene el punto X y Y, de tal manera que permita que la figura quede dibujada en el centro
    var x = (canvas.width - longitud) / 2;
    var y = (canvas.height - longitud) / 2;

    // Se dibuja el cuadrado en el canvas
    ctx.fillRect(x, y, longitud, longitud);
  }

  function dibujarCirculo(radio) {
    // Se elimina los dibujos realizados en el CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.beginPath();

    // Se obtiene el punto X y Y, de tal manera que permita que la figura quede dibujada en el centro
    var x = (canvas.width) / 2;
    var y = (canvas.height) / 2;

    ctx.arc(x, y, radio, 0, 2 * Math.PI);
    ctx.restore();
    ctx.stroke();
  }

  function dibujarTriangulo(longitud) {
    // Se elimina los dibujos realizados en el CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var h = longitud * (Math.sqrt(3) / 2);

    ctx.save();
    // Se obtiene el punto X y Y, de tal manera que permita que la figura quede dibujada en el centro
    var x = (canvas.width) / 2;
    var y = (canvas.height) / 2;
    ctx.translate(x, y);

    ctx.beginPath();

    ctx.moveTo(0, -h / 2);
    ctx.lineTo(-longitud / 2, h / 2);
    ctx.lineTo(longitud / 2, h / 2);
    ctx.lineTo(0, -h / 2);
    ctx.restore();
    ctx.stroke();
  }

  function dibujarRectangulo(ancho, alto) {
    // Se elimina los dibujos realizados en el CANVAS
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Se obtiene el punto X y Y, de tal manera que permita que la figura quede dibujada en el centro
    var x = (canvas.width - ancho) / 2;
    var y = (canvas.height - alto) / 2;

    ctx.fillRect(x, y, ancho, alto);
  }

  /**
   * Función que calcula el perímetro del cuadrado.
   * El perímetro se halla multiplicando la longitud de uno de sus lados por 4.
   * @param {Number} longitud Longitud del cuadrado.
   * @return {Number} Perímetro del cuadrado.
   */
  function calcularPerimetroCuadrado(longitud) {
    return longitud * 4;
  }

  /**
   * Función que calcula el área del cuadrado.
   * El área se halla multiplicando la longitud de uno de sus lados por el mismo valor.
   * @param {Number} longitud Longitud del cuadrado.
   * @return {Number} Área del cuadrado.
   */
  function calcularAreaCuadrado(longitud) {
    return longitud * longitud;
  }

  /**
   * Función que calcula el perímetro del triángulo.
   * El área se halla multiplicando la longitud de uno de sus lados por 3.
   * @param {Number} longitud Longitud del triángulo.
   * @return {Number} Perímetro del triángulo.
   */
  function calcularPerimetroTriangulo(longitud) {
    return longitud * 3;
  }

  /**
   * Función que calcula el área del triángulo.
   * El área se halla aplicando la formula descrita en la función.
   * @param {Number} longitud Longitud del triángulo.
   * @return {Number} Área del triángulo.
   */
  function calcularAreaTriangulo(longitud) {
    // Fórmula: Raiz de 3 por la longitud, dividido en 2
    return (Math.sqrt(3) * longitud) / 2;
  }

  /**
   * Función que calcula el perímetro de la circunferencia.
   * El perímetro se obtiene aplicando la formula descrita en la función.
   * @param {Number} radio Radio de la función (distancia existente entre el punto medio).
   * @return {Number} Perímetro de la circunferencia.
   */
  function calcularPerimetroCircunferencia(radio) {
    // Fórmula: 2 * PI * r
    return 2 * Math.PI * radio;
  }

  /**
   * Función que calcula el área de la circunferencia.
   * El perímetro se obtiene aplicando la formula descrita en la función.
   * @param {Number} radio Radio de la función (distancia existente entre el punto medio).
   * @return {Number} Área del triángulo.
   */
  function calcularAreaCircunferencia(radio) {
    // Fórmula: PI * Radio^2
    return Math.PI * Math.pow(radio, 2);
  }

  /**
   * Función que calcula el perímetro del rectángulo.
   * @param {Number} base Valor de la base del rectángulo.
   * @param {Number} altura Valor de la altura del rectángulo.
   * @return {Number} Perímetro del rectángulo.
   */
  function calcularPerimetroRectangulo(base, altura) {
    return 2 * base + 2 * altura;
  }

  /**
   * Función que calcula el área del rectángulo.
   * @param {Number} base Valor de la base del rectángulo.
   * @param {Number} altura Valor de la altura del rectángulo.
   * @return {Number} Área del rectángulo.
   */
  function calcularAreaRectangulo(base, altura) {
    return base * altura;
  }

  function getMilesNumberFormat(number, decimals) {
    if (typeof decimals == "undefined") {
      decimals = 2;
    }

    // convertimos en texto el vakir ubfgr
    number = number.toString();

    // Se invoca la función que valida si el valor es un número entero positivo o negativo
    var match = number.match(/^(-?)(\d+)$/);
    if (match) {
      // Se retorna el valor del signo junto con el respectivo número separado por miles
      return match[1] + String(match[2]).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    }

    // Se invoca la función que valida si el valor es un numero decimal positivo o negativo
    match = number.match(/^(-?)(\d+\.\d+)$/);
    if (match) {
      var array = match[2].split(".");
      return match[1] + String(array[0]).replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "," + String(array[1]).slice(0, decimals);
    }
  }
});