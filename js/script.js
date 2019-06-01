$("select").on("change", function() {
  const section = $(this).val();

  $.ajax({
    method: "GET",
    url:
      "https://api.nytimes.com/svc/topstories/v2/" +
      section +
      ".json?api-key=MCJhGoJthqCkQuDvJvgX3isw1LxKIpgO"
  }).done(function(data) {
    // console.log("data", data.results[0]);
    $.each(data.results, function(key, value) {
      // console.log(data.results[key].url);
      try {
        $(".home").append(
          `<li><img src='${data.results[key].multimedia[2].url}'></li>
          <p>'${data.results[key].title}'</p><a> href="'${
            data.results[key].url
          }'"</a>`

          // `<ul>'${data.results[1].title}'</ul>`
        );
      } catch {}
    });
  });
});

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
