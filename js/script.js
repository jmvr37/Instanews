$(function() {
  $("select").on("change", function() {
    const section = $(this).val();

    //Selector Event Listener
    const sectionName = $(this).val();
    if (sectionName !== "") {
      $(".header").addClass("after-header");
      $(".logo").addClass("after-logo");
      $(".myselect").addClass("after-select");
    }

    // Ajax Data
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
              <div class="image" style="background-image: url('${
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
  // Loading Image
  var $loading = $(".load").hide();
  $(document)
    .ajaxStart(function() {
      $loading.show();
      $(".home").hide();
    })
    .ajaxStop(function() {
      $loading.hide();
      $(".home").show();
    });
});
