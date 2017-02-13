$.ajax({
    dataType: 'json',
    url: 'products.json',
    success: function (jsondata) {
        window.products = jsondata;
        renderProducts();
    }
});

function renderProducts() {
    var itemsBlock = $('#items');


    window.products.forEach(function (product) {
        var item = '<div > ' +
            '<div class="item_block" > ' +
            '<img class="item_back" src="./images/back.png" alt="back"/> ' +
            '<div class="item_body"> ' +
            '<div class="item_name"> ' +
            '<p class="item_name_text">' + product.name + '</p> ' +
            '</div> ' +
            '<img src="' + product.image[0] + '" alt="' + product.name + '"/> ' +
            '<p class="item-text"> ' + product.description +
            '</p> ' +
            '<a class="item_more_info" href="#" data-id="' + product.id + '">ДОКЛАДНІШЕ</a> ' +
            '</div> ' +
            '</div> ' +
            '</div>';

        itemsBlock.append($(item));
    });

    $(document).ready(main);
}

function main () {
    slider();

    $('#items .item_more_info').on('click', productDetatildClick);

    $('#myModal1').on('shown.bs.modal', function(){
        setTimeout(function(){
            $('#forslider').slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                arrows: false,
                fade: true,
                asNavFor: '#slider_min'
            });

            $('#slider_min').slick({
                dots: false,
                arrows: false,
                infinite: false,
                speed: 300,
                asNavFor: '#forslider',
                vertical: $(window).width() >= '1200',
                autoplaySpeed: 2000,
                slidesToShow: 3,
                slidesToScroll: 2,
                centerMode: true,
                focusOnSelect: true
            });
        }, 100);

    });

    $('#myModal1').on('hidden.bs.modal', function(){
        $('#forslider').slick('unslick');

        $('#slider_min').slick('unslick');
    });

    $(document).ready(function(){
        var $form = $('form');
        $form.submit(function(e){
            e.stopPropagation();
            e.preventDefault();

            $.post($(this).attr('action'), $(this).serialize(), function(response){
                $('#myModal2').modal('hide');
                $('#myModal3').modal('hide');
            },'json');
            return false;
        });
    });
}

function productDetatildClick(e) {
    var productModal = $('#myModal1'),
        productId = $(e.target).data('id'),
        productInfo = window.products[productId],
        productMainImage = productModal.find('#forslider'),
        productImages = productModal.find('#slider_min'),
        productModalInfo = productModal.find('#more_info'),
        productModalDescription = productModal.find('#more_info_text');

    $(productModalInfo.find('h1')[0]).text(productInfo.name);
    productImages.contents().remove();
    productMainImage.contents().remove();
    productModalDescription.contents().remove();

    productInfo.image.forEach(function (img, i) {
        productImages.append($('<img src="' + img + '" alt="' + productInfo.name + '"/>'));
        productMainImage.append($('<img src="' + img + '" alt="' + productInfo.name + '"/>'));
    });

    if(productInfo.modifications){
        productInfo.modifications.forEach(function (mod, i) {
            productModalDescription.append($('<h2>' + mod.name + ' ' + mod.uah + ' грн | ' + mod.usd + ' $</h2>'))
        });
    }

    productModalDescription.append('<br/>');
    productModalDescription.append('<p>' + productInfo.description + '</p>');

    productModal.modal('show');
}

function slider () {
    if ($(window).width() < '640') {
        $('#items').slick({
            dots: true,
            dotsClass: '.dots',
            arrows: false,
            infinite: false,
            speed: 300,
            autoplay: true,
            autoplaySpeed: 2000,
            slidesToShow: 2,
            slidesToScroll: 2,
            customPaging: function (slider, i) {
                return '<a class="dot"></a>';
            }
        });
        $("#controllers").detach();
    }
    else if ($(window).width() <= '1200') {
        $('#items').slick({
            dots: true,
            arrows: false,
            infinite: false,
            speed: 500,
            autoplay: true,
            autoplaySpeed: 2000,
            swipe: false,
            slidesToShow: 3,
            slidesToScroll: 3,
            dotsClass: '.dots',
            customPaging: function (slider, i) {
                return '<a class="dot"></a>';
            }
        });
        $("#controllers").detach();

    }
    else if ($(window).width() <= '1600') {
        $('#items').slick({
            dots: true,
            arrows: true,
            infinite: false,
            speed: 500,
            rows: 2,
            autoplay: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            prevArrow: '.prev',
            nextArrow: '.next',
            dotsClass: '.dots',
            customPaging: function (slider, i) {
                return '<a class="dot"></a>';
            }
        });
        $("#items > ul ").prepend($("#controllers .prev"));
        $("#items > ul ").append($("#controllers .next"));
    }
    else {
        $('#items').slick({
            touchMove: false,
            dots: true,
            infinite: false,
            speed: 500,
            swipe: false,
            autoplay: true,
            arrows: true,
            autoplaySpeed: 2000,
            slidesToShow: 4,
            slidesToScroll: 4,
            rows: 2,
            prevArrow: '.prev',
            nextArrow: '.next',
            dotsClass: '.dots',
            customPaging: function (slider, i) {
                return '<a class="dot"></a>';
            }
        });
        $("#items > ul ").prepend($("#controllers .prev"));
        $("#items > ul ").append($("#controllers .next"));
    }
}


