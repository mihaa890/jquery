const DEFAULT_CATEGORY_SELECTED = "vases";
$(function () {
  const entries = $('.cards-wrapper');
  entries.html('');

  $.getJSON('resources/products.json', function (result) {
    const categories = result.products;

    populateCategoryItems(DEFAULT_CATEGORY_SELECTED, categories, entries);
    openModal(categories, DEFAULT_CATEGORY_SELECTED);

    $("a").click(function (e) {
      // daca adaugi preventDefault nu isi va mai da refresh la pagina la fiecare click care e comportamentul default al browser-ului pe link-uri
      e.preventDefault();
      const productType = this.dataset.type;
      entries.html('')
      populateCategoryItems(productType, categories, entries);
      openModal(categories, productType);
      $("a").removeClass("selected")
        $(this).toggleClass("selected");
    });
  });
});
const populateCategoryItems = (categoryKey, categories, entries) => {
  categories[categoryKey].forEach(function (val) {

    let place = `
    <div class="card-wrapper">
    <img src="assets/${categoryKey}/${val.imgUrl}" class="img-wrapper open" data-content='${JSON.stringify(val)}'>
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
    
  });
}

const openModal = (data, productType) => {
  $(".open").on("click", function () {
    data = $(this).data("content");
    $(".popup-overlay, .popup-content").addClass("active");
    $(".left-section").html('');
    $(".left-section").append(`<img src="assets/${productType}/${data.imgUrl}" + "' class='left-img-wrapper'>`);
    $(".right-section").html('');
    if (data) {
      // toata aceasta parte putea fi extrasa in markup, este continut static, iar apoi doar sa selectezi unde doresti sa adaugi continutul dinamic pe fiecare produs in parte
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
      <span><img class="minus" data-value="-1" src="assets/minus.png"> </span>
      <span>1</span>
      <span><img class="plus" data-value="1" src="assets/plus.png"> </span>
  </div>
      <button class="cart-button">Add to cart</button>
  </div>
      </div>`;
      $(".right-section").append(content);
    }
    increaseDecreaseQuantity();
  });
  $(".close").on("click", function (e) {
    e.stopPropagation();
    $(".popup-overlay, .popup-content").removeClass("active");
  });
}


const increaseDecreaseQuantity = () => {
  $(".minus, .plus").on("click", function () {
    const quantityNode = $(".cart-wrapper span:nth-child(2)");
    let quantity = parseInt(quantityNode.text());
    const nextValue = quantity += parseInt(this.dataset.value);
    if(nextValue > 0) { 
      $(".cart-wrapper span:nth-child(2)").text(nextValue);
    }
  }
  );

}


