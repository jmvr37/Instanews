$(function () {
  $("select").on("change", function () {
    const section = $(this).val();


    const sectionName = $(this).val();
    if (sectionName !== "") {
      $(".header").addClass("after-header");
      $(".logo").addClass("after-logo");
      $(".myselect").addClass("after-select");
    }


    $.ajax({
      method: "GET",
      url:
        "https://api.nytimes.com/svc/topstories/v2/" +
        section +
        ".json?api-key=MCJhGoJthqCkQuDvJvgX3isw1LxKIpgO"
    }).done(function (data) {
      let cont = 0;
      $(".home").html("");
      $.each(data.results, function (key, value) {
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
                  <p class="para">${data.results[key].abstract}</p>
                  </div>
                        </div>
                          </a>
                            </li>`
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
    .ajaxStart(function () {
      $loading.show();
      $(".home").hide();
    })
    .ajaxStop(function () {
      $loading.hide();
      $(".home").show();
    });
});
