$("select").on("change", function() {
  const section = $(this).val();

  // (function() {
  //   $(".myselect").click(function() {
  //     $(this)
  //       .show("<img src='images/ajax-loader.gif' alt='Loading...' />")
  //       .hide(this);
  //   });
  // });

  $.ajax({
    method: "GET",
    url:
      "https://api.nytimes.com/svc/topstories/v2/" +
      section +
      ".json?api-key=MCJhGoJthqCkQuDvJvgX3isw1LxKIpgO"
  }).done(function(data) {
    let cont = 0;
    // console.log("data", data.results.title);
    $(".home").html("");
    $.each(data.results, function(key, value) {
      // console.log(data.results[key].abstract);
      if (data.results[key].multimedia.length >= 5 && cont < 12) {
        try {
          cont = cont + 1;
          $(".home").append(
            `<li class="style">
            <a href='${data.results[key].url}'>
              <div class=image style="background-image: url('${
                data.results[key].multimedia[4].url
              }')">
                <div class="image2">
                  <p class="para">'${data.results[key].abstract}'</p>
                  </div>
                        </div>
                          </a>
                            </li>`

            // `<ul>'${data.results[1].title}'</ul>`
          );
        } catch (error) {
          console.log(error);
        }
      }
    });
  });
});

var $loading = $(".load").hide();
$(document)
  .ajaxStart(function() {
    $loading.show();
  })
  .ajaxStop(function() {
    $loading.hide();
  });

// $(".loader").click(function() {
//   $(".load").show();

//   alert("You should see the image now");

//   $(".load").hide();
// });

// // target.event
//  $(".home").append(
//    `<img src='https://static01.nyt.com/images/2019/05/24/us/politics/00dc-cli-trump1/00dc-cli-trump1-thumbStandard.jpg'${
// //     data.multimedia[0].icon
// //   }.png' />`
// // );

// $(".home").append("<ul>" + data.multimedia[0].description + "</ul>");
// $(".home").append(`<ul>${data.multimedia[0].main}</ul>`);

// $(".results").append("<p>" + data.weather[0].description + "</p>");
//       $(".results").append(`<p>${data.weather[0].main}</p>`);

// $(function(){
//     const $select('select');
//     $select.on('change', function() {
//       $.ajax({
//         method: "GET",
//         url: "https://api.nytimes.com/svc/topstories/v2/" +section+
//          ".json?api-key=MCJhGoJthqCkQuDvJvgX3isw1LxKIpgO"

//       }).done(function(data){
//         $.each(data, function(key, value){
//           console.log(value);
//         })
//       })
//         console.log($select.val());
//       });

// })
