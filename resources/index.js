$(function () {
  const entries = $('.cards-wrapper');
  entries.html('');

  // unul din requirement-uri pt acest layout era sa iti populezi tot continutul din array-uri pe fiecare categorie in parte ceea ce vad ca lipseste
  $.getJSON('resources/products.json', function (result) {
    // ulterior dinamic trebuiau luate categoriile respective, eventual preluate printr-un data attribute
    const vases = result.vases;
    $.map(vases, function (val) {
      const content = JSON.stringify(val);
      // cand incarci continut dinamic trebuie sa consideri ca ai sa incarci imaginile folosind ca referinta fisierul html, si nu cel js, drept urmare nu a nevoie sa urci un nivel de navigare
      let place = `
      <div class="card-wrapper">
      <img src="assets/vases/${val.imgUrl}" class="img-wrapper open" data-content='${content}'>
      <div class="product-description-wrapper">
        <span class="description-wrapper">
          ${val.series}
          </span>
          <span class="price-wrapper">
            ${val.currency}
            ${val.price}  
        </span> 
        </div>
      </div>`;

      entries.append(place);
    })
    $(".open").on("click", function () {
      $(".popup-overlay, .popup-content").addClass("active");
      $(".left-section").html('');
      // mare atentie la navigare, vad ca inca sunt probleme, spune-mi daca ai dori sa reluam conceptul, te rog
      $(".left-section").append("<img src='../vases/" + $(this).attr("src") + "' class='left-img-wrapper'>");
      $(".right-section").html('');

      const data = $(this).data("content");

      // nu ar trebui sa ai nevoie sa recreezi modalul de fiecare data, acesta poate fi markup static, iar apoi prin selectii sa iti populezi dinamic in functie de produsul selectat
      if (data) {
        let content =
          `<div class="product-description-wrapper">
        <h1 class="description-wrapper">
          ${data.series}
          </h1>
          <span class="price-wrapper">
            ${data.currency}
            ${data.price}
        </span>
        <p>
          ${data.description}
        </p>
        <div class="atr-description">
        <div class="desc">
        <span>
          Series:
        </span>
        <span>
          ${data.series}
        </span>
        </div>
        <div class="desc">
        <span>
          Designer: 
        </span>
        <span> ${data.designer} </span> 
        </div>
        <div class="desc">
        <span>
          SKU: 
        </span>
        <span> ${data.sku} </span>
        </div>
        <div class="desc">
        <span>
          Colour: 
        </span>
        <span> ${data.colour} </span>
        </div>
        <div class="desc">
        <span>
          Material: 
        </span>
        <span> ${data.material} </span> 
        </div>
        <div class="desc">
        <span>
          Height: 
        </span>
        <span> ${data.height}${data.unit} </span> 
        </div>
    </div>
      <div class="cart-wrapper">
      <div>
        <span>-</span>
        <span>1</span>
        <span>+</span>
    </div>
        <button class="cart-button">Add to cart</button>
    </div>
        </div>`;
        $(".right-section").append(content);
      }
    });
    $(".close, .popup-overlay").on("click", function () {
      $(".popup-overlay, .popup-content").removeClass("active");
    });

  });
});





